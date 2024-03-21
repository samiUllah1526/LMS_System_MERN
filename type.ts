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

*/