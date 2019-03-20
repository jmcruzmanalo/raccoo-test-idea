import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Home from './containers/Home';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html, body {
    position: relative;
    width: 100%;
    height: 100%;
  }

  #root {
    display: inline;
  }

  .App {
    display: inline;
  }
`;

const App = () => (
  <div className="App">
    <GlobalStyle />
    <Home />
  </div>
);

export default App;
