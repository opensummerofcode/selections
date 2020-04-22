import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Switch, SearchInput } from 'evergreen-ui';
import { removeDiacritics } from '../util';
import { Student } from '../models';
import { roles } from '../constants';
import RoleFilter from './RoleFilter';

import styles from '../assets/styles/filters.module.css';

/*
TODO:
status filters (no official status, accepted, reject, maybe) - filterlist or segmented control
status is locked-in - yes/no
*/

const Filters = ({ students: studentObj, setFiltered }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [isAlum, setIsAlum] = useState(false);
  const [wantsToCoach, setWantsToCoach] = useState(false);
  const [includeAlreadySuggested, setIncludeAlreadySuggested] = useState(true);

  const normalize = (str) => removeDiacritics(str.toLowerCase());

  const students = Object.keys(studentObj)
    .map((id) => studentObj[id])
    .map((s) => {
      s.firstNameNormalized = normalize(s.firstName);
      s.lastNameNormalized = normalize(s.lastName);
      return s;
    });

  const filterBySearchQuery = (student) => {
    const query = normalize(searchQuery);
    const { firstNameNormalized, lastNameNormalized } = student;
    return (
      firstNameNormalized.includes(query) ||
      lastNameNormalized.includes(query) ||
      `${firstNameNormalized} ${lastNameNormalized}`.includes(query) ||
      `${firstNameNormalized} ${lastNameNormalized}`.includes(query)
    );
  };

  const filterByIsAlum = (student) => (isAlum ? student.isAlum : true);

  const filterByCoachStatus = (student) =>
    wantsToCoach ? student.isAlum && student.wantsToCoach : true;

  const filterByRole = (student) => {
    const hasRoles = roles.filter((role) => {
      if (selectedRoles.indexOf(role) === -1) return false;
      if (role === 'Other' && student.hasOtherRole) return true;
      if (student.applyingForRoles.indexOf(role) > -1) return true;
      return false;
    });
    return hasRoles.length > 0;
  };

  const sortByFirstNameThenLastName = (a, b) => {
    if (a.firstNameNormalized < b.firstNameNormalized) return -1;
    if (a.firstNameNormalized > b.firstNameNormalized) return 1;
    if (a.lastNameNormalized < b.lastNameNormalized) return -1;
    if (a.lastNameNormalized > b.lastNameNormalized) return 1;
    return 0;
  };

  useEffect(() => {
    const filtered = students
      .filter(filterBySearchQuery)
      .filter(filterByIsAlum)
      .filter(filterByCoachStatus)
      .filter(filterByRole)
      .sort(sortByFirstNameThenLastName);

    setFiltered(filtered);
  }, [students, searchQuery, selectedRoles, isAlum]);

  return (
    <header className={styles.filters}>
      <div>
        <SearchInput
          placeholder="Search students by name..."
          width="100%"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
      </div>
      <div>
        <RoleFilter setSelectedRoles={setSelectedRoles} />
      </div>
      <div>
        <Switch checked={isAlum} onChange={(e) => setIsAlum(e.target.checked)} />
        <span>Only alumni</span>
      </div>
      <div>
        <Switch checked={wantsToCoach} onChange={(e) => setWantsToCoach(e.target.checked)} />
        <span>Only student coach volunteers</span>
      </div>
      <div>
        <Switch
          checked={includeAlreadySuggested}
          onChange={(e) => setIncludeAlreadySuggested(e.target.checked)}
        />
        <span>Include students you&apos;ve suggested for</span>
      </div>
    </header>
  );
};

Filters.propTypes = {
  setFiltered: PropTypes.func.isRequired,
  students: PropTypes.objectOf(PropTypes.instanceOf(Student))
};

export default memo(Filters);
