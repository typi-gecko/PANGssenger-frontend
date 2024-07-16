declare module 'ambient' {
    declare global {
        namespace NodeJS {
            interface ProcessEnv {
                NEXT_PUBLIC_JWT_ACCESS_SECRET_KEY: string;
                NEXT_PUBLIC_JWT_ACCESS_EXPIRATION_TIME: string;
                NEXT_PUBLIC_JWT_REFRESH_SECRET_KEY: string;
                NEXT_PUBLIC_JWT_REFRESH_EXPIRATION_TIME: string;
            }
        }
    }
}