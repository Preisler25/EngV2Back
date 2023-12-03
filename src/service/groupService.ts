import { Group } from '../model/group';
import { q, connectToDB, disconnectFromDB } from '../helper/pgHelper';

export class GroupService {
    convertToGroup = (rows: any[]): Group => {
        const group: Group = {
            words: []
        };
        rows.forEach(row => {
            group.words.push({
                word: row.word,
                translation: row.translation,
                group_id: row.g_id,
            });
        });
        return group;
    }

    getGroupById = (id: number) => {
        const res = new Promise<Group>(async () => {
            try {
                const client = await connectToDB();
                const res = await q(client, `SELECT * FROM words WHERE g_id = ${id}`);
                await disconnectFromDB(client);

                const g = this.convertToGroup(res.rows);
                return g;
            } catch (error) {
                return error;
            }
        });
        console.log(res);
        return res;
    }

    getAllGroup = () => {
        const res = new Promise<Group[]>(async () => {
            try {
                const client = await connectToDB();
                const res = await q(client, `SELECT * FROM words Group BY g_id`);
                await disconnectFromDB(client);
                console.log(res.rows);
                const g = this.convertToGroup(res.rows);
                return g;
            } catch (error) {
                return error;
            }
        });
        console.log(res);
        return res;
    }

    createGroup = (name: string, key: string) => {
        const res = new Promise<Group>(async () => {
            try {
                const client = await connectToDB();
                await q(client, `INSERT INTO groups (g_name, g_key) VALUES ('${name}', '${key}')`);
                await disconnectFromDB(client);
                return;
            } catch (error) {
                return error;
            }
        });
        return res;
    }

    addWords = (words: string[], translations: string[], group_id: number) => {
        const res = new Promise<Group>(async () => {
            try {
                const client = await connectToDB();
                words.forEach(async (word, index) => {
                    await q(client, `INSERT INTO words (word, translation, g_id) VALUES ('${word}', '${translations[index]}', ${group_id})`);
                });
                await disconnectFromDB(client);
                return;
            } catch (error) {
                return error;
            }
        });
        return res;
    }
};