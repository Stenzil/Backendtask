import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeVnumber = this.onChangeVnumber.bind(this);
    this.onChangeSeating = this.onChangeSeating.bind(this);
    this.onChangeRentperday = this.onChangeRentperday.bind(this);
    this.onChangeIsrented = this.onChangeIsrented.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      model: '',
      vnumber: '',
      seating: 0,
      rentperday: 0,
      isRented: false
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/cars/info/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.model,
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/cars/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.model),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }
  onChangeModel(e) {
    this.setState({
      model: e.target.value
    })
  }

  onChangeVnumber(e) {
    this.setState({
      vnumber: e.target.value
    })
  }

  onChangeSeating(e) {
    this.setState({
      seating: e.target.value
    })
  }

  onChangeRentperday(e) {
    this.setState({
      rentperday: e.target.value
    })
  }
  onChangeIsrented(e) {
    this.setState({
      isRented: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      model: this.state.model,
      vnumber: this.state.vnumber,
      seating: this.state.seating,
      rentperday: this.state.rentperday,
      isRented: this.state.isRented,

    }

    console.log(exercise);

    axios.post('http://localhost:5000/cars/update/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Car Details</h3>
      <form onSubmit={this.onSubmit}>
      <div className="form-group">
          <label>Model : </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.model}
              onChange={this.onChangeModel}
              />
        </div>
        <div className="form-group"> 
          <label>Vehicle Nnumber : </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.vnumber}
              onChange={this.onChangeVnumber}
              />
        </div>
        <div className="form-group">
          <label>Seating Capacity Of the Vehicle : </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.seating}
              onChange={this.onChangeSeating}
              />
        </div>
        <div className="form-group">
          <label>Rent Per day : </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.rentperday}
              onChange={this.onChangeRentperday}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Car Details" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}