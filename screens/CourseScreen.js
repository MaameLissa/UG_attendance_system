import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import CourseCard from "../components/CourseCard";

const FILTERS = [
  { key: "all", label: "All Courses" },
  { key: "excellent", label: "Excellent (≥85%)" },
  { key: "good", label: "Good (75-84%)" },
  { key: "attention", label: "Needs Attention (<75%)" },
];

export default function CourseScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  // Dummy stats
  const attendance = 83;
  const activeCourses = 6;
  const excellentCount = 3;
  const goodCount = 2;
  const attentionCount = 1;

  // Multiple course objects
  const courses = [
    {
      code: "DCIT-301",
      name: "Introduction to Operating Systems",
      attendance: 85,
      attendanceStatus: "Excellent",
      sessions: 24,
      nextClass: "Today, 2:00 PM",
      instructor: "Dr. Smith",
      credits: 3,
      attendanceProgress: 85,
      iconBg: "#ff4fa1",
    },
    {
      code: "DCIT-313",
      name: "Introduction to Artificial Intelligence",
      attendance: 78,
      attendanceStatus: "Good",
      sessions: 22,
      nextClass: "Tomorrow, 10:00 AM",
      instructor: "Prof. Johnson",
      credits: 4,
      attendanceProgress: 78,
      iconBg: "#13c6b3",
    },
    {
      code: "DCIT-321",
      name: "Software Evolution",
      attendance: 92,
      attendanceStatus: "Excellent",
      sessions: 20,
      nextClass: "Wed, 1:00 PM",
      instructor: "Dr. Williams",
      credits: 3,
      attendanceProgress: 92,
      iconBg: "#7265e3",
    },
    {
      code: "DCIT-301",
      name: "Introduction to Networking",
      attendance: 73,
      attendanceStatus: "Needs Attention",
      sessions: 26,
      nextClass: "Thu, 9:00 AM",
      instructor: "Prof. Davis",
      credits: 3,
      attendanceProgress: 73,
      iconBg: "#23b26d",
    },
    {
      code: "DCIT-317",
      name: "IT Project Management",
      attendance: 88,
      attendanceStatus: "Excellent",
      sessions: 18,
      nextClass: "Fri, 11:00 AM",
      instructor: "Dr. Brown",
      credits: 2,
      attendanceProgress: 88,
      iconBg: "#ff7d2d",
    },
    {
      code: "DCIT-305",
      name: "Database Fundamentals",
      attendance: 81,
      attendanceStatus: "Good",
      sessions: 25,
      nextClass: "Mon, 3:00 PM",
      instructor: "Prof. Wilson",
      credits: 4,
      attendanceProgress: 81,
      iconBg: "#7265e3",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconBtn}
        >
          <Feather name="arrow-left" size={22} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Courses</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Feather name="bell" size={22} color="#222" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Feather name="settings" size={22} color="#222" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={18} color="#b8b8b8" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search courses..."
          placeholderTextColor="#b8b8b8"
        />
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsRow}
        >
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.tabBtn,
                selectedFilter === filter.key && styles.tabBtnActive,
              ]}
              onPress={() => setSelectedFilter(filter.key)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedFilter === filter.key && styles.tabTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Dashboard Card */}
      <View style={styles.attendanceCard}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.cardTitle}>Attendance Overview</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="chart-line"
              size={17}
              color="#2979f7"
            />
            <Text style={styles.cardSubtitle}> Academic Progress</Text>
          </View>
        </View>
        <View style={styles.cardStatsRow}>
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={styles.attendancePercent}>{attendance}%</Text>
            <Text style={styles.cardStatLabel}>Overall Attendance</Text>
          </View>
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={styles.activeCourses}>{activeCourses}</Text>
            <Text style={styles.cardStatLabel}>Active Courses</Text>
          </View>
        </View>
        <View style={styles.cardBreakdownRow}>
          <View style={styles.statBadgeGreen}>
            <Text style={styles.badgeNum}>{excellentCount}</Text>
            <Text style={styles.badgeLabel}>Excellent</Text>
          </View>
          <View style={styles.statBadgeYellow}>
            <Text style={styles.badgeNum}>{goodCount}</Text>
            <Text style={styles.badgeLabel}>Good</Text>
          </View>
          <View style={styles.statBadgeRed}>
            <Text style={styles.badgeNum}>{attentionCount}</Text>
            <Text style={styles.badgeLabel}>Attention</Text>
          </View>
        </View>
      </View>

      {/* Courses List with Quick Actions at end */}
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {courses.map((course, idx) => (
          <CourseCard
            key={course.code + course.name + idx}
            course={course}
            onPress={() =>
              navigation.navigate("CourseDetails", { courseId: course.code })
            }
          />
        ))}
        {/* Quick Actions at end of page */}
        <View style={styles.quickActionsCard}>
          <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity style={styles.quickActionBtnGreen}>
              <Feather
                name="calendar"
                size={18}
                color="#fff"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.quickActionText}>Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionBtnPurple}>
              <Feather
                name="bar-chart-2"
                size={18}
                color="#fff"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.quickActionText}>Analytics</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6faff",
    paddingHorizontal: 0,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f6faff",
  },
  iconBtn: {
    padding: 6,
    marginHorizontal: 2,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "bold",
    flex: 1,
    color: "#222",
    marginLeft: 8,
  },
  headerTime: {
    fontSize: 13,
    color: "#222",
    marginHorizontal: 8,
    fontWeight: "600",
    opacity: 0.65,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f6fb",
    borderRadius: 16,
    marginHorizontal: 16,
    paddingHorizontal: 14,
    marginTop: 8,
    marginBottom: 6,
    height: 40,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#222",
    marginLeft: 8,
  },
  tabsWrapper: {
    marginTop: 6,
    marginBottom: 6,
    minHeight: 44,
  },
  tabsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  tabBtn: {
    backgroundColor: "#f3f6fb",
    borderRadius: 16,
    paddingVertical: 7,
    paddingHorizontal: 18,
    marginRight: 12,
  },
  tabBtnActive: {
    backgroundColor: "#2979f7",
  },
  tabText: {
    color: "#2979f7",
    fontWeight: "bold",
    fontSize: 14,
  },
  tabTextActive: {
    color: "#fff",
  },
  attendanceCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginTop: 12,
    marginHorizontal: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 18,
    elevation: 7,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#192a4d",
    marginBottom: 7,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#2979f7",
    fontWeight: "700",
    marginLeft: 4,
  },
  cardStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 7,
    marginBottom: 10,
  },
  attendancePercent: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 2,
  },
  activeCourses: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2979f7",
    marginBottom: 2,
  },
  cardStatLabel: {
    fontSize: 13,
    color: "#7b8ca6",
    fontWeight: "500",
  },
  cardBreakdownRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  statBadgeGreen: {
    backgroundColor: "#e6ffe8",
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginHorizontal: 4,
  },
  statBadgeYellow: {
    backgroundColor: "#fffbe6",
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginHorizontal: 4,
  },
  statBadgeRed: {
    backgroundColor: "#ffeaea",
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginHorizontal: 4,
  },
  badgeNum: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 1,
    color: "#222",
  },
  badgeLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7b8ca6",
  },
  // -------- Quick Actions -----------
  quickActionsCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginTop: 22,
    marginHorizontal: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 5,
  },
  quickActionsTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#192a4d",
    marginBottom: 14,
  },
  quickActionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  quickActionBtnGreen: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#23b26d",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginRight: 16,
  },
  quickActionBtnPurple: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7265e3",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  quickActionText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
