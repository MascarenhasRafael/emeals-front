// RecipeFilters.js
import React from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const RecipeFilters = ({ name, dateEdited, onNameChange, onDateEditedChange }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Order by</FormLabel>
      <FormGroup aria-label="position" row>
      <FormControlLabel
          control={<Switch color="primary" checked={name} onChange={() => onNameChange(!name)} />}
          label="Name"
          labelPlacement="end"
        />

        <FormControlLabel
          control={<Switch color="primary" checked={dateEdited} onChange={() => onDateEditedChange(!dateEdited)} />}
          label="Date Edited"
          labelPlacement="end"
        />
      </FormGroup>
    </FormControl>
  );
};

export default RecipeFilters;
