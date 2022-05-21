import Grid from './Grid';
import Intro from './Intro';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Navbar>
        <Container>
          <Navbar.Brand className='tsp-brand justify-content-right'>tsp-warehouse</Navbar.Brand>
        </Container>
      </Navbar>

      <Intro/>
      <Grid/>
    </div>
  );
}

export default App;
