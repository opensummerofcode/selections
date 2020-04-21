import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, SearchInput } from 'evergreen-ui';
import RoleFilter from './RoleFilter';

import styles from '../assets/styles/filters.module.css';
/*
TODO:
status filters (no official status, accepted, reject, maybe) - filterlist
status is locked-in - yes/no
*/
const Filters = ({ setFilters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [isAlum, setIsAlum] = useState(false);
  const [wantsToCoach, setWantsToCoach] = useState(false);
  const [hasUsersSuggestion, setHasUserSuggestion] = useState(false);

  useEffect(() => {
    setFilters({
      searchQuery,
      selectedRoles,
      isAlum,
      wantsToCoach,
      hasUsersSuggestion
    });
  }, [searchQuery, selectedRoles, isAlum, wantsToCoach, hasUsersSuggestion]);
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
      </div>
      <div>
        <Switch checked={wantsToCoach} onChange={(e) => setWantsToCoach(e.target.checked)} />
      </div>
      <div>
        <Switch
          checked={hasUsersSuggestion}
          onChange={(e) => setHasUserSuggestion(e.target.checked)}
        />
      </div>
    </header>
  );
};

Filters.propTypes = {
  setFilters: PropTypes.func.isRequired
};

export default Filters;
