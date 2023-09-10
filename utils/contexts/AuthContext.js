import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../../services/firebase";
import { setCookie, parseCookies } from "nookies";
export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [userLocation, setUserLocation] = useState("");

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  function facebookSignIn() {
    const facebookAuthProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, facebookAuthProvider);
  }
  function setUpRecaptcha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }
  function phoneNumberSignIn(phoneNumber) {
    const appVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: () => {
          console.log("Callback!");
        },
      },
      auth
    );

    return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const setUserDefaultLocation = (selectedAddress) => {
    setCookie(
      null,
      "userLocation",
      `${selectedAddress.latitude},${selectedAddress.longitude}`
    );
    setCookie(null, "user_address_id", selectedAddress?.id);
    setUserLocation(`${selectedAddress.latitude},${selectedAddress.longitude}`);
  };

  useEffect(() => {
    if (!parseCookies().userLocation)
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setUserDefaultLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        function (error) {
          const defaultLocation = process.env.DEFAULT_LOCATION.split(",");
          setUserDefaultLocation({
            latitude: defaultLocation[0],
            longitude: defaultLocation[1],
          });
          console.log(error);
        }
      );
    else {
      const defaultLocation = parseCookies().userLocation.trim().split(",");
      setUserDefaultLocation({
        latitude: defaultLocation[0],
        longitude: defaultLocation[1],
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        setUpRecaptcha,
        facebookSignIn,
        userLocation,
        setUserDefaultLocation,
        phoneNumberSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
