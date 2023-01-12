import React, { Fragment } from "react";
import moment from "moment";

const Footer = (props) => {
  return (
    <Fragment>
      <footer
        style={{ background: "#0055A1", color: "#E6A821" }}
        className="z-10 py-6 px-4 md:px-12 text-center"
      >
        CMPE 272 SJSU Pantry
      </footer>
    </Fragment>
  );
};

export default Footer;
