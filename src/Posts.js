import React, { useEffect } from 'react';
import apiCaller from './api/apiCaller';

function App() {
  useEffect(() => {
    // Make multiple API calls
    apiCaller.get('/todos/1').then(response => {
      console.log('Response 1:', response.data);
    });

    apiCaller.get('/todos/2').then(response => {
      console.log('Response 2:', response.data);
    });

    apiCaller.get('/todos/3').then(response => {
      console.log('Response 3:', response.data);
    });
  }, []);

  return (
    <div className="App">
      <h1>Sequential API Calls with Axios</h1>
    </div>
  );
}

export default App;
