import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import CurrentTemperature from './components/currentTemperature';

function App() {
  return (
    <div className="App">
      <div className="container-fluid dashboard">
        <div className="row vh-100">
          <div className="p-0">
            <div className="d-flex flex-column justify-content-around align-items-start vh-100 p-2">
              <CurrentTemperature title='Outside' temperature='0' conditions="sunny"></CurrentTemperature>
              <CurrentTemperature title='Center room' temperature='25' conditions="sunny"></CurrentTemperature>
              <CurrentTemperature title='Near window' temperature='20' conditions="sunny"></CurrentTemperature>
            </div>
          </div>
          <div className="col-auto graphics d-flex flex-column justify-content-around vh-100 p-2">
          </div>
          <div className="col-3 bordered image"></div>
        </div>
      </div>
    </div >
  );
}

export default App;
