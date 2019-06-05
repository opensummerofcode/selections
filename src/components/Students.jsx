import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Pane, Button } from 'evergreen-ui';
import { db } from '../firebase';
import StudentDetail from './StudentDetail';
import AuthContext from '../context/auth';
import Student from '../models/Student';

const Students = ({ history }) => {
  const [selectedStudent, selectStudent] = useState(null);
  const [students, setStudents] = useState({});
  const [suggestions, setSuggestions] = useState({});

  const { user } = useContext(AuthContext);

  useEffect(() => {
    db.collection('students').get().then((snapshot) => {
      const gotStudents = {};
      snapshot.forEach((doc) => {
        const student = new Student(doc.data());
        gotStudents[student.id] = student;
        db.collection('students').doc(student.id).onSnapshot((update) => {
          if (!update.metadata.hasPendingWrites) return;
          const newStudent = new Student(update.data());
          setStudents(s => ({ ...s, [newStudent.id]: newStudent }));
        });
        db.collection('suggestions').doc(student.id).onSnapshot((update) => {
          if (!update.metadata.hasPendingWrites) return;
          const newSuggestion = update.data();
          setSuggestions(s => ({ ...s, [student.id]: newSuggestion }));
        });
      });
      setStudents(gotStudents);
    });
    db.collection('suggestions').get().then((snapshot) => {
      let gotSuggestions = {};
      snapshot.forEach((doc) => {
        const suggestion = doc.data();
        gotSuggestions = { ...gotSuggestions, [doc.id]: suggestion };
      });
      setSuggestions(gotSuggestions);
    });
  }, []);

  const select = () => selectedStudent.yes();
  const reject = () => selectedStudent.maybe();
  const maybeSelect = () => selectedStudent.no();

  const suggestYes = () => (
    selectedStudent.suggestYes(user, suggestions[selectedStudent.id])
  );

  const suggestMaybe = () => (
    selectedStudent.suggestMaybe(user, suggestions[selectedStudent.id])
  );

  const suggestNo = () => (
    selectedStudent.suggestNo(user, suggestions[selectedStudent.id])
  );

  const renderStudent = student => (
    <li key={student.id} className={`status--${student.status}`}>
      <button type="button" className="button--seamless" onClick={() => selectStudent(student)}>
        <Pane className="students__student" elevation={2}>
          {student.firstName} {student.lastName}
        </Pane>
      </button>
    </li>
  );

  const renderStudentDetail = () => {
    if (!selectedStudent) {
      return <p>Select a student from the list to display their information.</p>;
    }
    return (
      <StudentDetail student={selectedStudent} />
    );
  };

  const renderSuggestionsPerType = (type) => {
    const suggestionsForStudent = suggestions[selectedStudent.id];
    if (!suggestionsForStudent) return [];
    return Object.keys(suggestionsForStudent)
      .filter(person => suggestionsForStudent[person] === type)
      .map(person => <li key={`suggestion-${type}-${person}`}>{person}</li>);
  };

  const renderSuggestions = () => {
    if (!selectedStudent) return null;
    const types = ['yes', 'maybe', 'no'];
    const $suggestions = types.map((type) => {
      const $perType = renderSuggestionsPerType(type);
      const $result = $perType.length === 0 ? `No one has suggested "${type}" yet` : $perType;
      return (
        <article key={type}>
          <h4>{type}:</h4>
          <ul>
            {$result}
          </ul>
        </article>
      );
    });
    return (
      <div>
        <h3>Suggestions</h3>
        {$suggestions}
      </div>
    );
  };

  if (!user) return <p />;
  if (user.pending || !('pending' in user)) {
    history.push('/pending');
    return <p />;
  }

  const $students = Object.keys(students)
    .map(key => students[key])
    .sort((a, b) => {
      if (a.firstName < b.firstName) return -1;
      if (a.firstName > b.firstName) return 1;
      return 0;
    })
    .map(renderStudent);

  if ($students.length === 0) return <p />;

  const $studentDetail = renderStudentDetail();
  const $suggestions = renderSuggestions();

  return (
    <div className="container">
      <ol className="students">{$students}</ol>
      <main className="student-detail">
        {user && user.admin && selectedStudent && (
          <div className="student-detail__admin-actions">
            <Button onClick={select} appearance="primary" intent="success">Yes</Button>
            <Button onClick={reject} appearance="primary" intent="warning">Maybe</Button>
            <Button onClick={maybeSelect} appearance="primary" intent="danger">No</Button>
          </div>
        )}
        {user && !user.admin && selectedStudent && (
          <div className="student-detail__coach-actions">
            <Button onClick={suggestYes} appearance="primary" intent="success">Suggest yes</Button>
            <Button onClick={suggestMaybe} appearance="primary" intent="warning">Suggest maybe</Button>
            <Button onClick={suggestNo} appearance="primary" intent="danger">Suggest no</Button>
          </div>
        )}
        {$studentDetail}
        {$suggestions}
      </main>
    </div>
  );
};

Students.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line
  currentUser: PropTypes.object
};

export default withRouter(Students);
