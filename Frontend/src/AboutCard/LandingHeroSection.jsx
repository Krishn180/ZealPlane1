import React from "react";
import "./LandingHeroSecStyle.scss";
import ther1 from "../assets/heroimge.jpg"; // Import your image here

const LandingHeroSection = () => {
  return (
    <div className="landing-hero-section">
      <div className="image-wrapper-landing">
        <img src={ther1} alt="Hero" className="imge" />
        <div className="text">
          <h1>Join The Conversation!</h1>
          <p>
            ComicPlane is a community-driven platform where comic book fans can
            gather, discuss, connect with artist and share their love for the
            medium. Participate in forums, rate and review comics, and connect
            with fellow enthusiasts. Become part of a vibrant and inclusive
            community that celebrates all things comics!
          </p>
          <button>Zeal</button>
          <button>Passion</button>
          <button>Dream</button>
        </div>
      </div>
    </div>
  );
};

export default LandingHeroSection;
