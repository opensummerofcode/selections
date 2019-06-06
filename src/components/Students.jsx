import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Pane, Button, toaster, SearchInput, Switch, Badge, Tab
} from 'evergreen-ui';
import { db } from '../firebase';
import StudentDetail from './StudentDetail';
import StudentCard from './StudentCard';
import ProjectCard from './ProjectCard';
import AuthContext from '../context/auth';
import Student from '../models/Student';
import Project from '../models/Project';

const Students = ({ history }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudent, selectStudent] = useState(null);
  const [students, setStudents] = useState({});
  const [suggestions, setSuggestions] = useState({});
  const [projects, setProjects] = useState({});
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
    other: true
  });
  const [statusSwitches, setStatusSwitchState] = useState({
    Yes: true,
    Maybe: true,
    No: true,
    'Emailed (status is final)': true,
    'No status': true
  });
  const [projectsTabIsActive, setProjectTabVisibility] = useState(false);

  const { user, authFailed } = useContext(AuthContext);

  useEffect(() => {
    if (!user || user.pending || !('pending' in user)) return;
    db.collection('students').onSnapshot((snapshot) => {
      const data = snapshot.docChanges();
      const newStudents = data.reduce((all, s) => {
        const ref = s.doc.data();
        const student = new Student(ref);
        all[student.id] = student;
        return all;
      }, {});
      setStudents((s) => {
        if (selectedStudent) selectStudent(newStudents[selectedStudent.id]);
        return { ...s, ...newStudents };
      });
      setIsLoading(false);
    });
    db.collection('suggestions').onSnapshot((snapshot) => {
      const data = snapshot.docChanges();
      const newSuggestions = data.reduce((all, s) => {
        all[s.doc.id] = s.doc.data();
        return all;
      }, {});
      setSuggestions(s => ({ ...s, ...newSuggestions }));
    });
  }, [user]);

  useEffect(() => {
    if (isLoading) return;
    db.collection('projects').onSnapshot((snapshot) => {
      const data = snapshot.docChanges();
      const newProjects = data.reduce((all, s) => {
        const { id } = s.doc;
        const project = new Project(id, s.doc.data());
        project.assignedStudents.forEach((studentId) => {
          students[studentId].setAssignedStatus(true);
        });
        all[id] = project;
        return all;
      }, {});
      setProjects(p => ({ ...p, ...newProjects }));
    });
  }, [user, isLoading]);

  const select = () => selectedStudent.yes();
  const reject = () => selectedStudent.maybe();
  const maybeSelect = () => selectedStudent.no();
  const confirm = () => {
    if (!selectedStudent.status) {
      return toaster.danger('A student must have a status before they can be confirmed');
    }
    return selectedStudent.confirm();
  };
  const unconfirm = () => selectedStudent.unconfirm();

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

  const toggleStatusSwitch = (value, status) => (
    setStatusSwitchState({ ...statusSwitches, [status]: value })
  );
  const toggleRoleSwitch = (value, role) => setRoleSwitchState({ ...roleSwitches, [role]: value });

  const selectAllRoles = () => {
    const switchStates = { ...roleSwitches };
    Object.keys(switchStates).forEach((role) => {
      switchStates[role] = true;
    });
    setRoleSwitchState({ ...switchStates });
  };

  const renderStudent = student => (
    <StudentCard
      key={student.id}
      countSuggestionsOfType={countSuggestionsOfType}
      student={student}
      selectStudent={selectStudent}
    />
  );

  const renderProject = project => (
    <ProjectCard key={project.id} students={students} project={project} />
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

  const renderStatusSelectors = () => Object.keys(statusSwitches).map(status => (
    <div className="filters__status-select__status" key={status}>
      <span>{status}</span>
      <Switch
        checked={statusSwitches[status]}
        onChange={e => toggleStatusSwitch(e.target.checked, status)}
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
  if (authFailed || user.pending || !('pending' in user)) {
    history.push('/pending');
    return <p />;
  }

  const filterBySearchQuery = (student) => {
    const query = searchQuery.toLowerCase();
    const firstName = student.firstName.toLowerCase();
    const lastName = student.lastName.toLowerCase();
    return (
      firstName.includes(query)
      || lastName.includes(query)
      || `${firstName} ${lastName}`.includes(query)
      || `${lastName} ${firstName}`.includes(query)
    );
  };

  const filterByRole = (student) => {
    const studentHasCustomRoles = student.customRoles.length > 0;
    const allStandardRoles = Object.keys(roleSwitches);
    const hasRoles = allStandardRoles.filter((role) => {
      // if switch is on
      if (!roleSwitches[role]) return false;
      if (role === 'other' && studentHasCustomRoles) return true;
      if (student.roles.includes(role)) return true;
      return false;
    });
    return hasRoles.length > 0;
  };

  const filterByStatus = student => Object.keys(statusSwitches).filter((status) => {
    if (!statusSwitches[status]) return false;
    if (status === 'Emailed (status is final)' && student.confirmed) return true;
    if (status === 'No status' && !student.status) return true;
    if (student.status === status.toLowerCase()) return true;
    return false;
  }).length > 0;

  const sortByFirstNameThenLastName = (a, b) => {
    if (a.firstName < b.firstName) return -1;
    if (a.firstName > b.firstName) return 1;
    if (a.lastName < b.lastName) return -1;
    if (a.lastName > b.lastName) return 1;
    return 0;
  };

  if (isLoading || Object.keys(projects).length === 0) return <p />;

  const $students = Object.keys(students).map(key => students[key])
    .filter(filterBySearchQuery)
    .filter(filterByRole)
    .filter((student) => {
      if (projectsTabIsActive && (student.status === 'yes' || student.status === 'maybe') && !student.assigned) {
        return true;
      }
      if (!projectsTabIsActive) return true;
      return false;
    })
    .filter(filterByStatus)
    .sort(sortByFirstNameThenLastName)
    .map(renderStudent);

  const $projects = Object.keys(projects).map(key => projects[key])
    .sort((a, b) => a.order - b.order)
    .map(renderProject);

  const $studentDetail = renderStudentDetail();
  const $suggestions = renderSuggestions();
  const $roleSelectors = renderRoleSelectors();
  const $statusSelectors = renderStatusSelectors();

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
          <div className="filters__status-select">
            <header><h5>Select status</h5></header>
            {$statusSelectors}
          </div>
          <Badge>{$students.length} results</Badge>
        </Pane>
        <ol className="students__list">
          {$students}
        </ol>
      </div>
      <main className="detail">
        <header>
          <Tab
            height={50}
            isSelected={!projectsTabIsActive}
            onSelect={() => setProjectTabVisibility(false)}
          >
            Student detail
          </Tab>
          <Tab
            height={55}
            isSelected={projectsTabIsActive}
            onSelect={() => setProjectTabVisibility(true)}
          >
            Project assignments
          </Tab>
        </header>
        { projectsTabIsActive && (
          <div className="projects">
            {$projects}
          </div>
        )}
        { !projectsTabIsActive && (
          <div className="student-detail">
            {user && selectedStudent && selectedStudent.confirmed && (
              <div className="student-detail__coach-actions">
                {selectedStudent.firstName} was notified via email
                <Button onClick={unconfirm} appearance="primary" intent="danger">Unconfirm</Button>
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
          </div>
        )}
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
