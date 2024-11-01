import { Injectable } from '@nestjs/common';
import { Mail, MailType, Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma.service';
import DataMessage from './types/message';

@Injectable()
export class MailService {
  constructor(private prisma: PrismaService) {}

  async getMailByIdUser({ where }: { where: Prisma.MailWhereInput; }): Promise<Mail[] | null> {
    return await this.prisma.mail.findMany({ where });
  }

  async sendMail(content: DataMessage, type: string) {
    //implement method
  }

  async persistNotification(content: DataMessage, type: MailType) {
    const data = {
      idUser: content.idUser,
      mailDestination: this.getDestination(content.idUser),
      mailContent: this.makeContent(content.orderNumber, content.orderValue),
      mailType: type,
    };

    await this.prisma.mail.create({
      data: { ...data },
    });
  }

  getDestination(idUser: string) {
    switch (idUser) {
      case '10':
        return 'user@teste.com.br';

      default:
        return 'default@teste.com.br';
    }
  }

  makeContent(orderNumber: number, orderValue: number) {
    return `Número do pedido: ${orderNumber.toString()} /n/n
      Valor do pedido: ${orderValue.toString()}
      `;
  }
}
