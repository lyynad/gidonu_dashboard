import PropTypes from "prop-types";

import "../assets/css/style.css";

const BackgroundBlur = ({ children }) => {
  return (
    <div className=" backgroundBlur z-50 fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center">
      {children}
    </div>
  );
};

export default BackgroundBlur;

BackgroundBlur.propTypes = {
  children: PropTypes.element,
};
