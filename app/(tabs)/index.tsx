import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Building2, Plus, Bell, Settings, TrendingUp, TriangleAlert as AlertTriangle, Calendar, DollarSign, Camera, MessageSquare, ChevronRight, Users, X } from 'lucide-react-native';
import { CommercialColors, CommercialShadows, CommercialSpacing, CommercialTypography, CommercialBorderRadius } from '@/themes/commercialDesignSystem';
import type { CommercialProperty, CommercialPortfolio, CommercialCervScore, CommercialUserRole } from '@/types/commercial';

const MOCK_PORTFOLIO: CommercialPortfolio = {
  id: 'portfolio-1',
  userId: 'user-1',
  companyName: 'Austin Commercial Properties LLC',
  properties: [
    {
      id: 'prop-1',
      name: 'Downtown Austin Office',
      address: '123 Congress Ave',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      propertyType: 'office',
      squareFootage: 150000,
      floors: 25,
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'prop-2',
      name: 'South Austin Retail Center',
      address: '456 South Lamar Blvd',
      city: 'Austin',
      state: 'TX',
      zipCode: '78704',
      propertyType: 'retail',
      squareFootage: 75000,
      floors: 2,
      isActive: true,
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'prop-3',
      name: 'East Austin Industrial Complex',
      address: '789 East 6th St',
      city: 'Austin',
      state: 'TX',
      zipCode: '78702',
      propertyType: 'warehouse',
      squareFootage: 200000,
      floors: 1,
      isActive: true,
      createdAt: '2024-02-01T00:00:00Z',
      updatedAt: new Date().toISOString(),
    },
  ],
  activePropertyId: 'prop-1',
  totalProperties: 3,
  averageCervScore: 85,
  totalOpenIssues: 4,
  monthlySpend: 12500,
  lastUpdated: new Date().toISOString(),
};

const MOCK_CERV_SCORES: { [key: string]: CommercialCervScore } = {
  'prop-1': {
    overall: 87,
    maintenance: 90,
    cleanliness: 85,
    landscaping: 88,
    security: 92,
    efficiency: 82,
    lastUpdated: new Date().toISOString(),
    propertyId: 'prop-1',
    trend: 'improving',
    monthlyDelta: 3,
  },
  'prop-2': {
    overall: 82,
    maintenance: 85,
    cleanliness: 80,
    landscaping: 85,
    security: 88,
    efficiency: 75,
    lastUpdated: new Date().toISOString(),
    propertyId: 'prop-2',
    trend: 'stable',
    monthlyDelta: 0,
  },
  'prop-3': {
    overall: 86,
    maintenance: 88,
    cleanliness: 82,
    landscaping: 90,
    security: 85,
    efficiency: 85,
    lastUpdated: new Date().toISOString(),
    propertyId: 'prop-3',
    trend: 'improving',
    monthlyDelta: 2,
  },
};

const MOCK_OPEN_ISSUES = [
  {
    id: 'issue-1',
    title: 'Pool Filter Maintenance Required',
    property: 'Downtown Austin Office',
    priority: 'medium',
    category: 'Pool Services',
    reportedDate: '2024-01-15',
    description: 'Pool filter needs cleaning and chemical balance adjustment',
  },
  {
    id: 'issue-2',
    title: 'Pest Control Follow-up',
    property: 'South Austin Retail Center',
    priority: 'high',
    category: 'Pest Services',
    reportedDate: '2024-01-18',
    description: 'Follow-up treatment needed for ant infestation in break room',
  },
  {
    id: 'issue-3',
    title: 'Landscape Irrigation Repair',
    property: 'East Austin Industrial Complex',
    priority: 'medium',
    category: 'Landscape Services',
    reportedDate: '2024-01-20',
    description: 'Sprinkler system zone 3 not functioning properly',
  },
  {
    id: 'issue-4',
    title: 'Tree Pruning Required',
    property: 'Downtown Austin Office',
    priority: 'low',
    category: 'Tree Services',
    reportedDate: '2024-01-22',
    description: 'Oak trees near entrance need seasonal pruning',
  },
];

export default function DashboardTab() {
  const [selectedProperty, setSelectedProperty] = useState<CommercialProperty>(MOCK_PORTFOLIO.properties[0]);
  const [currentUserRole] = useState<CommercialUserRole>('property_manager');
  const [showIssuesModal, setShowIssuesModal] = useState(false);

  const handlePropertySelect = (property: CommercialProperty) => {
    setSelectedProperty(property);
  };

  const handleReportIssue = () => {
    router.push('/report-issue');
  };

  const handleRequestWork = () => {
    router.push('/request-work');
  };

  const handleNotifications = () => {
    Alert.alert('Open Issues', `You have ${MOCK_PORTFOLIO.totalOpenIssues} open issues across your portfolio:\n\n• HVAC maintenance needed at Downtown Austin Office\n• Pool cleaning overdue at South Austin Retail\n• Landscape trimming required at East Austin Industrial\n• Pest control follow-up needed`);
  };

  const handleSettings = () => {
    Alert.alert('Settings', 'Settings panel will be available soon.');
  };

  const handleOpenIssuesClick = () => {
    setShowIssuesModal(true);
  };

  const currentScore = MOCK_CERV_SCORES[selectedProperty.id];

  const getScoreColor = (score: number) => {
    if (score >= 85) return CommercialColors.systemBlue;
    if (score >= 70) return CommercialColors.systemOrange;
    return CommercialColors.systemRed;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return CommercialColors.systemRed;
      case 'medium': return CommercialColors.systemOrange;
      case 'low': return CommercialColors.systemBlue;
      default: return CommercialColors.systemGray;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp color={CommercialColors.systemBlue} size={16} />;
      case 'declining':
        return <TrendingUp color={CommercialColors.systemRed} size={16} style={{ transform: [{ rotate: '180deg' }] }} />;
      default:
        return <TrendingUp color={CommercialColors.systemGray} size={16} style={{ transform: [{ rotate: '90deg' }] }} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundView}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <View style={styles.brandSection}>
              <View style={styles.logoContainer}>
                <Building2 color={CommercialColors.systemBlue} size={24} />
                <Text style={styles.logoText}>Cerv Commercial</Text>
              </View>
              <Text style={styles.welcomeText}>Welcome back, {MOCK_PORTFOLIO.companyName}</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerButton} onPress={handleNotifications}>
                <Bell color={CommercialColors.secondaryLabel} size={22} />
                {MOCK_PORTFOLIO.totalOpenIssues > 0 && <View style={styles.notificationDot} />}
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton} onPress={handleSettings}>
                <Settings color={CommercialColors.secondaryLabel} size={22} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Portfolio Overview */}
            <View style={styles.portfolioOverview}>
              <Text style={styles.sectionTitle}>Portfolio Overview</Text>
              <View style={styles.portfolioStats}>
                <View style={styles.statCard}>
                  <View style={styles.statCardBackground}>
                    <View style={styles.statHeader}>
                      <Building2 color={CommercialColors.systemBlue} size={20} />
                      <Text style={styles.statValue}>{MOCK_PORTFOLIO.totalProperties}</Text>
                    </View>
                    <Text style={styles.statLabel}>Properties</Text>
                  </View>
                </View>
                
                <View style={styles.statCard}>
                  <View style={styles.statCardBackground}>
                    <View style={styles.statHeader}>
                      <TrendingUp color={getScoreColor(MOCK_PORTFOLIO.averageCervScore)} size={20} />
                      <Text style={styles.statValue}>{MOCK_PORTFOLIO.averageCervScore}</Text>
                    </View>
                    <Text style={styles.statLabel}>Avg Score</Text>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.statCard} onPress={handleOpenIssuesClick}>
                  <View style={styles.statCardBackground}>
                    <View style={styles.statHeader}>
                      <TouchableOpacity onPress={handleNotifications}>
                        <AlertTriangle color={CommercialColors.systemOrange} size={20} />
                      </TouchableOpacity>
                      <Text style={styles.statValue}>{MOCK_PORTFOLIO.totalOpenIssues}</Text>
                    </View>
                    <TouchableOpacity onPress={handleNotifications}>
                      <Text style={styles.statLabel}>Open Issues</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
                
                <View style={styles.statCard}>
                  <View style={styles.statCardBackground}>
                    <View style={styles.statHeader}>
                      <DollarSign color={CommercialColors.systemBlue} size={20} />
                      <Text style={styles.statValue}>${(MOCK_PORTFOLIO.monthlySpend / 1000).toFixed(0)}K</Text>
                    </View>
                    <Text style={styles.statLabel}>Monthly</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Property Selector */}
            <View style={styles.propertySelector}>
              <Text style={styles.sectionTitle}>Select Property</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.propertyScroll}>
                {MOCK_PORTFOLIO.properties.map((property) => {
                  const isSelected = property.id === selectedProperty.id;
                  const score = MOCK_CERV_SCORES[property.id];
                  
                  // Update property names to Austin locations
                  const propertyName = property.id === 'prop-1' ? 'Downtown Austin Office' :
                                     property.id === 'prop-2' ? 'South Austin Retail Center' :
                                     'East Austin Industrial Complex';
                  
                  const propertyCity = property.id === 'prop-1' ? 'Downtown Austin' :
                                     property.id === 'prop-2' ? 'South Austin' :
                                     'East Austin';
                  
                  return (
                    <TouchableOpacity
                      key={property.id}
                      style={[
                        styles.propertyCard,
                        isSelected && styles.propertyCardSelected
                      ]}
                      onPress={() => handlePropertySelect(property)}
                    >
                      <View style={[
                        styles.propertyCardBackground,
                        isSelected && styles.propertyCardSelectedBackground
                      ]}>
                        <Text style={[
                          styles.propertyName,
                          isSelected && styles.propertyNameSelected
                        ]}>
                          {propertyName}
                        </Text>
                        <Text style={[
                          styles.propertyAddress,
                          isSelected && styles.propertyAddressSelected
                        ]}>
                          {propertyCity}, TX
                        </Text>
                        <View style={styles.propertyMeta}>
                          <Text style={[
                            styles.propertyType,
                            isSelected && styles.propertyTypeSelected
                          ]}>
                            {property.propertyType.replace('_', ' ').toUpperCase()}
                          </Text>
                          <View style={styles.propertyScore}>
                            <Text style={[
                              styles.scoreValue,
                              { color: getScoreColor(score.overall) }
                            ]}>
                              {score.overall}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Current Property Details */}
            <View style={styles.propertyDetails}>
              <View style={styles.propertyHeader}>
                <View style={styles.propertyInfo}>
                  <Text style={styles.propertyTitle}>
                    {selectedProperty.id === 'prop-1' ? 'Downtown Austin Office' :
                     selectedProperty.id === 'prop-2' ? 'South Austin Retail Center' :
                     'East Austin Industrial Complex'}
                  </Text>
                  <Text style={styles.propertySubtitle}>
                    {selectedProperty.squareFootage?.toLocaleString()} sq ft • {selectedProperty.floors} floors
                  </Text>
                </View>
                <View style={styles.cervScore}>
                  <View style={styles.scoreContainer}>
                    <Text style={[styles.scoreNumber, { color: getScoreColor(currentScore.overall) }]}>
                      {currentScore.overall}
                    </Text>
                    <Text style={styles.scoreLabel}>Cerv Score</Text>
                  </View>
                  <View style={styles.scoreTrend}>
                    {getTrendIcon(currentScore.trend)}
                    <Text style={styles.trendText}>
                      {currentScore.monthlyDelta > 0 ? '+' : ''}{currentScore.monthlyDelta}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.scoreBreakdown}>
                {[
                  { key: 'maintenance', label: 'Maintenance', value: currentScore.maintenance },
                  { key: 'cleanliness', label: 'Cleanliness', value: currentScore.cleanliness },
                  { key: 'landscaping', label: 'Landscaping', value: currentScore.landscaping },
                  { key: 'security', label: 'Security', value: currentScore.security },
                ].map((item) => (
                  <View key={item.key} style={styles.scoreItem}>
                    <Text style={styles.scoreItemLabel}>{item.label}</Text>
                    <View style={styles.scoreBar}>
                      <View 
                        style={[
                          styles.scoreBarFill,
                          { 
                            width: `${item.value}%`,
                            backgroundColor: getScoreColor(item.value)
                          }
                        ]} 
                      />
                    </View>
                    <Text style={[styles.scoreItemValue, { color: getScoreColor(item.value) }]}>
                      {item.value}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <View style={styles.actionGrid}>
                <TouchableOpacity style={styles.actionCard} onPress={handleReportIssue}>
                  <View style={styles.actionCardBackground}>
                    <View style={styles.actionIcon}>
                      <Camera color={CommercialColors.systemRed} size={24} />
                    </View>
                    <Text style={styles.actionTitle}>Report Issue</Text>
                    <Text style={styles.actionDescription}>
                      Photo + instant quote
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionCard} onPress={handleRequestWork}>
                  <View style={styles.actionCardBackground}>
                    <View style={styles.actionIcon}>
                      <Plus color={CommercialColors.systemBlue} size={24} />
                    </View>
                    <Text style={styles.actionTitle}>Request Work</Text>
                    <Text style={styles.actionDescription}>
                      Additional services
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/(tabs)/chat')}>
                  <View style={styles.actionCardBackground}>
                    <View style={styles.actionIcon}>
                      <MessageSquare color={CommercialColors.systemPurple} size={24} />
                    </View>
                    <Text style={styles.actionTitle}>Chat Support</Text>
                    <Text style={styles.actionDescription}>
                      Account manager
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/(tabs)/reports')}>
                  <View style={styles.actionCardBackground}>
                    <View style={styles.actionIcon}>
                      <Calendar color={CommercialColors.systemOrange} size={24} />
                    </View>
                    <Text style={styles.actionTitle}>View Reports</Text>
                    <Text style={styles.actionDescription}>
                      Monthly dashboard
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Recent Activity */}
            <View style={styles.recentActivity}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                <TouchableOpacity>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.activityList}>
                {[
                  {
                    id: '1',
                    type: 'service',
                    title: 'Pool Service Completed',
                    property: 'Downtown Austin Office',
                    time: '2 hours ago',
                    icon: <Building2 color={CommercialColors.systemBlue} size={16} />,
                  },
                  {
                    id: '2',
                    type: 'issue',
                    title: 'Pest Control Issue Reported',
                    property: 'South Austin Retail Center',
                    time: '4 hours ago',
                    icon: <AlertTriangle color={CommercialColors.systemOrange} size={16} />,
                  },
                  {
                    id: '3',
                    type: 'user',
                    title: 'New team member added',
                    property: 'East Austin Industrial Complex',
                    time: '1 day ago',
                    icon: <Users color={CommercialColors.systemPurple} size={16} />,
                  },
                ].map((activity) => (
                  <TouchableOpacity key={activity.id} style={styles.activityItem}>
                    <View style={styles.activityItemBackground}>
                      <View style={styles.activityIcon}>
                        {activity.icon}
                      </View>
                      <View style={styles.activityContent}>
                        <Text style={styles.activityTitle}>{activity.title}</Text>
                        <Text style={styles.activityProperty}>{activity.property}</Text>
                        <Text style={styles.activityTime}>{activity.time}</Text>
                      </View>
                      <ChevronRight color={CommercialColors.tertiaryLabel} size={16} />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.bottomSpacing} />
          </ScrollView>
        </SafeAreaView>
      </View>

      {/* Open Issues Modal */}
      <Modal
        visible={showIssuesModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Open Issues</Text>
            <TouchableOpacity onPress={() => setShowIssuesModal(false)}>
              <X color={CommercialColors.label} size={24} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            {MOCK_OPEN_ISSUES.map((issue) => (
              <TouchableOpacity key={issue.id} style={styles.issueCard}>
                <View style={styles.issueCardContent}>
                  <View style={styles.issueHeader}>
                    <View style={[
                      styles.priorityIndicator,
                      { backgroundColor: getPriorityColor(issue.priority) }
                    ]} />
                    <Text style={styles.issueTitle}>{issue.title}</Text>
                  </View>
                  
                  <Text style={styles.issueProperty}>{issue.property}</Text>
                  <Text style={styles.issueCategory}>{issue.category}</Text>
                  <Text style={styles.issueDescription}>{issue.description}</Text>
                  
                  <View style={styles.issueFooter}>
                    <Text style={styles.issueDate}>
                      Reported: {new Date(issue.reportedDate).toLocaleDateString()}
                    </Text>
                    <View style={[
                      styles.priorityBadge,
                      { backgroundColor: getPriorityColor(issue.priority) + '20' }
                    ]}>
                      <Text style={[
                        styles.priorityText,
                        { color: getPriorityColor(issue.priority) }
                      ]}>
                        {issue.priority.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommercialColors.background,
  },
  backgroundView: {
    flex: 1,
    backgroundColor: CommercialColors.background,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: CommercialSpacing.xxl,
    paddingVertical: CommercialSpacing.xl,
    borderBottomWidth: 0.5,
    borderBottomColor: CommercialColors.separator,
    backgroundColor: CommercialColors.background,
  },
  brandSection: {
    flex: 1,
    gap: 8,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CommercialSpacing.sm,
  },
  logoText: {
    ...CommercialTypography.title3,
    color: CommercialColors.label,
  },
  welcomeText: {
    ...CommercialTypography.caption1,
    color: CommercialColors.secondaryLabel,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: CommercialColors.secondarySystemFill,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: CommercialColors.separator,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: CommercialColors.systemRed,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  portfolioOverview: {
    marginBottom: 32,
  },
  sectionTitle: {
    ...CommercialTypography.title2,
    color: CommercialColors.label,
    marginBottom: 16,
  },
  portfolioStats: {
    flexDirection: 'row',
    gap: 8,
  },
  statCard: {
    flex: 1,
    borderRadius: CommercialBorderRadius.large,
    overflow: 'hidden',
  },
  statCardBackground: {
    backgroundColor: CommercialColors.cardBackground,
    padding: CommercialSpacing.md,
    borderWidth: 0.5,
    borderColor: CommercialColors.separator,
    borderRadius: CommercialBorderRadius.large,
    ...CommercialShadows.card,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statValue: {
    ...CommercialTypography.title3,
    color: CommercialColors.label,
  },
  statLabel: {
    ...CommercialTypography.caption1,
    color: CommercialColors.tertiaryLabel,
    textAlign: 'center',
    fontSize: 11,
  },
  propertySelector: {
    marginBottom: 32,
  },
  propertyScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  propertyCard: {
    width: 200,
    marginRight: 12,
    borderRadius: CommercialBorderRadius.large,
    overflow: 'hidden',
  },
  propertyCardSelected: {},
  propertyCardBackground: {
    backgroundColor: CommercialColors.cardBackground,
    padding: CommercialSpacing.lg,
    borderWidth: 0.5,
    borderColor: CommercialColors.separator,
    borderRadius: CommercialBorderRadius.large,
  },
  propertyCardSelectedBackground: {
    backgroundColor: CommercialColors.systemBlue,
  },
  propertyName: {
    ...CommercialTypography.headline,
    color: CommercialColors.label,
    marginBottom: 4,
  },
  propertyNameSelected: {
    color: CommercialColors.white,
  },
  propertyAddress: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.secondaryLabel,
    marginBottom: 8,
  },
  propertyAddressSelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  propertyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  propertyType: {
    ...CommercialTypography.caption1,
    fontWeight: '600',
    color: CommercialColors.tertiaryLabel,
  },
  propertyTypeSelected: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  propertyScore: {
    backgroundColor: CommercialColors.secondarySystemFill,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  scoreValue: {
    ...CommercialTypography.caption1,
    fontWeight: '700',
  },
  propertyDetails: {
    backgroundColor: CommercialColors.cardBackground,
    borderRadius: CommercialBorderRadius.extraLarge,
    padding: CommercialSpacing.xxl,
    marginBottom: 32,
    borderWidth: 0.5,
    borderColor: CommercialColors.separator,
    ...CommercialShadows.card,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  propertyInfo: {
    flex: 1,
  },
  propertyTitle: {
    ...CommercialTypography.title3,
    color: CommercialColors.label,
    marginBottom: 4,
  },
  propertySubtitle: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.secondaryLabel,
  },
  cervScore: {
    alignItems: 'flex-end',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreNumber: {
    ...CommercialTypography.title1,
    fontWeight: '700',
  },
  scoreLabel: {
    ...CommercialTypography.caption1,
    color: CommercialColors.tertiaryLabel,
  },
  scoreTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    ...CommercialTypography.caption1,
    fontWeight: '600',
    color: CommercialColors.systemBlue,
  },
  scoreBreakdown: {
    gap: 16,
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  scoreItemLabel: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.label,
    width: 100,
  },
  scoreBar: {
    flex: 1,
    height: 6,
    backgroundColor: CommercialColors.systemGray5,
    borderRadius: 3,
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  scoreItemValue: {
    ...CommercialTypography.subheadline,
    fontWeight: '600',
    width: 30,
    textAlign: 'right',
  },
  quickActions: {
    marginBottom: 32,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '48%',
    borderRadius: CommercialBorderRadius.large,
    overflow: 'hidden',
  },
  actionCardBackground: {
    backgroundColor: CommercialColors.cardBackground,
    padding: CommercialSpacing.lg,
    borderWidth: 0.5,
    borderColor: CommercialColors.separator,
    borderRadius: CommercialBorderRadius.large,
    alignItems: 'center',
    ...CommercialShadows.card,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: CommercialColors.secondarySystemFill,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    ...CommercialTypography.headline,
    color: CommercialColors.label,
    marginBottom: 4,
    textAlign: 'center',
  },
  actionDescription: {
    ...CommercialTypography.caption1,
    color: CommercialColors.secondaryLabel,
    textAlign: 'center',
  },
  recentActivity: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    ...CommercialTypography.subheadline,
    fontWeight: '600',
    color: CommercialColors.systemBlue,
  },
  activityList: {
    gap: 8,
  },
  activityItem: {
    borderRadius: CommercialBorderRadius.medium,
    overflow: 'hidden',
  },
  activityItemBackground: {
    backgroundColor<boltArtifact id="enhanced-interactions" title="Enhanced App Interactions and Click-throughs">