'use strict';

const baseAbsPath = __dirname + '/';

import React from 'react';
const Component = React.Component;
import ReactDOM from 'react-dom';
import constants from '../../common/constants';

import { BrowserRouter as Router, Route } from "react-router-dom";

const TestPage = import('./scenes/test') 

const UserConsole = ( 
  <Router basename={constants.ROUTE_PATHS.PLAYER}>
    <div>
      <Route exact path={constants.ROUTE_PATHS.PAGE + constants.ROUTE_PATHS.TEST} render={(props) => {
        return (
          <TestPage
          {props}
          />
        );
      }} />
    </div>
  </Router>
);

export default UserConsole;

ReactDOM.render(UserConsole, document.getElementById('react-root'));
