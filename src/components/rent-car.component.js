import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class rentCar extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);

    this.state = {
      username: '',
      description: '',
      duration: '',
      date: new Date(),
      users: [],
      cars: [],
      loop: []
    }
  }
  componentDidMount() {
    axios.get('http://localhost:5000/cars/ava')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.model+" with seating of: "+ user.seating + "people  @" + user.rentperday+"per day" + "  #V.No.- "+user.vnumber),
            username: response.data[0].model+" with seating of: "+response.data[0].seating + "people  @" + response.data[0].rentperday+"per day" + "  #V.No.- "+response.data[0].vnumber
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
      axios.get('http://localhost:5000/cars/ava')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            loop: response.data.map(user => user.vnumber),
            duration: response.data[0].vnumber
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
    axios.get('http://localhost:5000/users/')
      .then(game => {
        if (game.data.length > 0) {
          this.setState({
            cars: game.data.map(games => "Name : "+games.username + " and mobile no : " + games.mobile),

            description: "Name: "+game.data[0].username + " and mobile no : "+game.data[0].mobile
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }


  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      date: this.state.date,
      duration: this.state.duration
    }

    console.log(exercise);

    axios.post('http://localhost:5000/orders/add', exercise)
      .then(res => console.log(res.data)).catch((error) => {
        console.log(error);
      });

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Rent a Car</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Cars Available for Rent: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Confirm Car Number: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}>
              {
                this.state.loop.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Select User : </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}>
              {
                this.state.cars.map(function(games) {
                  return <option 
                    key={games}
                    value={games}>{games}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Book Car for the Date" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}