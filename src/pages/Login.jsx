import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Login = () => {
  const { login, signInWithGoogle, signInWithGitHub, signInWithFacebook } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    login(email, password)
      .then(result => {
        console.log(result.user)

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome back, ${email}!`,
          showConfirmButton: false,
          timer: 2000,
        });

        // Navigate to homepage or dashboard
        navigate("/");
      })
      .catch(error => {
        console.log('error: ', error);

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid information!!!",
        });
      })
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-green-400 flex-col">
      {/* Optional: Background stars */}
      <div className="absolute inset-0 -z-10">
        {/* You can reuse your NavbarBackground here if you want */}
      </div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Login
        </h1>

        {error && (
          <div className="text-red-500 mb-4 text-center font-medium">{error}</div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </motion.button>
        </form>

        <motion.button
          type="button"
          onClick={() => signInWithGoogle()
            .then(result => {
              console.log(result.user);
              Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: `Welcome back, ${result.user.displayName}!`,
                showConfirmButton: false,
                timer: 2000,
              });
              navigate("/");
            })
            .catch(error => {
              console.log(error);
              Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error.message,
              });
            })
          }
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-black rounded-lg shadow-md hover:bg-red-600 transition mt-4 w-full"
        >
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-6 h-6" />
          Continue with Google
        </motion.button>

        <motion.button
          type="button"
          onClick={() =>
            signInWithGitHub()
              .then(result => {
                console.log(result.user);
                Swal.fire({
                  icon: "success",
                  title: "Login Successful",
                  text: `Welcome back, ${result.user.displayName}!`,
                  showConfirmButton: false,
                  timer: 2000,
                });
                navigate("/");
              })
              .catch(error => {
                console.log(error);
                Swal.fire({
                  icon: "error",
                  title: "Login Failed",
                  text: error.message,
                });
              })
          }
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900 transition mt-4 w-full"
        >
          <img src="https://www.svgrepo.com/show/217753/github.svg" alt="GitHub" className="w-6 h-6" />
          Continue with GitHub
        </motion.button>

        <motion.button
          type="button"
          onClick={() =>
            signInWithFacebook()
              .then(result => {
                console.log(result.user);
                Swal.fire({
                  icon: "success",
                  title: "Login Successful",
                  text: `Welcome back, ${result.user.displayName}!`,
                  showConfirmButton: false,
                  timer: 2000,
                });
                navigate("/");
              })
              .catch(error => {
                console.log(error);
                Swal.fire({
                  icon: "error",
                  title: "Login Failed",
                  text: error.message,
                });
              })
          }
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-lg shadow-md hover:bg-blue-900 transition mt-4 w-full"
        >
          <img
            src="https://www.svgrepo.com/show/452196/facebook-1.svg"
            alt="Facebook"
            className="w-6 h-6"
          />
          Continue with Facebook
        </motion.button>



        <p className="mt-4 text-center text-gray-700">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-500 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </motion.div>

      {/* Button to go back */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition duration-200"
      >
        ⬅ Back to Home
      </Link>
    </div>
  );
};

export default Login;
