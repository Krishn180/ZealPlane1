import React, { useState, useEffect } from "react";
import "./AboutCardStyle.css";
import growth from "../assets/growth.png";
import reflecting from "../assets/reflecting.png";

const AboutCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const elementPosition = document
      .querySelector(".left-banka")
      .getBoundingClientRect().top;

    // Check if the element is in the viewport
    if (elementPosition <= window.innerHeight && elementPosition >= 0) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up the event listener
    };
  }, []);

  return (
    <>
      <div className="head-top" id="about">
        <hr
          style={{
            border: "0.1px solid #1d325f", // Thin border color
            boxShadow:
              "0px 0px 50px 20px rgba(46, 9, 54, 0.3), 0px 0px 100px 40px rgba(6, 25, 51, 0.2), 0px 0px 200px 80px rgba(5, 46, 33, 0.1)",
            width: "100%", // Full-width horizontal line
          }}
        />

        <div className="backa-comic-design">
          <div className="backa-comic-main">
            <div className="left-banka">
              <p
                className={`adventure-text ${isVisible ? "visible" : ""}`}
                style={{ fontSize: "16px", textAlign: "center" }}
              >
                ADVENTURE: DARK FANTASY: MARTIAL ARTS;
              </p>
              <h1
                className={`demon-slayer-title ${isVisible ? "visible" : ""}`}
                style={{ fontSize: "40px" }}
              >
                Demon Slayer:
                <br />
                Kimetsu No Yaiba
              </h1>
            </div>
            <div
              className="right-banka adventure-text"
              style={{ fontSize: "20px" }}
            >
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                doloremque veniam dolore dignissimos, molestiae illo impedit
                excepturi sint, rerum ut id quisquam voluptatum quas nam nemo
                harum est. Ipsum natus iure sint dolor aperiam blanditiis quis
                ut pariatur minus harum, incidunt suscipit voluptate,
                repudiandae eveniet autem rerum numquam. Dolor perferendis quam
                saepe corrupti nisi asperiores illum unde debitis consectetur
                mollitia.
              </p>
            </div>
          </div>

          <div className="backa-image">
            <img
              src="/src/assets/man-stands-front-planet-with-colorfu.avif"
              alt=""
            />
          </div>
        </div>

        <h1 className={`demon-slayer-title ${isVisible ? "visible" : ""}`}>
          Many Great Features
        </h1>
        {/* <p>
          Again, there are other issues like stiff competition, reduced
          attention span of masses, heavy effort-less reward, discouraging
          algorithm, one dimensional approach for reward. Thus, in the market of
          fish, only skins and drama is sold out. which is very good from a
          profit’s point of view but that also discourages the creators that
          lacks the initial push and dedication, lack of required views leads to
          demoralization...
        </p> */}
      </div>

      <div className="cardBox">
        <div className="card1">
          <h1>Discover</h1>
          <p>
            <span>Explore the Universe:</span>Browse our vast library of comics
            and discover new favorites.
            <br />
            <span>New Releases: </span>Stay up-to-date with the latest comic
            book releases.
            <br />
            <span>Staff Picks:</span>Check out our team's favorite comics and
            get inspired.
          </p>
          <img src={growth} alt="About feature" className="featureImage" />
        </div>
        <div className="card1">
          <h1>Connect</h1>
          <p>
            <span>Join the Conversation: </span>Participate in our forums and
            discuss your favorite comics with fellow fans.
            <br />
            <span>Community Events:</span> Attend online events, webinars, and
            workshops to connect with other enthusiasts.
            <br />
            <span>Make Friends:</span>Connect with like-minded fans and build
            lasting relationships.
          </p>
          <img src={reflecting} alt="About feature" className="featureImage" />
        </div>
        <div className="card1">
          <h1>Create</h1>
          <p>
            <span>Share Your Art:</span> Showcase your comic book-inspired
            artwork and get feedback from the community.
            <br />
            <span>Write Your Story:</span> Share your own comic book stories and
            scripts with the community.
            <br />
            <span>Get Feedback:</span> Receive constructive feedback from fellow
            creators and improve your craft.
          </p>
          <img src={growth} alt="About feature" className="featureImage" />
        </div>
        {/* <div className="card1">
          <h1>Learn</h1>
          <p>
            <span>Comic Book News:</span> Stay up-to-date with the latest comic
            book news and updates.
            <span>Tutorials and Guides: </span> Access tutorials, guides, and
            resources to help you improve your comic book knowledge.
            <span>Industry Insights:</span> - Get insights from comic book
            professionals and learn about the industry.
          </p>
          <img src={growth} alt="About feature" className="featureImage" />
        </div> */}
      </div>
    </>
  );
};

export default AboutCard;
