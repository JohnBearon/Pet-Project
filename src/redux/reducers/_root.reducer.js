import { combineReducers } from 'redux';
import errors from './errors.reducer';
import foodReducer from './food.reducer';
import groomerReducer from './groomer.reducer';
import groomerDetailReducer from './groomerDetails.reducer';
import medicationReducer from './medication.reducer';
import ownedPetReducer from './ownedPet.reducer';
import petDetailReducer from './petDetail.reducer';
import petReducer from './pet.reducer';
import registrationReducer from './registration.reducer';
import scannerReducer from './scanner.reducer';
import user from './user.reducer';
import vetReducer from './vet.reducer';
// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  foodReducer,
  groomerReducer,
  groomerDetailReducer,
  medicationReducer,
  ownedPetReducer,
  petDetailReducer,
  petReducer,
  registrationReducer,
  scannerReducer,
  user, // will have an id and username if someone is logged in
  vetReducer,
});

export default rootReducer;
