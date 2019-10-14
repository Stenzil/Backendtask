import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeMobile=this.onChangeMobile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangePass=this.onChangePass.bind(this);

    this.state = {
      username: '',
      pass: '',
      mobile: 0 
    }
  }

  onChangeMobile(e) {
    this.setState({
      mobile: e.target.value
    })
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  onChangePass(e) {
    this.setState({
      pass: e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      pass: this.state.pass,
      mobile: this.state.mobile
    }

    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data)).catch((error) => {
        console.log(error);
      });
      
    window.location = '/';

    this.setState({
      username: '',
      pass: '',
      mobile: 0
    })
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group"> 
            <label>Password: </label>
            <input  type="Password"
                required
                className="form-control"
                value={this.state.pass}
                onChange={this.onChangePass}
                />
          </div>
          
          <div className="form-group"> 
            <label>Mobile: </label>
            <input  type="Number"
                required
                className="form-control"
                value={this.state.mobile}
                onChange={this.onChangeMobile}
                /><i>Registered people on entering their mobile number would be redirected to the order page</i>
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}