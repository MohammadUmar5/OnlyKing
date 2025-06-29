import { BasicWrapper } from "@/components";
import { saveUserProfile } from "@/services/auth/profile";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ProfileForm {
  name: string;
  username: string;
  age: string;
  profileImage: string;
  bannerImage: string;
  pronouns: string;
  language: string;
  interests: string;
  plan: "free" | "premium";
  socialLinks: {
    twitter: string;
    instagram: string;
    facebook: string;
    linkedin: string;
    website: string;
  };
}

const ProfileSetup = () => {
  const steps = [0];
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState<ProfileForm>({
    name: "",
    username: "",
    age: "",
    profileImage: "",
    bannerImage: "",
    pronouns: "",
    language: "en",
    interests: "",
    plan: "free",
    socialLinks: {
      twitter: "",
      instagram: "",
      facebook: "",
      linkedin: "",
      website: "",
    },
  });
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async (type: "profile" | "banner") => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.6,
    });

    if (!result.canceled && result.assets?.[0]?.base64) {
      const imageUri = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setForm({
        ...form,
        [type === "profile" ? "profileImage" : "bannerImage"]: imageUri,
      });
    }
  };

  const validateStep = (): boolean => {
    if (!form.name.trim()) return setFeedback("Name is required."), false;
    if (!form.username.trim())
      return setFeedback("Username is required."), false;
    const age = Number(form.age);
    if (!age || isNaN(age) || age < 1)
      return setFeedback("Invalid age."), false;
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setFeedback(null);
    if (stepIndex < steps.length - 1) setStepIndex(stepIndex + 1);
    else handleProfileSubmit();
  };

  const handleBack = () => {
    setFeedback(null);
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  const handleProfileSubmit = async () => {
    const ageNumber = Number(form.age);
    const profileData = {
      name: form.name.trim(),
      username: form.username.trim(),
      age: ageNumber,
      profileImage: form.profileImage,
      bannerImage: form.bannerImage,
      pronouns: form.pronouns,
      language: form.language,
      interests: form.interests
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
      socialLinks: form.socialLinks,
      onlineStatus: true,
      isVerified: false,
      friends: [],
      bondCount: 0,
      plan: form.plan,
    };

    setLoading(true);
    const { success, message } = await saveUserProfile(profileData);
    setFeedback(message);
    setLoading(false);
    if (success) router.replace("/home");
  };

  const renderInputs = () => (
    <View className="flex flex-col items-center justify-center gap-4">
      <View className="items-center">
        {/* Profile Image */}
        <TouchableOpacity onPress={() => pickImage("profile")}>
          {form.profileImage ? (
            <Image
              source={{ uri: form.profileImage }}
              className="w-24 h-24 rounded-full"
            />
          ) : (
            <View className="w-24 h-24 bg-gray-300 rounded-full items-center justify-center">
              <Entypo name="camera" size={32} color="white" />
            </View>
          )}
        </TouchableOpacity>
        <Text className="text-xs text-gray-500 mt-1">Profile Picture</Text>

        {/* Banner Image */}
        <TouchableOpacity onPress={() => pickImage("banner")} className="mt-4">
          {form.bannerImage ? (
            <Image
              source={{ uri: form.bannerImage }}
              className="w-full h-20 rounded-lg"
            />
          ) : (
            <View className="w-full h-20 bg-gray-200 rounded-lg items-center justify-center">
              <Entypo name="image" size={26} color="gray" />
            </View>
          )}
        </TouchableOpacity>
        <Text className="text-xs text-gray-500 mt-1">Banner Image</Text>
      </View>

      {/* Text Inputs */}
      <View className="w-full px-3">
        {[
          {
            label: "What should we call you?",
            field: "name",
            placeholder: "Your name",
          },
          {
            label: "Pick a username",
            field: "username",
            placeholder: "e.g., moonknight",
          },
          {
            label: "How old are you?",
            field: "age",
            placeholder: "e.g., 22",
            keyboardType: "numeric",
          },
          {
            label: "Your pronouns",
            field: "pronouns",
            placeholder: "e.g., she/her",
          },
          {
            label: "Preferred language",
            field: "language",
            placeholder: "e.g., en, hi",
          },
          {
            label: "Your interests",
            field: "interests",
            placeholder: "e.g., coding, music",
          },
        ].map(({ label, field, placeholder, keyboardType }) => (
          <View key={field} className="mb-3">
            <Text className="text-[14px] text-[#523c72]">{label}</Text>
            <TextInput
              value={form[field as keyof ProfileForm] as string}
              onChangeText={(text) => setForm({ ...form, [field]: text })}
              placeholder={placeholder}
              keyboardType={keyboardType as any}
              className="border-b border-[#523c72] text-[#523c72] w-full text-lg"
            />
          </View>
        ))}

        {/* Social Links */}
        <Text className="text-[14px] text-[#523c72] mt-3">Social Links</Text>
        {["twitter", "instagram", "facebook", "linkedin", "website"].map(
          (key) => (
            <TextInput
              key={key}
              placeholder={`Your ${key}`}
              value={form.socialLinks[key as keyof typeof form.socialLinks]}
              onChangeText={(text) =>
                setForm({
                  ...form,
                  socialLinks: { ...form.socialLinks, [key]: text },
                })
              }
              className="border-b border-[#523c72] text-[#523c72] mb-3 w-full text-lg"
            />
          )
        )}
      </View>
    </View>
  );

  return (
    <View className="w-full bg-gray-500 rounded-3xl overflow-hidden p-4 max-w-md">
      {renderInputs()}
      {feedback && (
        <Text className="text-center text-[#312170] mt-2">{feedback}</Text>
      )}
      <View className="flex-row justify-between mt-6">
        {stepIndex > 0 && (
          <Pressable
            onPress={handleBack}
            className="bg-gray-300 py-3 px-6 rounded-2xl"
          >
            <Text className="text-gray-800 text-[14px]">Back</Text>
          </Pressable>
        )}
        <Pressable
          onPress={handleNext}
          className="bg-[#9486f0] py-3 px-6 rounded-2xl ml-auto"
          disabled={loading}
        >
          <Text className="text-white text-[14px]">
            {loading
              ? "Saving..."
              : stepIndex === steps.length - 1
              ? "Finish Setup"
              : "Continue"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const WrappedOnProfileSetup = BasicWrapper(ProfileSetup);
export default () => <WrappedOnProfileSetup allowGuest />;
