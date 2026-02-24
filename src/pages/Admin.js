import "./Admin.css";
import React, { useEffect, useState } from "react";
import AdminUpload from "../components/AdminUpload";
import { auth, googleProvider } from "../Firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

const ADMIN_EMAIL = "syedraiyanali23544@gmail.com";

function About() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.email === ADMIN_EMAIL) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setCheckingAuth(false);
    });
    return () => unsub();
  }, []);

  const handleLoginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loggedInUser = result.user;
      if (loggedInUser.email !== ADMIN_EMAIL) {
        setIsAdmin(false);
        alert("You are not authorized to access the admin panel.");
        await signOut(auth);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsAdmin(false);
  };

  if (checkingAuth) {
    return <div className="admin-page">Checking authorization...</div>;
  }

  return (
    <div className="admin-page">
      {!user && (
        <div className="admin-auth-box">
          <h2>Admin Login</h2>
          <p>Sign in with your Google account to continue.</p>
          <button onClick={handleLoginWithGoogle}>Sign in with Google</button>
        </div>
      )}

      {user && !isAdmin && (
        <div className="admin-auth-box">
          <h2>Access Denied</h2>
          <p>This account is not authorized to use the admin panel.</p>
          <button onClick={handleLogout}>Sign out</button>
        </div>
      )}

      {user && isAdmin && (
        <div className="admin-panel">
          <div className="admin-header">
            <h2>Admin Panel</h2>
            <div>
              <span className="admin-email">{user.email}</span>
              <button onClick={handleLogout}>Log out</button>
            </div>
          </div>
          <AdminUpload />
        </div>
      )}
    </div>
  );
}

export default About;