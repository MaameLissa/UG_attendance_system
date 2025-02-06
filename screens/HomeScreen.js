import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const HomeScreen = ({ navigation, route }) => {
  const [selectedMonth, setSelectedMonth] = useState("December");
  const userName = route?.params?.userName || "Melissa";

  const userTypes = {
    Administrators: "Oversee trends and manage system settings",
    Lecturers: "Monitor attendance, generate reports, and notify students",
    Students:
      "Mark attendance, view history, and receive notifications on eligibility",
  };

  const courses = [
    "DCIT321",
    "DCIT305",
    "DCIT317",
    "DCIT301",
    "DCIT313",
    "DCIT303",
  ];

  // Calendar data structure
  const calendar = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={require("../assets/photo21.jpg")}
              style={styles.profileImage}
            />
            <Text style={styles.welcomeText}>Welcome {userName},</Text>
          </View>
          <TouchableOpacity style={styles.notificationIcon}>
            <Text>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Overview Section */}
        <View style={styles.overviewContainer}>
          <Text style={styles.overviewTitle}>
            Biometric Attendance Overview
          </Text>
          <Text style={styles.overviewDescription}>
            This system ensures accurate and efficient attendance tracking using
            fingerprint scanning or facial recognition, supporting the
            University of Ghana's 70% attendance rule for exam eligibility.
          </Text>

          {/* User Types Grid */}
          <View style={styles.userTypesGrid}>
            {Object.entries(userTypes).map(([type, description]) => (
              <View key={type} style={styles.userTypeCard}>
                <Text style={styles.userTypeTitle}>{type}</Text>
                <Text style={styles.userTypeDescription}>{description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Attendance History Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attendance History</Text>

          {/* Month Selector */}
          <View style={styles.monthSelector}>
            <TouchableOpacity>
              <Text style={styles.monthArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.monthText}>{selectedMonth}</Text>
            <TouchableOpacity>
              <Text style={styles.monthArrow}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Calendar Grid */}
          <View style={styles.calendarGrid}>
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
              <Text key={day} style={styles.dayHeader}>
                {day}
              </Text>
            ))}
            {calendar.map((day) => (
              <View key={day} style={styles.dateCell}>
                <Text style={styles.dateText}>{day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Courses Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Courses</Text>
          <View style={styles.coursesGrid}>
            {courses.map((course, index) => (
              <TouchableOpacity key={index} style={styles.courseButton}>
                <Text style={styles.courseText}>{course}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text>🏠</Text>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text>📊</Text>
          <Text style={styles.navText}>Classes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text>📅</Text>
          <Text style={styles.navText}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text>👤</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.navItem}>
          <Text>⚙️</Text>
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Settings")}
        >
          <Text>⚙️</Text>
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "600",
  },
  notificationIcon: {
    padding: 8,
  },
  overviewContainer: {
    padding: 16,
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  overviewDescription: {
    color: "#666",
    lineHeight: 20,
    marginBottom: 16,
  },
  userTypesGrid: {
    gap: 12,
  },
  userTypeCard: {
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginBottom: 8,
  },
  userTypeTitle: {
    fontWeight: "600",
    marginBottom: 4,
  },
  userTypeDescription: {
    fontSize: 12,
    color: "#666",
  },
  section: {
    padding: 16,
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  monthSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  monthArrow: {
    fontSize: 24,
    color: "#007AFF",
  },
  monthText: {
    fontSize: 16,
    fontWeight: "600",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dayHeader: {
    width: "14.28%",
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "600",
  },
  dateCell: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
  },
  coursesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  courseButton: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    minWidth: "30%",
  },
  courseText: {
    textAlign: "center",
    fontWeight: "500",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default HomeScreen;
