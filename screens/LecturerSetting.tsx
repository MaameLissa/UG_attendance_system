import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Header from '../components/Header';
import Card from '../components/Card';
import { colors } from '../theme/theme';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  office: string;
  title: string;
  bio: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  attendanceAlerts: boolean;
  assignmentReminders: boolean;
  meetingReminders: boolean;
}

const SettingsScreen: React.FC = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: 'John',
    lastName: 'Johnson',
    email: 'j.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    department: 'Computer Science',
    office: 'Room 205, CS Building',
    title: 'Associate Professor',
    bio: 'Passionate educator with 10+ years of experience in computer science.',
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    attendanceAlerts: true,
    assignmentReminders: true,
    meetingReminders: true,
  });

  const settingSections = [
    { id: 'profile', label: 'Profile', icon: 'person' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'privacy', label: 'Privacy', icon: 'shield-checkmark' },
    { id: 'help', label: 'Help & Support', icon: 'help-circle' },
  ];

  const handleProfileUpdate = (field: keyof UserProfile, value: string) => {
    setUserProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationUpdate = (field: keyof NotificationSettings, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = () => {
    Alert.alert('Success', 'Settings saved successfully!');
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => console.log('Signing out...') },
      ]
    );
  };

  const renderProfileSection = () => (
    <View style={styles.sectionContent}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={40} color="white" />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>
            {userProfile.firstName} {userProfile.lastName}
          </Text>
          <Text style={styles.profileTitle}>{userProfile.title}</Text>
          <Text style={styles.profileDepartment}>{userProfile.department}</Text>
        </View>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.formSectionTitle}>Personal Information</Text>
        
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              style={styles.textInput}
              value={userProfile.firstName}
              onChangeText={(value) => handleProfileUpdate('firstName', value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              style={styles.textInput}
              value={userProfile.lastName}
              onChangeText={(value) => handleProfileUpdate('lastName', value)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={styles.textInput}
            value={userProfile.email}
            onChangeText={(value) => handleProfileUpdate('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            style={styles.textInput}
            value={userProfile.phone}
            onChangeText={(value) => handleProfileUpdate('phone', value)}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Department</Text>
          <TextInput
            style={styles.textInput}
            value={userProfile.department}
            onChangeText={(value) => handleProfileUpdate('department', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Office Location</Text>
          <TextInput
            style={styles.textInput}
            value={userProfile.office}
            onChangeText={(value) => handleProfileUpdate('office', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Job Title</Text>
          <TextInput
            style={styles.textInput}
            value={userProfile.title}
            onChangeText={(value) => handleProfileUpdate('title', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Bio</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            value={userProfile.bio}
            onChangeText={(value) => handleProfileUpdate('bio', value)}
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity
          style={styles.changePasswordButton}
          onPress={() => setShowPasswordModal(true)}
        >
          <Ionicons name="key" size={20} color={colors.blue[600]} />
          <Text style={styles.changePasswordText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderNotificationsSection = () => (
    <View style={styles.sectionContent}>
      <Text style={styles.formSectionTitle}>Notification Preferences</Text>
      
      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Ionicons name="mail" size={20} color={colors.gray[600]} />
          <View style={styles.settingText}>
            <Text style={styles.settingTitle}>Email Notifications</Text>
            <Text style={styles.settingDescription}>Receive notifications via email</Text>
          </View>
        </View>
        <Switch
          value={notifications.emailNotifications}
          onValueChange={(value) => handleNotificationUpdate('emailNotifications', value)}
          trackColor={{ false: colors.gray[300], true: colors.blue[600] }}
          thumbColor={notifications.emailNotifications ? colors.blue[600] : colors.gray[400]}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Ionicons name="phone-portrait" size={20} color={colors.gray[600]} />
          <View style={styles.settingText}>
            <Text style={styles.settingTitle}>Push Notifications</Text>
            <Text style={styles.settingDescription}>Receive push notifications on your device</Text>
          </View>
        </View>
        <Switch
          value={notifications.pushNotifications}
          onValueChange={(value) => handleNotificationUpdate('pushNotifications', value)}
          trackColor={{ false: colors.gray[300], true: colors.blue[600] }}
          thumbColor={notifications.pushNotifications ? colors.blue[600] : colors.gray[400]}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Ionicons name="people" size={20} color={colors.gray[600]} />
          <View style={styles.settingText}>
            <Text style={styles.settingTitle}>Attendance Alerts</Text>
            <Text style={styles.settingDescription}>Get notified about low attendance</Text>
          </View>
        </View>
        <Switch
          value={notifications.attendanceAlerts}
          onValueChange={(value) => handleNotificationUpdate('attendanceAlerts', value)}
          trackColor={{ false: colors.gray[300], true: colors.blue[600] }}
          thumbColor={notifications.attendanceAlerts ? colors.blue[600] : colors.gray[400]}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Ionicons name="document-text" size={20} color={colors.gray[600]} />
          <View style={styles.settingText}>
            <Text style={styles.settingTitle}>Assignment Reminders</Text>
            <Text style={styles.settingDescription}>Reminders for assignment deadlines</Text>
          </View>
        </View>
        <Switch
          value={notifications.assignmentReminders}
          onValueChange={(value) => handleNotificationUpdate('assignmentReminders', value)}
          trackColor={{ false: colors.gray[300], true: colors.blue[600] }}
          thumbColor={notifications.assignmentReminders ? colors.blue[600] : colors.gray[400]}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Ionicons name="calendar" size={20} color={colors.gray[600]} />
          <View style={styles.settingText}>
            <Text style={styles.settingTitle}>Meeting Reminders</Text>
            <Text style={styles.settingDescription}>Notifications for upcoming meetings</Text>
          </View>
        </View>
        <Switch
          value={notifications.meetingReminders}
          onValueChange={(value) => handleNotificationUpdate('meetingReminders', value)}
          trackColor={{ false: colors.gray[300], true: colors.blue[600] }}
          thumbColor={notifications.meetingReminders ? colors.blue[600] : colors.gray[400]}
        />
      </View>
    </View>
  );

  const renderPrivacySection = () => (
    <View style={styles.sectionContent}>
      <Text style={styles.formSectionTitle}>Privacy & Security</Text>
      <Text style={styles.comingSoon}>Privacy settings coming soon...</Text>
    </View>
  );

  const renderHelpSection = () => (
    <View style={styles.sectionContent}>
      <Text style={styles.formSectionTitle}>Help & Support</Text>
      
      <TouchableOpacity style={styles.helpItem}>
        <Ionicons name="document-text" size={20} color={colors.blue[600]} />
        <Text style={styles.helpItemText}>Documentation</Text>
        <Ionicons name="chevron-forward" size={16} color={colors.gray[400]} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.helpItem}>
        <Ionicons name="mail" size={20} color={colors.green[600]} />
        <Text style={styles.helpItemText}>Contact Support</Text>
        <Ionicons name="chevron-forward" size={16} color={colors.gray[400]} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.helpItem}>
        <Ionicons name="information-circle" size={20} color={colors.purple[600]} />
        <Text style={styles.helpItemText}>About</Text>
        <Ionicons name="chevron-forward" size={16} color={colors.gray[400]} />
      </TouchableOpacity>

      <View style={styles.versionInfo}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
        <Text style={styles.versionSubtext}>Last updated: Feb 15, 2024</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Settings" subtitle="Manage your account and preferences" />

      <View style={styles.content}>
        {/* Settings Navigation */}
        <View style={styles.navigation}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {settingSections.map((section) => (
              <TouchableOpacity
                key={section.id}
                style={[
                  styles.navButton,
                  activeSection === section.id && styles.activeNavButton,
                ]}
                onPress={() => setActiveSection(section.id)}
              >
                <Ionicons
                  name={section.icon as keyof typeof Ionicons.glyphMap}
                  size={16}
                  color={activeSection === section.id ? 'white' : colors.gray[600]}
                />
                <Text
                  style={[
                    styles.navButtonText,
                    activeSection === section.id && styles.activeNavButtonText,
                  ]}
                >
                  {section.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Settings Content */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Card>
            {activeSection === 'profile' && renderProfileSection()}
            {activeSection === 'notifications' && renderNotificationsSection()}
            {activeSection === 'privacy' && renderPrivacySection()}
            {activeSection === 'help' && renderHelpSection()}
          </Card>

          {/* Action Buttons */}
          <Card>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveSettings}>
              <Ionicons name="checkmark" size={20} color="white" />
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
              <Ionicons name="log-out" size={20} color={colors.red[600]} />
              <Text style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
          </Card>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </View>

      {/* Password Change Modal */}
      <Modal
        visible={showPasswordModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <TouchableOpacity onPress={() => setShowPasswordModal(false)}>
              <Ionicons name="close" size={24} color={colors.gray[600]} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <Text style={styles.comingSoon}>
              Password change functionality coming soon...
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
  content: {
    flex: 1,
  },
  navigation: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginHorizontal: 4,
    backgroundColor: colors.gray[100],
  },
  activeNavButton: {
    backgroundColor: colors.blue[600],
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray[600],
    marginLeft: 8,
  },
  activeNavButtonText: {
    color: 'white',
  },
  scrollView: {
    flex: 1,
  },
  sectionContent: {
    paddingVertical: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.blue[600],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gray[800],
  },
  profileTitle: {
    fontSize: 16,
    color: colors.gray[600],
    marginTop: 4,
  },
  profileDepartment: {
    fontSize: 14,
    color: colors.gray[500],
    marginTop: 2,
  },
  formSection: {
    marginTop: 16,
  },
  formSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray[800],
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
    marginBottom: 20,
    marginHorizontal: 4,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray[700],
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: colors.gray[50],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.gray[800],
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  changePasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 16,
  },
  changePasswordText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.blue[600],
    marginLeft: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray[800],
  },
  settingDescription: {
    fontSize: 14,
    color: colors.gray[600],
    marginTop: 2,
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  helpItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.gray[800],
    marginLeft: 16,
    flex: 1,
  },
  versionInfo: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray[600],
  },
  versionSubtext: {
    fontSize: 12,
    color: colors.gray[500],
    marginTop: 4,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green[600],
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 12,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red[50],
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: colors.red[100],
  },
  signOutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.red[600],
    marginLeft: 8,
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

export default SettingsScreen;