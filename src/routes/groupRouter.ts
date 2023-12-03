import { GroupController } from '../controller/groupController';
import express from 'express';

const routerGroup = express.Router();
const groupController = new GroupController();

routerGroup.get('/group', groupController.getGroupById);

export default routerGroup;