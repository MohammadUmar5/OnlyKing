import React from "react";
import { Text, View } from "react-native";

function ErrorFallback({ error }: { error: Error }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 18, marginBottom: 10, textAlign: "center" }}>
        😓 Oops! Something went wrong.
      </Text>
      <Text style={{ fontSize: 14, color: "red", textAlign: "center" }}>
        {error.message}
      </Text>
    </View>
  );
}

export default ErrorFallback;
