export type UpdateData = Record<string, string>;

export class Updatable {
  field = '';

  update(data: UpdateData) {
    Object
      .entries(data)
      .forEach(([key, value]) => {
        this[key as 'field'] = value;
      });

    return this;
  }
}
