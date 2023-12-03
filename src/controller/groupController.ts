import { Request, Response } from "express";
import { GroupService } from "../service/groupService";

const groupService = new GroupService();

export class GroupController {

    public async getGroupById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const group = await groupService.getGroupById(id);
            res.status(200).json(group);
        } catch (error) {
            console.error("Error connecting to the arduino", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    public async getAllGroup(req: Request, res: Response) {
        try {
            const group = await groupService.getAllGroup();
            res.status(200).json(group);
        } catch (error) {
            console.error("Error connecting to the arduino", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    public async createGroup(req: Request, res: Response) {
        try {
            const name = req.body.name;
            const key = req.body.key;
            const group = await groupService.createGroup(name, key);
            res.status(200).json(group);
        } catch (error) {
            console.error("Error connecting to the arduino", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    public async addWords(req: Request, res: Response) {
        try {
            const words = req.body.words;
            const translation = req.body.translation;
            const group_id = req.body.group_id;
            const group = await groupService.addWords(words, translation, group_id);
            res.status(200).json(group);
        } catch (error) {
            console.error("Error connecting to the arduino", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};