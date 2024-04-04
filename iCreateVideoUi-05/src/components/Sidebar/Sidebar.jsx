

import React, { useState } from 'react';
import { IoIosNotificationsOutline } from "react-icons/io";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUsermenuOpen, setIsUsermenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  const [userProfile, setUserProfile] = useState(null);
  const { MRID } = useParams();

  const navigate = useNavigate();

  const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleUserDropdown = () => {
      setIsUsermenuOpen(!isUsermenuOpen);
  };

  const handleLogout = () => {
      localStorage.clear();
      navigate('/');
  };

  const renderContent = () => {
      if (activeMenuItem === 'Dashboard') {
          return (
              <>
                  {/* <Dashboard /> */}
              </>
          );
      }
      else if (activeMenuItem === 'WebsiteQRCodes') {
          return (
              <>
                  {/* <QRCodes /> */}
              </>
          );
      }
      else if (activeMenuItem === 'vCard') {
          return (
              <>
                  {/* <Vcard /> */}
              </>
          );
      }
      else if (activeMenuItem === 'PDF') {
          return (
              <>
                  {/* <PDF /> */}
              </>
          );
      }
      else if (activeMenuItem === 'Coupon') {
          return (
              <>
                  {/* <Coupon /> */}
              </>
          );
      }
      else if (activeMenuItem === 'Event') {
          return (
              <>
                  {/* <EventPage /> */}
              </>
          );
      }
  };
  const customstyle = {
        paddingTop: "50px",
      };
  const handleMenuItemClick = (menuItem) => {
      setActiveMenuItem(menuItem);
  };

  return (
      <>
          <nav className="fixed top-0 z-50 w-full bg-[#F58420] border-b border-gray-200">
              <div className="px-3 py-2 lg:px-5 lg:pl-3">
                  <div className="flex items-center justify-between">
                      <div className="flex items-center justify-start rtl:justify-end">
                        
                          <button
                              data-drawer-target="logo-sidebar"
                              data-drawer-toggle="logo-sidebar"
                              aria-controls="logo-sidebar"
                              type="button"
                              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg xl:hidden   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                              onClick={toggleSidebar}
                          >
                              <span className="sr-only">Open sidebar</span>
                              <svg
                                  className="w-6 h-6"
                                  aria-hidden="true"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                              >
                                  <path
                                      clipRule="evenodd"
                                      fillRule="evenodd"
                                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                  ></path>
                              </svg>
                          </button>
                          
                      </div>
                      
                      <div className="flex items-center">
                      <IoIosNotificationsOutline size={"30px"} />
                          <div className="flex items-center ms-3 relative">
                              <button
                                  type="button"
                                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                                  aria-expanded={isUsermenuOpen}
                                //   onClick={toggleUserDropdown}
                              >
                                  <span className="sr-only">Open user menu</span>
                                  <img className="w-8 h-8 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlyY8VXcMmOlJYxKPyqZgytja_-s2Kwmm80Q&usqp=CAU" alt="user photo" />
                              </button>
                              {isUsermenuOpen && (
                                  <div className="z-50 absolute mt-40 py-25 right-0 w-40 h-38 text-base bg-white divide-y divide-gray-100 rounded shadow" id="dropdown-user">
                                     
                                      <ul className="py-1" role="none">
                                          <li>
                                              <a type="button"
                                                  onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 " role="menuitem">
                                                  Sign out
                                              </a>
                                          </li>
                                      </ul>
                                  </div>
                              )}
                          </div>
                      </div>
                  </div>
              </div>
          </nav>

          <aside
              id="logo-sidebar"
              className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform transform -translate-x-full bg-[#F58420] border-r border-gray-200 xl:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : ''
                  }`}
              aria-label="Sidebar"
          >
              <div className="h-full px-5 pb-4 overflow-y-auto bg-[#F58420]">
                  <ul className="space-y-2 font-medium">
                  <li style={customstyle}>
                      <NavLink to={`/welcome/${MRID}`}>
                        <button className="capitalize text-white" onClick={toggleSidebar}>
                          Home
                        </button>
                      </NavLink>
                    </li>
                      <li style={customstyle}>
                   <NavLink to={`/home/${MRID}`}>
                         <button className="capitalize text-white" onClick={toggleSidebar}>
                           Video Cards
                         </button>
                       </NavLink>
                    </li>
                    <li className="pt-[223px]">
                      <NavLink to={`/`}>
                        <button className="capitalize text-white">Logout</button>
                      </NavLink>
                    </li>
                  </ul>
              </div>
          </aside>
          

      </>
  );
};
export default Sidebar;
