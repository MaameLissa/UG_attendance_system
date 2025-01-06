import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [studentSelected, setStudentSelected] = useState(true);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (studentSelected) {
      // Handle student login
      console.log("Logging in as Student", id, password);
    } else {
      // Handle staff login
      console.log("Logging in as Staff", id, password);
    }
    navigation.navigate("Home"); // Replace "Home" with the actual page
  };

  const navigateToSignUp = () => {
    navigation.navigate("SignUp"); // Navigate to the Sign-Up page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>University of Ghana</Text>
      <Text style={styles.subHeaderText}>Attendance Tracking System</Text>

      {/* Toggle for Student/Staff Login */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            studentSelected && styles.selectedButton,
          ]}
          onPress={() => setStudentSelected(true)}
        >
          <Text style={styles.toggleButtonText}>Student</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            !studentSelected && styles.selectedButton,
          ]}
          onPress={() => setStudentSelected(false)}
        >
          <Text style={styles.toggleButtonText}>Staff</Text>
        </TouchableOpacity>
      </View>

      {/* Login Form */}
      <TextInput
        style={styles.input}
        placeholder="Enter your ID"
        value={id}
        onChangeText={setId}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToSignUp}>
        <Text style={styles.signUpText}>
          Don’t have an account? <Text style={styles.signUpLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: "#003366",
    borderRadius: 8,
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: "#003366",
  },
  toggleButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  loginButton: {
    backgroundColor: "#003366",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpText: {
    fontSize: 14,
    color: "#666",
  },
  signUpLink: {
    color: "#003366",
    fontWeight: "bold",
  },
});

export default LoginScreen;
