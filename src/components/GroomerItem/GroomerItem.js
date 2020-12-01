import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';

class GroomerItem extends Component {
  delete = (event, id) => {
    console.log('in the delete', id);
  };

  render() {
    const groomerList = this.props.store.groomerReducer.map(
      (groomerItem, index) => {
        return (
          <tr className="tbRow" key={index}>
            <td>{groomerItem.groomer}</td>
            <td>{groomerItem.date}</td>
            <td>{groomerItem.location}</td>
            <td>{groomerItem.name}</td>
            <td>
              <DeleteForever
                onClick={(event) => this.delete(event, groomerItem.id)}
              />
            </td>
          </tr>
        );
      }
    );

    return (
      <div>
        <table>
          <thead>
            <tr className="thRow">
              <th>Groomer</th>
              <th>Date</th>
              <th>Location</th>
              <th colSpan="2">For</th>
            </tr>
          </thead>
          <tbody>{groomerList}</tbody>
          <Button onClick={this.add}>Add Appointment</Button>
        </table>
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(GroomerItem));
