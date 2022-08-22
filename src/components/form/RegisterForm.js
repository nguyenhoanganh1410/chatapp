import "./RegisterForm.scss";
import * as React from "react";

import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

import userApi from "../../api/userApi";

import Context from "../../store/Context";
import { SetUser } from "../../store/Actions";

import { useNavigate } from "react-router-dom";

import firebase from "../../firebase";

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { state, depatch } = React.useContext(Context);
  //detructering...
  const { user } = state;

  const navigate = useNavigate();

  const handleRegister = () => {
    //valid email
    var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!email.match(regex)) {
      // setTextNo("Email không đúng định dạng!!");
      return;
    }
  };

  return (
    <div className="login_form">
      <form style={{ height: "auto" }}>
        <TextField
          style={{ width: "100%" }}
          id="username"
          label="Email"
          variant="outlined"
        />
        <TextField
          style={{ width: "100%", margin: "0.5rem 0" }}
          id="password"
          variant="outlined"
          label="Mật khẩu"
          type="password"
        />
        <TextField
          style={{ width: "100%", margin: "0.5rem 0" }}
          id="passwordAgain"
          variant="outlined"
          label="Nhập Lại Mật khẩu"
          type="password"
        />
        <TextField
          style={{ width: "100%", margin: "0.5rem 0" }}
          id="firstName"
          variant="outlined"
          label="Họ"
          type="text"
        />
        <TextField
          style={{ width: "100%", margin: "0.5rem 0" }}
          id="lastName"
          variant="outlined"
          label="Tên đêm và tên"
          type="text"
        />
        {/* {textNo ? <p className="erro">{textNo}</p> : null} */}

        <div style={{ width: "100%" }}>
          <Button
            style={{
              width: "100%",
              marginBottom: "1rem",
              marginTop: "1rem",
              padding: "10px 12px",
            }}
            variant="contained"
            onClick={() => handleRegister()}
          >
            Đăng Ký
          </Button>
          <p>Quên mật khẩu?</p>
        </div>
      </form>
      <p>
        Bạn đã có tài khoản?{" "}
        <span onClick={() => navigate("/login")}>Đăng nhập ngay</span>
      </p>
    </div>
  );
};

export default LoginForm;
