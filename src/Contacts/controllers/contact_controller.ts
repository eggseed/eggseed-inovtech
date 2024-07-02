import {Request, Response} from 'express';
import {ContactService} from '../services/contact_service';

export class ContactController {
  addContact = async (req: Request, res: Response) => {
    try {
      const contactService = new ContactService();
      const contact = await contactService.saveContact(req.body);

      res.status(201).send(contact);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };
}
