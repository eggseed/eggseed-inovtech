import {CustomerSupport, Pulse} from '@eggseed/server';
import {EgsContactInput} from '@eggseed/core';
import {ContactInput} from '../model/contact_model';
import {EmailNotification, Notification} from '@eggseed/notification';
import * as dotenv from 'dotenv';

dotenv.config();

export class ContactService {
  private appName?: string;

  private collectionPathNotification = 'notifications';
  private collectionPathContact = 'contacts';

  constructor(appName?: string) {
    this.appName = appName;
  }

  async saveContact(data: EgsContactInput): Promise<any> {
    try {
      const customerSupport = new CustomerSupport();

      const contact = await customerSupport.addContact(data, {
        collectionPath: this.collectionPathContact,
        appName: this.appName,
      });

      await this.sendEmail(data);
      return contact;
    } catch (error) {
      console.log(error);
    }
  }

  async getOrganization(): Promise<any> {
    try {
      const environnmentId = process.env.ENVIRONMENT_ID || '';
      const base_url = process.env.BASE_URL || '';
      const client_id = process.env.CLIENT_ID || '';
      const client_secret = process.env.CLIENT_SECRET || '';

      const pulse = await new Pulse({
        BASE_URL: base_url,
        CLIENT_ID: client_id,
        CLIENT_SECRET: client_secret,
      });
      const org = await pulse.getOrganization(environnmentId);

      const company = {
        address: org.organization.address,
        email: org.organization.email,
        logo: org.organization.lcompanyLgo,
        name: org.organization.name,
        phoneNumber: org.organization.phoneNumber,
      };

      return company;
    } catch (error) {
      console.log(error);
    }
  }

  async sendEmail(data: ContactInput) {
    try {
      const contact = {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        project: data.project,
        message: data.message,
      };

      const organization = await this.getOrganization();

      const preferences = {
        emailEnabled: true,
        smsEnabled: false,
        pushEnabled: false,
      };

      const notification = new Notification();

      await notification.send({
        to: {email: 'hello@eggseed.com'},
        from: contact.email,
        data: {
          title: `Lounge Inquiry`,
          message: `${contact.name} has sent an enquiry`,
        },
        emailOptions: {
          template: 'eggseed-inquiry',
          from: contact.email,
          variables: {
            CurrentYear: new Date().getFullYear(),
            company: JSON.parse(process.env.COMPANY_INFO as string),

            contact,
            color: '#ffffff',
            background: '#070707',
          },
        },
        preference: preferences,
      });

      console.log('kk', contact);
      console.log('email sent');
    } catch (error) {
      console.error('Error while sending  email:', error);
    }
  }
}

export const contactService = new ContactService();
