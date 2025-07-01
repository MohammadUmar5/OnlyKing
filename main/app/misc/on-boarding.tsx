import { BasicWrapper } from "@/components";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OnBoarding = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 items-center justify-center pt-12">
      <Text>On Boarding</Text>
      {/* Button */}
      <LinearGradient
        colors={["#b6a8ff", "#9486f0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-3xl h-12 overflow-hidden my-6 w-1/2"
      >
        <Pressable
          android_ripple={{ color: "#d3cfff" }}
          className="w-full h-full flex items-center justify-center"
          onPress={() => router.replace("/auth/login")}
        >
          <Text className="text-2xl text-white text-center">Login</Text>
        </Pressable>
      </LinearGradient>
    </SafeAreaView>
  );
};

const WrappedOnBoarding = BasicWrapper(OnBoarding);
export default () => <WrappedOnBoarding allowGuest />;
