import {CustomerSupport, Pulse} from '@eggseed/server';
import {EgsContactInput} from '@eggseed/core';

import * as dotenv from 'dotenv';
import { Enrollment } from '../model/register_model';

dotenv.config();

export class RegistrationService {
  private appName?: string;

  private collectionPathRegistration = 'registration';
  private collectionPathEnrollment = 'enrollment';

  constructor(appName?: string) {
    this.appName = appName;
  }

  async addEnrollement(data: Enrollment): Promise<any> {
    try {
      

      
      return 
    } catch (error) {
      console.log(error);
    }
  }

  
}

export const registrationService = new RegistrationService();
