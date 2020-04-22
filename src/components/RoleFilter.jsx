import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SelectMenu, Button } from 'evergreen-ui';
import { roles } from '../constants';

const determineRoleLabel = (selectedRoles) => {
  const amount = selectedRoles.length;
  if (amount === 1) return `Role: ${selectedRoles.toString()}`;
  if (amount > 1) return `${amount.toString()} roles selected...`;
  return 'Select roles...';
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'select': {
      const selected = [...state.selected, action.payload];
      return { ...state, selected, label: determineRoleLabel(selected) };
    }
    case 'deselect': {
      const selected = [...state.selected];
      const deselectedItemIndex = state.selected.indexOf(action.payload);
      if (deselectedItemIndex > -1) selected.splice(deselectedItemIndex, 1);
      return { ...state, selected, label: determineRoleLabel(selected) };
    }
    case 'search': {
      const searchQuery = action.payload;
      const availableRoles = searchQuery
        ? roles.filter((role) => role.toLowerCase().includes(searchQuery.toLowerCase()))
        : [...roles];
      return { ...state, availableRoles };
    }
    default:
      throw new Error();
  }
};

const RoleFilter = ({ setSelectedRoles }) => {
  const [state, dispatch] = useReducer(reducer, {
    selected: [...roles],
    label: determineRoleLabel([...roles]),
    availableRoles: [...roles]
  });

  useEffect(() => {
    setSelectedRoles(state.selected);
  }, [state.selected]);

  const { availableRoles, selected, label } = state;
  return (
    <SelectMenu
      isMultiSelect
      hasTitle={false}
      onFilterChange={(v) => dispatch({ type: 'search', payload: v })}
      options={availableRoles.map((role) => ({
        label: role,
        value: role
      }))}
      selected={selected}
      onSelect={(r) => dispatch({ type: 'select', payload: r.value })}
      onDeselect={(r) => dispatch({ type: 'deselect', payload: r.value })}
      height={360}
      filterPlaceholder="Search roles..."
    >
      <Button>{label}</Button>
    </SelectMenu>
  );
};

RoleFilter.propTypes = {
  setSelectedRoles: PropTypes.func.isRequired
};

export default RoleFilter;
