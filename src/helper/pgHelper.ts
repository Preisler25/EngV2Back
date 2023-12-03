import { Client } from 'ts-postgres';
import { dbConfig } from '../config/pgConfig';

const connectToDB = async (): Promise<Client> =>{
    const client = new Client({
        host: dbConfig.host,
        port: dbConfig.port,
        database: dbConfig.database,
        user: dbConfig.user,
        password: dbConfig.password
    });

    await client.connect();

    return client;
}

const disconnectFromDB = async (client: Client) => {
    await client.end();
    return;
}

const q = async (client: Client, query: string) => {
    let res = await client.query(query);
    return res;
}

export {
    connectToDB,
    disconnectFromDB,
    q
};