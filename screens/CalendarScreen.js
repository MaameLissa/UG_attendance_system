import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Animated,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Helper to get days in month
function getDaysArray(year, month) {
  const numDays = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: numDays }, (_, i) => i + 1);
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Sample schedule for June 10 (can be made dynamic)
const CLASS_SCHEDULE = [
  {
    time: "09:00",
    course: "DCIT321",
    location: "Room 201",
    type: "Lecture",
    typeColor: "#e2edff",
    typeTextColor: "#2979f7",
  },
  {
    time: "11:30",
    course: "DCIT305",
    location: "Lab 101",
    type: "Practical",
    typeColor: "#e2edff",
    typeTextColor: "#2979f7",
  },
  {
    time: "14:00",
    course: "DCIT315",
    location: "Room 305",
    type: "Tutorial",
    typeColor: "#e2edff",
    typeTextColor: "#2979f7",
  },
];

// Public holidays data
const PUBLIC_HOLIDAYS = [
  { date: "Jan 1", label: "New Year's Day" },
  { date: "Mar 6", label: "Independence Day" },
  { date: "Apr 7", label: "Easter Monday" },
  { date: "May 1", label: "Labour Day" },
  { date: "Dec 25", label: "Christmas Day" },
  { date: "Dec 26", label: "Boxing Day" },
];

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(10);
  const [month, setMonth] = useState(5); // 0-indexed: 5 = June
  const [year, setYear] = useState(2025);
  const [holidaysExpanded, setHolidaysExpanded] = useState(true);

  // Calendar calculations
  const firstDay = new Date(year, month, 1).getDay();
  const days = getDaysArray(year, month);
  const blanks = Array.from({ length: firstDay });

  // Handlers for month navigation
  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
    setSelectedDate(null);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
    setSelectedDate(null);
  };

  // Get date details for the top schedule card
  const selectedDayObj = new Date(year, month, selectedDate || 1);
  const scheduleForDay =
    selectedDate === 10 && month === 5 && year === 2025 ? CLASS_SCHEDULE : [];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Academic Calendar</Text>
        <MaterialCommunityIcons
          name="bell-outline"
          size={23}
          color="#686868"
          style={styles.bellIcon}
        />
      </View>

      {/* Calendar Card */}
      <View style={styles.card}>
        {/* Month Selector */}
        <View style={styles.monthRow}>
          <TouchableOpacity onPress={prevMonth} style={styles.arrowBtn}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={26}
              color="#222"
            />
          </TouchableOpacity>
          <Text style={styles.monthText}>
            {monthNames[month]} {year}
          </Text>
          <TouchableOpacity onPress={nextMonth} style={styles.arrowBtn}>
            <MaterialCommunityIcons
              name="chevron-right"
              size={26}
              color="#222"
            />
          </TouchableOpacity>
        </View>

        {/* Days of week */}
        <View style={styles.weekDaysRow}>
          {weekDays.map((day) => (
            <Text key={day} style={styles.weekDayText}>
              {day}
            </Text>
          ))}
        </View>

        {/* Calendar Days */}
        <View style={styles.daysGrid}>
          {/* Blank days */}
          {blanks.map((_, i) => (
            <View key={"blank-" + i} style={styles.dayCell} />
          ))}
          {/* Actual days */}
          {days.map((day) => {
            const isSelected = day === selectedDate;
            return (
              <TouchableOpacity
                key={day}
                style={[styles.dayCell, isSelected && styles.selectedDayCell]}
                onPress={() => setSelectedDate(day)}
                activeOpacity={0.8}
              >
                <Text
                  style={[styles.dayText, isSelected && styles.selectedDayText]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Schedule Card */}
      <View style={styles.scheduleCard}>
        <Text style={styles.scheduleTitle}>
          {selectedDayObj.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </Text>
        {scheduleForDay.length === 0 ? (
          <Text style={styles.noClassesText}>No classes scheduled.</Text>
        ) : (
          scheduleForDay.map((cls, idx) => (
            <View key={idx} style={styles.classRow}>
              <Text style={styles.classTime}>{cls.time}</Text>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.classCourse}>
                  {cls.course}
                  <Text style={styles.classLocation}>
                    {"\n"}
                    {cls.location}
                  </Text>
                </Text>
              </View>
              <View
                style={[
                  styles.classTypePill,
                  { backgroundColor: cls.typeColor },
                ]}
              >
                <Text
                  style={[styles.classTypeText, { color: cls.typeTextColor }]}
                >
                  {cls.type}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>

      {/* Public Holidays Accordion */}
      <View style={styles.holidaysCard}>
        <TouchableOpacity
          style={styles.holidaysHeader}
          onPress={() => setHolidaysExpanded((h) => !h)}
        >
          <Text style={styles.holidaysTitle}>Public Holidays</Text>
          <MaterialCommunityIcons
            name={holidaysExpanded ? "chevron-up" : "chevron-down"}
            size={22}
            color="#282828"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
        {holidaysExpanded && (
          <View style={{ marginTop: 8 }}>
            {PUBLIC_HOLIDAYS.map((holiday, idx) => (
              <View key={holiday.date} style={styles.holidayRow}>
                <Text style={styles.holidayDate}>{holiday.date}</Text>
                <Text style={styles.holidayLabel}>{holiday.label}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f7f7fa",
    paddingTop: Platform.OS === "android" ? 32 : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingTop: 26,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1a1a1a",
    flex: 1,
  },
  bellIcon: {
    marginLeft: 10,
  },
  card: {
    marginHorizontal: 18,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 22,
  },
  monthRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  monthText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#242424",
    marginHorizontal: 18,
    letterSpacing: 0.3,
  },
  arrowBtn: {
    padding: 6,
    borderRadius: 20,
  },
  weekDaysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    marginBottom: 8,
    paddingHorizontal: 6,
  },
  weekDayText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#8a8a9e",
    width: 32,
    textAlign: "center",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 6,
  },
  dayCell: {
    width: 32,
    height: 32,
    margin: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },
  selectedDayCell: {
    backgroundColor: "#2979f7",
  },
  selectedDayText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // Schedule Card styles
  scheduleCard: {
    marginTop: 8,
    marginHorizontal: 18,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 18,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 18,
  },
  scheduleTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 18,
    color: "#181818",
  },
  noClassesText: {
    fontSize: 15,
    color: "#888",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 12,
    fontWeight: "500",
  },
  classRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eaf1fd",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  classTime: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#2979f7",
    width: 62,
  },
  classCourse: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#232323",
    lineHeight: 21,
  },
  classLocation: {
    fontWeight: "normal",
    fontSize: 15,
    color: "#757575",
  },
  classTypePill: {
    marginLeft: 14,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 60,
    backgroundColor: "#e2edff",
  },
  classTypeText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#2979f7",
    textAlign: "center",
  },

  // Public Holidays Card
  holidaysCard: {
    marginHorizontal: 18,
    marginTop: 2,
    marginBottom: 22,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 0,
    paddingTop: 12,
    paddingBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  holidaysHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingBottom: 4,
    justifyContent: "space-between",
  },
  holidaysTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#181818",
  },
  holidayRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eafbe9",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 18,
    marginHorizontal: 12,
    marginTop: 7,
    marginBottom: 0,
  },
  holidayDate: {
    color: "#26a348",
    fontWeight: "bold",
    fontSize: 16,
    width: 62,
  },
  holidayLabel: {
    color: "#143e0a",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
});
