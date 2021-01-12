import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="section">
      <h1>No such page found!!!</h1>
      <button className="btn">
        <Link to="/">Back Home</Link>
      </button>
    </section>
  );
};

export default ErrorPage;
