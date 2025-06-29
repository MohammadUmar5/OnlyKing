// components/BasicWrapper.tsx
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthProvider";
import { useTheme } from "@/contexts/ThemeProvider";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginPrompt from "../auth/LoginPrompt";
import ProfilePrompt from "../auth/ProfilePrompt";

interface WithGuestAccess {
  allowGuest?: boolean;
}

const BasicWrapper = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & WithGuestAccess> => {
  return ({ allowGuest = false, ...props }: P & WithGuestAccess) => {
    const { isLoggedIn, hasProfile } = useAuth();
    const { theme } = useTheme();

    const shouldShowContent = allowGuest || (isLoggedIn && hasProfile);

    return (
      <SafeAreaView
        style={{ backgroundColor: Colors[theme].bg }}
        className="flex-1"
      >
        <StatusBar style="light" />
        {shouldShowContent ? (
          <WrappedComponent {...(props as P)} />
        ) : isLoggedIn ? (
          <ProfilePrompt />
        ) : (
          <LoginPrompt />
        )}
      </SafeAreaView>
    );
  };
};

export default BasicWrapper;
