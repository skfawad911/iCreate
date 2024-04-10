import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import './Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [MRID, setMRID] = useState("");
  const [PASSWORD, setPassword] = useState("");

  

  const loginSuccess = (username) => {
    toast.success('Login Success !', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      onClose: () => {
        navigate(`/welcome/${MRID}`, {
          state: { username: username },
        });
      },
    });
  };

  const failed = ()=> {toast.error('Wrong MRID or Password!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    
    });
  }





    async function Submit(e) {
      e.preventDefault();
    
      try {
        const response = await fetch("http://test-alb-1273731730.ap-south-1.elb.amazonaws.com:80/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ MRID, PASSWORD }),
        });
    
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
    
        const data = await response.json();
    
        if (data.msg === "Login Successful") {
          setUsername(data.user.USERNAME);
          localStorage.setItem("mrID", data.user._id);
          loginSuccess(data.user.USERNAME);
        } else if (data.msg === "Incorrect Password") {
          // alert("Incorrect Password");
          failed()
        } else {
          // Handle other cases if needed
          alert("Unexpected response from server");
        }
      } catch (error) {
        console.error("Error during login:", error);
        // Handle the error appropriately, e.g., show a generic error message to the user
        // alert("An error occurred during login. Please try again.");
        failed()
      }
    }
    
  return (
    <>
      {/* new login UI  */}

      <div class="flex items-center min-h-screen p-4  lg:justify-center">
        <div class="flex flex-col overflow-hidden w-screen  bg-white rounded-md    md:max-w-screen-md">
          <div class="p-4 py-6 text-white   md:flex md:flex-col md:items-center md:justify-evenly">
            <div class="  tracking-wider text-center ">
              <a
                href="#"
                className="text-[26px] text-black font-bold no-underline"
              >
                iCreate Video
              </a>
              <p className="text-[12px] text-black">
                Welcome ! Please login to your account
              </p>
            </div>
          </div>
          <div class="p-5 bg-white md:flex-1">
            <form action="#" class="flex flex-col space-y-5">
              <div class="flex flex-col space-y-1">
                <label
                  for="email"
                  class=" font-semibold text-gray-500 text-[12px] mb-[15px]"
                >
                  User Name<span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="email"
                  autofocus
                  onChange={(e) => {
                    setMRID(e.target.value);
                  }}
                  class="px-4 py-2  transition duration-300 border border-[#ef8018] rounded-full focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div class="flex flex-col space-y-1">
                <div class="flex items-center justify-between">
                  <label
                    for="password"
                    class="text-[12px] text-gray-500 font-semibold  mb-[15px]"
                  >
                    Password<span className="text-red-700">*</span>
                  </label>
                </div>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  class="px-4 py-2  transition duration-300 border border-[#ef8018] rounded-full focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
                <div className="flex justify-end">
                  <a
                    href="#"
                    class="text-sm text-blue-600 hover:underline focus:text-blue-800"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
            

              <div class="flex flex-col space-y-5">
             
                <div class="flex flex-col space-y-4">
              

                  <div className="flex justify-center items-center pt-[40px]">
                    <button
                      type="submit"
                      onClick={Submit}
                      class="w-[150px] px-4 py-2 text-[16px]  rounded-full  transition-colors duration-300  bg-orange-500 shadow  focus:outline-none focus:ring-blue-200 focus:ring-4"
                    >
                      Login
                    </button>
                    <ToastContainer/>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
