import "./PosterBlock.css";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

function PosterBlock() {
  const [posterImages, setPosterImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosters() {
      const db = getFirestore();
      const snap = await getDocs(collection(db, "images"));
      const all = snap.docs.map(doc => doc.data());

      // Filter for "poster" tag
      const filtered = all.filter(
        img => Array.isArray(img.tags) && img.tags.some(t => String(t).toLowerCase() === "poster")
      );

      // Take first 4
      setPosterImages(filtered.slice(0, 4));
    }
    fetchPosters();
  }, []);

  const handleMoreClick = () => {
    navigate("/gallery?tag=poster");
  };

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="poster-cont">
        <div className="poster-title">POSTER</div>

        <div className="poster-img">
          {posterImages.map((img, index) => (
            <div 
              className="P-imgs" 
              key={index}
              onClick={() => setSelectedImage(img)}
            >
              <img 
                src={img.imageUrl} 
                loading="lazy" 
                alt={img.title || `Poster ${index + 1}`} 
              />
              <div className="P-img-overlay">
                <h3>{img.title}</h3>
              </div>
            </div>
          ))}

          <div className="more-poster" onClick={handleMoreClick}>
            MORE<br />POSTERS
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <img src={selectedImage.imageUrl} alt={selectedImage.title} />
            <div className="modal-info">
              <h2>{selectedImage.title}</h2>
              <p>{selectedImage.tags ? selectedImage.tags.join(", ") : ""}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PosterBlock;
