import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { PieChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Header from '../components/Header';
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import { colors } from '../theme/theme';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  LecturerDashboard: undefined;
  LecturerCalendar: undefined;
  LecturerCourses: undefined;
  LecturerMaterials: undefined;
  LecturerSettings: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedTab, setSelectedTab] = useState('overview');

  const attendanceData = [
    {
      name: 'Present',
      population: 78,
      color: colors.green[500],
      legendFontColor: colors.gray[700],
      legendFontSize: 12,
    },
    {
      name: 'Absent',
      population: 22,
      color: colors.red[500],
      legendFontColor: colors.gray[700],
      legendFontSize: 12,
    },
  ];

  const recentActivity = [
    {
      type: 'attendance',
      message: 'DCIT-313: 3 students marked absent',
      time: '2 hours ago',
      priority: 'medium',
      icon: 'people',
    },
    {
      type: 'assignment',
      message: 'New assignment submitted by 15 students',
      time: '4 hours ago',
      priority: 'low',
      icon: 'document-text',
    },
    {
      type: 'warning',
      message: 'John Doe attendance below 75%',
      time: '1 day ago',
      priority: 'high',
      icon: 'warning',
    },
  ];

  const upcomingSessions = [
    {
      course: 'DCIT-313',
      topic: 'Machine Learning Fundamentals',
      date: '2024-02-19',
      time: '10:00 AM',
      location: 'Lab 2',
      type: 'lecture',
    },
    {
      course: 'DCIT-301',
      topic: 'Process Management',
      date: '2024-02-18',
      time: '2:00 PM',
      location: 'Room 301',
      type: 'lab',
    },
  ];

  const renderTabButton = (tab: string, label: string) => (
    <TouchableOpacity
      style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
      onPress={() => setSelectedTab(tab)}
    >
      <Text
        style={[styles.tabText, selectedTab === tab && styles.activeTabText]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return colors.red[100];
      case 'medium':
        return colors.yellow[100];
      case 'low':
        return colors.green[100];
      default:
        return colors.gray[100];
    }
  };

  const getPriorityTextColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return colors.red[700];
      case 'medium':
        return colors.yellow[700];
      case 'low':
        return colors.green[700];
      default:
        return colors.gray[700];
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Lecturer Dashboard"
        subtitle="Welcome back, Prof. Johnson"
      />

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {renderTabButton('overview', 'Overview')}
        {renderTabButton('analytics', 'Analytics')}
        {renderTabButton('students', 'Students')}
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {selectedTab === 'overview' && (
          <>
            {/* Quick Stats */}
            <View style={styles.statsContainer}>
              <StatCard
                title="Last Updated"
                value="7:30pm"
                icon="time"
                gradientColors={[colors.blue[500], colors.blue[600]]}
              />
              <StatCard
                title="Total Students"
                value="310"
                icon="people"
                gradientColors={[colors.green[500], colors.green[600]]}
              />
            </View>

            <View style={styles.statsContainer}>
              <StatCard
                title="Present Today"
                value="94"
                subtitle="students"
                icon="checkmark-circle"
                gradientColors={[colors.purple[500], colors.purple[600]]}
              />
              <StatCard
                title="Absent Today"
                value="31"
                subtitle="students"
                icon="close-circle"
                gradientColors={[colors.orange[500], colors.orange[600]]}
              />
            </View>

            {/* Attendance Chart */}
            <Card>
              <Text style={styles.cardTitle}>Attendance Overview</Text>
              <View style={styles.chartContainer}>
                <PieChart
                  data={attendanceData}
                  width={width - 80}
                  height={200}
                  chartConfig={{
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  }}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="15"
                  absolute
                />
              </View>
              <View style={styles.attendanceStats}>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Above 75%</Text>
                  <Text style={[styles.statValue, { color: colors.green[600] }]}>
                    105 students
                  </Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Below 75%</Text>
                  <Text style={[styles.statValue, { color: colors.red[600] }]}>
                    20 students
                  </Text>
                </View>
              </View>
            </Card>

            {/* Recent Activity */}
            <Card>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Recent Activity</Text>
                <Ionicons name="filter" size={20} color={colors.gray[500]} />
              </View>
              {recentActivity.map((activity, index) => (
                <View
                  key={index}
                  style={[
                    styles.activityItem,
                    { backgroundColor: getPriorityColor(activity.priority) },
                  ]}
                >
                  <Ionicons
                    name={activity.icon as keyof typeof Ionicons.glyphMap}
                    size={20}
                    color={getPriorityTextColor(activity.priority)}
                  />
                  <View style={styles.activityContent}>
                    <Text style={styles.activityMessage}>
                      {activity.message}
                    </Text>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                  </View>
                </View>
              ))}
            </Card>

            {/* Upcoming Sessions */}
            <Card>
              <Text style={styles.cardTitle}>Upcoming Sessions</Text>
              {upcomingSessions.map((session, index) => (
                <View key={index} style={styles.sessionItem}>
                  <View style={styles.sessionHeader}>
                    <Text style={styles.sessionCourse}>{session.course}</Text>
                    <View
                      style={[
                        styles.sessionType,
                        {
                          backgroundColor:
                            session.type === 'lecture'
                              ? colors.blue[100]
                              : colors.green[100],
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.sessionTypeText,
                          {
                            color:
                              session.type === 'lecture'
                                ? colors.blue[700]
                                : colors.green[700],
                          },
                        ]}
                      >
                        {session.type}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.sessionTopic}>{session.topic}</Text>
                  <View style={styles.sessionDetails}>
                    <View style={styles.sessionDetail}>
                      <Ionicons
                        name="calendar"
                        size={12}
                        color={colors.gray[500]}
                      />
                      <Text style={styles.sessionDetailText}>
                        {session.date}
                      </Text>
                    </View>
                    <View style={styles.sessionDetail}>
                      <Ionicons
                        name="time"
                        size={12}
                        color={colors.gray[500]}
                      />
                      <Text style={styles.sessionDetailText}>
                        {session.time}
                      </Text>
                    </View>
                    <View style={styles.sessionDetail}>
                      <Ionicons
                        name="location"
                        size={12}
                        color={colors.gray[500]}
                      />
                      <Text style={styles.sessionDetailText}>
                        {session.location}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </Card>
          </>
        )}

        {selectedTab === 'analytics' && (
          <Card>
            <Text style={styles.cardTitle}>Analytics Dashboard</Text>
            <Text style={styles.comingSoon}>
              Advanced analytics coming soon...
            </Text>
          </Card>
        )}

        {selectedTab === 'students' && (
          <Card>
            <Text style={styles.cardTitle}>Student Management</Text>
            <Text style={styles.comingSoon}>
              Student management features coming soon...
            </Text>
          </Card>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={() => navigation.navigate('LecturerDashboard')}
        >
          <Ionicons name="home" size={24} color={colors.blue[500]} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={() => navigation.navigate('LecturerCalendar')}
        >
          <Ionicons name="calendar" size={24} color={colors.gray[500]} />
          <Text style={styles.navText}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={() => navigation.navigate('LecturerCourses')}
        >
          <Ionicons name="book" size={24} color={colors.gray[500]} />
          <Text style={styles.navText}>Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={() => navigation.navigate('LecturerMaterials')}
        >
          <Ionicons name="document-text" size={24} color={colors.gray[500]} />
          <Text style={styles.navText}>Materials</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={() => navigation.navigate('LecturerSettings')}
        >
          <Ionicons name="settings" size={24} color={colors.gray[500]} />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
    minHeight: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.gray[50],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: colors.blue[600],
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray[600],
  },
  activeTabText: {
    color: 'white',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    paddingBottom: 80,
    paddingHorizontal: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray[800],
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  attendanceStats: {
    marginTop: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.gray[50],
    borderRadius: 12,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray[700],
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  activityContent: {
    marginLeft: 12,
    flex: 1,
  },
  activityMessage: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray[800],
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: colors.gray[600],
  },
  sessionItem: {
    padding: 16,
    backgroundColor: colors.gray[50],
    borderRadius: 12,
    marginBottom: 12,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sessionCourse: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gray[800],
  },
  sessionType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  sessionTypeText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  sessionTopic: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 12,
  },
  sessionDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sessionDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  sessionDetailText: {
    fontSize: 12,
    color: colors.gray[500],
    marginLeft: 4,
  },
  comingSoon: {
    fontSize: 16,
    color: colors.gray[500],
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  bottomSpacing: {
    height: 100,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: colors.gray[50],
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingBottom: 10,
    zIndex: 1000,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  navText: {
    fontSize: 12,
    color: colors.gray[500],
    marginTop: 4,
  },
});

export default DashboardScreen;