import React, { useState } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import UserSidebar from "../Sidebar/Sidebar";
// import "./Login.css";

function Welcome() {
  const { MRID } = useParams();
  const [isMenuChecked2, setMenuChecked2] = useState(false);
  const [isMenuChecked, setMenuChecked] = useState(false);

  const location = useLocation();
  const { username } = location.state || {};

  const handleMenuToggle2 = () => {
    console.log("toogle2");
    setMenuChecked2(!isMenuChecked2);
    setMenuChecked(false);
  };

  const handleMenuToggle = () => {
    console.log("toogle1");
    setMenuChecked(!isMenuChecked);
    setMenuChecked2(false);
  };

  return (
    <> 

     <UserSidebar/>



    <div className="flex justify-center relative top-[50px] ">
        
      <div className="absolute w-[360px] h-[1040px] xl:w-[74vw] sm:w-[84vw] overflow-x-hidden ">
       
        <div className="  ">
          <div className="absolute  left-[102px] top-[40px] sm:top-[90px] lg:top-[44px] xl:top-[40px] text-[#ef8018]  h-[31px] text-left font-bold text-[23px] sm:text-[45px] sm:left-[170px] lg:left-[290px] xl:left-[399px]">
            <span>iCreate Video</span>
          </div>

         
        </div>

<div className="w-full">
        <div className=" mt-[10px]  gap-10 grid grid-cols-2 sm:grid-cols-3 text-[9px] relative top-[85px] lg:top-[120px] sm:top-[185px] sm:left-[-10px] lg:left-[100px] xl:left-[200px]   sm:w-[800px]">
          <div className="relative">
            <div className="absolute left-[19px] sm:left-[21px] top-[10px] text-[9px] font-bold  sm:text-[15px] ">
              <div className="text-white rounded-full bg-gradient-to-r no-underline  from-[rgba(230,157,234,0.8)] to-[#9F3AF0] text-center flex justify-center items-center h-[37px] w-[147px] sm:w-[300px] sm:h-[45px] relative ">
              <NavLink className="no-underline text-white" to={`/home/${MRID}`}>
                Video Card 1
                </NavLink>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-[-18px] top-[10px] text-[9px] font-bold sm:text-[15px] ">
              <div className="text-white rounded-full bg-gradient-to-r from-[#fcce8a] to-[#f59416] text-center flex justify-center items-center h-[37px] w-[147px] sm:w-[300px] sm:h-[45px] relative sm:left-[92px]">
              <NavLink style={{ pointerEvents: 'none', cursor: 'default' }} className="no-underline text-white">
                Video Card 2
                </NavLink>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-[19px] top-[37px] sm:top-[88px] sm:left-[-540px] text-[9px] font-bold  sm:text-[15px]">
              <div className=" text-white rounded-full bg-gradient-to-r from-[#f37fac] to-[#ce0ca7] text-center flex justify-center items-center h-[37px] w-[147px] sm:w-[300px] sm:h-[45px]">
              <NavLink style={{ pointerEvents: 'none', cursor: 'default' }} className="no-underline text-white">
                Video Card 3
                </NavLink>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-[-18px] top-[37px] text-[9px] font-bold  sm:text-[15px] ">
              <div className=" text-white rounded-full bg-gradient-to-r from-[#83aee6] to-[#368ee7] relative sm:left-[372px] sm:top-[12px] text-center flex justify-center items-center h-[37px] w-[147px] sm:w-[300px] sm:h-[45px]">
              <NavLink style={{ pointerEvents: 'none', cursor: 'default' }} className="no-underline text-white">
                Video Card 4
                </NavLink>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-[19px] top-[65px] sm:top-[125px] sm:left-[-263px] text-[9px] font-bold  sm:text-[15px]">
              <div className=" text-white rounded-full bg-gradient-to-r from-[#84f6bd] to-[#08d966] text-center flex justify-center items-center h-[37px] w-[147px] sm:w-[300px] sm:h-[45px]">
              <NavLink style={{ pointerEvents: 'none', cursor: 'default' }} className="no-underline text-white">
                Video Card 5
                </NavLink>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-[-18px] top-[65px] text-[9px] font-bold   sm:text-[15px]">
              <div className=" text-white rounded-full bg-gradient-to-r from-[#d79369] to-[#f04b0f] relative sm:left-[-187px] sm:top-[60px] text-center flex justify-center items-center h-[37px] w-[147px] sm:w-[300px] sm:h-[45px]">
              <NavLink style={{ pointerEvents: 'none', cursor: 'default' }} className="no-underline text-white">
                Video Card 6
                </NavLink>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-[19px] top-[93px] sm:top-[159px] sm:left-[15px] text-[9px] font-bold  sm:text-[15px]">
              <div className=" text-white rounded-full bg-gradient-to-r from-[#b46aae] to-[#e407bb] text-center flex justify-center items-center h-[37px] w-[147px] sm:w-[300px] sm:h-[45px]">
              <NavLink style={{ pointerEvents: 'none', cursor: 'default' }} className="no-underline text-white">
                  Video Card 7
                </NavLink>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-[-18px] top-[93px] text-[9px] font-bold  sm:text-[15px]">
              <div className=" border-2 border-black  text-white rounded-full  text-center relative sm:left-[92px] sm:top-[65px] flex justify-center items-center h-[37px] w-[147px] sm:w-[300px] sm:h-[45px]">
                <NavLink className="no-underline text-black" to={``}>More</NavLink>
              </div>
            </div>
          </div>

          <div className="absolute top-[290px] left-[22px] w-[60px] font-bold text-[12px] sm:top-[310px] ">
            <span>Find more</span>
          </div>

          <>
            {/* // dropdowns  */}
            <div className="flex flex-col ">
              {/* // dropdown 1  */}
              <div className="relative top-[161px] sm:top-[288px] sm:left-[-548px] left-[20px] w-[80vw] lg:w-[54vw] sm:w-[81vw] xl:w-[42vw] h-[50px] border-2 border-black rounded-full">
                <nav class="flex-1">
                  <div class="relative transition">
                    <input
                      class="peer hidden"
                      type="checkbox"
                      id="menu-1"
                      // checked={isMenuChecked2}
                      // onChange={handleMenuToggle2}
                    />
                    <button class="flex peer relative w-full items-center font-bold  py-3 px-4 text-sm  text-gray-600 outline-none transition-all duration-100 ease-in-out  ">
                      <span class="flex mr-5 w-5 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </span>
                      Recent Used Templates
                      <label
                        for="menu-1"
                        class="absolute inset-0 h-full w-full cursor-pointer"
                      ></label>
                    </button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-600 transition peer-checked:rotate-180 peer-hover:text-rose-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    <ul class="duration-400 flex m-2 max-h-0 flex-col overflow-hidden rounded-xl  font-medium transition-all duration-300 peer-checked:max-h-96">
                      <li class="flex m-2 cursor-pointer  py-3  text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600">
                        {/* <img src="https://cdn-jogdf.nitrocdn.com/VdmdyyNZrFGmsIskKZBjPuoUCgJnzZpw/assets/images/optimized/rev-669cd42/www.craftyartapp.com/blog/wp-content/uploads/2023/10/a2108aedf596968c6facb55a7b009fcb-1.webp" /> */}
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>

        

              <div className={`relative top-[178px]  sm:top-[310px]  sm:left-[-548px] left-[20px] w-[80vw]   lg:w-[54vw] sm:w-[81vw] xl:w-[42vw] h-[50px] border-2 border-black rounded-full ${isMenuChecked2 ? 'mt-[500px]' : ''}`}>
                <nav class="flex-1">
                  <div class="relative transition">
                    <input
                      class="peer hidden"
                      type="checkbox"
                      id="menu-2"
                      // checked={isMenuChecked}
                      // onChange={handleMenuToggle}
                    />
                    <button class="flex peer relative w-full items-center  py-3 px-4 text-sm font-bold text-gray-600 outline-none transition-all duration-100 ease-in-out  ">
                      <span class="flex mr-5 w-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </span>
                      Most Popular Templates
                      <label
                        for="menu-2"
                        class="absolute inset-0 h-full w-full cursor-pointer"
                      ></label>
                    </button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-600 transition peer-checked:rotate-180 peer-hover:text-rose-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    <ul class="duration-400 flex m-2 max-h-0 flex-col overflow-hidden rounded-xl  font-medium transition-all duration-300 peer-checked:max-h-96">
                      <li class="flex m-2 cursor-pointer  py-3  text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600">
                        {/* <img src="https://cdn-jogdf.nitrocdn.com/VdmdyyNZrFGmsIskKZBjPuoUCgJnzZpw/assets/images/optimized/rev-669cd42/www.craftyartapp.com/blog/wp-content/uploads/2023/10/a2108aedf596968c6facb55a7b009fcb-1.webp" /> */}
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </>
        </div>

        </div>
      </div>
    </div>
    </>
  );
}

export default Welcome;
