import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SideSheet } from 'evergreen-ui';

import styles from '../assets/styles/conflicts.module.css';

const Conflicts = ({ conflicts, isShown, setConflictsShown }) => {
  return (
    <SideSheet
      isShown={isShown}
      onCloseComplete={() => setConflictsShown(false)}
      className={styles.conflicts}
    >
      hi
    </SideSheet>
  );
};

Conflicts.propTypes = {
  conflicts: PropTypes.arrayOf(PropTypes.shape({})),
  isShown: PropTypes.bool.isRequired,
  setConflictsShown: PropTypes.func.isRequired
};

export default Conflicts;
