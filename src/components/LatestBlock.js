import "./LatestBlock.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";

function LatestBlock() {
  const [latestImages, setLatestImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLatest() {
      const db = getFirestore();
      const snap = await getDocs(collection(db, "images"));
      const all = snap.docs.map(doc => doc.data());

      const sorted = all.sort((a, b) => {
        const da = a.uploadedAt
          ? new Date(a.uploadedAt.toDate ? a.uploadedAt.toDate() : a.uploadedAt)
          : 0;
        const dbb = b.uploadedAt
          ? new Date(b.uploadedAt.toDate ? b.uploadedAt.toDate() : b.uploadedAt)
          : 0;
        return dbb - da;
      });

      setLatestImages(sorted.slice(0, 4));
    }
    fetchLatest();
  }, []);

  const handleMoreClick = () => {
    navigate("/gallery?sort=latest");
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
      <div className="latest-cont">
        <div className="latest-title">LATEST</div>

        <div className="latest-img">
          {latestImages.map((img, index) => (
            <div 
              className="L-imgs" 
              key={index}
              onClick={() => setSelectedImage(img)}
            >
              <img 
                src={img.imageUrl} 
                loading="lazy" 
                alt={img.title || `Latest ${index + 1}`} 
              />
              <div className="L-img-overlay">
                <h3>{img.title}</h3>
              </div>
            </div>
          ))}

          <div className="more-latest" onClick={handleMoreClick}>
            MORE<br />LATEST
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

export default LatestBlock;