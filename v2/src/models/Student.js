class Student {
  constructor(student) {
    Object.keys(student).forEach((prop) => {
      this[prop] = student[prop];
    });
    this.id = student.id;
  }

  getField(key, other = false) {
    if (typeof this[key] === 'object' && this[key] !== null) {
      if (other) return this[key].other;
      return this[key].answer;
    }
    return this[key];
  }

  // Personal details
  get firstName() {
    return this.getField('firstName');
  }

  get lastName() {
    return this.getField('firstName');
  }

  get email() {
    return this.getField('email');
  }

  get phone() {
    return this.getField('phone');
  }

  get gender() {
    return this.getField('gender') || this.getField('gender', true);
  }

  get firstLanguage() {
    return this.getField('firstLanguage');
  }

  get levelOfEnglish() {
    return this.getField('levelOfEnglish');
  }

  // academia
  get nameOfSchool() {
    const school = this.getField('school');
    return school.includes('* My school is not') ? this.getField('otherSchool') : school;
  }

  get fieldOfStudy() {
    const studies = this.getField('fieldOfStudy') || [];
    const other = this.getField('fieldOfStudy');
    if (other) studies.push(other);
    return studies;
  }

  get typeOfDegree() {
    return this.getField('typeOfDegree') || this.getField('typeOfDegree', true);
  }

  get yearIntoDegree() {
    return this.getField('typeOfDegree') || this.getField('typeOfDegree', true);
  }

  // experience
  get isAlum() {
    return this.getField('alum').includes('Yes,');
  }

  get wantsToCoach() {
    return this.getField('alum').includes('Yes, but');
  }

  get cv() {
    return this.getField('cv');
  }

  get portfolio() {
    return this.getField('portfolio');
  }

  get projectMostProud() {
    return this.getField('mostProud');
  }

  // motivation
  get whyOsoc() {
    return this.getField('whyOsoc');
  }

  get whyGoodFit() {
    return this.getField('whyGoodFit');
  }

  get wantsToLearn() {
    return this.getField('whatToLearn');
  }

  get whatSkills() {
    return this.getField('whatSkills');
  }

  get applyingForRoles() {
    const applyingFor = this.getField('applyingForRoles') || [];
    const other = this.getField('fieldOfStudy');
    if (other) applyingFor.push(other);
    return applyingFor;
  }

  // practical
  get canWorkUnderBelgianAgreement() {
    return this.getField('canWorkUnderEmploymentAgreement');
  }

  get canWorkDuringHours() {
    return this.getField('canWorkDuringHours');
  }

  get hasLaptop() {
    return this.getField('ownLaptop').includes('Yes');
  }

  // socials
  get linkedin() {
    return this.getField('linkedin');
  }

  get github() {
    return this.getField('github');
  }

  get twitter() {
    return this.getField('twitter');
  }

  // rest
  get anythingElseToShare() {
    return this.getField('anythingElse');
  }
}

export default Student;
