import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { IoMdArrowRoundBack } from "react-icons/io";
import Video from "../videostest/doctorday.mp4";

const HomePage = () => {
  const navigate = useNavigate();
  const { MRID } = useParams();

  const gototemp = (videoname, name) => {
    console.log(name);
    if (name === "DoctorDay") {
      navigate(`/temp1/${videoname}/${MRID}/${name}`);
    } else if (name === "BirthDayTest") {
      navigate(`/temp2/${videoname}/${MRID}/${name}`);
    } else if (name === "BirthDay") {
      navigate(`/temp3/${videoname}/${MRID}/${name}`);
    } else if (name === "Layout4") {
      navigate(`/temp4/${videoname}`);
    } else if (name === "Layout5") {
      navigate(`/temp5/${videoname}`);
    }
  };

  const [allVideName, setAllVideoName] = useState([]);

  const videoRef = useRef(null);

  const fetchVideoName = () => {
    fetch("http://192.168.1.18:3000/api/auth/all-video-name")
      .then((res) => res.json())
      .then((data) => {
        setAllVideoName(data);
      });
  };

  useEffect(() => {
    fetchVideoName();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="w-[99vw]">
          <Sidebar />
        </div>

        <div className="absolute top-[34px] w-[335px] ">
          <div className="flex flex-row justify-between items-center relative top-[-8px] ">
            <NavLink
              className="p-5 flex relative left-[-36px] "
              to={`/welcome/${MRID}`}
            >
              <div
                style={{ backgroundColor: "#F58420", color: "white" }}
                className="p-[12px] drop-shadow-lg    h-10 w-10   rounded-full relative  top-[-4px] left-[17px]"
              >
                <IoMdArrowRoundBack />
              </div>
            </NavLink>
            <div className="text-black text-[20px] font-bold relative left-[-120px] top-[4px]  ">
              <p>Video Card</p>
            </div>
          </div>
          <div className="font-bold text-[11px] top-[-34px] relative left-[55px] w-[250px] text-[rgba(158,156,158,1)] ">
            <p>Please select your preferable design templates.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 relative top-[-26px]">
            {allVideName.map((videoname) => (
              <div
                key={videoname.video}
                className="relative flex justify-center items-center "
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 w-[335px]">
                  <div className="h-[300px] w-full overflow-hidden cursor-pointer">
                    <video
                      ref={videoRef}
                      width="100%"
                      className="rounded-md shadow-md h-full cursor-pointer"
                      onClick={() => {
                        gototemp(videoname.video, videoname.name);
                      }}
                    >
                      <source
                        src={` http://main-alb-773490635.ap-south-1.elb.amazonaws.com:8050/${videoname.video}`}
                        type="video/mp4"
                      />
                    </video>
                  </div>

                  <div className="h-[35px]  relative top-[8px] text-center text-white bg-orange-500 font-extrabold text-xl">
                    <h5 className="text-center">{videoname.name}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;