import { db } from '../firebase';

class Project {
  constructor(id, project) {
    Object.keys(project).forEach((prop) => {
      this[prop] = project[prop];
    });
    this.id = id;
    if (!this.assignedStudents) return [];
  }

  assign = student => db.collection('projects').doc(this.id).update({
    assignedStudents: [...this.assignedStudents, student.id]
  });

  unassign = (studentId) => {
    const assignedStudents = [...this.assignedStudents];
    const index = assignedStudents.indexOf(studentId);
    if (index) assignedStudents.splice(index, 1);
    return db.collection('projects').doc(this.id).update({ assignedStudents });
  }
}

export default Project;
