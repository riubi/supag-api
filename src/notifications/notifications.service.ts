import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, NotificationType } from './entities/notification.entity';
import { User, UserRole } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async notifyNewProduct(product: Product) {
    // Get all customers to notify
    const customers = await this.userRepository.find({
      where: { role: UserRole.CUSTOMER },
    });

    // const notifications = customers.map(customer => 
    //   this.notificationRepository.create({
    //     userId: customer.id,
    //     type: NotificationType.NEW_PRODUCT,
    //     title: 'New Product Available',
    //     message: `${product.name} is now available from ${product.supplier?.shortName || 'a supplier'}`,
    //     data: {
    //       productId: product.id,
    //       productName: product.name,
    //       supplierId: product.supplierId,
    //     },
    //   })
    // );
    //TODO fix buld after cursor setup
    const notifications: Notification[] = [];

    const savedNotifications = await this.notificationRepository.save(notifications);

    // Send real-time notifications
    savedNotifications.forEach(notification => {
      this.notificationsGateway.sendNotificationToUser(notification.userId, notification);
    });

    return savedNotifications;
  }

  // async notifyPriceChange(product: Product, oldPrice: number) {
  //   // Get all customers who have this product in favorites
  //   const favorites = await this.userRepository
  //     .createQueryBuilder('user')
  //     .innerJoin('user.favorites', 'favorite')
  //     .where('favorite.productId = :productId', { productId: product.id })
  //     .getMany();

  //   const notifications = favorites.map(user => 
  //     this.notificationRepository.create({
  //       userId: user.id,
  //       type: NotificationType.PRICE_CHANGE,
  //       title: 'Price Change Alert',
  //       message: `Price of ${product.name} changed from $${oldPrice} to $${product.price}`,
  //       data: {
  //         productId: product.id,
  //         productName: product.name,
  //         oldPrice,
  //         newPrice: product.price,
  //         supplierId: product.supplierId,
  //       },
  //     })
  //   );

  //   const savedNotifications = await this.notificationRepository.save(notifications);

  //   // Send real-time notifications
  //   savedNotifications.forEach(notification => {
  //     this.notificationsGateway.sendNotificationToUser(notification.userId, notification);
  //   });

  //   return savedNotifications;
  // }

  async getUserNotifications(userId: string, unreadOnly = false) {
    const where: any = { userId };
    if (unreadOnly) {
      where.isRead = false;
    }

    return this.notificationRepository.find({
      where,
      // order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(notificationId: string, userId: string) {
    const notification = await this.notificationRepository.findOne({
      where: { id: notificationId, userId },
    });

    if (!notification) {
      throw new Error('Notification not found');
    }

    notification.isRead = true;
    return this.notificationRepository.save(notification);
  }

  async markAllAsRead(userId: string) {
    await this.notificationRepository.update(
      { userId, isRead: false },
      { isRead: true }
    );

    return { message: 'All notifications marked as read' };
  }
} 