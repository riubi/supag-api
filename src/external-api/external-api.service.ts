import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

export interface TaxValidationResult {
  valid: boolean;
  shortName?: string;
  fullName?: string;
  address?: string;
  error?: string;
}

@Injectable()
export class ExternalApiService {
  private readonly logger = new Logger(ExternalApiService.name);

  async validateTaxId(taxId: string): Promise<TaxValidationResult> {
    try {
      // Try nalog.gov API first
      const nalogResult = await this.validateWithNalog(taxId);
      if (nalogResult.valid) {
        return nalogResult;
      }

      // Fallback to kartoteka.by API
      const kartotekaResult = await this.validateWithKartoteka(taxId);
      return kartotekaResult;
    } catch (error) {
      this.logger.error(`Tax ID validation failed: ${error.message}`);
      return {
        valid: false,
        error: 'Tax ID validation service unavailable',
      };
    }
  }

  private async validateWithNalog(taxId: string): Promise<TaxValidationResult> {
    try {
      const response = await axios.get(
        `http://grp.nalog.gov.by/api/grp-public/data?unp=${taxId}&charset=UTF-8&type=json`,
        {
          headers: {
            // 'Authorization': `Bearer ${process.env.NALOG_API_KEY}`,
            'Content-Type': 'application/json',
          },
          timeout: 5000,
        }
      );

      this.logger.log(response.data);

      if (response?.data?.row?.vunp === taxId) {
        const { vaddress,vnaimp } = response.data.row;
        return {
          valid: true,
          shortName: vnaimp,
          fullName: vnaimp,
          address: vaddress,
        };
      }

      return { valid: false };
    } catch (error) {
      this.logger.warn(`Nalog API validation failed: ${error.message}`);
      return { valid: false };
    }
  }

  private async validateWithKartoteka(taxId: string): Promise<TaxValidationResult> {
    try {
      const response = await axios.get(
        `https://api.kartoteka.by/company/${taxId}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.KARTOTEKA_API_KEY}`,
          },
          timeout: 5000,
        }
      );

      if (response.data && response.data.active) {
        return {
          valid: true,
          shortName: response.data.name,
          fullName: response.data.fullName,
          address: response.data.address,
        };
      }

      return { valid: false };
    } catch (error) {
      this.logger.warn(`Kartoteka API validation failed: ${error.message}`);
      return { valid: false };
    }
  }
} 