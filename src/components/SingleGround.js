import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Reviw from "./Reviw";
import { useCamp } from "../context/campContext/CampState";
import { useAuth } from "../context/authContext/AuthState";
import { notification } from "../utility/notification";
import { Image } from "cloudinary-react";
import ShowSingleGroundMap from "./ShowSingleGroundMap";
import { FirstLoading, Loading } from "./Loading";

const SingleGround = (props) => {
  const [loading, setloading] = useState(true);
  const { id } = useParams();
  const { user } = useAuth();
  const {
    singleGround,
    singelCamp,
    isLoading,
    error,
    deleteGround,
    deleteCamp,
    newSingleGround
  } = useCamp();

  useEffect(() => {
    if (newSingleGround && singleGround) {
      setloading(false);
    }
    //eslint-disable-next-line
  }, [newSingleGround, singleGround]);

  useEffect(() => {
    if (deleteGround && !isLoading && !error) {
      props.history.push(`/campground`);
    }
    if (error) {
      notification("error", error);
    }
    //eslint-disable-next-line
  }, [deleteGround, error]);

  useEffect(() => {
    singelCamp(id);

    //eslint-disable-next-line
  }, []);

  //delete camp
  const handleClick = async () => {
    deleteCamp(id);
  };

  if (loading) {
    return <FirstLoading loading size={100} />;
  }

  if (error) {
    return (
      <div className="loading">
        <h4>{error}</h4>
      </div>
    );
  }

  return (
    <div className="main-body">
      <div className="map">
        <ShowSingleGroundMap />
      </div>

      <section className="singleGround">
        {isLoading && !deleteGround && <Loading loading={isLoading} />}
        <div className="singleGround-container">
          <div className="singleGround-info">
            <h4>{singleGround.title}</h4>
            <h5>{singleGround.location}</h5>

            {/* <img src={singleGround.image.url} alt="campImage" /> */}
            <Image
              cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
              publicId={singleGround.image.filename}
              width="500"
              height="300"
              crop="fill"
              quality="80"
            />
            <strong>Created by : {singleGround.author.username}</strong>
            <p>Discription : {singleGround.discription}</p>
            {user && singleGround.author.username === user && (
              <>
                <button onClick={handleClick} className="btn btn-delete">
                  Delete Ground
                </button>
                <button className="btn btn-update">
                  <Link to={`/campground/${singleGround._id}/updateGround`}>
                    Update Ground
                  </Link>
                </button>
              </>
            )}
          </div>
        </div>
        <div className="reviews-container">
          <Reviw id={id} props={props} />
        </div>
      </section>
    </div>
  );
};

export default SingleGround;
