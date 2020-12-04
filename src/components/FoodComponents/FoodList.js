import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';

import FoodItem from './FoodItem';

class FoodList extends Component {
  state = {
    newFood: {
      brand: '',
      barcode: '',
    },
    add: false,
    edit: false,
  };

  back = (event) => {
    this.props.history.push(`/details/${this.props.match.params.id}`);
  };

  add = (event) => {
    this.setState({
      add: true,
    });
  };

  addSave = (event) => {
    this.props.dispatch({
      type: 'POST_FOOD',
      payload: { ...this.state.newFood, id: this.props.match.params.id },
    });
    this.setState({
      add: false,
    });
  };

  delete = (event, id) => {
    this.props.dispatch({
      type: 'DELETE_FOOD',
      payload: { id: id, petId: this.props.match.params.id },
    });
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      newFood: { ...this.state.newFood, [propertyName]: event.target.value },
    });
  };

  render() {
    const foodItem = this.props.store.food.map((food, index) => {
      return <FoodItem key={index} food={food} />; //each row of information
    });
    return (
      <div>
        <h2 className="Heading"> Food</h2>
        <table>
          <thead>
            <tr className="thRow">
              <th>Brand</th>
              <th>Barcode</th>

              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{foodItem}</tbody>

          {this.state.add ? (
            <>
              <td>
                <input
                  type="text"
                  value={this.state.newFood.brand}
                  placeholder="New Brand"
                  onChange={this.handleInputChangeFor('brand')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={this.state.newFood.barcode}
                  placeholder="New Barcode"
                  onChange={this.handleInputChangeFor('barcode')}
                />
              </td>
              <td>
                <Button onClick={this.addSave}>Save</Button>
              </td>
            </>
          ) : (
            <>
              <Button onClick={this.back}>Back</Button>
              <Button onClick={this.add}>Add Brand</Button>
            </>
          )}
        </table>
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(FoodList));