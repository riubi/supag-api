import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductCategory } from './entities/product-category.entity';
import { Favorite } from './entities/favorite.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductCategory)
    private categoryRepository: Repository<ProductCategory>,
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    private notificationsService: NotificationsService,
  ) {}

  async createProduct(createProductDto: CreateProductDto, supplierId: string) {
    const product = this.productRepository.create({
      ...createProductDto,
      supplierId,
    });

    const savedProduct = await this.productRepository.save(product);

    // Notify customers about new product
    await this.notificationsService.notifyNewProduct(savedProduct);

    return savedProduct;
  }

  async findAll(filters?: any) {
    const query = this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.supplier', 'supplier')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.active = :active', { active: true });

    if (filters?.categoryId) {
      query.andWhere('product.categoryId = :categoryId', { categoryId: filters.categoryId });
    }

    if (filters?.subCategory) {
      query.andWhere('product.subCategory = :subCategory', { subCategory: filters.subCategory });
    }

    if (filters?.minPrice) {
      query.andWhere('product.price >= :minPrice', { minPrice: filters.minPrice });
    }

    if (filters?.maxPrice) {
      query.andWhere('product.price <= :maxPrice', { maxPrice: filters.maxPrice });
    }

    if (filters?.search) {
      query.andWhere('product.name ILIKE :search', { search: `%${filters.search}%` });
    }

    return query.getMany();
  }

  async findBySupplier(supplierId: string) {
    return this.productRepository.find({
      where: { supplierId },
      relations: ['category'],
    });
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['supplier', 'category'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto, userId: string) {
    const product = await this.findOne(id);

    if (product.supplierId !== userId) {
      throw new ForbiddenException('You can only update your own products');
    }

    const oldPrice = product.price;
    Object.assign(product, updateProductDto);
    const updatedProduct = await this.productRepository.save(product);

    // Notify if price changed
    // if (oldPrice !== updatedProduct.price) {
    //   await this.notificationsService.notifyPriceChange(updatedProduct, oldPrice);
    // }

    return updatedProduct;
  }

  async removeProduct(id: string, userId: string) {
    const product = await this.findOne(id);

    if (product.supplierId !== userId) {
      throw new ForbiddenException('You can only delete your own products');
    }

    await this.productRepository.remove(product);
    return { message: 'Product deleted successfully' };
  }

  async addToFavorites(productId: string, userId: string) {
    const existingFavorite = await this.favoriteRepository.findOne({
      where: { productId, userId },
    });

    if (existingFavorite) {
      return { message: 'Product already in favorites' };
    }

    const favorite = this.favoriteRepository.create({
      productId,
      userId,
    });

    await this.favoriteRepository.save(favorite);
    return { message: 'Product added to favorites' };
  }

  async removeFromFavorites(productId: string, userId: string) {
    const favorite = await this.favoriteRepository.findOne({
      where: { productId, userId },
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    await this.favoriteRepository.remove(favorite);
    return { message: 'Product removed from favorites' };
  }

  async getFavorites(userId: string) {
    return this.favoriteRepository.find({
      where: { userId },
      relations: ['product', 'product.supplier', 'product.category'],
    });
  }

  async getCategories() {
    return this.categoryRepository.find({
      where: { active: true },
    });
  }

  async exportProducts(supplierId: string, format: 'xml' | 'excel') {
    const products = await this.findBySupplier(supplierId);
    
    if (format === 'xml') {
      return this.exportToXml(products);
    } else {
      return this.exportToExcel(products);
    }
  }

  private exportToXml(products: Product[]) {
    // XML export implementation
    const xml2js = require('xml2js');
    const builder = new xml2js.Builder();
    
    const xmlData = {
      products: {
        product: products.map(p => ({
          id: p.id,
          name: p.name,
          description: p.description,
          price: p.price,
          // quantity: p.quantity,
          category: p.category?.name,
          subCategory: p.subcategory,
        }))
      }
    };

    return builder.buildObject(xmlData);
  }

  private async exportToExcel(products: Product[]) {
    // Excel export implementation
    const ExcelJS = require('exceljs');
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Products');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 36 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Description', key: 'description', width: 50 },
      { header: 'Price', key: 'price', width: 15 },
      { header: 'Quantity', key: 'quantity', width: 15 },
      { header: 'Category', key: 'category', width: 20 },
      { header: 'Sub Category', key: 'subCategory', width: 20 },
    ];

    products.forEach(product => {
      worksheet.addRow({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        // quantity: product.quantity,
        category: product.category?.name,
        subCategory: product.subcategory,
      });
    });

    return workbook.xlsx.writeBuffer();
  }
} 