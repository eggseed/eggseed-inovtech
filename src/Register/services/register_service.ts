import {CustomerSupport, DataSourceFactory, Pulse} from '@eggseed/server';
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


  private async dataSource() {
    return DataSourceFactory.dataSource({collectionPath: this.collectionPathEnrollment});
  } 

  private async registerDataSource() {
    return DataSourceFactory.dataSource({collectionPath: this.collectionPathRegistration});
  } 

  async addEnrollement(data: Enrollment): Promise<any> {
    try {
      
      const datasource = await this.dataSource();
      const enroll = await datasource.save(data)

     const response =  await this.findEnrollement(enroll.id)
      return response
     
    } catch (error) {
      console.log(error);
    }
  }

  async findEnrollement(id:string): Promise<any> {
    try {
      
      const datasource = await this.dataSource();
      const enroll = datasource.findById(id)
      return enroll
     
    } catch (error) {
      console.log(error);
    }
  }


  async register(data: Enrollment): Promise<any> {
    try {
      
      const datasource = await this.registerDataSource();
      const enroll = await datasource.save(data)

     const response =  await this.findRegistration(enroll.id)
      return response
     
    } catch (error) {
      console.log(error);
    }
  }

  async findRegistration(id:string): Promise<any> {
    try {
      
      const datasource = await this.registerDataSource();
      const enroll = datasource.findById(id)
      return enroll
     
    } catch (error) {
      console.log(error);
    }
  }

  
}

export const registrationService = new RegistrationService();
