import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Establishment } from '../../establishments/entities/establishment.entity';
import { Product } from '../../products/entities/product.entity';
import { Notification } from '../../notifications/entities/notification.entity';

export enum UserRole {
  CUSTOMER = 'customer',
  SUPPLIER = 'supplier',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'tax_id', unique: true })
  taxId: string;

  @Column({ name: 'short_name', nullable: true })
  shortName: string;

  @Column({ name: 'full_name', nullable: true })
  fullName: string;

  @Column({ name: 'payer_address', nullable: true })
  payerAddress: string;

  @Column({ name: 'manager_name', nullable: true })
  managerName: string;

  @Column({ name: 'manager_position', nullable: true })
  managerPosition: string;

  @Column({ name: 'manager_phone', nullable: true })
  managerPhone: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @Column({ name: 'is_email_verified', default: false })
  isEmailVerified: boolean;

  @Column({ name: 'email_verification_code', nullable: true })
  emailVerificationCode: string;

  @Column({ name: 'reset_password_token', nullable: true })
  resetPasswordToken: string;

  @Column({ name: 'reset_password_expires', nullable: true })
  resetPasswordExpires: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @OneToMany(() => Establishment, (establishment) => establishment.user)
  establishments: Establishment[];

  @OneToMany(() => Product, (product) => product.supplier)
  products: Product[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
} 