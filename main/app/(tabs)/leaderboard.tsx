import { BasicWrapper } from "@/components";
import React from "react";
import { ScrollView, Text } from "react-native";

const Leaderboard = () => {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "black" }}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <Text>Leaderboard</Text>
    </ScrollView>
  );
};

export default BasicWrapper(Leaderboard);
