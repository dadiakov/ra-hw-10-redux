import React from 'react';
import './App.css';
import CreateItemForm from './components/CreateItemForm';
import ItemsList from './components/ItemsList';

export default function App() {
  return (
    <React.Fragment>
      <CreateItemForm />
      <ItemsList />
    </React.Fragment>
  );
}