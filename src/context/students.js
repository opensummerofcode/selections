import React from 'react';

export default React.createContext({
  selectedStudent: null,
  selectStudent: () => {},
  suggestions: null
});
