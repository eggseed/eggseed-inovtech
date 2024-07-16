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
      if (spec.paths['/api/v1/register']) {
        spec.paths['/api/v1/register'].post.parameters = [
          {
            name: 'body',
            in: 'body',
            description: 'The request body for registration',
            required: true,
            schema: {
              type: 'object',
              properties: {
                firstName: {
                  type: 'string',
                  description: 'First name of the registrant',
                },
                lastName: {
                  type: 'string',
                  description: 'Last name of the registrant',
                },
                email: {
                  type: 'string',
                  description: 'Email address of the registrant',
                },
                contact: {
                  type: 'string',
                  description: 'Contact number of the registrant',
                },
                organizationName: {
                  type: 'string',
                  description: 'Name of the organization',
                },
                location: {
                  type: 'string',
                  description: 'Location of the event',
                },
                region: {
                  type: 'string',
                  description: 'Region of the event',
                },
                participantsNumber: {
                  type: 'integer',
                  description: 'Number of participants',
                },
                startDate: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Start date of the event',
                },
                electricityAccess: {
                  type: 'boolean',
                  description: 'Whether electricity access is available',
                },
                laptopAccess: {
                  type: 'boolean',
                  description: 'Whether laptop access is available',
                },
                projectorAccess: {
                  type: 'boolean',
                  description: 'Whether projector access is available',
                },
                accommodationAvailable: {
                  type: 'boolean',
                  description: 'Whether accommodation is available',
                },
              },
            },
          },
        ];
      }

      if (spec.paths['/api/v1/enroll']) {
        spec.paths['/api/v1/enroll'].post.parameters = [
          {
            name: 'body',
            in: 'body',
            description: 'The request body for reservations',
            required: true,
            schema: {
              type: 'object',
              properties: {
                parentFirstName: {
                  type: 'string',
                  description: 'First Name',
                },

                parentLastName: {
                  type: 'string',
                  description: 'Last Name',
                },
                email: {
                  type: 'string',
                  format: 'email',
                  description: 'Email',
                },
                contact: {
                  type: 'string',
                  description: 'contact',
                },

                studentFirstName: {
                  type: 'string',
                  description: 'First Name',
                },

               studentLastName: {
                  type: 'string',
                  description: 'Last Name',
                },
                

                studentGender: {
                  type: 'string',
                  description: 'Gender',
                },

                studentAge: {
                  type: 'number',
                  description: 'Age',
                },

                nameOfSchool: {
                  type: 'string',
                  description: 'Name of school',
                },

                studentClass: {
                  type: 'string',
                  description: 'Class',
                },

                specialNeeds: {
                  type: 'string',
                  description: 'Special needs',
                },

                needType: {
                  type: 'string',
                  description: ' needs type',
                },
                
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
