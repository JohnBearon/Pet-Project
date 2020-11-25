import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class RegForm1 extends Component {
  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        username: this.props.store.registerReducer.username,
        password: this.props.store.registerReducer.password,
        email: this.props.store.registerReducer.email,
        phone: this.props.store.registerReducer.phone,
      },
    });
  }; // end registerUser

  render() {
    return <div>Testing but make it 3</div>;
  }
}

export default connect(mapStoreToProps)(RegForm1);