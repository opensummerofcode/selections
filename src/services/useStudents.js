import { useState, useEffect } from 'react';
import { db } from '@/firebase';
import { Student } from '@/models';

export default function useStudents() {
  const [students, setStudents] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db.collection('students').onSnapshot((snapshot) => {
      const data = snapshot.docChanges();
      const newStudents = {};
      data.forEach((change) => {
        const updated = change.doc.data();
        const student = new Student(updated);
        newStudents[student.id] = student;
      });
      setStudents({ ...students, ...newStudents });
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { students, isLoading };
}
