import {
  EggseedServer,
  FirebaseEnvKeys,
  EggseedLegacyKeys,
  MailGunEnvKeys,
} from '@eggseed/server';

const requiredEnvVars = [FirebaseEnvKeys, MailGunEnvKeys];

import {v1PublicRouter, v1SecureRouter} from './router';

const server = new EggseedServer();
// const requiredEnvVars = [
//   FirebaseEnvKeys
// ];
const app = server.init(requiredEnvVars);

//app.use(`${server.baseUrl}`, v1SecureRouter, v1PublicRouter)

app.use('/api/v1', v1PublicRouter);
app.use('/api/v1', v1SecureRouter);

export default app;
