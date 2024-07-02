import {RouterFactory, errorHandler, firebaseAdmin} from '@eggseed/server';

import {EntitiesFactory} from './factory';
import {InovtechRoutes} from './routes';



const v1SecureRouter = RouterFactory.secure(firebaseAdmin);
const v1PublicRouter = RouterFactory.public();

// /**
//  * A route to handle adding of menu
//  *
//  */



v1SecureRouter.use(errorHandler);
v1PublicRouter.use(errorHandler);

export {v1SecureRouter, v1PublicRouter};
