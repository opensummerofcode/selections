class Student {
  constructor(user) {
    Object.keys(user).forEach((prop) => {
      this[prop] = user[prop];
    });
  }
}

export default Student;
