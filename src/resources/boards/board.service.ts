import { UpdateData } from '../../common/entity/updatable';
import * as boardsRepo from './board.memory.repository';
import { BoardOption } from './board.model';

export const getAll = () => boardsRepo.getAll();

export const getById = (id: string) => boardsRepo.getById(id);

export const create = (body: BoardOption) => boardsRepo.create(body);

export const update = (id: string, data: UpdateData) => boardsRepo.update(id, data);

export const deleteById = (id: string) => boardsRepo.deleteById(id);
