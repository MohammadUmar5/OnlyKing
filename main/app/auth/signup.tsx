import { BasicWrapper, EmailSentModal } from "@/components";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";
import { signUp } from "@/services/auth/auth";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Signup = () => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async () => {
    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setFeedback("Please enter a valid email!");
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setFeedback("Password do not match");
      return;
    }

    // Check if password is strong enough (optional)
    if (password.length < 6) {
      setFeedback("Password should be at least 6 characters long!");
      return;
    }

    try {
      setLoading(true);

      const { success, message } = await signUp(email, password);

      setLoading(false);

      if (success) {
        setModalVisible(true);
      } else {
        setFeedback(message);
      }
    } catch (error) {
      setFeedback("Something went wrong. Please try again.");
    }
  };

  const handleOkButton = () => {
    setModalVisible(false);
  };

  return (
    <View className="flex-1 items-center justify-center p-6">
      {/* Header Text */}
      <View className="w-full flex items-center">
        <Text
          style={{ color: Colors[theme].textPrimary }}
          className="font-semibold text-5xl"
        >
          Welcome!
        </Text>
        <Text
          style={{ color: Colors[theme].textPrimary }}
          className="text-xl mt-2 text-center opacity-50"
        >
          Let's get you signed up
        </Text>
      </View>

      {/* Inputs Container */}
      <View className="w-full mt-6 mb-4">
        {/* Email */}
        <Text className="self-start text-gray-500 text-base mb-1">Email</Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="white"
          keyboardType="email-address"
          className="w-full placeholder:text-gray-400 text-xl bg-white/10 rounded-xl px-4 py-2 mb-4"
          style={{ color: Colors[theme].textPrimary }}
        />

        {/* Password */}
        <Text className="self-start text-gray-500 text-base mb-1">
          Password
        </Text>
        <View className="w-full flex-row items-center bg-white/10 rounded-xl px-4">
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="white"
            className="flex-1 placeholder:text-gray-400"
            style={{ color: Colors[theme].textPrimary }}
            secureTextEntry={!showPassword}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Entypo
              name={showPassword ? "eye-with-line" : "eye"}
              size={22}
              color={Colors[theme].visibleIcon}
            />
          </Pressable>
        </View>

        {/* Confirm Password */}
        <Text className="self-start text-gray-500 text-base my-1">
          Confirm Password
        </Text>
        <View className="w-full flex-row items-center bg-white/10 rounded-xl px-4">
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor="white"
            className="flex-1 placeholder:text-gray-400"
            style={{ color: Colors[theme].textPrimary }}
            secureTextEntry={!showPassword}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Entypo
              name={showPassword ? "eye-with-line" : "eye"}
              size={22}
              color={Colors[theme].visibleIcon}
            />
          </Pressable>
        </View>
      </View>

      {/* Feedback */}
      {feedback && (
        <Text
          className="text-center mb-3 opacity-60"
          style={{ color: Colors[theme].textPrimary }}
        >
          {feedback}
        </Text>
      )}

      {/* Sign Up Button */}
      <LinearGradient
        colors={["#b6a8ff", "#9486f0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-3xl w-full h-12 overflow-hidden mt-2"
      >
        <Pressable
          android_ripple={{ color: "#d3cfff" }}
          className="w-full h-full flex items-center justify-center"
          onPress={handleSignUp}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-2xl text-white text-center">Signup</Text>
          )}
        </Pressable>
      </LinearGradient>

      {/* Already Have an Account? Login Link */}
      <View className="w-full flex flex-row items-center justify-center mt-4">
        <Text
          className="opacity-60"
          style={{ color: Colors[theme].textPrimary }}
        >
          Already have an account?{" "}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            router.replace("/auth/login");
          }}
        >
          <Text
            className="opacity-85"
            style={{ color: Colors[theme].textPrimary }}
          >
            Log In
          </Text>
        </TouchableOpacity>
      </View>

      {/* Email Sent Modal */}
      <EmailSentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleOk={handleOkButton}
      />
    </View>
  );
};

const WrappedOnSignup = BasicWrapper(Signup);
export default () => <WrappedOnSignup allowGuest />;
