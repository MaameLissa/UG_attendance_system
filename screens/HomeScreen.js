import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather"; // For sun, bell, arrow-right, icons
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; // For check, fingerprint, camera, alert, etc.
import profileImage from "../assets/profilepic.jpg"; // Local profile image

// --- ThisWeekCard component ---
function ThisWeekCard() {
  const classesHeld = 6;
  const attended = 4;
  const attendancePercent = attended / classesHeld; // 0.666...

  return (
    <View style={styles.weekCard}>
      <Text style={styles.weekTitle}>This Week</Text>
      <View style={styles.weekRow}>
        <View style={styles.infoBoxBlue}>
          <Text style={styles.boxLabelBlue}>Classes Held</Text>
          <Text style={styles.boxValueBlue}>{classesHeld}</Text>
        </View>
        <View style={styles.infoBoxGreen}>
          <Text style={styles.boxLabelGreen}>Attended</Text>
          <Text style={styles.boxValueGreen}>{attended}</Text>
        </View>
      </View>
      <View style={styles.statusBox}>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Eligibility Status</Text>
          <View style={styles.statusPill}>
            <Text style={styles.statusPillText}>On Track</Text>
          </View>
        </View>
        <View style={styles.barBackground}>
          <View
            style={[styles.barFill, { width: `${attendancePercent * 100}%` }]}
          />
        </View>
        <Text style={styles.attendanceNote}>75% attendance this week</Text>
      </View>
    </View>
  );
}

// --- HowItWorksItem component ---
const HowItWorksItem = ({ text }) => (
  <View style={styles.howItWorksItem}>
    <View style={styles.checkCircle}>
      <MaterialCommunityIcons name="check" size={13} color="#fff" />
    </View>
    <Text style={styles.howItWorksText}>{text}</Text>
  </View>
);

// --- MarkAttendanceCard component ---
function MarkAttendanceCard() {
  return (
    <View style={styles.attCard}>
      <Text style={styles.attTitle}>Mark Attendance</Text>
      <View style={styles.scanRow}>
        <TouchableOpacity style={styles.scanBoxBlue} activeOpacity={0.8}>
          <View style={styles.scanIconCircle}>
            <MaterialCommunityIcons name="fingerprint" size={40} color="#fff" />
          </View>
          <Text style={styles.scanBoxTitle}>Fingerprint{"\n"}Scan</Text>
          <Text style={styles.scanBoxDesc}>Quick and secure verification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.scanBoxPurple} activeOpacity={0.8}>
          <View style={styles.scanIconCircle}>
            <MaterialCommunityIcons name="camera" size={38} color="#fff" />
          </View>
          <Text style={styles.scanBoxTitle}>Facial{"\n"}Scan</Text>
          <Text style={styles.scanBoxDesc}>Contactless verification</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.recentTitle}>Recent Activity</Text>
      <View style={styles.recentList}>
        <View style={styles.recentItem}>
          <View style={styles.presentIconCircle}>
            <MaterialCommunityIcons name="check" size={22} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.recentCourse}>DCIT321</Text>
            <Text style={styles.recentTime}>Today, 9:00 AM</Text>
          </View>
          <View style={styles.presentPill}>
            <Text style={styles.presentPillText}>Present</Text>
          </View>
        </View>
        <View style={styles.recentItem}>
          <View style={styles.presentIconCircle}>
            <MaterialCommunityIcons name="check" size={22} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.recentCourse}>DCIT305</Text>
            <Text style={styles.recentTime}>Today, 11:30 AM</Text>
          </View>
          <View style={styles.presentPill}>
            <Text style={styles.presentPillText}>Present</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// --- CoursesGrid component ---
function CoursesGrid() {
  const courses = [
    { code: "DCIT321", percent: 80 },
    { code: "DCIT301", percent: 80 },
    { code: "DCIT305", percent: 62 },
    { code: "DCIT315", percent: 60 },
    { code: "DCIT310", percent: 80 },
    { code: "DCIT302", percent: 80 },
  ];

  const getBarColor = (percent) => (percent >= 75 ? "#21a06a" : "#f44336");
  const getTextColor = (percent) => (percent >= 75 ? "#21a06a" : "#f44336");
  const getCardBorder = (percent) => ({
    borderLeftWidth: 4,
    borderLeftColor: percent >= 75 ? "#21a06a" : "#f44336",
  });

  return (
    <View style={styles.coursesCard}>
      <Text style={styles.coursesTitle}>Courses</Text>
      <View style={styles.coursesGrid}>
        {courses.map((course, idx) => (
          <View
            key={course.code}
            style={[
              styles.courseBox,
              getCardBorder(course.percent),
              idx % 2 === 0 ? { marginRight: 10 } : {},
            ]}
          >
            <Text style={styles.courseCode}>{course.code}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 6,
              }}
            >
              <Text
                style={[
                  styles.coursePercent,
                  { color: getTextColor(course.percent) },
                ]}
              >
                {course.percent}%
              </Text>
              <View style={styles.courseBarBackground}>
                <View
                  style={[
                    styles.courseBarFill,
                    {
                      width: `${course.percent}%`,
                      backgroundColor: getBarColor(course.percent),
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

// --- QuickActionsCard component (NEW) ---
function QuickActionsCard() {
  return (
    <View style={styles.quickActionsCard}>
      <Text style={styles.quickActionsTitle}>Quick Actions</Text>
      <View style={styles.quickActionsRow}>
        <TouchableOpacity
          style={[styles.quickActionBox, { backgroundColor: "#377cfb" }]}
          activeOpacity={0.9}
        >
          <MaterialCommunityIcons
            name="clipboard-list-outline"
            size={28}
            color="#fff"
            style={styles.quickActionIcon}
          />
          <Text style={styles.quickActionText}>My{"\n"}Eligibility</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quickActionBox, { backgroundColor: "#a259e4" }]}
          activeOpacity={0.9}
        >
          <MaterialCommunityIcons
            name="clock-outline"
            size={28}
            color="#fff"
            style={styles.quickActionIcon}
          />
          <Text style={styles.quickActionText}>Recent{"\n"}Absences</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quickActionBox, { backgroundColor: "#21a06a" }]}
          activeOpacity={0.9}
        >
          <MaterialCommunityIcons
            name="message-text-outline"
            size={28}
            color="#fff"
            style={styles.quickActionIcon}
          />
          <Text style={styles.quickActionText}>Ask a{"\n"}Lecturer</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.warningCard}>
        <MaterialCommunityIcons
          name="alert-circle-outline"
          size={32}
          color="#ffc107"
          style={styles.warningIcon}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.warningTitle}>Warning!</Text>
          <Text style={styles.warningText}>
            You're 2 absences away from falling below 75% in DCIT315. Stay
            Consistent!
          </Text>
          <Text style={styles.warningHelp}>
            Contact your lecturer or academic advisor for guidance.
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function BiometricAttendanceOverview() {
  return (
    <SafeAreaView style={{ backgroundColor: "#f9f9f9", flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.container}>
          {/* Top User Info Row */}
          <View style={styles.headerRow}>
            <Image source={profileImage} style={styles.profileImage} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.greeting}>Good Morning,</Text>
              <Text style={styles.name}>Melissa</Text>
              <Text style={styles.welcome}>Welcome Melissa,</Text>
            </View>
            <Icon name="sun" size={22} color="#ffcc00" style={styles.icon} />
            <Icon
              name="bell"
              size={22}
              color="#888"
              style={[styles.icon, { marginLeft: 10 }]}
            />
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Biometric Attendance Overview</Text>
            <Text style={styles.cardSubtitle}>
              Track attendance with fingerprint or facial recognition. Stay exam
              eligible by meeting UG's 75% rule.
            </Text>

            <TouchableOpacity style={styles.learnMoreBtn}>
              <Text style={styles.learnMoreText}>Learn more</Text>
              <Icon name="arrow-right" size={18} color="#2979f7" />
            </TouchableOpacity>

            {/* How it works */}
            <View style={styles.howItWorksBox}>
              <Text style={styles.howItWorksTitle}>How it works:</Text>
              <HowItWorksItem text="Scan your fingerprint or face when entering class" />
              <HowItWorksItem text="Maintain 75% attendance for exam eligibility" />
              <HowItWorksItem text="Track your progress in real time" />
              <HowItWorksItem text="Get notified when attendance drops" />
            </View>
          </View>

          {/* This Week Card */}
          <ThisWeekCard />

          {/* Mark Attendance Card */}
          <MarkAttendanceCard />

          {/* Courses Grid Card */}
          <CoursesGrid />

          {/* Quick Actions Card */}
          <QuickActionsCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 0,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingBottom: 10,
    paddingTop: 20,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#fff",
  },
  greeting: {
    fontSize: 16,
    color: "#222",
    fontWeight: "400",
    marginBottom: 0,
  },
  name: {
    fontSize: 18,
    color: "#222",
    fontWeight: "700",
    marginTop: -2,
    marginBottom: 0,
  },
  welcome: {
    fontSize: 14,
    color: "#a1a1a1",
    fontWeight: "400",
    marginTop: 0,
  },
  icon: {
    marginLeft: 16,
  },
  card: {
    backgroundColor: "#2979f7",
    margin: 10,
    borderRadius: 16,
    padding: 20,
    paddingTop: 26,
    shadowColor: "#2979f7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  cardSubtitle: {
    color: "#edf4ff",
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 18,
    lineHeight: 21,
  },
  learnMoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    paddingHorizontal: 17,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  learnMoreText: {
    color: "#2979f7",
    fontSize: 16,
    fontWeight: "700",
    marginRight: 8,
  },
  howItWorksBox: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 14,
    padding: 14,
    marginTop: 6,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.22)",
  },
  howItWorksTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 12,
  },
  howItWorksItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkCircle: {
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: "#52d27b",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginTop: 1,
  },
  howItWorksText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "400",
    flex: 1,
    flexWrap: "wrap",
  },
  // --- ThisWeekCard styles ---
  weekCard: {
    margin: 10,
    marginTop: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    padding: 18,
    elevation: 2,
    shadowColor: "#2979f7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  weekTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: "#111",
    marginBottom: 10,
  },
  weekRow: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "space-between",
  },
  infoBoxBlue: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "#eaf2ff",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
  },
  boxLabelBlue: {
    color: "#377cfb",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 3,
  },
  boxValueBlue: {
    color: "#2979f7",
    fontSize: 28,
    fontWeight: "700",
  },
  infoBoxGreen: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: "#e9faed",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
  },
  boxLabelGreen: {
    color: "#43b36b",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 3,
  },
  boxValueGreen: {
    color: "#21a06a",
    fontSize: 28,
    fontWeight: "700",
  },
  statusBox: {
    backgroundColor: "rgba(233,250,237,0.17)",
    borderRadius: 14,
    padding: 12,
    marginTop: 4,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    justifyContent: "space-between",
  },
  statusLabel: {
    color: "#222",
    fontSize: 16,
    fontWeight: "600",
  },
  statusPill: {
    backgroundColor: "#21a06a",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  statusPillText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  barBackground: {
    width: "100%",
    height: 11,
    backgroundColor: "#e1e9ed",
    borderRadius: 8,
    marginBottom: 7,
    marginTop: 2,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: "#21a06a",
    borderRadius: 8,
  },
  attendanceNote: {
    color: "#5e7f93",
    fontSize: 13,
    fontWeight: "500",
    marginTop: 2,
    marginLeft: 1,
  },
  // --- MarkAttendanceCard styles ---
  attCard: {
    margin: 10,
    marginTop: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    padding: 18,
    elevation: 2,
    shadowColor: "#2979f7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  attTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: "#111",
    marginBottom: 14,
  },
  scanRow: {
    flexDirection: "row",
    marginBottom: 18,
    justifyContent: "space-between",
  },
  scanBoxBlue: {
    flex: 1,
    backgroundColor: "#2979f7",
    borderRadius: 16,
    alignItems: "center",
    marginRight: 10,
    paddingVertical: 20,
    elevation: 1,
  },
  scanBoxPurple: {
    flex: 1,
    backgroundColor: "#a259e4",
    borderRadius: 16,
    alignItems: "center",
    marginLeft: 10,
    paddingVertical: 20,
    elevation: 1,
  },
  scanIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  scanBoxTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 2,
    marginTop: 2,
  },
  scanBoxDesc: {
    color: "#e7e7e7",
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 2,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 10,
    marginTop: 4,
  },
  recentList: {},
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e9faed",
    borderRadius: 12,
    padding: 12,
    marginBottom: 11,
  },
  presentIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#21a06a",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  recentCourse: {
    fontWeight: "700",
    fontSize: 16,
    color: "#222",
  },
  recentTime: {
    fontWeight: "500",
    fontSize: 13,
    color: "#5e7f93",
    marginTop: 1,
  },
  presentPill: {
    backgroundColor: "#21a06a",
    borderRadius: 16,
    paddingHorizontal: 13,
    paddingVertical: 4,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 14,
  },
  presentPillText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  // --- CoursesGrid styles ---
  coursesCard: {
    margin: 10,
    marginTop: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    padding: 18,
    elevation: 2,
    shadowColor: "#2979f7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  coursesTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: "#111",
    marginBottom: 14,
  },
  coursesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  courseBox: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 18,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  courseCode: {
    fontWeight: "700",
    fontSize: 17,
    color: "#222",
    marginBottom: 4,
  },
  coursePercent: {
    fontSize: 16,
    fontWeight: "700",
    marginRight: 10,
  },
  courseBarBackground: {
    height: 10,
    width: 54,
    backgroundColor: "#e1e9ed",
    borderRadius: 8,
    marginLeft: 2,
    overflow: "hidden",
  },
  courseBarFill: {
    height: "100%",
    borderRadius: 8,
  },
  // --- QuickActionsCard styles ---
  quickActionsCard: {
    margin: 10,
    marginTop: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    padding: 18,
    elevation: 2,
    shadowColor: "#2979f7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  quickActionsTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: "#111",
    marginBottom: 14,
  },
  quickActionsRow: {
    flexDirection: "row",
    marginBottom: 18,
    justifyContent: "space-between",
  },
  quickActionBox: {
    flex: 1,
    borderRadius: 14,
    alignItems: "center",
    marginHorizontal: 4,
    paddingVertical: 18,
    justifyContent: "center",
    elevation: 1,
  },
  quickActionIcon: {
    marginBottom: 7,
  },
  quickActionText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 18,
  },
  warningCard: {
    flexDirection: "row",
    backgroundColor: "#fffbe8",
    borderRadius: 14,
    padding: 16,
    marginTop: 10,
    alignItems: "flex-start",
    borderLeftColor: "#ffe066",
    borderLeftWidth: 5,
    shadowColor: "#ffe066",
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 1,
  },
  warningIcon: {
    marginRight: 13,
    marginTop: 2,
  },
  warningTitle: {
    color: "#f9a825",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 3,
  },
  warningText: {
    color: "#c47f18",
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 3,
  },
  warningHelp: {
    color: "#c47f18",
    fontSize: 14,
    marginTop: 2,
  },
});
