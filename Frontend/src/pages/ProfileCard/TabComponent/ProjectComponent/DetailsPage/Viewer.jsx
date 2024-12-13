import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PacmanLoader } from "react-spinners"; // Import the spinner
import { useNavigate } from "react-router-dom";

const Viewer = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const images = JSON.parse(decodeURIComponent(queryParams.get("images")));
  const startIndex = parseInt(queryParams.get("start"), 10);

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [showPrevIcon, setShowPrevIcon] = useState(false);
  const [showNextIcon, setShowNextIcon] = useState(false);
  const [loading, setLoading] = useState(true); // Track image loading state
  const navigate = useNavigate();

  const nextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Navigate to the blank page when reaching the last image
      navigate("/blank");
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleImageLoad = () => {
    setLoading(false); // Image has loaded, stop showing loading screen
  };

  return (
    <div
      style={{
        textAlign: "center",
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000", // Fallback for transparency gaps
      }}
      onMouseMove={(e) => {
        const { clientX } = e;
        const { innerWidth } = window;
        setShowPrevIcon(clientX < innerWidth / 2);
        setShowNextIcon(clientX >= innerWidth / 2);
      }}
      onMouseLeave={() => {
        setShowPrevIcon(false);
        setShowNextIcon(false);
      }}
    >
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          <PacmanLoader color="orange" size={50} />{" "}
          {/* Crunchyroll yellow color */}
        </div>
      )}

      <div
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          overflow: "auto", // Enables scrolling if the image is too large
          position: "relative",
        }}
      >
        <img
          src={images[currentIndex]}
          alt={`Thumbnail ${currentIndex + 1}`}
          style={{
            width: "100%", // Set the image width to 100% of the container
            height: "auto", // Maintain the aspect ratio
            objectFit: "contain", // Ensures the image fits within the container without distortion
            position: "relative",
          }}
          onLoad={handleImageLoad} // Set loading to false when image is loaded
          onError={() => setLoading(false)} // In case the image fails to load
        />
      </div>

      {/* Previous Image Button */}
      {showPrevIcon && currentIndex > 0 && (
        <div
          onClick={prevImage}
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            cursor: "pointer",
            padding: "10px",
            borderRadius: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
            transition: "background-color 0.3s ease, transform 0.3s ease",
            zIndex: 1,
            pointerEvents: currentIndex === 0 ? "none" : "auto", // Disable if at the first image
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <FaChevronLeft size={30} />
        </div>
      )}

      {/* Next Image Button */}
      {showNextIcon && (
        <div
          onClick={nextImage}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            cursor: "pointer",
            padding: "10px",
            borderRadius: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
            transition: "background-color 0.3s ease, transform 0.3s ease",
            zIndex: 1,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <FaChevronRight size={30} />
        </div>
      )}
    </div>
  );
};

export default Viewer;
