import { db } from '../firebase';

class Project {
  constructor(id, project) {
    Object.keys(project).forEach((prop) => {
      this[prop] = project[prop];
    });
    this.id = id;
  }
}

export default Project;
