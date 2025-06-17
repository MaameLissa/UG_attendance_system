import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Header from '../components/Header';
import Card from '../components/Card';
import { colors } from '../theme/theme';

interface CalendarEvent {
  id: string;
  title: string;
  course: string;
  type: 'lecture' | 'lab' | 'exam' | 'meeting' | 'office-hours';
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  attendees?: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  color: string;
  priority?: 'high' | 'medium' | 'low';
}

const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const [events] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'AI Fundamentals',
      course: 'DCIT-313',
      type: 'lecture',
      date: '2024-02-19',
      startTime: '10:00',
      endTime: '11:30',
      location: 'Lab 2',
      description: 'Introduction to machine learning algorithms',
      attendees: 125,
      status: 'scheduled',
      color: colors.blue[500],
      priority: 'high',
    },
    {
      id: '2',
      title: 'OS Lab',
      course: 'DCIT-301',
      type: 'lab',
      date: '2024-02-18',
      startTime: '14:00',
      endTime: '16:00',
      location: 'Room 301',
      description: 'Process management and scheduling',
      attendees: 98,
      status: 'scheduled',
      color: colors.green[500],
      priority: 'medium',
    },
    {
      id: '3',
      title: 'DB Exam',
      course: 'DCIT-305',
      type: 'exam',
      date: '2024-02-20',
      startTime: '09:00',
      endTime: '11:00',
      location: 'Exam Hall A',
      description: 'Midterm examination',
      attendees: 87,
      status: 'scheduled',
      color: colors.red[500],
      priority: 'high',
    },
  ]);

  const getEventTypeIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'lecture':
        return 'book';
      case 'lab':
        return 'flask';
      case 'exam':
        return 'document-text';
      case 'meeting':
        return 'videocam';
      case 'office-hours':
        return 'cafe';
      default:
        return 'calendar';
    }
  };

  const getPriorityIcon = (priority: CalendarEvent['priority']) => {
    switch (priority) {
      case 'high':
        return 'star';
      case 'medium':
        return 'radio-button-on';
      case 'low':
        return 'trending-up';
      default:
        return null;
    }
  };

  const handleEventPress = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <View style={styles.container}>
      <Header
        title="Academic Calendar"
        subtitle="Manage your schedule and events"
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
        {/* Quick Stats */}
        <Card>
          <Text style={styles.sectionTitle}>Event Overview</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{events.length}</Text>
              <Text style={styles.statLabel}>Total Events</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {events.filter((e) => e.type === 'lecture').length}
              </Text>
              <Text style={styles.statLabel}>Lectures</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {events.filter((e) => e.type === 'exam').length}
              </Text>
              <Text style={styles.statLabel}>Exams</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {events.filter((e) => e.type === 'meeting').length}
              </Text>
              <Text style={styles.statLabel}>Meetings</Text>
            </View>
          </View>
        </Card>

        {/* Calendar View */}
        <Card>
          <View style={styles.calendarHeader}>
            <Text style={styles.sectionTitle}>February 2024</Text>
            <View style={styles.calendarControls}>
              <TouchableOpacity style={styles.calendarButton}>
                <Ionicons name="chevron-back" size={20} color={colors.gray[600]} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.calendarButton}>
                <Ionicons name="chevron-forward" size={20} color={colors.gray[600]} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Simple Calendar Grid */}
          <View style={styles.calendarGrid}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <Text key={day} style={styles.dayHeader}>
                {day}
              </Text>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 2; // Start from day -2 to show previous month days
              const isCurrentMonth = day > 0 && day <= 29;
              const hasEvent = isCurrentMonth && events.some(
                (event) => new Date(event.date).getDate() === day
              );
              
              return (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.calendarDay,
                    !isCurrentMonth && styles.inactiveDay,
                    hasEvent && styles.dayWithEvent,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      !isCurrentMonth && styles.inactiveDayText,
                      hasEvent && styles.dayWithEventText,
                    ]}
                  >
                    {isCurrentMonth ? day : ''}
                  </Text>
                  {hasEvent && <View style={styles.eventDot} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>

        {/* Event Legend */}
        <Card>
          <Text style={styles.sectionTitle}>Event Types</Text>
          <View style={styles.legendContainer}>
            {[
              { type: 'lecture', label: 'Lecture', color: colors.blue[500] },
              { type: 'lab', label: 'Lab', color: colors.green[500] },
              { type: 'exam', label: 'Exam', color: colors.red[500] },
              { type: 'meeting', label: 'Meeting', color: colors.purple[500] },
            ].map((item) => (
              <View key={item.type} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                <Text style={styles.legendText}>{item.label}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {upcomingEvents.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={styles.eventItem}
              onPress={() => handleEventPress(event)}
            >
              <View style={[styles.eventColor, { backgroundColor: event.color }]} />
              <View style={styles.eventContent}>
                <View style={styles.eventHeader}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <View style={styles.eventIcons}>
                    {event.priority && (
                      <Ionicons
                        name={getPriorityIcon(event.priority) as keyof typeof Ionicons.glyphMap}
                        size={12}
                        color={colors.yellow[500]}
                      />
                    )}
                    <Ionicons
                      name={getEventTypeIcon(event.type) as keyof typeof Ionicons.glyphMap}
                      size={12}
                      color={colors.gray[500]}
                    />
                  </View>
                </View>
                <Text style={styles.eventCourse}>{event.course}</Text>
                <View style={styles.eventDetails}>
                  <View style={styles.eventDetail}>
                    <Ionicons name="calendar" size={12} color={colors.gray[500]} />
                    <Text style={styles.eventDetailText}>{event.date}</Text>
                  </View>
                  <View style={styles.eventDetail}>
                    <Ionicons name="time" size={12} color={colors.gray[500]} />
                    <Text style={styles.eventDetailText}>
                      {event.startTime} - {event.endTime}
                    </Text>
                  </View>
                  <View style={styles.eventDetail}>
                    <Ionicons name="location" size={12} color={colors.gray[500]} />
                    <Text style={styles.eventDetailText}>{event.location}</Text>
                  </View>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.gray[400]} />
            </TouchableOpacity>
          ))}
        </Card>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Event Details Modal */}
      <Modal
        visible={showEventModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Event Details</Text>
            <TouchableOpacity onPress={() => setShowEventModal(false)}>
              <Ionicons name="close" size={24} color={colors.gray[600]} />
            </TouchableOpacity>
          </View>

          {selectedEvent && (
            <ScrollView style={styles.modalContent}>
              <View style={styles.eventDetailHeader}>
                <View style={[styles.eventTypeIcon, { backgroundColor: selectedEvent.color }]}>
                  <Ionicons
                    name={getEventTypeIcon(selectedEvent.type) as keyof typeof Ionicons.glyphMap}
                    size={24}
                    color="white"
                  />
                </View>
                <Text style={styles.eventDetailTitle}>{selectedEvent.title}</Text>
                <Text style={styles.eventDetailCourse}>{selectedEvent.course}</Text>
              </View>

              <View style={styles.eventInfoSection}>
                <View style={styles.eventInfoItem}>
                  <Ionicons name="calendar" size={20} color={colors.gray[500]} />
                  <View style={styles.eventInfoText}>
                    <Text style={styles.eventInfoLabel}>Date</Text>
                    <Text style={styles.eventInfoValue}>{selectedEvent.date}</Text>
                  </View>
                </View>
                <View style={styles.eventInfoItem}>
                  <Ionicons name="time" size={20} color={colors.gray[500]} />
                  <View style={styles.eventInfoText}>
                    <Text style={styles.eventInfoLabel}>Time</Text>
                    <Text style={styles.eventInfoValue}>
                      {selectedEvent.startTime} - {selectedEvent.endTime}
                    </Text>
                  </View>
                </View>
                <View style={styles.eventInfoItem}>
                  <Ionicons name="location" size={20} color={colors.gray[500]} />
                  <View style={styles.eventInfoText}>
                    <Text style={styles.eventInfoLabel}>Location</Text>
                    <Text style={styles.eventInfoValue}>{selectedEvent.location}</Text>
                  </View>
                </View>
                {selectedEvent.attendees && (
                  <View style={styles.eventInfoItem}>
                    <Ionicons name="people" size={20} color={colors.gray[500]} />
                    <View style={styles.eventInfoText}>
                      <Text style={styles.eventInfoLabel}>Attendees</Text>
                      <Text style={styles.eventInfoValue}>{selectedEvent.attendees} students</Text>
                    </View>
                  </View>
                )}
              </View>

              {selectedEvent.description && (
                <View style={styles.descriptionSection}>
                  <Text style={styles.descriptionTitle}>Description</Text>
                  <Text style={styles.descriptionText}>{selectedEvent.description}</Text>
                </View>
              )}
            </ScrollView>
          )}
        </View>
      </Modal>

      {/* Add Event Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add New Event</Text>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Ionicons name="close" size={24} color={colors.gray[600]} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <Text style={styles.comingSoon}>
              Add event functionality coming soon...
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray[800],
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.gray[50],
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gray[800],
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray[600],
    marginTop: 4,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarControls: {
    flexDirection: 'row',
  },
  calendarButton: {
    padding: 8,
    marginLeft: 8,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayHeader: {
    width: '14.28%',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: colors.gray[600],
    paddingVertical: 8,
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  inactiveDay: {
    opacity: 0.3,
  },
  dayWithEvent: {
    backgroundColor: colors.blue[50],
    borderRadius: 8,
  },
  dayText: {
    fontSize: 14,
    color: colors.gray[800],
  },
  inactiveDayText: {
    color: colors.gray[400],
  },
  dayWithEventText: {
    fontWeight: 'bold',
    color: colors.blue[700],
  },
  eventDot: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.blue[500],
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: colors.gray[700],
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[50],
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  eventColor: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
  },
  eventContent: {
    flex: 1,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gray[800],
  },
  eventIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventCourse: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 8,
  },
  eventDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  eventDetailText: {
    fontSize: 12,
    color: colors.gray[500],
    marginLeft: 4,
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
  eventDetailHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  eventTypeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  eventDetailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gray[800],
    textAlign: 'center',
  },
  eventDetailCourse: {
    fontSize: 16,
    color: colors.gray[600],
    marginTop: 4,
  },
  eventInfoSection: {
    marginBottom: 24,
  },
  eventInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  eventInfoText: {
    marginLeft: 16,
  },
  eventInfoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray[700],
  },
  eventInfoValue: {
    fontSize: 14,
    color: colors.gray[600],
    marginTop: 2,
  },
  descriptionSection: {
    backgroundColor: colors.gray[50],
    borderRadius: 12,
    padding: 16,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gray[800],
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: colors.gray[600],
    lineHeight: 20,
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

export default CalendarScreen;