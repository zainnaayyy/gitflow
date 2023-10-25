import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../auth/authSlice";
import { Link } from "react-router-dom";

import React from "react";

const Welcome = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  //if the user is logged
  const welcome = user ? `Welcome ${user}!` : "Welcome";
  const tokenAbbr = `${token.slice(0, 9)}...`;

  const content = (
    <section className="welcome">
      <h1>{welcome}</h1>
      <p>{tokenAbbr}</p>
      <p>
        <Link to="/userslist">Go to Users list</Link>
      </p>
    </section>
  );

  return content;
};

export default Welcome;
