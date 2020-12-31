import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCamp } from "../context/campContext/CampState";
import { notification } from "../utility/notification";
import { Loading, FirstLoading } from "./Loading";
const UpdateGround = (props) => {
  const { id } = useParams();
  const [value, setvalue] = useState({
    title: "",
    price: "",
    discription: "",
    location: ""
  });
  const [file, setfile] = useState("");
  const [update, setupdate] = useState(false);
  const [updateLoading, setupdateLoading] = useState(false);

  const {
    singleGround,
    singelCamp,
    isLoading,
    error,
    updated,
    updateCamp,
    clearError
  } = useCamp();
  useEffect(
    () => {
      if (singleGround) {
        setvalue({
          title: singleGround.title,
          price: singleGround.price,
          discription: singleGround.discription,
          location: singleGround.location
        });
      } else {
        setvalue({
          title: "",
          price: "",
          discription: "",
          location: ""
        });
      }
    },
    [singleGround],
    useCamp
  );

  useEffect(() => {
    singelCamp(id);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!updated && isLoading) {
    }
    if (updated && !isLoading && !error) {
      setupdateLoading(false);
      props.history.push(`/campground/${singleGround._id}`);
    }
    if (error) {
      notification("error", error);
      clearError();
    }
    //eslint-disable-next-line
  }, [updated, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setvalue((preValue) => {
      return { ...preValue, [name]: value };
    });
  };

  const validation = () => {
    if (!value.title || !value.price || !value.discription || !value.location) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image", file);
    formData.append("title", value.title);
    formData.append("price", value.price);
    formData.append("discription", value.discription);
    formData.append("location", value.location);
    const valid = validation();

    if (update ? valid && file : valid) {
      updateCamp(singleGround._id, update ? formData : value);
      setupdateLoading(true);
    } else {
      notification("error", "please input all firlds");
    }
  };

  if (isLoading && !updateLoading) {
    return <FirstLoading loading={isLoading} />;
  }

  return (
    <section className="signup updateGround">
      <div></div>
      <div className="signup-container">
        {updateLoading && <Loading loading={isLoading} />}
        <h1>Update Monent</h1>
        <div className="underline"></div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={value.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              value={value.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="discription">Discription</label>
            <input
              type="text"
              name="discription"
              value={value.discription}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              value={value.location}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="image">
              Do you want update imgae ?{" "}
              <input
                type="checkbox"
                name="update"
                id="update"
                checked={update}
                onChange={(e) => setupdate(e.target.checked)}
              />{" "}
              yes
            </label>
            {update && (
              <input type="file" onChange={(e) => setfile(e.target.files[0])} />
            )}
          </div>
          <div>
            <button className="btn btn-update">Update Monent</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateGround;

// const validation = () => {
//   let titleCheck = "";
//   let priceCheck = "";
//   let imageCheck = "";
//   let discriptionCheck = "";
//   let locationCheck = "";

//   if (!updateGround.title) {
//     titleCheck = "Please fill up title field";
//   }
//   if (!updateGround.price) {
//     priceCheck = "Please fill up price field";
//   }
//   if (!updateGround.image) {
//     imageCheck = "Please fill up image field";
//   }
//   if (!updateGround.discription) {
//     discriptionCheck = "Please fill up discripation field";
//   }
//   if (!updateGround.location) {
//     locationCheck = "Please fill up discripation field";
//   }
//   if (
//     titleCheck ||
//     priceCheck ||
//     imageCheck ||
//     discriptionCheck ||
//     locationCheck
//   ) {
//     setinputValid((pre) => {
//       return {
//         ...pre,
//         titleCheck,
//         priceCheck,
//         imageCheck,
//         discriptionCheck,
//         locationCheck
//       };
//     });
//     return false;
//   }
//

//   return true;
// };

// const [inputValid, setinputValid] = useState({
//   titleCheck: "",
//   priceCheck: "",
//   imageCheck: "",
//   discriptionCheck: "",
//   locationCheck: ""
// });
