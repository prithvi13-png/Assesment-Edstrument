import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

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
      if (values.password === "123456") {
        localStorage.setItem("userSession", JSON.stringify({ username: values.username }));
        navigate("/invoice");
      } else {
        alert("Password is Incorrect");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white bg-opacity-90 rounded-xl shadow-2xl p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Welcome Back
        </h1>
        <p className="text-gray-700 text-center mb-8">
          Please log in to continue
        </p>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-800"
            >
              Username <span className="text-red-500">*</span>
            </label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
              className={`mt-1 block w-full px-4 py-3 rounded-lg shadow-md bg-gray-100 text-black border ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500 focus:ring-red-400"
                  : "border-transparent focus:ring-blue-400"
              } focus:outline-none focus:ring-2`}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-400 text-sm mt-1">
                {formik.errors.username}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className={`mt-1 block w-full px-4 py-3 rounded-lg shadow-md bg-gray-100 text-black border ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-transparent focus:ring-blue-400"
              } focus:outline-none focus:ring-2`}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-400 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Forgot your password?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Reset it
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
