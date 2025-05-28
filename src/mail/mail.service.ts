import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "../users/schemas/user.schema";


@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendMail(user: User) {
    const url = `${process.env.API_HOST}/api/users/activate/${user.activationLink}`;
    console.log(url);
    const currentYear = new Date().getFullYear()
    await this.mailerService.sendMail({
      to: user.email,
      subject: "Welcome to Modo!",
      template: "./confirmation",
      context: {
        name: user.firstName,
        url,
        currentYear
      },
    });
  }
}
