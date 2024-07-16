import {Request, Response} from 'express';
import {registrationService} from '../services/register_service';
import { validate } from '@eggseed/server';
import { EnrollmentSchema, RegistrationSchema } from '../schema/register_schema';

export class EnrollmentController {
  static addEnrollement = async (req: Request, res: Response) => {
    try {
     
      const enrollment = await registrationService.addEnrollement(validate(EnrollmentSchema, req.body));

      res.status(201).send(enrollment);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };


  static addRegistration = async (req: Request, res: Response) => {
    try {
     
      const registration = await registrationService.register(validate(RegistrationSchema, req.body));

      res.status(201).send(registration);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };
}
