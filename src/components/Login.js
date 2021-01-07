import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { notification } from "../utility/notification";
import { useAuth } from "../context/authContext/AuthState";
import { Loading } from "./Loading";

const Login = (props) => {
  const {
    loginUser,
    clearError,
    isAuthenticated,
    error,
    isLoading
  } = useAuth();

  const [inputVlaue, setinputVlaue] = useState({
    username: "",
    password: ""
  });
  const [checkValue, setcheckValue] = useState({
    validusername: "",
    validpassword: ""
  });

  useEffect(() => {
    handleVlidate();
    //eslint-disable-next-line
  }, [inputVlaue]);

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      // setloading(false);
      setinputVlaue({
        username: "",
        password: ""
      });
      if (props.location.state) {
        props.history.push(props.location.state);
      } else {
        props.history.push("/campground");
      }
    }
    if (error) {
      notification("error", "username or password incorrect");
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
    if (inputVlaue.username) {
      setcheckValue((pre) => {
        return { ...pre, validusername: "looks good" };
      });
    } else {
      setcheckValue((pre) => {
        return {
          ...pre,
          validusername: "please enter username"
        };
      });
    }

    if (inputVlaue.password) {
      setcheckValue((pre) => {
        return { ...pre, validpassword: "looks good" };
      });
    } else {
      setcheckValue((pre) => {
        return {
          ...pre,
          validpassword: "please enter password "
        };
      });
    }

    if (!inputVlaue.username || !inputVlaue.password) {
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleVlidate()) {
      loginUser(inputVlaue);
      // setloading(true);
    } else {
      notification("error", "please enter both usernaem and password");
      clearError();
    }
  };

  return (
    <div className="signup">
      <div></div>
      <div className="signup-container">
        {isLoading && <Loading loading={isLoading} />}
        <h1>Login</h1>
        <div className="underline"></div>
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
              If you are not register yet ? please
              <Link to="/signup">register</Link> first
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
