import { BasicWrapper } from "@/components";
import React from "react";
import { Text, View } from "react-native";

function Home() {
  return (
    <View className="relative flex-1 flex">
      <Text>Home</Text>
    </View>
  );
}

export default BasicWrapper(Home);
