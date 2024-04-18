import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { IoMdArrowRoundBack } from "react-icons/io";
import Image1 from "../components/assets/doctorimg.jpg";
// import Image2 from '../components/assets/birthday.jpg'
import Image2 from "../components/assets/Birthdayimg.jpg";

const HomePage = () => {
  const navigate = useNavigate();
  const { MRID } = useParams();

  const gototemp = (videoname, name) => {
    console.log(name);
    if (name === "Doctor's Day") {
      navigate(`/temp1/${videoname}/${MRID}/${name}`);
    } else if (name === "BirthDayTest") {
      navigate(`/temp2/${videoname}/${MRID}/${name}`);
    } else if (name === "Birthday") {
      navigate(`/temp3/${videoname}/${MRID}/${name}`);
    } else if (name === "Layout4") {
      navigate(`/temp4/${videoname}`);
    } else if (name === "Layout5") {
      navigate(`/temp5/${videoname}`);
    }
  };

  const [allVideName, setAllVideoName] = useState([]);
  const [allVideoData, setAllVideoData] = useState([]);

  const videoRef = useRef(null);

  // const fetchVideoName = () => {
  //   fetch("http://192.168.1.18:3000/api/auth/all-video-name")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setAllVideoName(data);
  //     });
  // };

  // useEffect(() => {
  //   fetchVideoName();
  // }, []);

  const fetchVideoName = () => {
    fetch(" http://test-alb-213012948.ap-south-1.elb.amazonaws.com/api/auth/all-video-name")
      .then((res) => res.json())
      .then((data) => {
        // Combine video data with imported poster images
        const updatedVideoData = data.map((video) => {
          let randomImage;
          switch (video.name) {
            case "Doctor's Day":
              randomImage = Image1;
              break;
            case "Birthday":
              randomImage = Image2;
              break;
            // Add cases for other video names as needed
            default:
              // Use a default image if no match is found
              randomImage = Image1;
              break;
          }
          return { ...video, posterImage: randomImage };
        });
        setAllVideoData(updatedVideoData);
      });
  };
  useEffect(() => {
    fetchVideoName();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center  overflow-x-hidden">
        <div className="w-[100vw]">
          <Sidebar />
        </div>

        <div className="absolute top-[34px] w-[335px]  sm:w-[750px] lg:left-[140px] sm:left-[10px] xl:left-[450px] ">
          <div className=" w-full">
            <div className="flex flex-row justify-between items-center relative top-[-8px] ">
              <NavLink
                className="p-5 flex relative left-[-36px] "
                to={`/welcome/${MRID}`}
              >
                <div
                  style={{ backgroundColor: "#F58420", color: "white" }}
                  className="p-[12px] drop-shadow-lg    h-10 w-10   rounded-full relative  top-[-4px] left-[17px] sm:left-[20px]  "
                >
                  <IoMdArrowRoundBack />
                </div>
              </NavLink>
              <div className="text-black text-[20px] font-bold relative left-[-120px] sm:left-[-320px] top-[-2px]   ">
                <p>Video Cards</p>
              </div>
            </div>

            <div className="font-bold text-[11px] top-[-34px] relative left-[105px] sm:left-[251px] w-[250px]   sm:text-center   text-[rgba(158,156,158,1)]">
              <p>Please select your Video.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 relative top-[-26px] sm:top-0 sm:w-auto   ">
            {allVideoData.map((videoData) => (
              <div
                key={videoData.video}
                className="relative flex justify-center items-center  "
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 w-[335px]">
                  <div className="h-[300px] w-full overflow-hidden cursor-pointer">
                    <video
                      ref={videoRef}
                      width="100%"
                      className="rounded-md shadow-md h-full cursor-pointer"
                      onClick={() => {
                        gototemp(videoData.video, videoData.name);
                      }}
                      poster={videoData.posterImage} // Assign the imported poster image
                    >
                      <source
                        src={`http://test-alb-213012948.ap-south-1.elb.amazonaws.com/${videoData.video}`}
                        type="video/mp4"
                      />
                    </video>
                  </div>

                  <div className="h-[35px] relative top-[8px] text-center text-white bg-orange-500 font-extrabold text-xl">
                    <h5 className="text-center">{videoData.name}</h5>
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
