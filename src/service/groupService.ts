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
};