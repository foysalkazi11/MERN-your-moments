import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext/AuthState";
import { Link } from "react-router-dom";
import { notification } from "../utility/notification";
import { Loading } from "./Loading";

// form validation ................
const patterns = {
  name: /^[a-z\s-]{3,}$/i,
  username: /^[a-zA-Z0-9]{4,}$/i,
  number: /^[\d]{11}$/,
  email: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
  address2: /^[.\s,.'-]{0,}$/,
  address: /^[a-zA-Z0-9\s,.'-]{3,}$/,
  message: /^[a-zA-Z0-9\s,.'-]{3,}$/,
  password2: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{4,}$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
};

const SignUp = (props) => {
  const {
    registerUser,
    isAuthenticated,
    error,
    clearError,
    isLoading
  } = useAuth();

  const [inputVlaue, setinputVlaue] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [checkValue, setcheckValue] = useState({
    validusername: "",
    validemail: "",
    validpassword: ""
  });
  useEffect(() => {
    handleVlidate();
    //eslint-disable-next-line
  }, [inputVlaue]);

  useEffect(() => {
    if (isAuthenticated) {
      setinputVlaue({
        username: "",
        email: "",
        password: ""
      });
      if (props.location.state) {
        props.history.push(`${props.location.state}`);
      } else {
        props.history.push("/campground");
      }
    }

    if (error) {
      if (error.includes("email")) {
        notification("error", "email alredy used, pleae choose another email");
        clearError();
      }
      notification("error", error);
      clearError();
    }
    //eslint-disable-next-line
  }, [isAuthenticated, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setinputVlaue((preValue) => {
      return { ...preValue, [name]: value };
    });
  };

  const handleVlidate = () => {
    if (patterns.username.test(inputVlaue.username)) {
      setcheckValue((pre) => {
        return { ...pre, validusername: "looks good" };
      });
    } else {
      setcheckValue((pre) => {
        return {
          ...pre,
          validusername: "username contain at least 4 characters"
        };
      });
    }
    if (patterns.email.test(inputVlaue.email)) {
      setcheckValue((pre) => {
        return { ...pre, validemail: "looks good" };
      });
    } else {
      setcheckValue((pre) => {
        return { ...pre, validemail: "Enter valid email" };
      });
    }
    if (patterns.password.test(inputVlaue.password)) {
      setcheckValue((pre) => {
        return { ...pre, validpassword: "looks good" };
      });
    } else {
      setcheckValue((pre) => {
        return {
          ...pre,
          validpassword:
            "Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character (#?!@$%^&*-)  "
        };
      });
    }

    if (
      !patterns.username.test(inputVlaue.username) ||
      !patterns.email.test(inputVlaue.email) ||
      !patterns.password.test(inputVlaue.password)
    ) {
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (handleVlidate()) {
      registerUser(inputVlaue);
    } else {
      notification("error", "please enter all firld");
      clearError();
    }
  };
  return (
    <section className="signup">
      <div></div>
      <div className="signup-container">
        {isLoading && <Loading loading={isLoading} />}
        <h1>Create New Account</h1>
        <div className="underline"></div>
        {props.location.state && (
          <p className="redirect-message">{`You must register first to do that`}</p>
        )}
        {/* ${props.location.state.from.pathname} */}
        <form action="#" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={inputVlaue.username}
              onChange={handleChange}
            />
            {inputVlaue.username && (
              <p
                className={`${
                  checkValue.validusername === "looks good"
                    ? "valid"
                    : "unvalid"
                }`}
              >
                {checkValue.validusername}{" "}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={inputVlaue.email}
              onChange={handleChange}
            />
            {inputVlaue.email && (
              <p
                className={`${
                  checkValue.validemail === "looks good" ? "valid" : "unvalid"
                }`}
              >
                {checkValue.validemail}{" "}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={inputVlaue.password}
              onChange={handleChange}
            />
            {inputVlaue.password && (
              <p
                className={`${
                  checkValue.validpassword === "looks good"
                    ? "valid"
                    : "unvalid"
                }`}
              >
                {checkValue.validpassword}{" "}
              </p>
            )}
          </div>
          <div>
            <button type="submit" className="btn">
              Submit
            </button>
          </div>

          <div>
            <p className="redirect">
              If you alrady register ? please{" "}
              <Link
                to={
                  props.location.state
                    ? { pathname: "/login", state: props.location.state }
                    : "/login"
                }
              >
                login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
