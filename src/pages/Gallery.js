import "./Gallery.css";
import "../components/GalleryFilter.css";  // ← Add this import
import React, { useEffect, useState, useMemo } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import GalleryFilter from "../components/GalleryFilter";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");
  const [selectedImage, setSelectedImage] = useState(null); // NEW: track selected image

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const activeTag = params.get("tag");
    const sort = params.get("sort");
    if (activeTag) setSelectedTags([activeTag.toLowerCase()]);
    if (sort) setSortOrder(sort);
  }, [location.search]);

  useEffect(() => {
    async function fetchImages() {
      const db = getFirestore();
      const snap = await getDocs(collection(db, "images"));
      setImages(snap.docs.map(doc => doc.data()));
    }
    fetchImages();
  }, []);

  const tagCounts = useMemo(() => {
    const counts = {};
    images.forEach(img => {
      if (Array.isArray(img.tags)) {
        img.tags.forEach(t => {
          const key = String(t).toLowerCase();
          counts[key] = (counts[key] || 0) + 1;
        });
      }
    });
    return counts;
  }, [images]);

  const toggleTag = (tag) => {
    const t = tag.toLowerCase();
    setSelectedTags(prev =>
      prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]
    );
  };

  const clearTags = () => setSelectedTags([]);

  const processedImages = useMemo(() => {
    let list = [...images];

    if (selectedTags.length > 0) {
      list = list.filter(
        img =>
          Array.isArray(img.tags) &&
          selectedTags.some(selTag =>
            img.tags.some(t => String(t).toLowerCase() === selTag)
          )
      );
    }

    if (sortOrder === "latest") {
      list.sort((a, b) => {
        const da = a.uploadedAt
          ? new Date(a.uploadedAt.toDate ? a.uploadedAt.toDate() : a.uploadedAt)
          : 0;
        const dbb = b.uploadedAt
          ? new Date(b.uploadedAt.toDate ? b.uploadedAt.toDate() : b.uploadedAt)
          : 0;
        return dbb - da;
      });
    }

    return list;
  }, [images, selectedTags, sortOrder]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedTags.length === 1) params.set("tag", selectedTags[0]);
    if (sortOrder === "latest") params.set("sort", "latest");
    navigate({ search: params.toString() }, { replace: true });
  }, [selectedTags, sortOrder, navigate]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="gallery-page">
      <GalleryFilter
        tagCounts={tagCounts}
        selectedTags={selectedTags}
        onToggleTag={toggleTag}
        onClearTags={clearTags}
        sortOrder={sortOrder}
        onChangeSort={setSortOrder}
      />

      <main className="gallery-grid">
        {processedImages.length === 0 ? (
          <p className="empty-state">No images match the current filters.</p>
        ) : (
          <div className="gallery">
            {processedImages.map((img, i) => (
              <div
                className="img-card"
                key={i}
                onClick={() => setSelectedImage(img)} // NEW: click to open
              >
                <div className="img-wrapper">
                  <img src={img.imageUrl} loading="lazy" alt={img.title || "uploaded"} />
                </div>
                <h3>{img.title}</h3>
                <p>{img.tags ? img.tags.join(", ") : ""}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* NEW: Modal/Lightbox */}
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
    </div>
  );
}