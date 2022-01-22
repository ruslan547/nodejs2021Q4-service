export type UpdateData = Record<string, string>;

export class Updatable {
  update(data: UpdateData) {
    Object
      .entries(data)
      .forEach(([key, value]) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this[key] = value;
      });

    return this;
  }
}
