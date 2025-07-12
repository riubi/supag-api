import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SupportService } from './support.service';
import { ContactDto } from './dto/contact.dto';

@ApiTags('Support')
@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Get('health-check')
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({ status: 200, description: 'Health check successful' })
  async healthCheck() {
    return `Health check successful`;
  }

  @Post('contact')
  @ApiOperation({ summary: 'Send contact message' })
  @ApiResponse({ status: 201, description: 'Message sent successfully' })
  async contact(@Body() contactDto: ContactDto) {
    return this.supportService.sendContactMessage(contactDto);
  }

  @Get('faq')
  @ApiOperation({ summary: 'Get frequently asked questions' })
  @ApiResponse({ status: 200, description: 'FAQ retrieved successfully' })
  async getFaq() {
    return this.supportService.getFaq();
  }
} 