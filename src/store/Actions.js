//actions

export const SET_ISSIGNEDIN = "set_isSignedIn";
export const SET_USER = "set_User";
export const SET_SHOWDIALOG = "set_Dialog";
export const SET_SHOWUPDATEFORM = "set_ShowUpdateForm";

export const SetIsSignedIn = (payload) => {
  return {
    type: SET_ISSIGNEDIN,
    payload,
  };
};

export const SetUser = (payload) => {
  
  return {
    type: SET_USER,
    payload,
  };
};

export const SetDialogShow = (payload) => {
  return {
    type: SET_SHOWDIALOG,
    payload,
  };
};
export const SetShowUpdateForm = (payload) => {
  return {
    type: SET_SHOWUPDATEFORM,
    payload,
  };
};
