import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import login from './pages/Login';
import Settings from './pages/Settings';

export default function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ login } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </main>
  );
}
