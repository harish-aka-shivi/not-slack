import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect, Link, useHistory,
} from 'react-router-dom';

const Router = props => <BrowserRouter {...props} />;

export {
  Router,
  Route,
  Switch,
  Redirect,
  Link,
  useHistory,
};
