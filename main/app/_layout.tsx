import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";

import { AlertProvider } from "@/contexts/AlertProvider";
import { AuthProvider } from "@/contexts/AuthProvider";
import { NetworkProvider } from "@/contexts/NetworkProvider";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
          <NetworkProvider>
            <AlertProvider>
              <Stack screenOptions={{ headerShown: false }} />
              <StatusBar style="auto" />
            </AlertProvider>
          </NetworkProvider>
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
