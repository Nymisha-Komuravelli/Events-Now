import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { usersFeatureKey } from "../../../redux/users/user.reducer";

const Home = () => {
  const userInfo = useSelector((state) => state[usersFeatureKey]);
  return (
    <div className="landing-page">
      <div className="wrapper">
        {/* <pre>{JSON.stringify(userInfo)}</pre> */}
        <div className="d-flex flex-column align-items-center justify-content-center text-center h-100">
          <h5 className="display-4">Book an Event</h5>
          <p className="lead px-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Exercitationem esse quas dolores. Maxime autem animi sit eos.
            Mollitia quas magni, modi soluta eius, dolor molestiae praesentium
            ratione dolores cupiditate voluptas?
          </p>
          <Link to="/events/free" className="btn btn-danger btn-sm">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
