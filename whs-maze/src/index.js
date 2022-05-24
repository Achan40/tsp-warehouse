import Grid from './Grid';
import Intro from './Intro';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import Footer from './Footer';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Navbar className='tsp-header'>
        <Container>
          <Navbar.Brand className='tsp-brand justify-content-right'>tsp-warehouse</Navbar.Brand>
        </Container>
      </Navbar>

      <Intro/>
      <Grid/>
      <Footer/>
  </React.StrictMode>
);
