import {RouterFactory, errorHandler, firebaseAdmin} from '@eggseed/server';
import {InovtechRoutes} from './routes';
import { EnrollmentController } from './Register/controllers/register_controller';



const v1SecureRouter = RouterFactory.secure(firebaseAdmin);
const v1PublicRouter = RouterFactory.public();



v1PublicRouter.post(InovtechRoutes.addEnrollement, EnrollmentController.addEnrollement)
v1PublicRouter.post(InovtechRoutes.registration, EnrollmentController.addRegistration)

v1SecureRouter.use(errorHandler);
v1PublicRouter.use(errorHandler);

export {v1SecureRouter, v1PublicRouter};
