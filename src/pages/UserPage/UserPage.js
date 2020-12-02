import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../../components/LogOutButton/LogOutButton';
import PetRender from '../../components/PetRender/PetRender';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, Paper, Grid } from '@material-ui/core';
import AddPetForm from '../../components/AddPetForm/AddPetForm';
import { AddCircleOutline } from '@material-ui/icons';

class UserPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_PET',
    });
  }

  state = {
    showForm: this.props.store.showForm,
  };

  addPet = (event) => {
    this.setState({
      showForm: true,
    });
  };

  render() {
    const ownedPet = this.props.store.ownedPet.map((pet, index) => {
      return <PetRender key={index} pet={pet} />; //renders owned pets to userpage as component.
    });
    return (
      <div className="container">
        <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>

        <Grid container spacing={1}>
          {ownedPet}
          <Grid item xs={12} sm={6} md={4}>
            <div className="pet-center">
              <AddCircleOutline onClick={this.addPet} />
            </div>
            {this.state.showForm ? <AddPetForm /> : ''}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(UserPage);
