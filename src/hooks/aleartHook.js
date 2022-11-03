import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const aleartHook = () => {
  const notify = () => toast("User đã tham gia nhóm!", {
    backgroundColor: '#72abff',
    color: '#ffffff',
  });
  return {
    notify: notify,
  };
};

export default aleartHook;
