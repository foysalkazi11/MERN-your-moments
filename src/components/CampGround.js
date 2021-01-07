import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCamp } from "../context/campContext/CampState";
import { Image } from "cloudinary-react";
import ShowAllGroundMap from "./ShowAllGroundMap";

import { FirstLoading } from "./Loading";
// import { notification, ToastContainer } from "../utility/notification";

const CampGround = () => {
  const { allCamp, isLoading, error, campGround } = useCamp();

  // const previousData = useRef("");

  useEffect(() => {
    allCamp();
    //eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <FirstLoading loading={isLoading} size={100} />;
  }
  //36D7B7
  if (error) {
    return (
      <div className="loading">
        <h4>{error}</h4>
      </div>
    );
  }

  return (
    <section className="main-body">
      <div className="campground-container">
        <div className="map">
          <ShowAllGroundMap />
        </div>

        {/* {data.length > previousData.current.length &&
        notification("info", "successfully added new campground")}
      <ToastContainer /> */}

        <div className="campground">
          {campGround.map((camp) => {
            return (
              <div className="campground-container" key={camp._id}>
                {/* <img
                src={camp.image.url}
                alt=""
                className="campground-img"
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              /> */}
                <div>
                  <Image
                    cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                    publicId={camp.image.filename}
                    width="450"
                    height="250"
                    crop="fill"
                    quality="80"
                  />
                </div>
                <div className="campground-info">
                  <h4>{camp.title}</h4>
                  <p>{camp.location}</p>
                  <button className="btn">
                    <Link to={`/campground/${camp._id}`}>Show More</Link>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CampGround;
