import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const userTypes = [
  {
    type: "Student",
    description: "Access courses, attendance, and grades",
    image: require("../assets/studen_vec-removebg-preview.png"),
  },
  {
    type: "Lecturer",
    description: "Manage attendance and student records",
    image: require("../assets/lecturer-removebg-preview.png"),
  },
  {
    type: "Administrator",
    description: "Oversee system settings and user data",
    image: require("../assets/admin-pic.png"),
  },
];

const UserSelectionScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null); // For web highlight

  const handleSelect = (type) => setSelected(type);

  const handleNext = () => {
    if (selected) navigation.navigate("Login", { userType: selected });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Choose your user type</Text>
        <View style={styles.cardList}>
          {userTypes.map((user) => {
            const isSelected = selected === user.type;
            const isHovered = hovered === user.type;

            return (
              <TouchableOpacity
                key={user.type}
                style={[
                  styles.card,
                  isSelected && styles.cardSelected,
                  isHovered && styles.cardHovered,
                ]}
                onPress={() => handleSelect(user.type)}
                activeOpacity={0.85}
                accessibilityRole="button"
                onMouseEnter={() =>
                  Platform.OS === "web" && setHovered(user.type)
                }
                onMouseLeave={() => Platform.OS === "web" && setHovered(null)}
              >
                <View style={styles.avatarContainer}>
                  <Image
                    source={user.image}
                    style={styles.avatar}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.userType}>{user.type}</Text>
                  <Text style={styles.description}>{user.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.nextButton, !selected && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!selected}
          activeOpacity={selected ? 0.8 : 1}
        >
          <Text style={styles.nextButtonText}>Next →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 36,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#003366",
    textAlign: "center",
    marginBottom: 36,
    letterSpacing: 0.5,
    fontFamily: Platform.select({
      ios: "AvenirNext-Bold",
      android: "Roboto",
      default: "System",
    }),
  },
  cardList: {
    flex: 1,
    gap: 22,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#003366",
    borderRadius: 16,
    backgroundColor: "#f9fbfd",
    paddingVertical: 22,
    paddingHorizontal: 22,
    marginBottom: 10,
    shadowColor: "#003366",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    transition: "all 0.2s",
  },
  cardSelected: {
    borderColor: "#0057d8",
    backgroundColor: "#e6f0ff",
    shadowOpacity: 0.16,
    elevation: 6,
  },
  cardHovered: {
    borderColor: "#1976d2",
    backgroundColor: "#f0f6ff",
  },
  avatarContainer: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: "#e5efff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#c2dbff",
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
  },
  textContainer: {
    flex: 1,
  },
  userType: {
    fontSize: 22,
    fontWeight: "700",
    color: "#003366",
    marginBottom: 4,
  },
  description: {
    fontSize: 15.5,
    color: "#6c757d",
    fontWeight: "500",
  },
  nextButton: {
    position: "absolute",
    bottom: 36,
    right: 24,
    backgroundColor: "#003366",
    paddingVertical: 15,
    paddingHorizontal: 36,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#003366",
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
  },
  nextButtonDisabled: {
    backgroundColor: "#90a4ae",
    shadowOpacity: 0.04,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },
});

export default UserSelectionScreen;
