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

  answer = id => this.answers.find(a => a.field.id === id);

  get firstName() {
    const name = this.answers[0].text.trim().toLowerCase();
    return this.capitalizeName(name);
  }

  get lastName() {
    const name = this.answers[1].text.trim().toLowerCase();
    return this.capitalizeName(name);
  }

  get motivation() {
    return this.answer('zDXa9I7QxAL8').text;
  }

  get whyGoodFit() {
    return this.answer('Eypr9GFkWVwP').text;
  }

  get bestSkills() {
    return this.answer('bQ8Oj62a9kd6').text;
  }

  get learnOrDoBetter() {
    return this.answer('Z6UAQVVuBk5M').text;
  }

  get roles() {
    return this.answer('VthTuvdWY5U0').choices.labels;
  }

  get prevParticipation() {
    return this.answer('natCygk0msUH').choice.label;
  }

  get CV() {
    return this.answer('Y4VaHVC3gqv6').url;
  }

  get portfolio() {
    return this.answer('GbbykEq5bD9Z').url;
  }
}

export default Student;
