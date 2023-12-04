import { Group } from '../model/group';
import { q, connectToDB, disconnectFromDB } from '../helper/pgHelper';
import { Word } from '../model/word';
import { Value } from 'ts-postgres';

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
                console.log(g);
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

    convertToWordList = (text: string, g_id: any): Word[] => {
        const list: Word[] = [];
        const words = text.split('\n');
        const id = Number(g_id);

        words.forEach(word => {
            const w = word.split(':');
            list.push({
                word: w[0],
                translation: w[1],
                group_id: id,
            });
        });
        return list;
    }

    createGroup = (name: string, key: string, text: string): string => {
        const res = new Promise<Group>(async () => {
            try {
                const client = await connectToDB();
                const res = await q(client, `INSERT INTO groups (g_name, g_key) VALUES ('${name}', '${key}') RETURNING g_id`);
                
                const words: Word[] = this.convertToWordList(text, res.rows[0]);
                await disconnectFromDB(client);
                this.addWords(words);
                return "OK";
            } catch (error) {
                return error;
            }
        });
        return "OK";
    }

    addWords = (words: Word[]) => {
        const res = new Promise<Group>(async () => {
            try {
                const client = await connectToDB();
                words.forEach(async (word) => {
                    await q(client, `INSERT INTO words (word, translation, g_id) VALUES ('${word.word}', '${word.translation}', ${word.group_id})`);
                });
                await disconnectFromDB(client);
                return "OK";
            } catch (error) {
                return error;
            }
        });
        return "OK";
    }
};