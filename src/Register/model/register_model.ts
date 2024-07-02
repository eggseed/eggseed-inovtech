export interface Enrollment {
 
  parantFirstName: string,
  parantLastName: string,
  email: string,
  contact: string,
  studentFirstName: string,
  studentLastName: string,
  studentGender: string,
  stundentAge: string,
  nameOfSchool:string,
  studentClass:string,
  specialNeeds:string,
  needType:string,
}



export interface Registration {
  firstName: string,
  lastName: string,
  email: string,
  contact: string,
 organizationName: string,
  location: string,
  reqion: string,
  participantsNumber: number,
  startDate:Date,
  electricityAccess:boolean,
  laptopAccess:boolean,
  projectorAccess:boolean,
  accommodationAvailable:boolean,
}
