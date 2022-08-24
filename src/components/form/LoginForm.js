import "./LoginFormStyle.scss";
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
  const [activeLoginBtn, setActiveLoginBtn] = React.useState(false);
  const [textNo, setTextNo] = React.useState("");

  const { state, depatch } = React.useContext(Context);
  //detructering...
  const { user } = state;

  const navigate = useNavigate();

  const handleLogin = () => {
    //valid email
    var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!email.match(regex)) {
      setTextNo("Email không đúng định dạng!!");
      return;
    }

    //send email, pass to server
    const loginFunc = (mail, pass) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(mail, pass)
        .then((userCredential) => {
          //redict homepage
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          setTextNo(
            "Tên đăng nhập hoặc mật khẩu không khớp, vui lòng nhập lại"
          );
        });
    };
    loginFunc(email, password);
  };

  const handleEmail = (e) => {
    const emailTempl = e.target.value;
    setEmail(emailTempl);
    if (password >= 7 && emailTempl) {
      setActiveLoginBtn(true);
    } else if (!emailTempl) {
      setActiveLoginBtn(false);
    }
  };
  const handlePassword = (e) => {
    const passTemp = e.target.value;
    setPassword(passTemp);
    if (passTemp.length >= 7 && email) {
      setActiveLoginBtn(true);
    } else if (passTemp.length < 7) {
      setActiveLoginBtn(false);
    }
  };

  return (
    <div className="login_form">
      <form>
        <TextField
          style={{ width: "100%" }}
          id="username"
          label="Email"
          variant="outlined"
          onChange={(e) => handleEmail(e)}
        />
        <TextField
          style={{ width: "100%", margin: "0.5rem 0" }}
          id="password"
          variant="outlined"
          label="Mật khẩu"
          type="password"
          onChange={(e) => handlePassword(e)}
        />
        {textNo ? <p className="erro">{textNo}</p> : null}

        <div style={{ width: "100%" }}>
          <Button
            style={{
              width: "100%",
              marginBottom: "1rem",
              padding: "10px 12px",
            }}
            variant="contained"
            onClick={() => handleLogin()}
            disabled={activeLoginBtn ? false : true}
          >
            Đăng nhập
          </Button>
          <p>Quên mật khẩu?</p>
        </div>
      </form>
      <p>
        Bạn chưa có tài khoản?{" "}
        <span onClick={() => navigate("/register")}>Đăng ký ngay</span>
      </p>
    </div>
  );
};

export default LoginForm;
