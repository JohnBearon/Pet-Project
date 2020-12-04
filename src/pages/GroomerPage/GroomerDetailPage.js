import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';
import { Button, Paper, Grid } from '@material-ui/core';
import { DeleteForever, Edit, Save } from '@material-ui/icons';
import GroomerList from '../../components/GroomerComponents/GroomerList';

class GroomerDetailPage extends Component {
  state = {
    newGroomer: {
      groomer: '',
      date: '',
      location: '',
    },
    add: false,
    edit: false,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_GROOMER_DETAIL',
      payload: this.props.match.params.id,
    });
  }

  edit = (event) => {
    this.setState({
      edit: true,
      newGroomer: {
        ...this.props.store.groomerDetail,
      },
    });
  };

  editSave = (event) => {
    this.props.dispatch({
      type: 'PUT_GROOMER',
      payload: {
        ...this.props.store.groomerDetail,
        ...this.state.newGroomer,
      },
    });
    this.setState({
      edit: false,
    });
    this.props.dispatch({
      type: 'GET_GROOMER_DETAIL',
      payload: this.props.match.params.id,
    });
  };

  add = (event) => {
    this.setState({
      add: true,
    });
  };

  addSave = (event) => {
    this.props.dispatch({
      type: 'POST_GROOMER',
      payload: { ...this.state.newGroomer, id: this.props.match.params.id },
    });
    this.props.dispatch({
      type: 'GET_GROOMER_DETAIL',
      payload: this.props.match.params.id,
    });
    this.setState({
      add: false,
    });
    this.props.history.push('/groomer');
  };

  delete = (event, id) => {
    this.props.dispatch({
      type: 'DELETE_GROOMER',
      payload: id,
    });
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      newGroomer: {
        ...this.state.newGroomer,
        [propertyName]: event.target.value,
      },
    });
  };

  back = (event) => {
    this.props.history.push(`/details/${this.props.match.params.id}`);
  };

  render() {
    const groomerList = this.props.store.groomerDetail.map((groomer, index) => {
      return <GroomerList key={index} groomer={groomer} />;
    });
    return (
      <div>
        <h2 className="Heading">Grooming Appointments</h2>

        <table>
          <thead>
            <tr className="thRow">
              <th>Groomer</th>
              <th>Date</th>
              <th>Location</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{groomerList}</tbody>
          {this.state.add ? (
            <>
              <td>
                <input
                  type="text"
                  value={this.state.newGroomer.groomer}
                  onChange={this.handleInputChangeFor('groomer')}
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  value={this.state.newGroomer.date}
                  onChange={this.handleInputChangeFor('date')}
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  value={this.state.newGroomer.location}
                  onChange={this.handleInputChangeFor('location')}
                  required
                />
              </td>
              <td>
                <Button onClick={this.addSave}>Save</Button>
              </td>
            </>
          ) : (
            <>
              <Button onClick={this.back}>Back</Button>
              <Button onClick={this.add}>Add Appointment</Button>
            </>
          )}
        </table>
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(GroomerDetailPage));
