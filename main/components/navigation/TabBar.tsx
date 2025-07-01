// components/TabBar.tsx
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const iconMap: Record<
  string,
  {
    filled: keyof typeof Ionicons.glyphMap;
    outline: keyof typeof Ionicons.glyphMap;
  }
> = {
  home: { filled: "home", outline: "home-outline" },
  arena: { filled: "tv", outline: "tv-outline" },
  leaderboard: { filled: "trophy", outline: "trophy-outline" },
};

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row w-full py-4 absolute border-t-2 border-white/10"
      style={[
        {
          backgroundColor: Colors[theme].bg,
          bottom: insets.bottom,
        },
      ]}
    >
      {/* <View className="absolute w-24 h-full rounded-[120px] bg-white"></View> */}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title || route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name as never);
          }
        };

        const icon =
          iconMap[route.name]?.[isFocused ? "filled" : "outline"] ||
          "ellipse-outline";

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            activeOpacity={0.8}
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            className="flex-1 flex-row items-center justify-center gap-2"
          >
            <Ionicons
              name={icon}
              size={24}
              color={isFocused ? "#fff" : "#9CA3AF"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    paddingBottom: 16,
    paddingTop: 8,
    justifyContent: "space-around",
  },
  glassContainer: {
    position: "absolute",
    bottom: 20,
    left: "5%",
    width: "90%",
    borderRadius: 120,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
});
