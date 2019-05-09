class Student {
  constructor(student) {
    Object.keys(student).forEach((prop) => {
      this[prop] = student[prop];
    });
    this.id = student.response_id;
  }

  capitalizeName = name => name
    .split(' ')
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

  get motivation() {
    return this.answers[12].text;
  }

  get whyGoodFit() {
    return this.answers[13].text;
  }

  get bestSkills() {
    return this.answers[14].text;
  }

  get learnOrDoBetter() {
    return this.answers[15].text;
  }

  get roles() {
    return this.answers[22].choices.labels;
  }

  get prevParticipation() {
    return this.answers[21].choice.label;
  }

  get CV() {
    return this.answers[10].url;
  }

  get portfolio() {
    return this.answers[11].url;
  }
}

export default Student;
