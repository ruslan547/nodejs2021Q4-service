import { UpdateBoardDto } from '../resources/boards/dto/update-board.dto';
import { UpdateTaskDto } from '../resources/task/dto/update-task.dto';
import { UpdateUserDto } from '../resources/users/dto/update-user.dto';

export type UpdateData = UpdateUserDto | UpdateBoardDto | UpdateTaskDto;

export class Updatable {
  update(data: UpdateData) {
    Object
      .entries(data)
      .forEach(([key, value]) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this[key] = value ?? this[key];
      });

    return this;
  }
}
