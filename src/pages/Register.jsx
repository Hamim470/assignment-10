import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

export default function Register() {
  const { register, signInWithGoogle, signInWithGitHub,signInWithFacebook } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = formData.name;
    const photo_url = formData.photo_url;

    setErrorMessage(""); // reset old error

    if (formData.password.length < 6) {
      setErrorMessage("Password should be at least 6 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (!/[A-Z]/.test(formData.password)) {
      setErrorMessage("Password must include at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(formData.password)) {
      setErrorMessage("Password must include at least one lowercase letter.");
      return;
    }

    // 🚀 API call for registration goes here
    register(formData.email, formData.password)
      .then(result => {
        console.log(result.user);


        updateProfile(result.user, {
          displayName: name, photoURL: photo_url
        }).then(() => {
          // Profile updated!
          // ...
        }).catch((error) => {
          // An error occurred
          // ...
        });



        // ✅ SweetAlert Success
        Swal.fire({
          title: "Registration Successful!",
          text: "You can now login with your credentials.",
          icon: "success",
          confirmButtonText: "Go to Login",
          confirmButtonColor: "#22c55e",
        }).then(() => {
          // ✅ Navigate to login after alert
          navigate("/login");
        })
          .catch(error => {
            console.log('error: ', error)

            // ❌ SweetAlert Error
            Swal.fire({
              title: "Registration Failed",
              text: error.message,
              icon: "error",
              confirmButtonText: "Try Again",
              confirmButtonColor: "#ef4444",
            });
          });
      })
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        {/* Animated Heading */}
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl font-bold text-white text-center mb-6"
        >
          Create Account ✨
        </motion.h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <label className="block text-sm font-medium text-white">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 rounded-lg border border-white/30 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="John Doe"
            />
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label className="block text-sm font-medium text-white">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 rounded-lg border border-white/30 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="example@email.com"
            />
          </motion.div>

          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <label className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 rounded-lg border border-white/30 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="********"
            />
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <label className="block text-sm font-medium text-white">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 rounded-lg border border-white/30 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="********"
            />
          </motion.div>

          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <label className="block text-sm font-medium text-white">
              Photo URL
            </label>
            <input
              type="text"
              name="photo_url"
              value={formData.photo_url}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 rounded-lg border border-white/30 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="********"
            />
          </motion.div>

          {/* Error Message */}
          <motion.p
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full text-red-400 font-semibold rounded-lg"
          >
            {errorMessage}
          </motion.p>


          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 mt-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl transition-all"
          >
            Register 🚀
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



        {/* Already have account? */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6 text-center text-sm text-white/80"
        >
          Already have an account?{" "}
          <a href="/login" className="text-pink-300 font-semibold hover:underline">
            Login
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}
