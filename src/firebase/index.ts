import {error} from 'console';
import {configureEnv} from '../configure_env';
import {firebaseAdmin as admin, initializeAdmin} from '@eggseed/server';

configureEnv();
initializeAdmin();

export type UserRecord = admin.auth.UserRecord;

//configure db
const db = admin.firestore();

const settings = {timestampsInSnapshots: true};
db.settings(settings);

const SERVER_TIME = admin.firestore.FieldValue.serverTimestamp();

export {db, SERVER_TIME};

export function createAuthUser(
  data: admin.auth.CreateRequest
): Promise<UserRecord> {
  return admin.auth().createUser(data);
}

export async function findOrCreateAuthUser(
  data: admin.auth.CreateRequest
): Promise<UserRecord> {
  try {
    if (!data.email || !data.phoneNumber)
      throw new Error('email or phoneNumber is required');
    const user = await (data.email
      ? admin.auth().getUserByEmail(data.email)
      : admin.auth().getUserByPhoneNumber(data.phoneNumber));
    return user;
  } catch (err: any) {
    if (err.code === 'auth/user-not-found') {
      const newUser = await createAuthUser(data);
      return newUser;
    }
    throw error;
  }
}

export default admin;
