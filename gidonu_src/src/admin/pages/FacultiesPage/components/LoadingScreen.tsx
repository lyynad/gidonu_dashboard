import logo from "../assets/loadingIcon.svg";
import "../styles/loadingScreen.css";

const LoadingScreen = () => {
    return(
        <div className="laoding-overlay">
            <svg className="loading-overlay-animation" width="169" height="167" viewBox="0 0 169 167" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <ellipse cx="84.5" cy="83.5" rx="83.5" ry="82.5" fill="none" stroke="#00030A" stroke-width="2"/>
            </svg>
            <img className="loading-overlay-img" src={logo} alt="logo" />
        </div>
    )
};

export default LoadingScreen;