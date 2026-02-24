import "./Navbar.css"
import React, { useState } from 'react';
import logo from '../assets/ruhen-rai-logo-transparent-white.png';
import { useNavigate } from 'react-router-dom';
import { db } from '../Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function Navbar() {
  const [queryValue, setQueryValue] = useState('');
  const navigate = useNavigate();

  // Search function
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!queryValue.trim()) return;
    try {
      const titleQ = query(
        collection(db, "images"),
        where("title", "==", queryValue.trim())
      );
      const tagQ = query(
        collection(db, "images"),
        where("tags", "array-contains", queryValue.trim())
      );
      const [titleSnap, tagSnap] = await Promise.all([
        getDocs(titleQ),
        getDocs(tagQ)
      ]);
      let results = [];
      titleSnap.forEach(doc => results.push(doc.data()));
      tagSnap.forEach(doc => results.push(doc.data()));
      const uniqueResults = [];
      const seen = new Set();
      for (const img of results) {
        if (!seen.has(img.imageUrl)) {
          seen.add(img.imageUrl);
          uniqueResults.push(img);
        }
      }
      if (uniqueResults.length === 0) {
        console.log("No images found for:", queryValue);
      } else {
        uniqueResults.forEach(img =>
          console.log(`Found image: ${img.title} (${img.imageUrl})`)
        );
      }
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <>
      <nav className="navbar">
          <div className="navbar-bg"></div>
          <div className="intro-text">
            Welcome to Ruhen Rai graphics collection,<br />
            a creator passionate about visual storytelling, design, and unique digital experiences.<br />
            Enjoy browsing this curated collection of my latest works.
          </div>
      </nav>
      <div className="bottom-navbar">
        <img src={logo} alt="Ruhen Rai Logo" className="logo1" />
        <button className="link-H" onClick={() => navigate('/')}>Home</button>
        <form onSubmit={handleSearch} style={{ display: 'inline' }}>
          <input
            type="search"
            placeholder="  Search by title or tag..."
            value={queryValue}
            onChange={e => setQueryValue(e.target.value)}
          />
        </form>
        <button className="link-G" onClick={() => navigate('/gallery')}>Gallery</button>
        <button className="link-A" onClick={() => navigate('/about')}>About</button>
        <button className="admin" onClick={() => navigate('/admin')}>Admin</button>
      </div>
    </>
  );
}

export default Navbar;