import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm'
import Header from './components/Header';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Header/>
      <Container maxWidth="md">
        <Router>
          <Routes>
            <Route path="/" exact element={<RecipeList/>} />
            <Route path="/new" exact element={<RecipeForm formType='new'/>} />
            <Route path="/edit/:id" exact element={<RecipeForm formType='edit'/>} />
            <Route component={() => <div>404 Not Found</div>} />
          </Routes>
        </Router>
      </Container>
    </div>
  );
}

export default App;
