import React, { useEffect, useContext, useReducer, memo } from 'react';
import PropTypes from 'prop-types';
import { Switch, SearchInput, Button, Pill } from 'evergreen-ui';
import { removeDiacritics } from '../util';
import { Student } from '../models';
import { roles } from '../constants';
import RoleFilter from './RoleFilter';
import AuthContext from '../context/auth';
import StudentContext from '../context/students';

import styles from '../assets/styles/filters.module.css';

/*
TODO:
status filters (no official status, accepted, reject, maybe) - filterlist or segmented control
status is locked-in - yes/no
*/

const normalize = (str) => removeDiacritics(str.toLowerCase());

const initialState = {
  searchQuery: '',
  selectedRoles: [...roles],
  isAlum: false,
  wantsToCoach: false,
  includeAlreadySuggested: true
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'search':
      return { ...state, searchQuery: action.payload };
    case 'show-alum-only':
      return { ...state, isAlum: action.payload };
    case 'show-coaches-only':
      return { ...state, wantsToCoach: action.payload };
    case 'select-roles':
      return { ...state, selectedRoles: action.payload };
    case 'deselect-all-roles':
      return { ...state, selectedRoles: [] };
    case 'hide-suggested':
      return { ...state, includeAlreadySuggested: action.payload };
    case 'reset':
      return { ...initialState };
    default:
      throw new Error(`${action.type} does not exist`);
  }
};

const Filters = ({ students: studentObj, setFiltered, filteredCount }) => {
  const { user } = useContext(AuthContext);
  const { suggestions } = useContext(StudentContext);

  const students = Object.keys(studentObj)
    .map((id) => studentObj[id])
    .map((s) => {
      s.firstNameNormalized = normalize(s.firstName);
      s.lastNameNormalized = normalize(s.lastName);
      return s;
    });

  const [state, dispatch] = useReducer(reducer, { ...initialState });

  const sortByFirstNameThenLastName = (a, b) => {
    if (a.firstNameNormalized < b.firstNameNormalized) return -1;
    if (a.firstNameNormalized > b.firstNameNormalized) return 1;
    if (a.lastNameNormalized < b.lastNameNormalized) return -1;
    if (a.lastNameNormalized > b.lastNameNormalized) return 1;
    return 0;
  };

  const search = (student) => {
    const query = normalize(state.searchQuery);
    const { firstNameNormalized, lastNameNormalized } = student;
    return (
      firstNameNormalized.includes(query) ||
      lastNameNormalized.includes(query) ||
      `${firstNameNormalized} ${lastNameNormalized}`.includes(query) ||
      `${firstNameNormalized} ${lastNameNormalized}`.includes(query)
    );
  };

  const filterByIsAlum = (student) => (state.isAlum ? student.isAlum : true);

  const filterByCoachStatus = (student) =>
    state.wantsToCoach ? student.isAlum && student.wantsToCoach : true;

  const filterByRole = (student) => {
    const hasRoles = roles.filter((role) => {
      if (state.selectedRoles.indexOf(role) === -1) return false;
      if (role === 'Other' && student.hasOtherRole) return true;
      if (student.applyingForRoles.indexOf(role) > -1) return true;
      return false;
    });
    return hasRoles.length > 0;
  };

  const filterByHasSuggestion = (student) => {
    if (state.includeAlreadySuggested) return true;
    return !(suggestions[student.id] && !!suggestions[student.id][user.name]);
  };

  useEffect(() => {
    const filtered = students
      .filter(search)
      .filter(filterByIsAlum)
      .filter(filterByCoachStatus)
      .filter(filterByRole)
      .filter(filterByHasSuggestion)
      .sort(sortByFirstNameThenLastName);

    setFiltered(filtered);
  }, [students, Object.keys(state).map((key) => state[key])]);

  return (
    <header className={styles.filters}>
      <div>
        <SearchInput
          placeholder="Search students by name..."
          width="100%"
          onChange={(e) => dispatch({ type: 'search', payload: e.target.value })}
          value={state.searchQuery}
        />
      </div>
      <div className={styles.double}>
        <RoleFilter
          selected={state.selectedRoles}
          setSelected={(r) => dispatch({ type: 'select-roles', payload: r })}
        />
        <Button onClick={() => dispatch({ type: 'deselect-all-roles' })}>Deselect all</Button>
      </div>
      <div>
        <Switch
          checked={state.isAlum}
          onChange={(e) => dispatch({ type: 'show-alum-only', payload: e.target.checked })}
        />
        <span>Only alumni</span>
      </div>
      <div>
        <Switch
          checked={state.wantsToCoach}
          onChange={(e) => dispatch({ type: 'show-coaches-only', payload: e.target.checked })}
        />
        <span>Only student coach volunteers</span>
      </div>
      <div>
        <Switch
          checked={state.includeAlreadySuggested}
          onChange={(e) => dispatch({ type: 'hide-suggested', payload: e.target.checked })}
        />
        <span>Include students you&apos;ve suggested for</span>
      </div>
      <div className={styles.footer}>
        <div>
          <Pill>{filteredCount}</Pill> of <Pill>{students.length}</Pill> shown
        </div>
        <Button onClick={() => dispatch({ type: 'reset' })}>Reset filters</Button>
      </div>
    </header>
  );
};

Filters.propTypes = {
  setFiltered: PropTypes.func.isRequired,
  filteredCount: PropTypes.number.isRequired,
  students: PropTypes.objectOf(PropTypes.instanceOf(Student))
};

export default memo(Filters);
