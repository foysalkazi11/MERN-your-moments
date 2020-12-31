import React, { useState, useEffect } from "react";
import { notification } from "../utility/notification";
import { useCamp } from "../context/campContext/CampState";
import { Loading } from "./Loading";

const AddCampGround = (props) => {
  const {
    createCamp,
    isLoading,
    error,
    clearError,
    createCampGround
  } = useCamp();

  useEffect(() => {
    if (createCamp && !isLoading && !error) {
      props.history.push("/campground");
    }
    if (error) {
      notification("error", error);
      clearError();
    }
    //eslint-disable-next-line
  }, [createCamp, error]);

  const [state, setstate] = useState({
    title: "",
    price: "",
    discription: "",
    location: ""
  });
  const [file, setfile] = useState("");
  const [inputValid, setinputValid] = useState({
    titleCheck: "",
    priceCheck: "",
    imageCheck: "",
    discriptionCheck: "",
    locationCheck: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setstate((state) => {
      return { ...state, [name]: value };
    });
  };
  const validation = () => {
    let titleCheck = "";
    let priceCheck = "";
    let imageCheck = "";
    let discriptionCheck = "";
    let locationCheck = "";

    if (!state.title) {
      titleCheck = "Please fill up title field";
    }
    if (!state.price) {
      priceCheck = "Please fill up price field";
    }
    if (!file) {
      imageCheck = "Please fill up image field";
    }
    if (!state.discription) {
      discriptionCheck = "Please fill up discripation field";
    }
    if (!state.location) {
      locationCheck = "Please fill up discripation field";
    }
    if (
      titleCheck ||
      priceCheck ||
      imageCheck ||
      discriptionCheck ||
      locationCheck
    ) {
      setinputValid((pre) => {
        return {
          ...pre,
          titleCheck,
          priceCheck,
          imageCheck,
          discriptionCheck,
          locationCheck
        };
      });
      return false;
    }

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image", file);
    formData.append("title", state.title);
    formData.append("price", state.price);
    formData.append("discription", state.discription);
    formData.append("location", state.location);

    if (validation()) {
      createCampGround(formData);
    } else {
      notification("error", "please enter all firld");
    }
  };

  return (
    <section className="signup ">
      <div></div>
      <div className="signup-container">
        {isLoading && <Loading loading={isLoading} size={100} />}
        <h1>Create New Moment</h1>
        <div className="underline"></div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={state.title}
              onChange={handleChange}
            />
            <p style={{ color: "red" }}>
              {inputValid.titleCheck && inputValid.titleCheck}
            </p>
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              value={state.price}
              onChange={handleChange}
            />
            <p style={{ color: "red" }}>
              {inputValid.priceCheck && inputValid.priceCheck}
            </p>
          </div>

          <div>
            <label htmlFor="discription">Discription</label>
            <input
              type="text"
              name="discription"
              value={state.discription}
              onChange={handleChange}
            />
            <p style={{ color: "red" }}>
              {inputValid.discriptionCheck && inputValid.discriptionCheck}
            </p>
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              value={state.location}
              onChange={handleChange}
            />
            <p style={{ color: "red" }}>
              {inputValid.locationCheck && inputValid.locationCheck}
            </p>
          </div>
          <div>
            <label htmlFor="image">Uplode Image</label>
            <input type="file" onChange={(e) => setfile(e.target.files[0])} />
            <p style={{ color: "red" }}>
              {inputValid.imageCheck && inputValid.imageCheck}
            </p>
          </div>
          <div>
            <button className="btn">Create Moment</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddCampGround;
