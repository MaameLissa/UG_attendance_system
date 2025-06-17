import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Header from '../components/Header';
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import { colors } from '../theme/theme';

interface Course {
  id: string;
  name: string;
  students: number;
  attendance: number;
  lastSession: string | null;
  nextSession: string;
  status: string;
  description: string;
  location: string;
  schedule: string;
  semester: string;
  credits: number;
}

const CoursesScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [courses, setCourses] = useState<Course[]>([
    {
      id: 'DCIT-313',
      name: 'Introduction to Artificial Intelligence',
      students: 125,
      attendance: 78,
      lastSession: '2024-02-15',
      nextSession: '2024-02-19',
      status: 'active',
      description: 'Fundamentals of AI and machine learning concepts',
      location: 'Lab 2',
      schedule: 'Mon, Wed, Fri - 10:00 AM',
      semester: 'Spring 2024',
      credits: 3,
    },
    {
      id: 'DCIT-301',
      name: 'Operating Systems',
      students: 98,
      attendance: 82,
      lastSession: '2024-02-14',
      nextSession: '2024-02-18',
      status: 'active',
      description: 'Core concepts of operating system design',
      location: 'Room 301',
      schedule: 'Tue, Thu - 2:00 PM',
      semester: 'Spring 2024',
      credits: 4,
    },
    {
      id: 'DCIT-305',
      name: 'Database Fundamentals',
      students: 87,
      attendance: 85,
      lastSession: '2024-02-13',
      nextSession: '2024-02-17',
      status: 'active',
      description: 'Database design and SQL principles',
      location: 'Lab 1',
      schedule: 'Mon, Wed - 11:00 AM',
      semester: 'Spring 2024',
      credits: 3,
    },
  ]);

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return colors.green[500];
      case 'draft':
        return colors.yellow[500];
      case 'archived':
        return colors.gray[500];
      default:
        return colors.blue[500];
    }
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 85) return colors.green[600];
    if (attendance >= 75) return colors.yellow[600];
    return colors.red[600];
  };

  const handleCoursePress = (course: Course) => {
    setSelectedCourse(course);
    setShowDetailsModal(true);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Course Management"
        subtitle="Manage and monitor your courses"
        rightComponent={
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
          >
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <StatCard
            title="Total Courses"
            value={courses.length.toString()}
            icon="book"
            gradientColors={[colors.blue[500], colors.blue[600]]}
          />
          <StatCard
            title="Active Courses"
            value={courses.filter((c) => c.status === 'active').length.toString()}
            icon="checkmark-circle"
            gradientColors={[colors.green[500], colors.green[600]]}
          />
        </View>

        <View style={styles.statsContainer}>
          <StatCard
            title="Total Students"
            value={courses.reduce((sum, course) => sum + course.students, 0).toString()}
            icon="people"
            gradientColors={[colors.purple[500], colors.purple[600]]}
          />
          <StatCard
            title="Avg Attendance"
            value={`${Math.round(
              courses.reduce((sum, course) => sum + course.attendance, 0) / courses.length
            )}%`}
            icon="trending-up"
            gradientColors={[colors.orange[500], colors.orange[600]]}
          />
        </View>

        {/* Search */}
        <Card>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={colors.gray[400]} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search courses..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholderTextColor={colors.gray[400]}
            />
          </View>
        </Card>

        {/* Courses List */}
        <Card>
          <Text style={styles.sectionTitle}>My Courses</Text>
          {filteredCourses.map((course) => (
            <TouchableOpacity
              key={course.id}
              style={styles.courseItem}
              onPress={() => handleCoursePress(course)}
            >
              <View style={styles.courseHeader}>
                <View style={styles.courseInfo}>
                  <Text style={styles.courseId}>{course.id}</Text>
                  <Text style={styles.courseName}>{course.name}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(course.status) },
                  ]}
                >
                  <Text style={styles.statusText}>{course.status}</Text>
                </View>
              </View>

              <View style={styles.courseStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{course.students}</Text>
                  <Text style={styles.statLabel}>Students</Text>
                </View>
                <View style={styles.statItem}>
                  <Text
                    style={[
                      styles.statNumber,
                      { color: getAttendanceColor(course.attendance) },
                    ]}
                  >
                    {course.attendance}%
                  </Text>
                  <Text style={styles.statLabel}>Attendance</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{course.credits}</Text>
                  <Text style={styles.statLabel}>Credits</Text>
                </View>
              </View>

              <View style={styles.courseDetails}>
                <View style={styles.detailItem}>
                  <Ionicons name="location" size={12} color={colors.gray[500]} />
                  <Text style={styles.detailText}>{course.location}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="time" size={12} color={colors.gray[500]} />
                  <Text style={styles.detailText}>{course.schedule}</Text>
                </View>
              </View>

              <View style={styles.courseFooter}>
                <Text style={styles.nextSession}>
                  Next: {course.nextSession}
                </Text>
                <Ionicons name="chevron-forward" size={16} color={colors.gray[400]} />
              </View>
            </TouchableOpacity>
          ))}
        </Card>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Course Details Modal */}
      <Modal
        visible={showDetailsModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Course Details</Text>
            <TouchableOpacity onPress={() => setShowDetailsModal(false)}>
              <Ionicons name="close" size={24} color={colors.gray[600]} />
            </TouchableOpacity>
          </View>

          {selectedCourse && (
            <ScrollView style={styles.modalContent}>
              <View style={styles.courseDetailHeader}>
                <Text style={styles.courseDetailId}>{selectedCourse.id}</Text>
                <Text style={styles.courseDetailName}>{selectedCourse.name}</Text>
              </View>

              <View style={styles.detailStatsContainer}>
                <View style={styles.detailStatItem}>
                  <Ionicons name="people" size={24} color={colors.blue[600]} />
                  <Text style={styles.detailStatNumber}>{selectedCourse.students}</Text>
                  <Text style={styles.detailStatLabel}>Students</Text>
                </View>
                <View style={styles.detailStatItem}>
                  <Ionicons name="trending-up" size={24} color={colors.green[600]} />
                  <Text style={styles.detailStatNumber}>{selectedCourse.attendance}%</Text>
                  <Text style={styles.detailStatLabel}>Attendance</Text>
                </View>
                <View style={styles.detailStatItem}>
                  <Ionicons name="school" size={24} color={colors.purple[600]} />
                  <Text style={styles.detailStatNumber}>{selectedCourse.credits}</Text>
                  <Text style={styles.detailStatLabel}>Credits</Text>
                </View>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Course Information</Text>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Description</Text>
                  <Text style={styles.infoValue}>{selectedCourse.description}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Location</Text>
                  <Text style={styles.infoValue}>{selectedCourse.location}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Schedule</Text>
                  <Text style={styles.infoValue}>{selectedCourse.schedule}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Semester</Text>
                  <Text style={styles.infoValue}>{selectedCourse.semester}</Text>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </Modal>

      {/* Add Course Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add New Course</Text>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Ionicons name="close" size={24} color={colors.gray[600]} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <Text style={styles.comingSoon}>
              Add course functionality coming soon...
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  scrollView: {
    flex: 1,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[50],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.gray[800],
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray[800],
    marginBottom: 16,
  },
  courseItem: {
    backgroundColor: colors.gray[50],
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  courseInfo: {
    flex: 1,
  },
  courseId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gray[800],
  },
  courseName: {
    fontSize: 14,
    color: colors.gray[600],
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
    textTransform: 'capitalize',
  },
  courseStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.gray[800],
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray[600],
    marginTop: 2,
  },
  courseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: colors.gray[500],
    marginLeft: 4,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextSession: {
    fontSize: 12,
    color: colors.gray[500],
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.gray[800],
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  courseDetailHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  courseDetailId: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gray[800],
  },
  courseDetailName: {
    fontSize: 16,
    color: colors.gray[600],
    marginTop: 4,
    textAlign: 'center',
  },
  detailStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
  },
  detailStatItem: {
    alignItems: 'center',
    backgroundColor: colors.gray[50],
    borderRadius: 16,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
  },
  detailStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gray[800],
    marginTop: 8,
  },
  detailStatLabel: {
    fontSize: 12,
    color: colors.gray[600],
    marginTop: 4,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray[800],
    marginBottom: 16,
  },
  infoItem: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray[700],
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: colors.gray[600],
  },
  comingSoon: {
    fontSize: 16,
    color: colors.gray[500],
    textAlign: 'center',
    marginTop: 40,
  },
  bottomSpacing: {
    height: 100,
  },
});

export default CoursesScreen;