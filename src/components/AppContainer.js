import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import RecipeList from './RecipeList';

export default function AppContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <RecipeList/>
      </Container>
    </React.Fragment>
  );
}
