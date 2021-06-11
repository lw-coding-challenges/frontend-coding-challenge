import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { EmployeeEdit } from './components/employee-edit/employee-edit';
import { EmployeeList } from './components/employee-list/employee-list';
import { NotFound } from './components/not-found/not-found';
import { Routes } from './routes/routes';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route path={Routes.employee.edit.template} component={EmployeeEdit}/>
            <Route path={Routes.home.template} component={EmployeeList} exact/>
            <Route component={NotFound}/>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
