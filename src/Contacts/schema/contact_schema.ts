import * as joi from 'joi'

export const ContactSchema = joi.object({
    
  fullName: joi.string().required(),
  email: joi.string().email().required(),
  message:joi.string()
  
})