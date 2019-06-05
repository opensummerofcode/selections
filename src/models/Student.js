import { db } from '../firebase';

class Student {
  constructor(student) {
    Object.keys(student).forEach((prop) => {
      this[prop] = student[prop];
    });
    this.id = student.response_id;
  }

  yes = () => db.collection('students').doc(this.id).update({ status: 'yes' });

  maybe = () => db.collection('students').doc(this.id).update({ status: 'maybe' });

  no = () => db.collection('students').doc(this.id).update({ status: 'no' });

  confirm = () => db.collection('students').doc(this.id).update({ confirmed: true });

  createOrUpdateSuggestion = async (user, exists, status) => {
    if (!exists) db.collection('suggestions').doc(this.id).set({ [user.displayName]: status });
    else db.collection('suggestions').doc(this.id).update({ [user.displayName]: status });
  };

  suggestYes = (user, exists) => this.createOrUpdateSuggestion(user, exists, 'yes');

  suggestNo = (user, exists) => this.createOrUpdateSuggestion(user, exists, 'no');

  suggestMaybe = (user, exists) => this.createOrUpdateSuggestion(user, exists, 'maybe');

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
    return this.answer('Eypr9GFkWVwP').text;
  }

  get whyGoodFit() {
    return this.answer('bQ8Oj62a9kd6').text;
  }

  get bestSkills() {
    return this.answer('Z6UAQVVuBk5M').text;
  }

  get learnOrDoBetter() {
    return this.answer('tuH5vMRFyedb').text;
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
