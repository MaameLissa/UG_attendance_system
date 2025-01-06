import React, { useEffect } from "react";
import { View, Image, StyleSheet, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("UserSelection");
    }, 9000); // Splash screen will show for 3 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#003366" barStyle="light-content" />
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to UG Attendance Tracker</Text>
        <Text style={styles.subText}>
          Tracking Progress, Inspiring Achievement
        </Text>
        <Image
          source={require("../assets/UG_logo.jpeg")} // Make sure to add the UG logo to your assets folder
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003366", // Dark blue color
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "600",
  },
  subText: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 40,
    fontStyle: "italic",
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default SplashScreen;
