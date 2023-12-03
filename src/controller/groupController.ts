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
};