type UpdateData = Record<string, string>;

export class Updatable {
  update(data: UpdateData) {
    Object
      .entries(data)
      .forEach(([key, value])=> {
        //@ts-ignore
        this[key] = value;
      });

    return this;
  }
}
