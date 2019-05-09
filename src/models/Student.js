class Student {
  constructor(student) {
    Object.keys(student).forEach((prop) => {
      this[prop] = student[prop];
    });
    this.id = student.response_id;
  }

  capitalizeName = name => name.split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

  get firstName() {
    const name = this.answers[0].text.trim().toLowerCase();
    return this.capitalizeName(name);
  }

  get lastName() {
    const name = this.answers[1].text.trim().toLowerCase();
    return this.capitalizeName(name);
  }
}

export default Student;
