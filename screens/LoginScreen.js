import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

export default function AuthScreen({ navigation }) {
  // Auth state
  const [authMode, setAuthMode] = useState("login"); // "login" or "signup"
  const [role, setRole] = useState("student"); // "student" or "lecturer"
  // Login state
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginShowPassword, setLoginShowPassword] = useState(false);
  const [loginIsLoading, setLoginIsLoading] = useState(false);
  const [loginErrors, setLoginErrors] = useState({ id: "", password: "" });
  // Signup state
  const [signupFullName, setSignupFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPassword2, setSignupPassword2] = useState("");
  const [signupShowPassword, setSignupShowPassword] = useState(false);
  const [signupShowPassword2, setSignupShowPassword2] = useState(false);
  const [signupIsLoading, setSignupIsLoading] = useState(false);
  const [signupErrors, setSignupErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    password2: "",
  });

  // Validation
  const validateLogin = () => {
    let valid = true;
    let newErrors = { id: "", password: "" };
    if (!loginId.trim()) {
      newErrors.id = "ID is required";
      valid = false;
    } else if (loginId.length < 4) {
      newErrors.id = "ID must be at least 4 characters";
      valid = false;
    }
    if (!loginPassword) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (loginPassword.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }
    setLoginErrors(newErrors);
    return valid;
  };

  const validateSignup = () => {
    let valid = true;
    let newErrors = { fullName: "", email: "", password: "", password2: "" };
    if (!signupFullName.trim()) {
      newErrors.fullName = "Full Name is required";
      valid = false;
    }
    if (!signupEmail.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(signupEmail)) {
      newErrors.email = "Valid Email Address is required";
      valid = false;
    }
    if (!signupPassword) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (signupPassword.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }
    if (signupPassword2 !== signupPassword) {
      newErrors.password2 = "Passwords do not match";
      valid = false;
    }
    setSignupErrors(newErrors);
    return valid;
  };

  // Submit handlers
  const handleLogin = () => {
    if (!validateLogin()) return;
    setLoginIsLoading(true);
    setTimeout(() => {
      setLoginIsLoading(false);
      navigation.navigate("Home"); // Go to HomeScreen after login
    }, 1200);
  };

  const handleSignup = () => {
    if (!validateSignup()) return;
    setSignupIsLoading(true);
    setTimeout(() => {
      setSignupIsLoading(false);
      setAuthMode("login");
    }, 1400);
  };

  // Main render
  return (
    <LinearGradient
      colors={["#1e293b", "#0c2461", "#0dcaf0"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        {/* Crest */}
        <View style={styles.crestContainer}>
          <Image
            source={require("../assets/uglogo.png")}
            style={styles.crestImage}
            resizeMode="contain"
          />
        </View>
        {/* Role Selector */}
        <View style={styles.roleRow}>
          <TouchableOpacity
            style={[styles.roleBtn, role === "student" && styles.roleBtnActive]}
            onPress={() => setRole("student")}
          >
            <MaterialCommunityIcons
              name="school"
              size={18}
              color={role === "student" ? "#fff" : "#b8d8f9"}
            />
            <Text
              style={[
                styles.roleBtnText,
                role === "student" && { color: "#fff" },
              ]}
            >
              Student
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.roleBtn,
              role === "lecturer" && styles.roleBtnActive,
            ]}
            onPress={() => setRole("lecturer")}
          >
            <MaterialCommunityIcons
              name="account-tie"
              size={20}
              color={role === "lecturer" ? "#fff" : "#b8d8f9"}
            />
            <Text
              style={[
                styles.roleBtnText,
                role === "lecturer" && { color: "#fff" },
              ]}
            >
              Lecturer
            </Text>
          </TouchableOpacity>
        </View>
        {/* Auth Card */}
        <View style={styles.card}>
          {authMode === "login" ? (
            <>
              <Text style={styles.title}>Welcome back!</Text>
              <View style={styles.subtitleRow}>
                <MaterialCommunityIcons
                  name="fingerprint"
                  size={16}
                  color="#fff"
                />
                <Text style={styles.subtitle}>
                  Attendance is marked via biometrics during class sessions.
                </Text>
              </View>
              {/* ID Field */}
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, loginErrors.id && styles.inputError]}
                  placeholder={role === "student" ? "Student ID" : "Staff ID"}
                  placeholderTextColor="#3a4a69"
                  value={loginId}
                  onChangeText={(text) => {
                    setLoginId(text);
                    if (loginErrors.id)
                      setLoginErrors((prev) => ({ ...prev, id: "" }));
                  }}
                  autoCapitalize="none"
                  returnKeyType="next"
                  editable={!loginIsLoading}
                />
                {loginErrors.id ? (
                  <View style={styles.errorRow}>
                    <Feather name="alert-circle" size={14} color="#f44336" />
                    <Text style={styles.errorText}>{loginErrors.id}</Text>
                  </View>
                ) : null}
              </View>
              {/* Password Field */}
              <View style={styles.inputWrapper}>
                <View style={{ position: "relative" }}>
                  <TextInput
                    style={[
                      styles.input,
                      loginErrors.password && styles.inputError,
                      { paddingRight: 38 },
                    ]}
                    placeholder="Password"
                    placeholderTextColor="#3a4a69"
                    value={loginPassword}
                    onChangeText={(text) => {
                      setLoginPassword(text);
                      if (loginErrors.password)
                        setLoginErrors((prev) => ({ ...prev, password: "" }));
                    }}
                    secureTextEntry={!loginShowPassword}
                    autoCapitalize="none"
                    editable={!loginIsLoading}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setLoginShowPassword((prev) => !prev)}
                    disabled={loginIsLoading}
                  >
                    <Feather
                      name={loginShowPassword ? "eye-off" : "eye"}
                      size={21}
                      color="#3a4a69"
                    />
                  </TouchableOpacity>
                </View>
                {loginErrors.password ? (
                  <View style={styles.errorRow}>
                    <Feather name="alert-circle" size={14} color="#f44336" />
                    <Text style={styles.errorText}>{loginErrors.password}</Text>
                  </View>
                ) : null}
              </View>
              {/* Login Button */}
              <TouchableOpacity
                style={styles.actionBtn}
                disabled={loginIsLoading}
                onPress={handleLogin}
                activeOpacity={0.9}
              >
                {loginIsLoading ? (
                  <>
                    <ActivityIndicator color="#fff" />
                    <Text style={[styles.actionBtnText, { marginLeft: 8 }]}>
                      Signing in...
                    </Text>
                  </>
                ) : (
                  <>
                    <Feather name="check-circle" size={20} color="#fff" />
                    <Text style={[styles.actionBtnText, { marginLeft: 8 }]}>
                      Login
                    </Text>
                  </>
                )}
              </TouchableOpacity>
              {/* Forgot Password */}
              <TouchableOpacity
                style={styles.forgotLink}
                disabled={loginIsLoading}
              >
                <Text style={styles.forgotLinkText}>Forgot your password?</Text>
              </TouchableOpacity>
              {/* Don't have an account? Sign up */}
              <TouchableOpacity
                style={styles.signUpLink}
                disabled={loginIsLoading}
                onPress={() => setAuthMode("signup")}
              >
                <Text style={styles.signUpText}>
                  {"Don't have an account? "}
                  <Text style={styles.signUpTextLink}>Sign up</Text>
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            // Sign Up Form
            <>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join our academic community</Text>
              {/* Full Name */}
              <View style={styles.inputWrapper}>
                <View style={styles.inputIconRow}>
                  <Feather
                    name="user"
                    size={18}
                    color="#b8d8f9"
                    style={{ marginRight: 8 }}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      signupErrors.fullName && styles.inputError,
                    ]}
                    placeholder="Full Name"
                    placeholderTextColor="#3a4a69"
                    value={signupFullName}
                    onChangeText={setSignupFullName}
                    autoCapitalize="words"
                    editable={!signupIsLoading}
                  />
                </View>
                {signupErrors.fullName ? (
                  <Text style={styles.errorText}>{signupErrors.fullName}</Text>
                ) : null}
              </View>
              {/* Email */}
              <View style={styles.inputWrapper}>
                <View style={styles.inputIconRow}>
                  <Feather
                    name="mail"
                    size={18}
                    color="#b8d8f9"
                    style={{ marginRight: 8 }}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      signupErrors.email && styles.inputError,
                    ]}
                    placeholder="Email Address"
                    placeholderTextColor="#3a4a69"
                    value={signupEmail}
                    onChangeText={setSignupEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    editable={!signupIsLoading}
                  />
                </View>
                {signupErrors.email ? (
                  <Text style={styles.errorText}>{signupErrors.email}</Text>
                ) : null}
              </View>
              {/* Password */}
              <View style={styles.inputWrapper}>
                <View style={styles.inputIconRow}>
                  <Feather
                    name="lock"
                    size={18}
                    color="#b8d8f9"
                    style={{ marginRight: 8 }}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      signupErrors.password && styles.inputError,
                      { paddingRight: 36 },
                    ]}
                    placeholder="Password"
                    placeholderTextColor="#3a4a69"
                    value={signupPassword}
                    onChangeText={setSignupPassword}
                    autoCapitalize="none"
                    secureTextEntry={!signupShowPassword}
                    editable={!signupIsLoading}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setSignupShowPassword((prev) => !prev)}
                    disabled={signupIsLoading}
                  >
                    <Feather
                      name={signupShowPassword ? "eye-off" : "eye"}
                      size={18}
                      color="#3a4a69"
                    />
                  </TouchableOpacity>
                </View>
                {signupErrors.password ? (
                  <Text style={styles.errorText}>{signupErrors.password}</Text>
                ) : null}
              </View>
              {/* Confirm Password */}
              <View style={styles.inputWrapper}>
                <View style={styles.inputIconRow}>
                  <Feather
                    name="lock"
                    size={18}
                    color="#b8d8f9"
                    style={{ marginRight: 8 }}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      signupErrors.password2 && styles.inputError,
                      { paddingRight: 36 },
                    ]}
                    placeholder="Confirm Password"
                    placeholderTextColor="#3a4a69"
                    value={signupPassword2}
                    onChangeText={setSignupPassword2}
                    autoCapitalize="none"
                    secureTextEntry={!signupShowPassword2}
                    editable={!signupIsLoading}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setSignupShowPassword2((prev) => !prev)}
                    disabled={signupIsLoading}
                  >
                    <Feather
                      name={signupShowPassword2 ? "eye-off" : "eye"}
                      size={18}
                      color="#3a4a69"
                    />
                  </TouchableOpacity>
                </View>
                {signupErrors.password2 ? (
                  <Text style={styles.errorText}>{signupErrors.password2}</Text>
                ) : null}
              </View>
              {/* Sign Up Button */}
              <TouchableOpacity
                style={styles.actionBtn}
                disabled={signupIsLoading}
                onPress={handleSignup}
                activeOpacity={0.9}
              >
                {signupIsLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Feather name="user-plus" size={20} color="#fff" />
                    <Text style={[styles.actionBtnText, { marginLeft: 8 }]}>
                      Sign Up
                    </Text>
                  </>
                )}
              </TouchableOpacity>
              {/* Already have account */}
              <TouchableOpacity
                style={styles.signInLink}
                disabled={signupIsLoading}
                onPress={() => setAuthMode("login")}
              >
                <Text style={styles.signInText}>
                  Already have an account?{" "}
                  <Text style={styles.signInTextLink}>Sign in here</Text>
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2025 Educational Institution. All rights reserved.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  crestContainer: {
    alignItems: "center",
    marginTop: 38,
    marginBottom: 8,
    minHeight: 108,
    minWidth: 96,
  },
  crestImage: { width: 96, height: 108 },
  roleRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    gap: 12,
  },
  roleBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
    paddingHorizontal: 22,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.10)",
    marginHorizontal: 6,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.18)",
    gap: 8,
  },
  roleBtnActive: {
    backgroundColor: "#2979f7",
    borderColor: "#2979f7",
  },
  roleBtnText: {
    color: "#b8d8f9",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 6,
  },
  card: {
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 28,
    borderWidth: 1.7,
    borderColor: "rgba(255,255,255,0.17)",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 8,
    paddingTop: 18,
    paddingBottom: 18,
    paddingHorizontal: 16,
    alignItems: "stretch",
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 3,
  },
  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    gap: 6,
  },
  subtitle: {
    color: "#e3e9ff",
    fontSize: 14.5,
    marginLeft: 7,
    fontWeight: "500",
    textAlign: "center",
    flex: 1,
  },
  inputWrapper: { marginBottom: 16 },
  input: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.09)",
    borderColor: "rgba(255,255,255,0.19)",
    borderWidth: 1.5,
    borderRadius: 13,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 0,
  },
  inputIconRow: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 11,
    padding: 4,
  },
  inputError: {
    borderColor: "#f44336",
  },
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    gap: 6,
  },
  errorText: {
    color: "#f44336",
    fontSize: 13,
    marginLeft: 5,
    fontWeight: "500",
  },
  actionBtn: {
    marginTop: 8,
    backgroundColor: "#2979f7",
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    shadowColor: "#2979f7",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 5,
  },
  actionBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  forgotLink: {
    marginTop: 13,
    alignSelf: "center",
  },
  forgotLinkText: {
    color: "#dbeafe",
    fontSize: 15,
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
    textAlign: "center",
    opacity: 0.8,
    letterSpacing: 0.2,
  },
  signUpLink: { marginTop: 18, alignSelf: "center" },
  signUpText: {
    color: "#dbeafe",
    fontSize: 15,
    textAlign: "center",
    opacity: 0.8,
    letterSpacing: 0.2,
  },
  signUpTextLink: {
    color: "#fff",
    fontWeight: "bold",
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
  },
  signInLink: { marginTop: 18, alignSelf: "center" },
  signInText: {
    color: "#dbeafe",
    fontSize: 15,
    textAlign: "center",
    opacity: 0.8,
    letterSpacing: 0.2,
  },
  signInTextLink: {
    color: "#fff",
    fontWeight: "bold",
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
  },
  footer: {
    marginTop: 38,
    alignItems: "center",
  },
  footerText: {
    color: "#e3e3e3",
    fontSize: 12.2,
    opacity: 0.5,
    textAlign: "center",
    fontWeight: "500",
  },
});
