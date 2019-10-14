import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Car Rental</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Orders lists</Link>
          </li>
          <li className="navbar-item">
          <Link to="/carsava" className="nav-link">Available Cars</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Rent a Car</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
          <li className="navbar-item">
          <Link to="/cars" className="nav-link">Add Car</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}