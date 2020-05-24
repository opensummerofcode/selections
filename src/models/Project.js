import { db } from '../firebase';

class Project {
  constructor(project) {
    Object.keys(project).forEach((prop) => {
      this[prop] = project[prop];
    });
    this.id = project.id;
    if (!this.assignedStudents) this.assignedStudents = [];
  }

  startAssigning = (student) => {
    this.isBeingAssignedTo = student;
  };

  assign = (student) => {
    if (this.assignedStudents.includes(student.id))
      throw new Error(`${student.firstName} is already on this team`);
    return db
      .collection('projects')
      .doc(this.id)
      .update({
        assignedStudents: [...this.assignedStudents, student.id]
      });
  };

  unassign = (studentId) => {
    const assignedStudents = [...this.assignedStudents];
    const index = assignedStudents.indexOf(studentId);
    if (index !== -1) assignedStudents.splice(index, 1);
    return db.collection('projects').doc(this.id).update({ assignedStudents });
  };
}

export default Project;
