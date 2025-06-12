import React, { useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient"; // Install expo-linear-gradient

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("UserSelection");
    }, 3000); // 3 seconds is standard for splash

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={["#08306b", "#003366", "#00509e"]}
      style={{ flex: 1 }}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#003366" barStyle="light-content" />
        <View style={styles.content}>
          <Text style={styles.welcomeText}>UG Attendance Tracker</Text>
          <Text style={styles.subText}>
            Tracking Progress, Inspiring Achievement
          </Text>
          <Image
            source={require("../assets/uglogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.ghanaText}>UNIVERSITY OF GHANA</Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontFamily: Platform.select({
      ios: "AvenirNext-Bold",
      android: "Roboto",
      default: "System",
    }),
    letterSpacing: 1.1,
    marginBottom: 10,
  },
  subText: {
    fontSize: 18,
    color: "#e0e7ef",
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "400",
    marginBottom: 30,
    fontFamily: Platform.select({
      ios: "AvenirNext-Regular",
      android: "Roboto",
      default: "System",
    }),
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  ghanaText: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 40,
    fontFamily: Platform.select({
      ios: "AvenirNext-Bold",
      android: "Roboto",
      default: "System",
    }),
  },
});

export default SplashScreen;
