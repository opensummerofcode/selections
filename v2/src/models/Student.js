class Student {
  constructor(student) {
    Object.keys(student).forEach((prop) => {
      this[prop] = student[prop];
    });
    this.id = student.id;
  }
}

export default Student;
