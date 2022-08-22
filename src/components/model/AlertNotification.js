import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./AlertNotification.scss";

export default function AlertNotification({
  openAlert,
  closeOpenAlert,
  handleSubmitChange,
}) {
  const handleClose = () => {
    closeOpenAlert();
  };

  const handleSubmit = () => {
    handleSubmitChange();
    closeOpenAlert();
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={openAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xác nhận"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có muốn lưu thay đổi?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Không
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Có
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
