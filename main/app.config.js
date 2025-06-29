export default {
  expo: {
    name: "Onlyking",
    slug: "onlyking",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/logos/app_icon.png",
    scheme: "onlyking",
    deepLinking: true,
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.onlyking",
    },

    android: {
      package: "com.onlyking",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.onlyking",
      adaptiveIcon: {
        foregroundImage: "./assets/logos/app_icon.png",
        backgroundColor: "#000",
      },
      splash: {
        image: "./assets/logos/app_icon.png",
        resizeMode: "contain",
        backgroundColor: "#000",
      },
    },

    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/logos/app_icon.png",
    },

    plugins: ["expo-router"],

    experiments: {
      typedRoutes: true,
    },

    extra: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    },
  },
};
