declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: string;
        ORIGIN: string;
        CLOUDINARY_API_KEY: string;
        CLOUDINARY_SECRET: string;
        CLOUDINARY_NAME: string;
        DB_URI: string;
        NODE_ENV: 'DEVELOPMENT' | 'PRODUCTION';
        REDIS_URL: string;
        ACTIVATION_TOKEN_SECRET: string;
        ACTIVATION_TOKEN_EXPIRY: string;
        SMTP_EMAIL_SERVICE_NAME: string;
        SMTP_EMAIL_SERVICE_USERNAME: string;
        SMTP_EMAIL_SERVICE_PASSWORD: string;
        SYTEM_GENERATED_SENDER_EMAIL: string;
    }
}

/*
Zode expample for env
Zod will ensure the environment variables you defined match the schema and it will remove 
from the final object any environment variable not defined in the schema. 
This way your app can't read any other environment variable you didn't explicitly defined.

import { z } from "zod";

let envSchema = z.object({                                     
  GITHUB_CLIENT_ID: z.string().nonempty(),
  GITHUB_CLIENT_SECRET: z.string().nonempty(),
  STRIPE_API_KEY: z.string().nonempty(),
});
let env = envSchema.parse(process.env);

mongo --username YOUR_USERNAME_HERE --password YOUR_PASSWORD_HERE
mongo --username lms_mogo_db --password lms_mogo_db
mongodb://lms_mogo_db:lms_mogo_db@0.0.0.0:27017/


docker exec -it lms_mogo_db bash
*/

// docker run
// -d
// --name lms_mogo_db
// -p 27017:27017
// -e lms_mogo_db=lms_mogo_db
// -e lms_mogo_db=lms_mogo_db
// mongo

// docker run
// / -d
// / --name lms_mogo_db
// / -p 27017:27017
// / -e lms_mogo_db=lms_mogo_db
// / -e lms_mogo_db=lms_mogo_db
// / mongo

// docker exec -it lms_mogo_db mongo --username lms_mogo_db --password lms_mogo_db
// docker exec -it some-mongo mongo --username mongoadmin --password secret



/*
mongodb://localhost:27017

docker run -d \
--name lms_mogo_db \
-p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
-e MONGO_INITDB_ROOT_PASSWORD=secret \
-v mongo_vol:/data/db \
mongo
*/

// docker run -it --rm --network some-network mongo \
// 	mongosh --host some-mongo \
// 		-u mongoadmin \
// 		-p secret \
// 		--authenticationDatabase admin \
// 		some-db
