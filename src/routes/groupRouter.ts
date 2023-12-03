import { GroupController } from '../controller/groupController';
import express from 'express';

const routerGroup = express.Router();
const groupController = new GroupController();

routerGroup.get('/group/:id', groupController.getGroupById);
routerGroup.get('/groupAll', groupController.getAllGroup);

export default routerGroup;