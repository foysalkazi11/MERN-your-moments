import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Image } from "cloudinary-react";
import { useCamp } from "../context/campContext/CampState";
import "mapbox-gl/dist/mapbox-gl.css";
import { FirstLoading } from "./Loading";

const ShowSingleGroundMap = () => {
  const { singleGround, newSingleGround } = useCamp();
  const [selectedPlace, setselectedPlace] = useState(false);
  const [loading, setloading] = useState(true);
  const [viewport, setViewport] = useState({
    latitude: "",
    longitude: "",
    zoom: 10,
    width: "100%",
    height: "350px"
  });

  useEffect(() => {
    if (newSingleGround && singleGround) {
      setViewport({
        ...viewport,
        latitude: singleGround.geometry.coordinates[1],
        longitude: singleGround.geometry.coordinates[0]
      });
      setloading(false);
    }
    //eslint-disable-next-line
  }, [newSingleGround, singleGround]);

  if (loading) {
    return <FirstLoading loading size={50} height="300px" />;
  }

  return (
    <>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewport) => setViewport(viewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <div className="navStyle">
          <NavigationControl />
        </div>
        <Marker
          key={singleGround._id}
          longitude={viewport.longitude}
          latitude={viewport.latitude}
        >
          <div>
            <button
              style={{
                background: "none",
                border: "none",
                outlineStyle: "none",
                cursor: "pointer"
              }}
              onClick={(e) => {
                e.preventDefault();
                setselectedPlace(!selectedPlace);
              }}
            >
              <FaMapMarkerAlt size="2rem" color="#e74c3c" />
            </button>
          </div>
        </Marker>
        {selectedPlace && (
          <Popup
            longitude={viewport.longitude}
            latitude={viewport.latitude}
            onClose={() => setselectedPlace(false)}
          >
            <div>
              <h4>{singleGround.title}</h4>
              <Image
                cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                publicId={singleGround.image.filename}
                width="100"
                height="60"
                crop="fill"
                quality="80"
              />
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </>
  );
};

export default ShowSingleGroundMap;
