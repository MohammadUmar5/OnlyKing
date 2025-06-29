import { BasicWrapper, ForgotPasswordModal } from "@/components";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";
import { checkUserProfileExists, logIn } from "@/services/auth/auth";
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

const Login = () => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [forgotModalVisible, setForgotModalVisible] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setFeedback(null);

    const result = await logIn(email.trim(), password);

    setLoading(false);
    setFeedback(result.message);

    if (result.success && result.isUserEmailVerified) {
      const hasProfile = await checkUserProfileExists();
      if (hasProfile) {
        router.replace("/home");
      } else {
        router.replace("/auth/profile-setup");
      }
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-6">
      {/* Header Text */}
      <View className="w-full flex items-center">
        <Text
          style={{ color: Colors[theme].textPrimary }}
          className="font-semibold text-5xl"
        >
          Hey there
        </Text>
        <Text
          style={{ color: Colors[theme].textPrimary }}
          className="text-xl mt-2 text-center opacity-50"
        >
          We've missed you. Let’s pick up where we left off
        </Text>
      </View>

      {/* Inputs Container */}

      <View className="w-full mt-6 mb-4">
        {/* Email */}
        <Text className="self-start text-gray-500 text-base mb-1">Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Enter your email"
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

        {/* Forgot Password Link */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setForgotModalVisible(true)}
          className="w-full flex items-end mt-1"
        >
          <Text
            className="opacity-60"
            style={{ color: Colors[theme].textPrimary }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
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

      {/* Login Button */}
      <LinearGradient
        colors={["#b6a8ff", "#9486f0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-3xl w-full h-12 overflow-hidden mt-2"
      >
        <Pressable
          android_ripple={{ color: "#d3cfff" }}
          className="w-full h-full flex items-center justify-center"
          onPress={handleLogin}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-2xl text-white text-center">Login</Text>
          )}
        </Pressable>
      </LinearGradient>

      {/* Don't have an account?? Sign Up Link */}
      <View className="w-full flex flex-row items-center justify-center mt-4">
        <Text
          className="opacity-60"
          style={{ color: Colors[theme].textPrimary }}
        >
          Don't have an account?{" "}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            router.replace("/auth/signup");
          }}
        >
          <Text
            className="opacity-85"
            style={{ color: Colors[theme].textPrimary }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        visible={forgotModalVisible}
        onClose={() => setForgotModalVisible(false)}
        setFeedback={setFeedback}
      />
    </View>
  );
};

const WrappedOnLogin = BasicWrapper(Login);
export default () => <WrappedOnLogin allowGuest />;
