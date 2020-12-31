import React, { useState } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Image } from "cloudinary-react";
import { useCamp } from "../context/campContext/CampState";
import { FirstLoading } from "./Loading";
import "mapbox-gl/dist/mapbox-gl.css";
const ShowAllGroundMap = () => {
  const { campGround, isLoading } = useCamp();
  const [selectedPlace, setselectedPlace] = useState(null);

  const [viewport, setViewport] = useState({
    latitude: 35.9078,
    longitude: 127.7669,
    zoom: 6,
    width: "100%",
    height: "350px"
  });

  if (isLoading) {
    return <FirstLoading loading size={50} height="300px" />;
  }
  return (
    <>
      <ReactMapGL
        className="map"
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewport) => setViewport(viewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <div className="navStyle">
          <NavigationControl />
        </div>
        {campGround.map((singleGround) => {
          return (
            <Marker
              key={singleGround._id}
              latitude={singleGround.geometry.coordinates[1]}
              longitude={singleGround.geometry.coordinates[0]}
            >
              <button
                style={{
                  background: "none",
                  border: "none",
                  outlineStyle: "none",
                  cursor: "pointer"
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setselectedPlace(singleGround);
                }}
              >
                <FaMapMarkerAlt size="2rem" color="#e74c3c" />
              </button>
            </Marker>
          );
        })}
        {selectedPlace && (
          <Popup
            latitude={selectedPlace.geometry.coordinates[1]}
            longitude={selectedPlace.geometry.coordinates[0]}
            onClose={() => setselectedPlace(null)}
          >
            <div>
              <h4>{selectedPlace.title}</h4>
              <Image
                cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                publicId={selectedPlace.image.filename}
                width="100"
                height="60"
                crop="fill"
                quality="80"
              />
              {/* <Link to={`/campground/${selectedPlace._id}`}>go campground</Link> */}
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </>
  );
};

export default ShowAllGroundMap;
