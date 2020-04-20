const parseField = (value, other = false) => {
  if (typeof value === 'object' && value !== null) {
    if (other) return value.other;
    return value.answer;
  }
  return value;
};

const parseGender = (value) => parseField(value) || parseField(value, true);

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

class Student {
  constructor(student) {
    Object.keys(student).forEach((prop) => {
      const value = student[prop];
      if (prop === 'gender') this[prop] = parseGender(value);
      else if (prop === 'nameOfSchool') this.school = parseNameOfSchool(value, student.otherSchool);
      else if (prop === 'fieldOfStudy') this[prop] = parseFieldOfStudy(value);
      else if (prop === 'typeOfDegree') this[prop] = parseTypeOfDegree(value);
      else if (prop === 'applyingForRoles') this[prop] = parseRoles(value);
      else if (prop === 'ownLaptop') this.hasLaptop = parseHasLaptop(value);
      else this[prop] = parseField(value);
    });
    this.id = student.id;
  }

  get isAlum() {
    return parseField(this.alum).includes('Yes,');
  }

  get wantsToCoach() {
    return parseField(this.alum).includes('Yes, but');
  }
}

export default Student;
