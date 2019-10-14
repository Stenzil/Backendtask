import React, { Component } from 'react';
import axios from 'axios';

export default class addCar extends Component {
  constructor(props) {
    super(props);

    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeVnumber=this.onChangeVnumber.bind(this);
    this.onChangeSeating=this.onChangeSeating.bind(this);
    this.onChangeIsRented=this.onChangeIsRented.bind(this);
    this.onChangeRentperday=this.onChangeRentperday.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      model: '',
      vnumber: '',
      seating:0,
      rentperday:0,
      isRented: false
    }
  }

  onChangeSeating(e) {
    this.setState({
      seating: e.target.value
    })
  }
  onChangeIsRented(e) {
    this.setState({
      isRented: e.target.value
    })
  }
  onChangeRentperday(e) {
    this.setState({
      rentperday: e.target.value
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

  onSubmit(e) {
    e.preventDefault();

    const car = {
      model: this.state.model,
      vnumber: this.state.vnumber,
      seating: this.state.seating,
      rentperday: this.state.rentperday,
      isRented: this.state.isRented
    }

    console.log(car);

    axios.post('http://localhost:5000/cars/add', car)
      .then(res => console.log(res.data));

    this.setState({
        model: '',
        vnumber: '',
        seating:0,
        rentperday:0,
        isRented: false
    })
    window.location = '/carsava';

  }

  render() {
    return (
      <div>
        <h3>Add New Car</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Model: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.model}
                onChange={this.onChangeModel}
                />
          </div>
          <div className="form-group"> 
            <label>Vehicle Number: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.vnumber}
                onChange={this.onChangeVnumber}
                />
          </div>
          <div className="form-group"> 
            <label>Seating: </label>
            <input  type="Number"
                required
                className="form-control"
                value={this.state.seating}
                onChange={this.onChangeSeating}
                />
          </div>
          <div className="form-group"> 
            <label>Rent Per Day: </label>
            <input  type="Number"
                required
                className="form-control"
                value={this.state.rentperday}
                onChange={this.onChangeRentperday}
                />
          </div>
          <i>Vehicle Number Must Be Unique</i>
          <div className="form-group">
            <input type="submit" value="Add Car" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}