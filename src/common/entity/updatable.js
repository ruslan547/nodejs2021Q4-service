class Updatable {
  update(data) {
    Object
      .entries(data)
      .forEach(([key, value]) => {
        this[key] = value;
      });

    return this;
  }
}

module.exports = {
  Updatable
}
