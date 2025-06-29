import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ProfilePrompt = () => {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <FontAwesome name="lock" size={48} color={Colors[theme].textPrimary} />
      <Text
        className="text-2xl font-semibold text-center"
        style={{ color: Colors[theme].textPrimary }}
      >
        Complete your profile
      </Text>
      <Text
        className="text-base text-center opacity-70"
        style={{ color: Colors[theme].textPrimary }}
      >
        Let’s get to know you better! Finish setting up your profile to start
        your journey.
      </Text>
      <TouchableOpacity
        className="bg-indigo-600 px-6 py-3 rounded-xl shadow-md active:opacity-80"
        activeOpacity={0.8}
        onPress={() => router.push("/auth/profile-setup")}
      >
        <Text className="text-white text-base font-bold">Setup Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePrompt;
