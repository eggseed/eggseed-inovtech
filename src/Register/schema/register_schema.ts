import * as joi from 'joi'

export const EnrollmentSchema = joi.object({
    
  parantFirstName: joi.string().required(),
  parantLastName: joi.string().required(),
  email: joi.string().email().required(),
  contact: joi.string().required(),
  studentFirstName: joi.string().required(),
  studentLastName: joi.string().required(),
  studentGender: joi.string().required(),
  stundentAge: joi.number().required(),
  nameOfSchool:joi.string().required(),
  studentClass:joi.string().required(),
  specialNeeds:joi.string().required(),
  needType:joi.string(),
 
  
})


export const RegistrationSchema = joi.object({
    
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  contact: joi.string().required(),
 organizationName: joi.string().required(),
  location: joi.string().required(),
  reqion: joi.string().required(),
  participantsNumber: joi.number().required(),
  startDate:joi.date().required(),
  electricityAccess:joi.boolean().required(),
  laptopAccess:joi.boolean().required(),
  projectorAccess:joi.boolean().required(),
  accommodationAvailable:joi.boolean().required(),
 
 
  
})