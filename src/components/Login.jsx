import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: (values) => {
      // Store user session in localStorage
      if ( values.password === "123456") {
        localStorage.setItem("userSession", JSON.stringify({ username: values.username }));
        navigate("/invoice"); // Redirect to the main application
      }
      else {
        alert("Password is Incorrect")
      }
    },
  });

  return (
    <div className="login-container">
      <form onSubmit={formik.handleSubmit} className="login-form">
        <h1>Login</h1>

        <div>
          <label htmlFor="username">Username *</label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error">{formik.errors.username}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="password">Password *</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>

        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
