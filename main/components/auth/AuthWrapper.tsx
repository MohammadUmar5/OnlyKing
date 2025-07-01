// components/AuthWrapper.tsx
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthProvider";
import { useTheme } from "@/contexts/ThemeProvider";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthWrapper = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => {
    const { hasProfile } = useAuth();
    const { theme } = useTheme();

    return (
      <SafeAreaView
        style={{ backgroundColor: Colors[theme].bg }}
        className="flex-1"
      >
        <StatusBar style="light" />
        <WrappedComponent {...props} />
      </SafeAreaView>
    );
  };
};

export default AuthWrapper;
