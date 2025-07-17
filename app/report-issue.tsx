import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Camera, Upload, X, TriangleAlert as AlertTriangle, ChevronRight } from 'lucide-react-native';
import { CommercialColors, CommercialTypography, CommercialBorderRadius, CommercialSpacing } from '@/themes/commercialDesignSystem';
import type { IssueReport } from '@/types/commercial';

// Simplified priority options
const PRIORITY_OPTIONS = [
  { id: 'tomorrow', label: 'Tomorrow', value: 'urgent' },
  { id: 'this_week', label: 'This Week', value: 'high' },
  { id: 'next_week', label: 'Next Week', value: 'medium' },
  { id: 'flexible', label: 'Flexible', value: 'low' },
];

// Mock data for issue history
const MOCK_ISSUE_HISTORY: IssueReport[] = [
  {
    id: 'issue-1',
    propertyId: 'prop-1',
    reportedBy: 'user-1',
    title: 'Pool Equipment Malfunction',
    description: 'The pool pump is making unusual noises and the water circulation seems reduced.',
    photos: [
      'https://images.pexels.com/photos/4489734/pexels-photo-4489734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    priority: 'high',
    category: 'other',
    status: 'in_progress',
    estimatedCost: 400,
    assignedTo: 'tech-1',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:45:00Z',
  },
  {
    id: 'issue-2',
    propertyId: 'prop-1',
    reportedBy: 'user-1',
    title: 'Landscape Irrigation Problem',
    description: 'Several sprinkler heads in the front landscape area are not working properly.',
    photos: [
      'https://images.pexels.com/photos/1036657/pexels-photo-1036657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    priority: 'medium',
    category: 'other',
    status: 'completed',
    actualCost: 250,
    assignedTo: 'tech-2',
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-12T16:30:00Z',
    completedAt: '2024-01-12T16:30:00Z',
  },
  {
    id: 'issue-3',
    propertyId: 'prop-2',
    reportedBy: 'user-1',
    title: 'Pest Control Needed',
    description: 'Noticed increased ant activity near the loading dock area. Requires immediate pest control attention.',
    photos: [
      'https://images.pexels.com/photos/5797999/pexels-photo-5797999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    priority: 'high',
    category: 'landscaping',
    status: 'open',
    createdAt: '2024-01-18T11:20:00Z',
    updatedAt: '2024-01-18T11:20:00Z',
  },
];

export default function ReportIssueScreen() {
  const [activeTab, setActiveTab] = useState<'report' | 'history'>('report');
  const [issueTitle, setIssueTitle] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [issuePriority, setIssuePriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [issueCategory, setIssueCategory] = useState<'maintenance' | 'cleaning' | 'landscaping' | 'security' | 'other'>('maintenance');
  const [photos, setPhotos] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<IssueReport | null>(null);

  const handleBack = () => {
    router.back();
  };

  const handleAddPhoto = () => {
    // Add a hardcoded photo instead of creating an error
    const hardcodedPhoto = 'https://images.pexels.com/photos/4489734/pexels-photo-4489734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
    
    if (photos.length < 5) {
      setPhotos([...photos, hardcodedPhoto]);
    } else {
      Alert.alert('Maximum Photos', 'You can add up to 5 photos per issue.');
    }
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };

  const handleSubmitIssue = async () => {
    if (!issueTitle.trim()) {
      Alert.alert('Missing Information', 'Please provide a title for the issue.');
      return;
    }

    if (!issueDescription.trim()) {
      Alert.alert('Missing Information', 'Please provide a description of the issue.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Issue Reported',
        'Your issue has been successfully reported. A property manager will review it shortly.',
        [
          { 
            text: 'OK', 
            onPress: () => {
              // Reset form and switch to history tab
              setIssueTitle('');
              setIssueDescription('');
              setIssuePriority('medium');
              setIssueCategory('maintenance');
              setPhotos([]);
              setNotes('');
              setActiveTab('history');
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit issue. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewIssueDetails = (issue: IssueReport) => {
    setSelectedIssue(issue);
  };

  const handleCloseIssueDetails = () => {
    setSelectedIssue(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return CommercialColors.systemBlue;
      case 'medium': return CommercialColors.systemOrange;
      case 'high': return CommercialColors.systemRed;
      case 'urgent': return '#FF2D55';
      default: return CommercialColors.systemBlue;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return CommercialColors.systemOrange;
      case 'in_progress': return CommercialColors.systemBlue;
      case 'pending_approval': return '#FFB800';
      case 'completed': return CommercialColors.systemGreen;
      case 'cancelled': return CommercialColors.systemGray;
      default: return CommercialColors.systemBlue;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Open';
      case 'in_progress': return 'In Progress';
      case 'pending_approval': return 'Pending Approval';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft color={CommercialColors.lightLabel} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Report Issue</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'report' && styles.activeTab]}
            onPress={() => setActiveTab('report')}
          >
            <Text style={[styles.tabText, activeTab === 'report' && styles.activeTabText]}>
              Report New Issue
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'history' && styles.activeTab]}
            onPress={() => setActiveTab('history')}
          >
            <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
              Issue History
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'report' ? (
          <>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Issue Details</Text>
                
                <View style={styles.photoSection}>
                  <Text style={styles.sectionSubtitle}>Add photos to help us understand the issue (optional)</Text>
                  
                  <View style={styles.photoGrid}>
                    {photos.map((photo, index) => (
                      <View key={index} style={styles.photoContainer}>
                        <Image source={{ uri: photo }} style={styles.photoThumbnail} />
                        <TouchableOpacity 
                          style={styles.removePhotoButton}
                          onPress={() => handleRemovePhoto(index)}
                        >
                          <X color={CommercialColors.white} size={16} />
                        </TouchableOpacity>
                      </View>
                    ))}
                    
                    {photos.length < 5 && (
                      <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto}>
                        <View style={styles.addPhotoContent}>
                          <Camera color={CommercialColors.lightSecondaryLabel} size={24} />
                          <Text style={styles.addPhotoText}>Add Photo</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Title *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Brief title of the issue"
                    placeholderTextColor={CommercialColors.lightTertiaryLabel}
                    value={issueTitle}
                    onChangeText={setIssueTitle}
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Description *</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Detailed description of the issue"
                    placeholderTextColor={CommercialColors.lightTertiaryLabel}
                    value={issueDescription}
                    onChangeText={setIssueDescription}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>When do you need this fixed?</Text>
                  <View style={styles.priorityOptions}>
                    {PRIORITY_OPTIONS.map((option) => (
                      <TouchableOpacity
                        key={option.id}
                        style={[
                          styles.priorityOption,
                          issuePriority === option.value && styles.priorityOptionSelected,
                          { borderColor: getPriorityColor(option.value) }
                        ]}
                        onPress={() => setIssuePriority(option.value as any)}
                      >
                        <Text style={[
                          styles.priorityText,
                          issuePriority === option.value && styles.priorityTextSelected,
                          { color: getPriorityColor(option.value) }
                        ]}>
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Category (Auto-detected)</Text>
                  <View style={styles.categoryOptions}>
                    {['pest', 'pool', 'landscape', 'tree', 'exterior', 'janitorial', 'waste'].map((category) => (
                      <TouchableOpacity
                        key={category}
                        style={[
                          styles.categoryOption,
                          issueCategory === category && styles.categoryOptionSelected
                        ]}
                        onPress={() => setIssueCategory(category as any)}
                      >
                        <Text style={[
                          styles.categoryText,
                          issueCategory === category && styles.categoryTextSelected
                        ]}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                          {category === 'janitorial' ? ' Services' : category === 'waste' ? ' Services' : ` Services`}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>

              <View style={styles.infoCard}>
                <View style={styles.infoHeader}>
                  <AlertTriangle color={CommercialColors.systemOrange} size={20} />
                  <Text style={styles.infoTitle}>What happens next?</Text>
                </View>
                <Text style={styles.infoText}>
                  After submitting your issue report, our property management team will:
                </Text>
                <View style={styles.infoList}>
                  <Text style={styles.infoListItem}>• Review your report within 1 business day</Text>
                  <Text style={styles.infoListItem}>• Provide a cost estimate if applicable</Text>
                  <Text style={styles.infoListItem}>• Schedule necessary repairs or maintenance</Text>
                  <Text style={styles.infoListItem}>• Keep you updated on progress through the app</Text>
                </View>
              </View>

              <View style={styles.bottomSpacing} />
            </ScrollView>

            <View style={styles.bottomSection}>
              <TouchableOpacity 
                style={[styles.submitButton, isSubmitting && styles.disabledButton]}
                onPress={handleSubmitIssue}
                disabled={isSubmitting}
              >
                <View style={styles.submitButtonBackground}>
                  {isSubmitting ? (
                    <ActivityIndicator color={CommercialColors.white} size="small" />
                  ) : (
                    <Text style={styles.submitButtonText}>Submit Issue Report</Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              {selectedIssue ? (
                <View style={styles.issueDetailView}>
                  <TouchableOpacity 
                    style={styles.backToListButton}
                    onPress={handleCloseIssueDetails}
                  >
                    <ArrowLeft color={CommercialColors.systemBlue} size={16} />
                    <Text style={styles.backToListText}>Back to list</Text>
                  </TouchableOpacity>
                  
                  <View style={styles.issueDetailHeader}>
                    <Text style={styles.issueDetailTitle}>{selectedIssue.title}</Text>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(selectedIssue.status) + '20' }
                    ]}>
                      <Text style={[
                        styles.statusText,
                        { color: getStatusColor(selectedIssue.status) }
                      ]}>
                        {getStatusText(selectedIssue.status)}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.issueDetailMeta}>
                    <View style={styles.metaItem}>
                      <Text style={styles.metaLabel}>Reported:</Text>
                      <Text style={styles.metaValue}>{formatDate(selectedIssue.createdAt)}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Text style={styles.metaLabel}>Priority:</Text>
                      <Text style={[
                        styles.metaValue,
                        { color: getPriorityColor(selectedIssue.priority) }
                      ]}>
                        {selectedIssue.priority.charAt(0).toUpperCase() + selectedIssue.priority.slice(1)}
                      </Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Text style={styles.metaLabel}>Category:</Text>
                      <Text style={styles.metaValue}>
                        {selectedIssue.category.charAt(0).toUpperCase() + selectedIssue.category.slice(1)}
                      </Text>
                    </View>
                    {selectedIssue.estimatedCost && (
                      <View style={styles.metaItem}>
                        <Text style={styles.metaLabel}>Est. Cost:</Text>
                        <Text style={styles.metaValue}>${selectedIssue.estimatedCost.toLocaleString()}</Text>
                      </View>
                    )}
                    {selectedIssue.actualCost && (
                      <View style={styles.metaItem}>
                        <Text style={styles.metaLabel}>Final Cost:</Text>
                        <Text style={styles.metaValue}>${selectedIssue.actualCost.toLocaleString()}</Text>
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.issueDetailSection}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.issueDescription}>{selectedIssue.description}</Text>
                  </View>
                  
                  {selectedIssue.photos && selectedIssue.photos.length > 0 && (
                    <View style={styles.issueDetailSection}>
                      <Text style={styles.sectionTitle}>Photos</Text>
                      <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        style={styles.photoScroll}
                      >
                        {selectedIssue.photos.map((photo, index) => (
                          <TouchableOpacity key={index} style={styles.detailPhotoContainer}>
                            <Image source={{ uri: photo }} style={styles.detailPhoto} />
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                  
                  <View style={styles.issueDetailSection}>
                    <Text style={styles.sectionTitle}>Status Updates</Text>
                    <View style={styles.timelineContainer}>
                      <View style={styles.timelineItem}>
                        <View style={styles.timelineDot} />
                        <View style={styles.timelineContent}>
                          <Text style={styles.timelineDate}>{formatDate(selectedIssue.createdAt)}</Text>
                          <Text style={styles.timelineTitle}>Issue Reported</Text>
                          <Text style={styles.timelineText}>Issue was submitted through the app</Text>
                        </View>
                      </View>
                      
                      {selectedIssue.status === 'in_progress' && (
                        <View style={styles.timelineItem}>
                          <View style={styles.timelineDot} />
                          <View style={styles.timelineContent}>
                            <Text style={styles.timelineDate}>{formatDate(selectedIssue.updatedAt)}</Text>
                            <Text style={styles.timelineTitle}>Work Started</Text>
                            <Text style={styles.timelineText}>Technician has been assigned and work has begun</Text>
                          </View>
                        </View>
                      )}
                      
                      {selectedIssue.status === 'completed' && (
                        <>
                          <View style={styles.timelineItem}>
                            <View style={styles.timelineDot} />
                            <View style={styles.timelineContent}>
                              <Text style={styles.timelineDate}>{formatDate(selectedIssue.updatedAt)}</Text>
                              <Text style={styles.timelineTitle}>Work Started</Text>
                              <Text style={styles.timelineText}>Technician was assigned and began repairs</Text>
                            </View>
                          </View>
                          <View style={styles.timelineItem}>
                            <View style={styles.timelineDot} />
                            <View style={styles.timelineContent}>
                              <Text style={styles.timelineDate}>{formatDate(selectedIssue.completedAt || selectedIssue.updatedAt)}</Text>
                              <Text style={styles.timelineTitle}>Work Completed</Text>
                              <Text style={styles.timelineText}>All repairs have been completed successfully</Text>
                            </View>
                          </View>
                        </>
                      )}
                    </View>
                  </View>
                </View>
              ) : (
                <>
                  <Text style={styles.historyTitle}>Recent Issues</Text>
                  
                  {MOCK_ISSUE_HISTORY.length > 0 ? (
                    <View style={styles.issueList}>
                      {MOCK_ISSUE_HISTORY.map(issue => (
                        <TouchableOpacity 
                          key={issue.id} 
                          style={styles.issueCard}
                          onPress={() => handleViewIssueDetails(issue)}
                        >
                          <View style={styles.issueCardContent}>
                            <View style={styles.issueHeader}>
                              <View style={[
                                styles.priorityIndicator,
                                { backgroundColor: getPriorityColor(issue.priority) }
                              ]} />
                              <Text style={styles.issueTitle}>{issue.title}</Text>
                            </View>
                            
                            <Text style={styles.issueDescription} numberOfLines={2}>
                              {issue.description}
                            </Text>
                            
                            <View style={styles.issueFooter}>
                              <View style={[
                                styles.statusBadge,
                                { backgroundColor: getStatusColor(issue.status) + '20' }
                              ]}>
                                <Text style={[
                                  styles.statusText,
                                  { color: getStatusColor(issue.status) }
                                ]}>
                                  {getStatusText(issue.status)}
                                </Text>
                              </View>
                              
                              <Text style={styles.issueDate}>
                                {formatDate(issue.createdAt)}
                              </Text>
                            </View>
                            
                            {issue.photos && issue.photos.length > 0 && (
                              <View style={styles.issueThumbnails}>
                                {issue.photos.slice(0, 3).map((photo, index) => (
                                  <Image 
                                    key={index} 
                                    source={{ uri: photo }} 
                                    style={styles.issueThumbnail} 
                                  />
                                ))}
                                {issue.photos.length > 3 && (
                                  <View style={styles.morePhotosIndicator}>
                                    <Text style={styles.morePhotosText}>+{issue.photos.length - 3}</Text>
                                  </View>
                                )}
                              </View>
                            )}
                            
                            <ChevronRight 
                              color={CommercialColors.lightTertiaryLabel} 
                              size={16} 
                              style={styles.chevronIcon}
                            />
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : (
                    <View style={styles.emptyState}>
                      <AlertTriangle color={CommercialColors.lightTertiaryLabel} size={48} />
                      <Text style={styles.emptyStateTitle}>No issues reported</Text>
                      <Text style={styles.emptyStateText}>
                        Any issues you report will appear here
                      </Text>
                    </View>
                  )}
                </>
              )}
              
              <View style={styles.bottomSpacing} />
            </ScrollView>
            
            {!selectedIssue && (
              <View style={styles.bottomSection}>
                <TouchableOpacity 
                  style={styles.newIssueButton}
                  onPress={() => setActiveTab('report')}
                >
                  <View style={styles.newIssueButtonBackground}>
                    <Text style={styles.newIssueButtonText}>Report New Issue</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommercialColors.lightBackground,
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: CommercialColors.lightBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: CommercialSpacing.xxl,
    paddingVertical: CommercialSpacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: CommercialColors.lightSeparator,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CommercialColors.lightSecondaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...CommercialTypography.headline,
    color: CommercialColors.lightLabel,
  },
  placeholder: {
    width: 40,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: CommercialColors.lightSecondaryBackground,
    margin: CommercialSpacing.lg,
    borderRadius: CommercialBorderRadius.large,
    padding: 4,
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
  },
  tab: {
    flex: 1,
    paddingVertical: CommercialSpacing.md,
    alignItems: 'center',
    borderRadius: CommercialBorderRadius.medium,
  },
  activeTab: {
    backgroundColor: CommercialColors.systemBlue,
  },
  tabText: {
    ...CommercialTypography.subheadline,
    fontWeight: '600',
    color: CommercialColors.lightSecondaryLabel,
  },
  activeTabText: {
    color: CommercialColors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: CommercialSpacing.lg,
  },
  formSection: {
    marginBottom: CommercialSpacing.xl,
  },
  sectionTitle: {
    ...CommercialTypography.title3,
    color: CommercialColors.lightLabel,
    marginBottom: CommercialSpacing.md,
  },
  sectionSubtitle: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.lightSecondaryLabel,
    marginBottom: CommercialSpacing.md,
  },
  inputGroup: {
    marginBottom: CommercialSpacing.lg,
  },
  label: {
    ...CommercialTypography.subheadline,
    fontWeight: '600',
    color: CommercialColors.lightLabel,
    marginBottom: CommercialSpacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
    borderRadius: CommercialBorderRadius.medium,
    paddingHorizontal: CommercialSpacing.md,
    paddingVertical: CommercialSpacing.md,
    ...CommercialTypography.body,
    backgroundColor: CommercialColors.lightBackground,
    color: CommercialColors.lightLabel,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  priorityOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityOption: {
    flex: 1,
    paddingVertical: CommercialSpacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: CommercialBorderRadius.medium,
    marginHorizontal: 4,
  },
  priorityOptionSelected: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  priorityText: {
    ...CommercialTypography.subheadline,
  },
  priorityTextSelected: {
    fontWeight: '600',
  },
  categoryOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CommercialSpacing.sm,
  },
  categoryOption: {
    paddingHorizontal: CommercialSpacing.md,
    paddingVertical: CommercialSpacing.sm,
    borderRadius: CommercialBorderRadius.medium,
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
    backgroundColor: CommercialColors.lightBackground,
  },
  categoryOptionSelected: {
    borderColor: CommercialColors.systemBlue,
    backgroundColor: CommercialColors.systemBlueLight,
  },
  categoryText: {
    ...CommercialTypography.caption1,
    color: CommercialColors.lightLabel,
  },
  categoryTextSelected: {
    color: CommercialColors.systemBlueDark,
    fontWeight: '600',
  },
  photoSection: {
    marginBottom: CommercialSpacing.xl,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CommercialSpacing.md,
  },
  photoContainer: {
    width: 100,
    height: 100,
    borderRadius: CommercialBorderRadius.medium,
    overflow: 'hidden',
    position: 'relative',
  },
  photoThumbnail: {
    width: '100%',
    height: '100%',
  },
  removePhotoButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoButton: {
    width: 100,
    height: 100,
    borderRadius: CommercialBorderRadius.medium,
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoContent: {
    alignItems: 'center',
    gap: 8,
  },
  addPhotoText: {
    ...CommercialTypography.caption1,
    color: CommercialColors.lightSecondaryLabel,
  },
  notesSection: {
    marginBottom: CommercialSpacing.xl,
  },
  infoCard: {
    backgroundColor: CommercialColors.lightSecondaryBackground,
    borderRadius: CommercialBorderRadius.large,
    padding: CommercialSpacing.lg,
    marginBottom: CommercialSpacing.xl,
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CommercialSpacing.sm,
    marginBottom: CommercialSpacing.sm,
  },
  infoTitle: {
    ...CommercialTypography.headline,
    color: CommercialColors.lightLabel,
  },
  infoText: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.lightSecondaryLabel,
    marginBottom: CommercialSpacing.sm,
  },
  infoList: {
    marginLeft: CommercialSpacing.sm,
  },
  infoListItem: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.lightSecondaryLabel,
    marginBottom: 4,
  },
  bottomSpacing: {
    height: CommercialSpacing.xl,
  },
  bottomSection: {
    paddingHorizontal: CommercialSpacing.lg,
    paddingVertical: CommercialSpacing.lg,
    borderTopWidth: 1,
    borderTopColor: CommercialColors.lightSeparator,
  },
  submitButton: {
    borderRadius: CommercialBorderRadius.large,
    overflow: 'hidden',
  },
  disabledButton: {
    opacity: 0.7,
  },
  submitButtonBackground: {
    backgroundColor: CommercialColors.systemBlue,
    paddingVertical: CommercialSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: CommercialSpacing.sm,
  },
  submitButtonText: {
    ...CommercialTypography.headline,
    color: CommercialColors.white,
  },
  // History tab styles
  historyTitle: {
    ...CommercialTypography.title2,
    color: CommercialColors.lightLabel,
    marginBottom: CommercialSpacing.lg,
    marginTop: CommercialSpacing.md,
  },
  issueList: {
    gap: CommercialSpacing.md,
  },
  issueCard: {
    borderRadius: CommercialBorderRadius.large,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
    backgroundColor: CommercialColors.lightBackground,
    marginBottom: CommercialSpacing.sm,
  },
  issueCardContent: {
    padding: CommercialSpacing.lg,
  },
  issueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: CommercialSpacing.sm,
    gap: CommercialSpacing.sm,
  },
  priorityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  issueTitle: {
    ...CommercialTypography.headline,
    color: CommercialColors.lightLabel,
    flex: 1,
  },
  issueDescription: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.lightSecondaryLabel,
    marginBottom: CommercialSpacing.md,
  },
  issueFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: CommercialSpacing.sm,
  },
  statusBadge: {
    paddingHorizontal: CommercialSpacing.sm,
    paddingVertical: 4,
    borderRadius: CommercialBorderRadius.small,
  },
  statusText: {
    ...CommercialTypography.caption1,
    fontWeight: '600',
  },
  issueDate: {
    ...CommercialTypography.caption1,
    color: CommercialColors.lightTertiaryLabel,
  },
  issueThumbnails: {
    flexDirection: 'row',
    gap: CommercialSpacing.sm,
  },
  issueThumbnail: {
    width: 60,
    height: 60,
    borderRadius: CommercialBorderRadius.small,
  },
  morePhotosIndicator: {
    width: 60,
    height: 60,
    borderRadius: CommercialBorderRadius.small,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  morePhotosText: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.white,
    fontWeight: '600',
  },
  chevronIcon: {
    position: 'absolute',
    right: CommercialSpacing.lg,
    top: CommercialSpacing.lg,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    ...CommercialTypography.title3,
    color: CommercialColors.lightLabel,
    marginTop: CommercialSpacing.md,
    marginBottom: CommercialSpacing.sm,
  },
  emptyStateText: {
    ...CommercialTypography.body,
    color: CommercialColors.lightSecondaryLabel,
    textAlign: 'center',
  },
  newIssueButton: {
    borderRadius: CommercialBorderRadius.large,
    overflow: 'hidden',
  },
  newIssueButtonBackground: {
    backgroundColor: CommercialColors.systemBlue,
    paddingVertical: CommercialSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newIssueButtonText: {
    ...CommercialTypography.headline,
    color: CommercialColors.white,
  },
  // Issue detail view styles
  issueDetailView: {
    paddingTop: CommercialSpacing.md,
  },
  backToListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CommercialSpacing.xs,
    marginBottom: CommercialSpacing.md,
  },
  backToListText: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.systemBlue,
  },
  issueDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: CommercialSpacing.md,
  },
  issueDetailTitle: {
    ...CommercialTypography.title3,
    color: CommercialColors.lightLabel,
    flex: 1,
    marginRight: CommercialSpacing.md,
  },
  issueDetailMeta: {
    backgroundColor: CommercialColors.lightSecondaryBackground,
    borderRadius: CommercialBorderRadius.medium,
    padding: CommercialSpacing.md,
    marginBottom: CommercialSpacing.lg,
  },
  metaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  metaLabel: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.lightSecondaryLabel,
  },
  metaValue: {
    ...CommercialTypography.subheadline,
    fontWeight: '600',
    color: CommercialColors.lightLabel,
  },
  issueDetailSection: {
    marginBottom: CommercialSpacing.lg,
  },
  photoScroll: {
    marginHorizontal: -CommercialSpacing.lg,
    paddingHorizontal: CommercialSpacing.lg,
  },
  detailPhotoContainer: {
    width: 200,
    height: 150,
    borderRadius: CommercialBorderRadius.medium,
    overflow: 'hidden',
    marginRight: CommercialSpacing.md,
  },
  detailPhoto: {
    width: '100%',
    height: '100%',
  },
  timelineContainer: {
    paddingLeft: CommercialSpacing.md,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: CommercialSpacing.lg,
    position: 'relative',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: CommercialColors.systemBlue,
    marginTop: 4,
    marginRight: CommercialSpacing.md,
  },
  timelineContent: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: CommercialColors.lightSeparator,
    paddingLeft: CommercialSpacing.md,
    marginLeft: -6,
    paddingBottom: CommercialSpacing.lg,
  },
  timelineDate: {
    ...CommercialTypography.caption1,
    color: CommercialColors.lightTertiaryLabel,
    marginBottom: 2,
  },
  timelineTitle: {
    ...CommercialTypography.headline,
    color: CommercialColors.lightLabel,
    marginBottom: 4,
  },
  timelineText: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.lightSecondaryLabel,
  },
});