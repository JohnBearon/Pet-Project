import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';
import { Button, Paper, Grid } from '@material-ui/core';
import { DeleteForever, Edit, Save } from '@material-ui/icons';

class MedicationDetailPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_MEDICATION_DETAIL',
      payload: this.props.match.params.id,
    });
  }

  state = {
    newMedication: {
      brand: '',
      dosage: '',
      start_date: '',
      end_date: '',
      doctor: '',
      barcode: '',
    },
    add: false,
    edit: false,
  };

  //back to details
  back = (event) => {
    this.props.history.push(`/details/${this.props.match.params.id}`);
  };

  //Add new medication
  add = (event) => {
    this.setState({
      add: true,
    });
  };

  //open edit inputs
  edit = (event) => {
    this.setState({
      edit: true,
      newMedication: {
        ...this.props.store.medicationDetail,
      },
    });
  };

  //save edit inputs
  editSave = (event) => {
    this.props.dispatch({
      type: 'PUT_MEDICATION',
      payload: {
        ...this.props.store.medicationDetail,
        ...this.state.newMedication,
      },
    });
    this.setState({
      edit: false,
    });
    this.props.dispatch({
      type: 'GET_MEDICATION_DETAIL',
      payload: this.props.match.params.id,
    });
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      newMedication: {
        ...this.state.newMedication,
        [propertyName]: event.target.value,
      },
    });
  };

  render() {
    return (
      <div>
        <h2 className="Heading">
          {this.props.store.medicationDetail.name}'s Medications
        </h2>

        <table>
          <thead>
            <tr className="thRow">
              <th>Brand</th>
              <th>Dosage</th>
              <th>Prescribed</th>
              <th>Completion</th>
              <th>Doctor</th>
              <th>Barcode</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {this.state.edit ? (
              <>
                <td>
                  <input
                    type="text"
                    value={this.state.newMedication.brand}
                    onChange={this.handleInputChangeFor('brand')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.newMedication.dosage}
                    onChange={this.handleInputChangeFor('dosage')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.newMedication.start_date}
                    onChange={this.handleInputChangeFor('start_date')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.newMedication.end_date}
                    onChange={this.handleInputChangeFor('end_date')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.newMedication.doctor}
                    onChange={this.handleInputChangeFor('doctor')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.newMedication.barcode}
                    onChange={this.handleInputChangeFor('barcode')}
                  />
                </td>
              </>
            ) : (
              <>
                <td>{this.props.store.medicationDetail.brand}</td>
                <td>{this.props.store.medicationDetail.dosage}</td>
                <td>{this.props.store.medicationDetail.start_date}</td>
                <td>{this.props.store.medicationDetail.end_date}</td>
                <td>{this.props.store.medicationDetail.doctor}</td>
                <td>{this.props.store.medicationDetail.barcode}</td>
              </>
            )}
            <td>
              {this.state.edit ? (
                <Save onClick={this.editSave}></Save>
              ) : (
                <Edit onClick={this.edit}></Edit>
              )}
              <DeleteForever
                onClick={(event) =>
                  this.delete(event, this.props.store.medicationDetail.id)
                }
              />
            </td>
          </tbody>
          <Button onClick={this.back}>Back</Button>
          <Button onClick={this.add}>Add Medication</Button>
        </table>
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(MedicationDetailPage));
