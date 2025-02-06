import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function ProfileScreen() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    name: "Melissa Otoo",
    email: "motoo110@st.ug.edu.gh",
    level: "Level 300",
    department: "Computer Science Dept.",
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    Alert.alert("Profile Saved", "Your profile has been saved successfully.", [
      { text: "OK", onPress: () => navigation.navigate("Home") },
    ]);
  };

  const handleCancel = () => {
    navigation.navigate("Home");
  };

  const handleLogout = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Edit Profile</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Picture */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/belle.jpg")}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon}>
            <Text style={styles.editIconText}>✎</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        {["name", "email", "level", "department"].map((field) => (
          <View key={field} style={styles.inputContainer}>
            <Text style={styles.label}>{field.toUpperCase()}</Text>
            <TextInput
              value={formData[field]}
              onChangeText={(value) => handleChange(field, value)}
              style={styles.input}
            />
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8eaf6",
    padding: 16,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  buttonText: {
    color: "#1976D2",
    fontSize: 16,
    fontWeight: "500",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  imageContainer: {
    position: "relative",
    marginBottom: 20,
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#1976D2",
    borderRadius: 16,
    padding: 5,
  },
  editIconText: {
    color: "white",
    fontSize: 12,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 12,
  },
  label: {
    color: "#757575",
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 10,
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  logoutButton: {
    marginTop: 20,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "rgba(255, 0, 0, 0.1)",
    alignItems: "center",
    width: "100%",
  },
  logoutText: {
    color: "#D32F2F",
    fontSize: 16,
  },
});

export default ProfileScreen;
