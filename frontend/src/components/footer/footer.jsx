import React from "react";
import { Link } from "react-router-dom";

const GlobalFooter = () => (
  <div className="footer-container">
    <div>Copyright &copy; 2020 Daniel Group</div>
    <Link to="/about" style={{ textDecoration: "none", color: "white" }}>
      About
    </Link>
    <a href="https://github.com/danjamesyee/MERNblocks">
      <img
        alt=""
        id="git-icon"
        src="https://active-storage-blox-seed.s3-us-west-1.amazonaws.com/icons/github.png"
      />
    </a>
  </div>
);

export default GlobalFooter;
