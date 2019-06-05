import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Pane, Button, toaster, SearchInput, Switch
} from 'evergreen-ui';
import { db } from '../firebase';
import StudentDetail from './StudentDetail';
import AuthContext from '../context/auth';
import Student from '../models/Student';

const Students = ({ history }) => {
  const [selectedStudent, selectStudent] = useState(null);
  const [students, setStudents] = useState({});
  const [suggestions, setSuggestions] = useState({});
  const [searchQuery, updateSearchQuery] = useState('');
  const [roleSwitches, setRoleSwitchState] = useState({
    'Front-end developer': true,
    'Back-end developer': true,
    'UX designer': true,
    'UI designer': true,
    'Graphic designer': true,
    'Business modeler': true,
    Storyteller: true,
    Marketer: true,
    Copywriter: true,
    'Video editor': true,
    Photographer: true,
    Other: true
  });
  const [filterStateIsInclusive, setFilteringState] = useState(true);

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
          selectStudent(newStudent);
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
  const confirm = () => {
    if (!selectedStudent.status) {
      return toaster.danger('A student must have a status before they can be confirmed');
    }
    return selectedStudent.confirm();
  };

  const suggestYes = () => (
    selectedStudent.suggestYes(user, suggestions[selectedStudent.id])
  );

  const suggestMaybe = () => (
    selectedStudent.suggestMaybe(user, suggestions[selectedStudent.id])
  );

  const suggestNo = () => (
    selectedStudent.suggestNo(user, suggestions[selectedStudent.id])
  );

  const countSuggestionsOfType = (studentId, type) => {
    const sug = suggestions[studentId];
    if (!sug) return 0;
    return Object.keys(sug).filter(person => sug[person] === type).length;
  };

  const toggleRoleSwitch = (value, role) => {
    setRoleSwitchState({ ...roleSwitches, [role]: value });
  };

  const selectAllRoles = () => {
    const switchStates = { ...roleSwitches };
    Object.keys(switchStates).forEach((role) => {
      switchStates[role] = true;
    });
    setRoleSwitchState({ ...switchStates });
  };

  const renderStudent = student => (
    <li key={student.id} className={`status--${student.status}`}>
      <button type="button" className="button--seamless" onClick={() => selectStudent(student)}>
        <Pane className="students__student" elevation={1}>
          <div className="students__student__name">
            <span>{student.firstName} {student.lastName}</span>
            {student.confirmed && <span className="confirmed">Confirmed</span>}
          </div>
          <div className="students__student__statuses">
            <span>Yes: {countSuggestionsOfType(student.id, 'yes')}</span>
            <span>Maybe: {countSuggestionsOfType(student.id, 'maybe')}</span>
            <span>No: {countSuggestionsOfType(student.id, 'no')}</span>
          </div>
        </Pane>
      </button>
    </li>
  );

  const renderRoleSelectors = () => Object.keys(roleSwitches).map(role => (
    <div className="filters__role-select__role" key={role}>
      <span>{role}</span>
      <Switch
        checked={roleSwitches[role]}
        onChange={e => toggleRoleSwitch(e.target.checked, role)}
      />
    </div>
  ));

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
          <ul>{$result}</ul>
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
    .filter((student) => {
      const query = searchQuery.toLowerCase();
      const firstName = student.firstName.toLowerCase();
      const lastName = student.lastName.toLowerCase();
      return (
        firstName.includes(query)
        || lastName.includes(query)
        || `${firstName} ${lastName}`.includes(query)
        || `${lastName} ${firstName}`.includes(query)
      );
    })
    .sort((a, b) => {
      if (a.firstName < b.firstName) return -1;
      if (a.firstName > b.firstName) return 1;
      if (a.lastName < b.lastName) return -1;
      if (a.lastName > b.lastName) return 1;
      return 0;
    })
    .map(renderStudent);

  if ($students.length === 0) return <p />;

  const $studentDetail = renderStudentDetail();
  const $suggestions = renderSuggestions();
  const $roleSelectors = renderRoleSelectors();
  return (
    <div className="container">
      <div className="students">
        <Pane className="filters" elevation={1}>
          <div className="filters__search">
            <SearchInput
              placeholder="Filter student names..."
              onChange={e => updateSearchQuery(e.target.value)}
              value={searchQuery}
              width="100%"
            />
          </div>
          <div className="filters__role-select">
            <header>
              <h5>Select roles</h5>
              <Button height={24} appearance="default" onClick={selectAllRoles}>Select all</Button>
            </header>
            {$roleSelectors}
          </div>
        </Pane>
        <ol className="students__list">
          {$students}
        </ol>
      </div>
      <main className="student-detail">
        {user && selectedStudent && selectedStudent.confirmed && (
          <div className="student-detail__coach-actions">
            {selectedStudent.firstName} was notified via email
          </div>
        )}
        {user && user.admin && selectedStudent && !selectedStudent.confirmed && (
          <div className="student-detail__admin-actions">
            <Button onClick={confirm} appearance="primary" intent="success">Confirm</Button>
            <Button onClick={select} appearance="primary" intent="success">Yes</Button>
            <Button onClick={reject} appearance="primary" intent="warning">Maybe</Button>
            <Button onClick={maybeSelect} appearance="primary" intent="danger">No</Button>
          </div>
        )}
        {user && !user.admin && selectedStudent && !selectedStudent.confirmed && (
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
