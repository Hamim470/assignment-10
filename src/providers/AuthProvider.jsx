import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  FacebookAuthProvider,
} from "firebase/auth";
import app from "../firebase/firebase.config"; // adjust path if needed
import Loading from "../pages/Loading";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const register = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false)); // <-- always reset loading
  }

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false)); // <-- always reset loading
  }

  const logOut = () => {
    setLoading(true);
    signOut(auth)
      .finally(() => setLoading(false)); // <-- always reset loading
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .finally(() => setLoading(false));
  };

  const githubProvider = new GithubAuthProvider(); // ✅ GitHub provider

const signInWithGitHub = () => {
  setLoading(true);
  return signInWithPopup(auth, githubProvider)
    .finally(() => setLoading(false));
};

const facebookProvider = new FacebookAuthProvider();

// app_id=649492604346331
// app_secret=9c296682f49ec75cf05eb767e2c24e30
// OAuth redirect URI = https://assignment-10-c09e9.firebaseapp.com/__/auth/handler
// app.get('/delete-user-data', (req, res) => {
//   res.send("If you want to delete your data, please contact support@yourdomain.com");
// });

// Facebook policy অনুযায়ী ইউজার চাইলে তার ডেটা delete করতে পারবে এমন একটা URL দিতে হবে।

// এই URL আপনার backend/server-এ থাকবে, যেখানে ইউজার ক্লিক করলে তার ডেটা delete করা হবে বা অন্ততপক্ষে ডেটা ডিলিট করার প্রসেস জানাবে।


const signInWithFacebook = () => {
  setLoading(true);
  return signInWithPopup(auth, facebookProvider)
    .finally(() => setLoading(false));
};



  const authInfo = { user, loading, logOut, register, login, signInWithGoogle,signInWithGitHub,signInWithFacebook };

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
