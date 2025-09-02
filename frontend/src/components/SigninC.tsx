import { useState } from "react";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { SigninInput } from "common-utils-zod-kiran";

const SigninC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [postInputs, setPostInputs] = useState<SigninInput>({
          username: "",
          password: ""
      });
  return (
    <div className="flex min-h-screen">
      <div className="flex w-full lg:w-1/2 justify-center items-center p-6">
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Logo */}
          <div className="mb-6">
            <img src={Logo} alt="Logo" className="w-24 h-auto" />
          </div>

          {/* Center Section */}
          <div className="w-full text-center">
            <h2 className="text-3xl font-bold mb-2">Welcome</h2>
            <p className="text-gray-600 mb-6">Please enter your details</p>

            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) =>
                  setPostInputs({
                    ...postInputs,
                    username: e.target.value,
                  })
                }
              />

              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                  setPostInputs({
                    ...postInputs,
                    password: e.target.value,
                  })
                }
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {/* Options */}
              <div className="flex flex-col xs:flex-row justify-between items-center text-sm text-gray-600 gap-2 sm:gap-0">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  Remember for 30 days
                </label>
                <a className="text-blue-600 hover:underline cursor-pointer">
                  Forgot password?
                </a>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  type="button"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Log In
                </button>
                <button
                  type="button"
                  disabled
                  className="flex-1 flex items-center justify-center gap-2 border py-2 rounded-lg cursor-no-drop opacity-15"
                >
                  <img src={GoogleSvg} alt="Google" className="w-5 h-5" />
                  Log In with Google
                </button>
              </div>
            </form>
          </div>

          {/* Bottom Text */}
          <p className="mt-6 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

       <div className="hidden lg:flex w-1/2 bg-neutral-900 text-white items-center justify-center p-12">
        <div className="max-w-lg text-center space-y-6">
            <h2 className="text-4xl font-bold leading-snug">
            “Words are, in my not-so-humble opinion, our most inexhaustible source of magic.”
            </h2>
            <p className="text-lg text-gray-400">— J.K. Rowling</p>
            <p className="text-sm text-gray-500">
            Share your thoughts, inspire the world, and let your ideas live forever through writing.
            </p>
        </div>
        </div>

    </div>
  );
};

export default SigninC;
