import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import uuid from "react-native-uuid";
import { auth, db } from "../config";

export const saveUserProfile = async (profileData: {
  name: string;
  username: string;
  plan: "free" | "premium";
  age?: number;
  profileImage?: string;
  bannerImage?: string;
  pronouns?: string;
  gender?: string;
  location?: string;
  language?: string;
  bio?: string;
  onlineStatus?: boolean;
  isVerified?: boolean;
  interests?: string[];
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    website?: string;
  };
  friends?: string[];
  bondCount?: number;
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
      updatedAt: serverTimestamp(),
    };

    await setDoc(doc(db, "users", userId), profile, { merge: true });

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
