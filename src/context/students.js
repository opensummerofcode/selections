import React from 'react';

export default React.createContext({
  students: {},
  selectedStudent: null,
  selectStudent: () => {},
  suggestions: null
});
