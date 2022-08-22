import LoginForm from "../components/form/LoginForm";
import "./LoginPageStyle.scss";
import RegisterForm from "../components/form/RegisterForm";
const RegisterPage = ({ setToken }) => {
  return (
    <div className="login" style={{ height: "auto" }}>
      <h1>Zalo</h1>
      <p className="text">Đăng ký tài khoản Zalo</p>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
