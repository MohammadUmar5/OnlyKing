import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { Alert } from "react-native";
import uuid from "react-native-uuid";
import { auth, db } from "../config";

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Send email verification
    await sendEmailVerification(user);

    // Optional: Sign the user out to force re-login after verification
    await auth.signOut();

    return {
      success: true,
      message: "Verification email sent. Please verify your email!",
    };
  } catch (error: any) {
    let message = "Something went wrong. Please try again.";

    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/email-already-in-use":
          message = "This email is already in use. Try logging in instead.";
          break;
        case "auth/invalid-email":
          message = "The email address is not valid.";
          break;
        case "auth/weak-password":
          message = "Password should be at least 6 characters.";
          break;
        case "auth/operation-not-allowed":
          message = "Sign-up is disabled for this project.";
          break;
        default:
          message = error.message;
      }
    }

    return {
      success: false,
      message,
    };
  }
};

// Log In function
export const logIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Refresh the user's auth state
    await user.reload();

    const isUserEmailVerified = user.emailVerified;

    if (!isUserEmailVerified) {
      await auth.signOut();
      return {
        success: false,
        message: "Please verify your email before logging in.",
        isUserEmailVerified: isUserEmailVerified
      };
    }

    return { success: true, message: "Login successful!", isUserEmailVerified: isUserEmailVerified };
  } catch (error: any) {
    let message = "Something went wrong. Please try again.";

    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/invalid-credential":
          message = "No user found with this email address or incorrect password.";
          break;
        case "auth/user-not-found":
          message = "No user found with this email address.";
          break;
        case "auth/wrong-password":
          message = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-email":
          message = "Invalid email format.";
          break;
        case "auth/too-many-requests":
          message = "Too many login attempts. Please try again later.";
          break;
        case "auth/operation-not-allowed":
          message = "Login is disabled for this project.";
          break;
        default:
          message = error.message;
      }
    }

    return {
      success: false,
      message,
    };
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: "Password reset email sent!" };
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong." };
  }
};

// Firebase logout function
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    Alert.alert("Logout Failed", "There was an error while logging out.");
  }
};

// Save Full Profile Function
export const saveUserProfile = async (profileData: {
  name: string;
  age: number,
  profileImage?: string;
  pronouns?: string;
  plan: "free" | "premium";
}) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return {
        success: false,
        message: "No user is currently signed in.",
      };
    }

    await currentUser.reload();

    if (!currentUser.emailVerified) {
      return {
        success: false,
        message: "Please verify your email before setting up your profile.",
      };
    }

    const userId = currentUser.uid;
    const uniqueId = uuid.v4() as string;

    const profile = {
      ...profileData,
      email: currentUser.email,
      uniqueId,
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, "users", userId), profile);

    return {
      success: true,
      message: "Profile setup complete!",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong.",
    };
  }
};

export const getUserProfile = async () => {
  const user = auth.currentUser;
  if (!user) return null;

  const docRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? snapshot.data() : null;
};

export const checkUserProfileExists = async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) return false;

  const profileRef = doc(db, "users", currentUser.uid);
  const profileSnap = await getDoc(profileRef);
  return profileSnap.exists();
};
