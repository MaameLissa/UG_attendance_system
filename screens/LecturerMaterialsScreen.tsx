import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Header from '../components/Header';
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import { colors } from '../theme/theme';

interface Material {
  id: string;
  name: string;
  type: 'document' | 'presentation' | 'video' | 'image' | 'archive' | 'link';
  size: string;
  uploadDate: string;
  course: string;
  folder: string;
  description: string;
  isPublic: boolean;
  downloadCount: number;
  tags: string[];
}

const MaterialsScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [materials] = useState<Material[]>([
    {
      id: '1',
      name: 'AI Fundamentals - Lecture 1.pdf',
      type: 'document',
      size: '2.4 MB',
      uploadDate: '2024-02-15',
      course: 'DCIT-313',
      folder: 'Lectures',
      description: 'Introduction to Artificial Intelligence concepts',
      isPublic: true,
      downloadCount: 45,
      tags: ['lecture', 'introduction', 'ai'],
    },
    {
      id: '2',
      name: 'Neural Networks Presentation.pptx',
      type: 'presentation',
      size: '8.7 MB',
      uploadDate: '2024-02-14',
      course: 'DCIT-313',
      folder: 'Presentations',
      description: 'Deep dive into neural network architectures',
      isPublic: true,
      downloadCount: 32,
      tags: ['neural networks', 'deep learning'],
    },
    {
      id: '3',
      name: 'Machine Learning Demo.mp4',
      type: 'video',
      size: '156 MB',
      uploadDate: '2024-02-13',
      course: 'DCIT-313',
      folder: 'Videos',
      description: 'Practical demonstration of ML algorithms',
      isPublic: false,
      downloadCount: 28,
      tags: ['machine learning', 'demo'],
    },
    {
      id: '4',
      name: 'Database Assignment.zip',
      type: 'archive',
      size: '4.8 MB',
      uploadDate: '2024-02-11',
      course: 'DCIT-305',
      folder: 'Assignments',
      description: 'SQL practice exercises and solutions',
      isPublic: true,
      downloadCount: 89,
      tags: ['database', 'sql', 'assignment'],
    },
  ]);

  const courses = ['DCIT-313', 'DCIT-301', 'DCIT-305'];

  const getFileIcon = (type: Material['type']) => {
    switch (type) {
      case 'document':
        return 'document-text';
      case 'presentation':
        return 'easel';
      case 'video':
        return 'videocam';
      case 'image':
        return 'image';
      case 'archive':
        return 'archive';
      case 'link':
        return 'link';
      default:
        return 'document';
    }
  };

  const getFileTypeColor = (type: Material['type']) => {
    switch (type) {
      case 'document':
        return colors.blue[500];
      case 'presentation':
        return colors.orange[500];
      case 'video':
        return colors.purple[500];
      case 'image':
        return colors.green[500];
      case 'archive':
        return colors.yellow[500];
      case 'link':
        return colors.indigo[500];
      default:
        return colors.gray[500];
    }
  };

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || material.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  const handleMaterialPress = (material: Material) => {
    setSelectedMaterial(material);
    setShowDetailsModal(true);
  };

  const handleDownload = (material: Material) => {
    Alert.alert(
      'Download',
      `Download ${material.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Download', onPress: () => console.log('Downloading...') },
      ]
    );
  };

  const handleShare = (material: Material) => {
    Alert.alert(
      'Share',
      `Share ${material.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Share', onPress: () => console.log('Sharing...') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Course Materials"
        subtitle="Upload and manage resources"
        rightComponent={
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowUploadModal(true)}
          >
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <StatCard
            title="Total Materials"
            value={materials.length.toString()}
            icon="folder"
            gradientColors={[colors.blue[500], colors.blue[600]]}
          />
          <StatCard
            title="Downloads"
            value={materials.reduce((sum, m) => sum + m.downloadCount, 0).toString()}
            icon="download"
            gradientColors={[colors.green[500], colors.green[600]]}
          />
        </View>

        <View style={styles.statsContainer}>
          <StatCard
            title="Public"
            value={materials.filter((m) => m.isPublic).length.toString()}
            icon="globe"
            gradientColors={[colors.purple[500], colors.purple[600]]}
          />
          <StatCard
            title="Private"
            value={materials.filter((m) => !m.isPublic).length.toString()}
            icon="lock-closed"
            gradientColors={[colors.orange[500], colors.orange[600]]}
          />
        </View>

        {/* Search and Filters */}
        <Card>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={colors.gray[400]} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search materials..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholderTextColor={colors.gray[400]}
            />
          </View>
          
          <View style={styles.filterContainer}>
            <Text style={styles.filterLabel}>Course:</Text>
            <View style={styles.filterButtons}>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  selectedCourse === 'all' && styles.activeFilterButton,
                ]}
                onPress={() => setSelectedCourse('all')}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedCourse === 'all' && styles.activeFilterButtonText,
                  ]}
                >
                  All
                </Text>
              </TouchableOpacity>
              {courses.map((course) => (
                <TouchableOpacity
                  key={course}
                  style={[
                    styles.filterButton,
                    selectedCourse === course && styles.activeFilterButton,
                  ]}
                  onPress={() => setSelectedCourse(course)}
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      selectedCourse === course && styles.activeFilterButtonText,
                    ]}
                  >
                    {course}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Card>

        {/* Materials List */}
        <Card>
          <Text style={styles.sectionTitle}>Materials</Text>
          {filteredMaterials.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="folder-open" size={48} color={colors.gray[300]} />
              <Text style={styles.emptyStateText}>No materials found</Text>
              <Text style={styles.emptyStateSubtext}>
                Try adjusting your search or filters
              </Text>
            </View>
          ) : (
            filteredMaterials.map((material) => (
              <TouchableOpacity
                key={material.id}
                style={styles.materialItem}
                onPress={() => handleMaterialPress(material)}
              >
                <View
                  style={[
                    styles.materialIcon,
                    { backgroundColor: getFileTypeColor(material.type) },
                  ]}
                >
                  <Ionicons
                    name={getFileIcon(material.type) as keyof typeof Ionicons.glyphMap}
                    size={24}
                    color="white"
                  />
                </View>

                <View style={styles.materialContent}>
                  <View style={styles.materialHeader}>
                    <Text style={styles.materialName} numberOfLines={1}>
                      {material.name}
                    </Text>
                    <View style={styles.materialActions}>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleDownload(material)}
                      >
                        <Ionicons name="download" size={16} color={colors.blue[600]} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleShare(material)}
                      >
                        <Ionicons name="share" size={16} color={colors.green[600]} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text style={styles.materialDescription} numberOfLines={2}>
                    {material.description}
                  </Text>

                  <View style={styles.materialTags}>
                    {material.tags.slice(0, 2).map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                    {material.tags.length > 2 && (
                      <Text style={styles.moreTagsText}>+{material.tags.length - 2}</Text>
                    )}
                  </View>

                  <View style={styles.materialFooter}>
                    <View style={styles.materialInfo}>
                      <Text style={styles.materialCourse}>{material.course}</Text>
                      <Text style={styles.materialSize}>{material.size}</Text>
                    </View>
                    <View style={styles.materialStats}>
                      <Ionicons name="download" size={12} color={colors.gray[500]} />
                      <Text style={styles.downloadCount}>{material.downloadCount}</Text>
                      {!material.isPublic && (
                        <Ionicons name="lock-closed" size={12} color={colors.red[500]} />
                      )}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </Card>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Material Details Modal */}
      <Modal
        visible={showDetailsModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Material Details</Text>
            <TouchableOpacity onPress={() => setShowDetailsModal(false)}>
              <Ionicons name="close" size={24} color={colors.gray[600]} />
            </TouchableOpacity>
          </View>

          {selectedMaterial && (
            <ScrollView style={styles.modalContent}>
              <View style={styles.materialDetailHeader}>
                <View
                  style={[
                    styles.materialDetailIcon,
                    { backgroundColor: getFileTypeColor(selectedMaterial.type) },
                  ]}
                >
                  <Ionicons
                    name={getFileIcon(selectedMaterial.type) as keyof typeof Ionicons.glyphMap}
                    size={32}
                    color="white"
                  />
                </View>
                <Text style={styles.materialDetailName}>{selectedMaterial.name}</Text>
                <Text style={styles.materialDetailCourse}>
                  {selectedMaterial.course} • {selectedMaterial.folder}
                </Text>
              </View>

              <View style={styles.detailInfoSection}>
                <View style={styles.detailInfoItem}>
                  <Ionicons name="calendar" size={20} color={colors.gray[500]} />
                  <View style={styles.detailInfoText}>
                    <Text style={styles.detailInfoLabel}>Upload Date</Text>
                    <Text style={styles.detailInfoValue}>{selectedMaterial.uploadDate}</Text>
                  </View>
                </View>
                <View style={styles.detailInfoItem}>
                  <Ionicons name="document" size={20} color={colors.gray[500]} />
                  <View style={styles.detailInfoText}>
                    <Text style={styles.detailInfoLabel}>File Size</Text>
                    <Text style={styles.detailInfoValue}>{selectedMaterial.size}</Text>
                  </View>
                </View>
                <View style={styles.detailInfoItem}>
                  <Ionicons name="download" size={20} color={colors.gray[500]} />
                  <View style={styles.detailInfoText}>
                    <Text style={styles.detailInfoLabel}>Downloads</Text>
                    <Text style={styles.detailInfoValue}>{selectedMaterial.downloadCount} times</Text>
                  </View>
                </View>
                <View style={styles.detailInfoItem}>
                  <Ionicons
                    name={selectedMaterial.isPublic ? "globe" : "lock-closed"}
                    size={20}
                    color={colors.gray[500]}
                  />
                  <View style={styles.detailInfoText}>
                    <Text style={styles.detailInfoLabel}>Visibility</Text>
                    <Text style={styles.detailInfoValue}>
                      {selectedMaterial.isPublic ? 'Public' : 'Private'}
                    </Text>
                  </View>
                </View>
              </View>

              {selectedMaterial.description && (
                <View style={styles.descriptionSection}>
                  <Text style={styles.descriptionTitle}>Description</Text>
                  <Text style={styles.descriptionText}>{selectedMaterial.description}</Text>
                </View>
              )}

              {selectedMaterial.tags.length > 0 && (
                <View style={styles.tagsSection}>
                  <Text style={styles.tagsTitle}>Tags</Text>
                  <View style={styles.tagsContainer}>
                    {selectedMaterial.tags.map((tag, index) => (
                      <View key={index} style={styles.detailTag}>
                        <Text style={styles.detailTagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              <View style={styles.actionButtonsContainer}>
                <TouchableOpacity
                  style={[styles.actionButtonLarge, { backgroundColor: colors.green[600] }]}
                  onPress={() => handleDownload(selectedMaterial)}
                >
                  <Ionicons name="download" size={20} color="white" />
                  <Text style={styles.actionButtonText}>Download</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButtonLarge, { backgroundColor: colors.blue[600] }]}
                  onPress={() => handleShare(selectedMaterial)}
                >
                  <Ionicons name="share" size={20} color="white" />
                  <Text style={styles.actionButtonText}>Share</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      </Modal>

      {/* Upload Modal */}
      <Modal
        visible={showUploadModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Upload Material</Text>
            <TouchableOpacity onPress={() => setShowUploadModal(false)}>
              <Ionicons name="close" size={24} color={colors.gray[600]} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <Text style={styles.comingSoon}>
              Upload functionality coming soon...
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
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.gray[800],
  },
  filterContainer: {
    marginBottom: 8,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray[700],
    marginBottom: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.gray[100],
    marginRight: 8,
    marginBottom: 8,
  },
  activeFilterButton: {
    backgroundColor: colors.blue[600],
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.gray[600],
  },
  activeFilterButtonText: {
    color: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray[800],
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray[600],
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.gray[500],
    marginTop: 4,
  },
  materialItem: {
    flexDirection: 'row',
    backgroundColor: colors.gray[50],
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  materialIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  materialContent: {
    flex: 1,
  },
  materialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  materialName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gray[800],
    flex: 1,
    marginRight: 8,
  },
  materialActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
  materialDescription: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 8,
    lineHeight: 18,
  },
  materialTags: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: colors.blue[100],
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.blue[700],
  },
  moreTagsText: {
    fontSize: 10,
    color: colors.gray[500],
  },
  materialFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  materialInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  materialCourse: {
    fontSize: 12,
    color: colors.gray[500],
    marginRight: 12,
  },
  materialSize: {
    fontSize: 12,
    color: colors.gray[500],
  },
  materialStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadCount: {
    fontSize: 12,
    color: colors.gray[500],
    marginLeft: 4,
    marginRight: 8,
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
  materialDetailHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  materialDetailIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  materialDetailName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.gray[800],
    textAlign: 'center',
    marginBottom: 4,
  },
  materialDetailCourse: {
    fontSize: 14,
    color: colors.gray[600],
  },
  detailInfoSection: {
    marginBottom: 24,
  },
  detailInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailInfoText: {
    marginLeft: 16,
  },
  detailInfoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray[700],
  },
  detailInfoValue: {
    fontSize: 14,
    color: colors.gray[600],
    marginTop: 2,
  },
  descriptionSection: {
    backgroundColor: colors.gray[50],
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
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
  tagsSection: {
    marginBottom: 24,
  },
  tagsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gray[800],
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailTag: {
    backgroundColor: colors.blue[100],
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  detailTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.blue[700],
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButtonLarge: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
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

export default MaterialsScreen;