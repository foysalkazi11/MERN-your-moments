import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="home">
      <div className="home-container">
        <h1>Share your best moment with world</h1>
        <button>
          <Link to="/campground">View moments</Link>
        </button>
      </div>
    </section>
  );
};

export default Home;
