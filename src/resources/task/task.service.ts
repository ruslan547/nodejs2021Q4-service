import { UpdateData } from "../../common/entity/updatable";
import * as tasksRepo from "./task.memory.repository";
import { TaskOption } from "./task.model";

export const getAll = (boardId: string) => tasksRepo.getAll(boardId);

export const getById = (id: string) => tasksRepo.getById(id);

export const create = (boardId: string, body: TaskOption) => tasksRepo.create(boardId, body);

export const update = (id: string, data: UpdateData) => tasksRepo.update(id, data);

export const deleteById = (id: string) => tasksRepo.deleteById(id);
