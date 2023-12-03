interface DBConfig {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
}

const dbConfig: DBConfig = {
    host: process.env.DB_HOST || 'eng-db-1',
    port: parseInt(process.env.DB_PORT || '5432'),

    database: process.env.POSTGRES_DB || 'eng',
    user: process.env.POSTGRES_USER || 'Preisler',
    password: process.env.POSTGRES_PASSWORD || 'Szives25'
};

export {
    dbConfig,
};