import {
  SET_SHOWDIALOG,
  SET_USER,
  SET_ISSIGNEDIN,
  SET_SHOWUPDATEFORM,
} from "./Actions";

//innite state
const initState = {
  user: null,
  isSignedIn: false,
  showDialog: false,
  showUpdateForm: false,
};

//depatch
const Reducer = (state, action) => {
  switch (action.type) {
    case SET_ISSIGNEDIN:
      return {
        ...state,
        isSignedIn: action.payload,
      };
    case SET_SHOWDIALOG:
      return {
        ...state,
        showDialog: action.payload,
      };
    case SET_SHOWUPDATEFORM:
      return {
        ...state,
        showUpdateForm: action.payload,
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
  }
};

export { initState };
export default Reducer;
