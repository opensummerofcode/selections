import { db, storage } from '../firebase';

const parseField = (value, other = false) => {
  if (typeof value === 'object' && value !== null) {
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

const parseRoles = (value) => {
  const applyingFor = parseField(value) || [];
  const other = parseField(value, true);
  if (other) applyingFor.push(other);
  return applyingFor;
};

const parseHasLaptop = (value) => {
  return parseField(value).includes('Yes');
};

const getCV = (value) => storage.ref().child(`cv/${value}`).getDownloadURL();

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
      else if (prop === 'applyingForRoles') {
        this[prop] = parseRoles(value);
        this.hasOtherRole = !!parseField(value, true);
      } else if (prop === 'ownLaptop') this.hasLaptop = parseHasLaptop(value);
      else if (prop === 'cv') this.setCV(value);
      else this[prop] = parseField(value);
    });
    this.id = student.id;
  }

  setCV(value) {
    getCV(value)
      .then((url) => {
        this.cv = url;
      })
      .catch((err) => {
        if (err.code === 'storage/object-not-found') this.cv = null;
        // eslint-disable-next-line no-console
        else console.error(err);
      });
  }

  get isAlum() {
    return parseField(this.alum).includes('Yes,');
  }

  get wantsToCoach() {
    return !parseField(this.alum).includes('Yes, but');
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
