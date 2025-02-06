import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons"; // Using vector icons

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Settings Options */}
      <View style={styles.option}>
        <View style={styles.optionLeft}>
          <FontAwesome5 name="globe" size={20} color="orange" />
          <Text style={styles.optionText}>Language</Text>
        </View>
        <Text style={styles.optionValue}>English</Text>
      </View>

      <View style={styles.option}>
        <View style={styles.optionLeft}>
          <FontAwesome5 name="bell" size={20} color="blue" />
          <Text style={styles.optionText}>Notifications</Text>
        </View>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      <View style={styles.option}>
        <View style={styles.optionLeft}>
          <FontAwesome5 name="question-circle" size={20} color="red" />
          <Text style={styles.optionText}>Help</Text>
        </View>
      </View>

      <View style={styles.option}>
        <View style={styles.optionLeft}>
          <FontAwesome5 name="moon" size={20} color="purple" />
          <Text style={styles.optionText}>Dark Mode</Text>
        </View>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  optionValue: {
    color: "gray",
  },
});

export default SettingsScreen;
