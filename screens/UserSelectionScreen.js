import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const UserSelectionScreen = () => {
  const navigation = useNavigation();

  const userTypes = [
    {
      type: "Student",
      description: "Access courses, attendance, and grades",
      icon: "👨‍💻",
    },
    {
      type: "Lecturer",
      description: "Manage attendance and student records",
      icon: "👩‍🏫",
    },
    {
      type: "Administrator",
      description: "Oversee system settings and user data",
      icon: "🔍",
    },
  ];

  const handleSelection = (userType) => {
    navigation.navigate("Login", { userType });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Select user type</Text>

      {userTypes.map((user, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => handleSelection(user.type)}
        >
          <View style={styles.cardContent}>
            <View style={styles.textContainer}>
              <Text style={styles.userType}>{user.type}</Text>
              <Text style={styles.description}>{user.description}</Text>
            </View>
            <Text style={styles.icon}>{user.icon}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.nextButtonText}>Next →</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
  },
  userType: {
    fontSize: 18,
    fontWeight: "600",
    color: "#003366",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  icon: {
    fontSize: 24,
    marginLeft: 10,
  },
  nextButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#003366",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default UserSelectionScreen;
