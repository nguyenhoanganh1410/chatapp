import LoginForm from "../components/form/LoginForm";
import "./LoginPageStyle.scss";
const LoginPage = ({ setToken }) => {
  return (
    <div className="login">
      <h1>Zalo</h1>
      <p className="text">
        Đăng nhập tài khoản Zalo
        <br />
        để kết nối với ứng dụng Zalo Chat
      </p>
      <LoginForm setToken={setToken} />
    </div>
  );
};

export default LoginPage;
