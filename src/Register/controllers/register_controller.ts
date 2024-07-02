import {Request, Response} from 'express';
import {registrationService} from '../services/register_service';

export class EnrollmentController {
  addContact = async (req: Request, res: Response) => {
    try {
     
      const contact = await registrationService.addEnrollement(req.body);

      res.status(201).send(contact);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };
}
