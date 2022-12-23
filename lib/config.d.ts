declare const config: {
    mongodb: {
        username: string | undefined;
        password: string | undefined;
        protocol: string | undefined;
        hostname: string | undefined;
        params: string | undefined;
        port: string | undefined;
        database: string | undefined;
        ssl: boolean;
        ca: string | undefined;
    };
    session: {
        secret: string;
        maxAge: number;
        collection: string;
        resave: boolean;
        saveUninitialized: boolean;
    };
    NODE_ENV: string | undefined;
};
export default config;
