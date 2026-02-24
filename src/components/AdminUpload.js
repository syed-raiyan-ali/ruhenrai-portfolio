import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import "./AdminUpload.css";
import { db } from "../Firebase";

export default function AdminUpload() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  const saveImageToFirestore = async (imageInfo, meta) => {
    await addDoc(collection(db, "images"), {
      imageUrl: imageInfo.secure_url,
      publicId: imageInfo.public_id,
      width: imageInfo.width,
      height: imageInfo.height,
      uploadedAt: new Date(),
      title: meta.title || "",
      tags: meta.tags ? meta.tags.split(",").map(tag => tag.trim()) : [],
    });
  };

  const openCloudinaryWidget = () => {
    window.cloudinary.createUploadWidget(
      {
        cloudName: "dhta6fkke",
        uploadPreset: "portfolio-images"
      },
      async (error, result) => {
        if (!error && result && result.event === "success") {
          alert("File uploaded! URL: " + result.info.secure_url);
          await saveImageToFirestore(result.info, { title, tags });
          setTitle("");
          setTags("");
        }
      }
    ).open();
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input
        type="text"
        placeholder="Image Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={e => setTags(e.target.value)}
      />
      <button onClick={openCloudinaryWidget}>
        Upload Image to Cloudinary
      </button>
    </div>
  );
}