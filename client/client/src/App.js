import React from 'react';
import Profile from './components/profile/Profile'; // Import the Profile component
import './App.css'; 

function App() {
  return (
    <div className="App">
      <Profile /> 
    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
// Added Profile.js components
