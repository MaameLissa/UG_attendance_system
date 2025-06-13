import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const STATUS_STYLES = {
  Excellent: {
    badgeBg: "#e6ffe8",
    badgeText: "#23b26d",
    percent: "#23b26d",
    iconBg: "#ff4fa1",
  },
  Good: {
    badgeBg: "#fffbe6",
    badgeText: "#f7b500",
    percent: "#f7b500",
    iconBg: "#13c6b3",
  },
  Attention: {
    badgeBg: "#ffeaea",
    badgeText: "#f74e93",
    percent: "#f74e93",
    iconBg: "#f74e93",
  },
  "Needs Attention": {
    // ← add this line
    badgeBg: "#ffeaea",
    badgeText: "#f74e93",
    percent: "#f74e93",
    iconBg: "#f74e93",
  },
};

export default function CourseCard({ course, onPress }) {
  const status = course.attendanceStatus || "Excellent";
  const statusStyle = STATUS_STYLES[status] || STATUS_STYLES.Excellent;
  const iconBg = course.iconBg || statusStyle.iconBg;

  return (
    <View style={styles.card}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={[styles.iconBg, { backgroundColor: iconBg }]}>
          <MaterialCommunityIcons
            name="book-open-variant"
            size={26}
            color="#fff"
          />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.code}>{course.code}</Text>
          <Text style={styles.name}>{course.name}</Text>
        </View>
        <Feather name="chevron-right" size={22} color="#b6b6b6" />
      </View>
      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text
            style={[styles.attendanceValue, { color: statusStyle.percent }]}
          >
            {course.attendance}%
          </Text>
          <View
            style={[
              styles.attendanceBadge,
              { backgroundColor: statusStyle.badgeBg },
            ]}
          >
            <Text
              style={[
                styles.attendanceBadgeText,
                { color: statusStyle.badgeText },
              ]}
            >
              {course.attendanceStatus}
            </Text>
          </View>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.sessionsValue}>{course.sessions}</Text>
          <Text style={styles.sessionsLabel}>Sessions</Text>
        </View>
      </View>
      {/* Details Row */}
      <View style={styles.detailRow}>
        <Feather name="clock" size={16} color="#b6b6b6" />
        <Text style={styles.detailLabel}>Next Class</Text>
        <Text style={styles.detailValue}>{course.nextClass}</Text>
      </View>
      <View style={styles.detailRow}>
        <Feather name="user" size={16} color="#b6b6b6" />
        <Text style={styles.detailLabel}>Instructor</Text>
        <Text style={styles.detailValue}>{course.instructor}</Text>
      </View>
      <View style={styles.detailRow}>
        <Feather name="book" size={16} color="#b6b6b6" />
        <Text style={styles.detailLabel}>Credits</Text>
        <Text style={styles.detailValue}>{course.credits} Credits</Text>
      </View>
      {/* Progress Bar */}
      <Text style={styles.progressLabel}>Attendance Progress</Text>
      <View style={styles.progressBarBg}>
        <View
          style={[
            styles.progressBarFill,
            {
              width: `${course.attendanceProgress}%`,
              backgroundColor: iconBg, // Use iconBg for progress bar color!
            },
          ]}
        />
      </View>
      <Text style={[styles.progressPercent, { color: iconBg }]}>
        {course.attendanceProgress}%
      </Text>
      {/* View Details Button */}
      <TouchableOpacity style={styles.detailsBtn} onPress={onPress}>
        <Feather name="eye" size={18} color="#fff" style={{ marginRight: 6 }} />
        <Text style={styles.detailsBtnText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    margin: 16,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 18,
    elevation: 7,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconBg: {
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  code: { fontWeight: "bold", fontSize: 17, color: "#222" },
  name: { fontSize: 13, color: "#888", marginTop: 2 },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    justifyContent: "space-between",
  },
  statItem: { flexDirection: "row", alignItems: "center" },
  attendanceValue: {
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 6,
  },
  attendanceBadge: {
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginLeft: 3,
  },
  attendanceBadgeText: { fontWeight: "bold", fontSize: 12 },
  sessionsValue: {
    color: "#2979f7",
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 3,
  },
  sessionsLabel: { color: "#888", fontSize: 13, fontWeight: "600" },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 1,
    marginTop: 3,
  },
  detailLabel: { marginLeft: 6, color: "#888", fontSize: 13, width: 70 },
  detailValue: {
    marginLeft: 4,
    color: "#222",
    fontSize: 13,
    fontWeight: "600",
  },
  progressLabel: {
    marginTop: 10,
    fontSize: 12,
    color: "#888",
    fontWeight: "600",
    marginBottom: 2,
  },
  progressBarBg: {
    height: 7,
    borderRadius: 5,
    backgroundColor: "#eee",
    overflow: "hidden",
    marginVertical: 2,
  },
  progressBarFill: {
    height: 7,
    borderRadius: 5,
  },
  progressPercent: {
    textAlign: "right",
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailsBtn: {
    backgroundColor: "#2979f7",
    paddingVertical: 10,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 5,
  },
  detailsBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.3,
  },
});
