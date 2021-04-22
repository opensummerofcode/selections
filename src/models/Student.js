import { db } from '../firebase';

const parseField = (value, other = false) => {
  if (typeof value === 'object' && value !== null && !!value.answer) {
    if (other) return value.other;
    return value.answer;
  }
  return value;
};

const parseGender = (value) => parseField(value) || parseField(value, true);
const parseFirstLanguage = (value) => parseField(value) || parseField(value, true);

const parseNameOfSchool = (school, otherSchool) => {
  const parsed = parseField(school);
  return parsed.includes('* My school is not') ? parseField(otherSchool) : parsed;
};

const parseFieldOfStudy = (value) => {
  const studies = parseField(value) || [];
  const other = parseField(value, true);
  if (other) studies.push(other);
  return studies;
};

const parseTypeOfDegree = (value) => parseField(value) || parseField(value, true);

const capitalizeName = (name) =>
  name
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

class Student {
  constructor(student) {
    Object.keys(student).forEach((prop) => {
      const value = student[prop];
      if (prop === 'gender') this[prop] = parseGender(value);
      else if (prop === 'firstName') this[prop] = capitalizeName(value);
      else if (prop === 'lastName') this[prop] = capitalizeName(value);
      else if (prop === 'firstLanguage') this[prop] = parseFirstLanguage(value);
      else if (prop === 'nameOfSchool') this.school = parseNameOfSchool(value, student.otherSchool);
      else if (prop === 'fieldOfStudy') this[prop] = parseFieldOfStudy(value);
      else if (prop === 'typeOfDegree') this[prop] = parseTypeOfDegree(value);
      else this[prop] = parseField(value);
    });
    this.id = student.response_id;
  }

  get isAlum() {
    return !parseField(this.alum).includes("No, it's");
  }

  get wantsToCoach() {
    return parseField(this.alum).includes("Yes, I'd");
  }

  createOrUpdateSuggestion = (userName, status, reason, exists) => {
    const updated = { [userName]: { status, reason } };
    if (!exists) return db.collection('suggestions').doc(this.id).set(updated);
    return db.collection('suggestions').doc(this.id).update(updated);
  };

  get statusType() {
    return this.status || 'no-status';
  }

  setStatus = (type) => {
    const status = type === 'no-status' ? null : type;
    db.collection('students').doc(this.id).update({ status });
  };

  toggleConfirmed = () => {
    const current = !!this.confirmed;
    db.collection('students').doc(this.id).update({ confirmed: !current });
  };
}

export default Student;
