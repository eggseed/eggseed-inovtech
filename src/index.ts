import * as functions from 'firebase-functions';
const expressOasGenerator = require('express-oas-generator');
import * as dotenv from 'dotenv';

import app from './app';
import {v1PublicRouter} from './router';

dotenv.config();

expressOasGenerator.handleResponses(app);
app.listen(process.env.PORT || 7080, () => {
  console.log(`Server Listening on ${process.env.PORT || 7080}.`);

  expressOasGenerator.init(
    app,
    (spec: any) => {
      spec.info = {
        title: 'INOVTECH API Documentation',
        termsOfService: 'http://eggseed.com/terms/',
        contact: {
          name: 'API Support',
          url: 'http://www.eggseed.com',
          email: 'support@eggseed.com',
        },
        description: 'API Documentation for INOVTECH',
      };
      // spec.host = 'localhost:9098';  //localhost
      spec.host = '';
      spec.schemes = ['http', 'https'];

      spec.securityDefinitions = {
        bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
          description: 'JWT Authorization header using the Bearer scheme',
        },
      };

      spec.security = [
        {
          bearerAuth: [],
        },
      ];

      // Define parameters for different POST requests
      if (spec.paths['/api/v1/contact']) {
        spec.paths['/api/v1/contact'].post.parameters = [
          {
            name: 'body',
            in: 'body',
            description: 'The request body for contact',
            required: true,
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'name',
                },
                email: {
                  type: 'string',
                  description: 'email',
                },
                phoneNumber: {
                  type: 'string',
                  description: 'phone number',
                },
                message: {
                  type: 'string',
                  description: 'message',
                },
                // Add more fields as needed for route1
              },
            },
          },
        ];
      }

      if (spec.paths['/api/v1/enroll']) {
        spec.paths['/api/v1/reservations'].post.parameters = [
          {
            name: 'body',
            in: 'body',
            description: 'The request body for reservations',
            required: true,
            schema: {
              type: 'object',
              properties: {
                fullName: {
                  type: 'string',
                  description: 'Full Name',
                },
                email: {
                  type: 'string',
                  format: 'email',
                  description: 'Email',
                },
                phoneNumber: {
                  type: 'string',
                  description: 'Phone Number',
                },
                date: {
                  type: 'string',
                  format: 'date',
                  description: 'Date',
                },
                timeIn: {
                  type: 'string',
                  format: 'time',
                  description: 'Time In',
                },
                timeOut: {
                  type: 'string',
                  format: 'time',
                  description: 'Time Out',
                },
                numberOfGuest: {
                  type: 'integer',
                  description: 'Number of Guests',
                },
                occasion: {
                  type: 'string',
                  description: 'Occasion',
                },
                message: {
                  type: 'string',
                  description: 'Message',
                },
                tables: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  description: 'Tables',
                },
                // Add more fields specific to route2 if needed
              },
            },
          },
        ];
      }

      // Add more conditions for other routes if needed

      return spec;
    },
    '/swagger.json',
    60 * 1000,
    'api-docs',
    '',
    [
      
      'contact',
    ,
    ],
    ['production'],
    true
  );
  console.log(`Open http://localhost:${process.env.PORT || 7080}/api-docs/`);
});

app.use('/api/v1', v1PublicRouter);

expressOasGenerator.handleRequests();
