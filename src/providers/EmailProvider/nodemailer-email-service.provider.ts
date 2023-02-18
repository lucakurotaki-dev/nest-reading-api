import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  IEmailService,
  ISendRecoveryPasswordEmailDTO,
} from './email-service.model';
import nodemailer from 'nodemailer';
import { IEmailConfig } from 'src/configurations/emailConfig';

@Injectable()
export class NodeMailerEmailService implements IEmailService {
  constructor(private readonly configService: ConfigService) {}

  async sendRecoveryPasswordEmail({
    to,
    token,
  }: ISendRecoveryPasswordEmailDTO) {
    const tranport = nodemailer.createTransport(
      this.configService.get<IEmailConfig>('email').smtp,
    );

    const message = {
      from: this.configService.get<IEmailConfig>('email').from,
      to,
      subject: 'Recovery Password',
      text: `${token}`,
    };

    tranport.sendMail(message, (err) => {
      if (err) throw new InternalServerErrorException(err);
    });
  }
}
