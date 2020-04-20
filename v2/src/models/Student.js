class Student {
  constructor(student) {
    Object.keys(student).forEach((prop) => {
      this[prop] = student[prop];
    });
    this.id = student.id;
  }

  getField(key) {
    if (typeof this[key] === 'object' && this[key] !== null) {
      return this[key].answer;
    }
    return this[key];
  }

  get isAlum() {
    return this.getField('alum').includes('Yes,');
  }
}

export default Student;
