import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class SupportService {
  constructor(private mailerService: MailerService) {}

  async sendContactMessage(contactDto: ContactDto) {
    const { name, email, subject, message } = contactDto;

    // Send email to support team
    await this.mailerService.sendMail({
      to: process.env.SUPPORT_EMAIL || 'support@supag.com',
      subject: `Contact Form: ${subject}`,
      template: 'contact',
      context: {
        name,
        email,
        subject,
        message,
      },
    });

    return { message: 'Your message has been sent successfully' };
  }

  getFaq() {
    return [
      {
        id: '1',
        question: 'How do I register as a supplier?',
        answer: 'To register as a supplier, choose "Supplier" role during registration and provide your valid tax ID for verification.',
      },
      {
        id: '2',
        question: 'How do I add products to my catalog?',
        answer: 'After logging in as a supplier, navigate to "My Products" and click "Add New Product". Fill in the required information including name, price, category, and description.',
      },
      {
        id: '3',
        question: 'How do I receive notifications about new products?',
        answer: 'As a customer, you will automatically receive notifications about new products. You can also add products to favorites to get price change alerts.',
      },
      {
        id: '4',
        question: 'Can I export my product catalog?',
        answer: 'Yes, suppliers can export their product catalog in XML or Excel format from the "My Products" section.',
      },
      {
        id: '5',
        question: 'How do I manage my establishments?',
        answer: 'Customers can add and manage multiple establishments (locations) from the "Establishments" section in their profile.',
      },
      {
        id: '6',
        question: 'What is tax ID validation?',
        answer: 'We validate tax IDs using external APIs to ensure all registered businesses are legitimate and active.',
      },
      {
        id: '7',
        question: 'How do favorites work?',
        answer: 'Customers can add products to favorites to easily track them and receive notifications when prices change.',
      },
      {
        id: '8',
        question: 'Can I change my email or password?',
        answer: 'Yes, you can change your email and password from your profile settings. Email changes require verification.',
      },
    ];
  }
} 