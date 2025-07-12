import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ProductCategory } from './product-category.entity';
import { Favorite } from './favorite.entity';
import { IFilter } from '../../shared/interfaces/category.interface';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'simple-array', nullable: true })
  images: string[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'category_id' })
  categoryId: string;

  @Column({ type: 'jsonb', nullable: true })
  subcategory: { name: string; value: string };

  @Column({ type: 'jsonb', nullable: true })
  filters: IFilter[];

  @Column({ type: 'varchar', length: 2, nullable: true })
  measure: 'ml' | 'gr';

  @Column({ name: 'special_conditions', nullable: true })
  specialConditions?: string;

  @Column({ type: 'int', nullable: true })
  volume: number;

  @Column({ name: 'supplier_id' })
  supplierId: string;

  @Column({ name: 'in_stock', default: true })
  inStock: boolean;

  @Column({ nullable: true })
  country: string;

  @Column({ name: 'gift_box', nullable: true })
  giftBox: boolean;

  @Column({ nullable: true })
  region: string;

  @Column({ type: 'simple-array', nullable: true })
  certificates: string[];

  @Column({ name: 'is_manufacturer', nullable: true })
  isManufacturer: boolean;

  @Column({ nullable: true })
  manufacturer: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  abv: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'supplier_id' })
  supplier: User;

  @ManyToOne(() => ProductCategory, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: ProductCategory;

  @OneToMany(() => Favorite, (favorite) => favorite.product)
  favorites: Favorite[];
} 