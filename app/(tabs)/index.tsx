import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Building2, Plus, Bell, Settings, TrendingUp, TriangleAlert as AlertTriangle, Calendar, DollarSign, Camera, MessageSquare, ChevronRight, Users } from 'lucide-react-native';
import { CommercialColors, CommercialShadows, CommercialSpacing, CommercialTypography, CommercialBorderRadius } from '@/themes/commercialDesignSystem';
import type { CommercialProperty, CommercialPortfolio, CommercialCervScore, CommercialUserRole } from '@/types/commercial';

const MOCK_PORTFOLIO: CommercialPortfolio = {
  id: 'portfolio-1',
  userId: 'user-1',
  companyName: 'Austin Commercial Properties',
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

export default function DashboardTab() {
  const [selectedProperty, setSelectedProperty] = useState<CommercialProperty>(MOCK_PORTFOLIO.properties[0]);
  const [currentUserRole] = useState<CommercialUserRole>('property_manager');

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
    Alert.alert('Notifications', 'No new notifications at this time.');
  };

  const handleSettings = () => {
    Alert.alert('Settings', 'Settings panel will be available soon.');
  };

  const handleOpenIssuesClick = () => {
    Alert.alert(
      'Open Issues',
      `You have ${MOCK_PORTFOLIO.totalOpenIssues} open issues:\n\n• HVAC maintenance needed at Downtown Austin Office\n• Pool cleaning overdue at South Austin Retail Center\n• Landscape trimming required at East Austin Industrial\n• Pest control follow-up needed`,
      [
        { text: 'View All Issues', onPress: () => router.push('/report-issue') },
        { text: 'OK', style: 'cancel' }
      ]
    );
  };

  const currentScore = MOCK_CERV_SCORES[selectedProperty.id];

  const getScoreColor = (score: number) => {
    if (score >= 85) return CommercialColors.systemBlue;
    if (score >= 70) return CommercialColors.systemOrange;
    return CommercialColors.systemRed;
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
                <View style={styles.notificationDot} />
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
                
                <View style={styles.statCard}>
                  <View style={styles.statCardBackground}>
                    <View style={styles.statHeader}>
                      <TouchableOpacity onPress={handleOpenIssuesClick}>
                        <AlertTriangle color={CommercialColors.systemOrange} size={20} />
                      </TouchableOpacity>
                      <Text style={styles.statValue}>{MOCK_PORTFOLIO.totalOpenIssues}</Text>
                    </View>
                    <Text style={styles.statLabel}>Open Issues</Text>
                  </View>
                </View>
                
                <View style={styles.statCard}>
                  <View style={styles.statCardBackground}>
                    <View style={styles.statHeader}>
                      <DollarSign color={CommercialColors.systemBlue} size={20} />
                      <Text style={[styles.statValue, styles.smallerStatValue]}>${(MOCK_PORTFOLIO.monthlySpend / 1000).toFixed(0)}K</Text>
                    </View>
                    <Text style={styles.statLabel}>Monthly</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Property Selector */}
            <View style={styles.propertySelector}>
              <Text style={styles.sectionTitle}>Select Property</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.propertyScrollView}>
                {MOCK_PORTFOLIO.properties.map((property) => (
                  <TouchableOpacity
                    key={property.id}
                    style={[
                      styles.propertyCard,
                      selectedProperty.id === property.id && styles.propertyCardSelected
                    ]}
                    onPress={() => handlePropertySelect(property)}
                  >
                    <View style={[
                      styles.propertyCardContent,
                      selectedProperty.id === property.id && styles.propertyCardContentSelected
                    ]}>
                      <Text style={[
                        styles.propertyName,
                        selectedProperty.id === property.id && styles.propertyNameSelected
                      ]}>
                        {property.name}
                      </Text>
                      <Text style={[
                        styles.propertyAddress,
                        selectedProperty.id === property.id && styles.propertyAddressSelected
                      ]}>
                        {property.address}
                      </Text>
                      <Text style={[
                        styles.propertyType,
                        selectedProperty.id === property.id && styles.propertyTypeSelected
                      ]}>
                        {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)} • {property.squareFootage.toLocaleString()} sq ft
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Current Property Score */}
            <View style={styles.scoreSection}>
              <Text style={styles.sectionTitle}>Current Property Score</Text>
              <View style={styles.scoreCard}>
                <View style={styles.scoreCardBackground}>
                  <View style={styles.scoreHeader}>
                    <View style={styles.scoreMainInfo}>
                      <Text style={styles.scoreValue}>{currentScore.overall}</Text>
                      <View style={styles.scoreTrend}>
                        {getTrendIcon(currentScore.trend)}
                        <Text style={[styles.scoreTrendText, { color: getScoreColor(currentScore.overall) }]}>
                          {currentScore.monthlyDelta > 0 ? '+' : ''}{currentScore.monthlyDelta}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.scoreLabel}>Overall Score</Text>
                  </View>
                  
                  <View style={styles.scoreBreakdown}>
                    <View style={styles.scoreRow}>
                      <Text style={styles.scoreCategory}>Maintenance</Text>
                      <Text style={styles.scoreCategoryValue}>{currentScore.maintenance}</Text>
                    </View>
                    <View style={styles.scoreRow}>
                      <Text style={styles.scoreCategory}>Cleanliness</Text>
                      <Text style={styles.scoreCategoryValue}>{currentScore.cleanliness}</Text>
                    </View>
                    <View style={styles.scoreRow}>
                      <Text style={styles.scoreCategory}>Landscaping</Text>
                      <Text style={styles.scoreCategoryValue}>{currentScore.landscaping}</Text>
                    </View>
                    <View style={styles.scoreRow}>
                      <Text style={styles.scoreCategory}>Security</Text>
                      <Text style={styles.scoreCategoryValue}>{currentScore.security}</Text>
                    </View>
                    <View style={styles.scoreRow}>
                      <Text style={styles.scoreCategory}>Efficiency</Text>
                      <Text style={styles.scoreCategoryValue}>{currentScore.efficiency}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <View style={styles.actionGrid}>
                <TouchableOpacity style={styles.actionCard} onPress={handleReportIssue}>
                  <View style={styles.actionCardBackground}>
                    <View style={styles.actionIconContainer}>
                      <AlertTriangle color={CommercialColors.systemRed} size={24} />
                    </View>
                    <Text style={styles.actionTitle}>Report Issue</Text>
                    <Text style={styles.actionSubtitle}>Submit maintenance requests</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionCard} onPress={handleRequestWork}>
                  <View style={styles.actionCardBackground}>
                    <View style={styles.actionIconContainer}>
                      <Plus color={CommercialColors.systemBlue} size={24} />
                    </View>
                    <Text style={styles.actionTitle}>Request Work</Text>
                    <Text style={styles.actionSubtitle}>Schedule services</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/(tabs)/reports')}>
                  <View style={styles.actionCardBackground}>
                    <View style={styles.actionIconContainer}>
                      <TrendingUp color={CommercialColors.systemBlue} size={24} />
                    </View>
                    <Text style={styles.actionTitle}>View Reports</Text>
                    <Text style={styles.actionSubtitle}>Analytics & insights</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/(tabs)/chat')}>
                  <View style={styles.actionCardBackground}>
                    <View style={styles.actionIconContainer}>
                      <Building2 color={CommercialColors.systemBlue} size={24} />
                    </View>
                    <Text style={styles.actionTitle}>Property Details</Text>
                    <Text style={styles.actionSubtitle}>View property info</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Recent Activity */}
            <View style={styles.recentActivity}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <View style={styles.activityList}>
                <View style={styles.activityItem}>
                  <View style={styles.activityItemBackground}>
                    <View style={styles.activityIcon}>
                      <Calendar color={CommercialColors.systemBlue} size={16} />
                    </View>
                    <View style={styles.activityContent}>
                      <Text style={styles.activityTitle}>Pool cleaning completed</Text>
                      <Text style={styles.activitySubtitle}>South Austin Retail Center • 2 hours ago</Text>
                    </View>
                    <ChevronRight color={CommercialColors.tertiaryLabel} size={16} />
                  </View>
                </View>

                <View style={styles.activityItem}>
                  <View style={styles.activityItemBackground}>
                    <View style={styles.activityIcon}>
                      <Users color={CommercialColors.systemOrange} size={16} />
                    </View>
                    <View style={styles.activityContent}>
                      <Text style={styles.activityTitle}>Pest control scheduled</Text>
                      <Text style={styles.activitySubtitle}>Downtown Austin Office • Tomorrow 9:00 AM</Text>
                    </View>
                    <ChevronRight color={CommercialColors.tertiaryLabel} size={16} />
                  </View>
                </View>

                <View style={styles.activityItem}>
                  <View style={styles.activityItemBackground}>
                    <View style={styles.activityIcon}>
                      <Camera color={CommercialColors.systemBlue} size={16} />
                    </View>
                    <View style={styles.activityContent}>
                      <Text style={styles.activityTitle}>Inspection photos uploaded</Text>
                      <Text style={styles.activitySubtitle}>East Austin Industrial • Yesterday</Text>
                    </View>
                    <ChevronRight color={CommercialColors.tertiaryLabel} size={16} />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
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
    paddingVertical: CommercialSpacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: CommercialColors.separator,
  },
  brandSection: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CommercialSpacing.sm,
    marginBottom: CommercialSpacing.xs,
  },
  logoText: {
    ...CommercialTypography.title3,
    color: CommercialColors.label,
    fontWeight: '700',
  },
  welcomeText: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.secondaryLabel,
  },
  headerActions: {
    flexDirection: 'row',
    gap: CommercialSpacing.sm,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CommercialColors.secondaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingHorizontal: CommercialSpacing.xxl,
  },
  portfolioOverview: {
    marginTop: CommercialSpacing.xl,
    marginBottom: CommercialSpacing.xxl,
  },
  sectionTitle: {
    ...CommercialTypography.title3,
    color: CommercialColors.label,
    marginBottom: CommercialSpacing.lg,
  },
  portfolioStats: {
    flexDirection: 'row',
    gap: CommercialSpacing.md,
  },
  statCard: {
    flex: 1,
    borderRadius: CommercialBorderRadius.large,
    overflow: 'hidden',
    ...CommercialShadows.small,
  },
  statCardBackground: {
    backgroundColor: CommercialColors.secondaryBackground,
    padding: CommercialSpacing.lg,
    borderWidth: 1,
    borderColor: CommercialColors.separator,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: CommercialSpacing.xs,
  },
  statValue: {
    ...CommercialTypography.title2,
    color: CommercialColors.label,
    fontWeight: '700'
  },
  smallerStatValue: {
    fontSize: 20,
  },
  statLabel: {
    ...CommercialTypography.caption1,
    color: CommercialColors.secondaryLabel,
  },
  propertySelector: {
    marginBottom: CommercialSpacing.xxl,
  },
  propertyScrollView: {
    flexGrow: 0,
  },
  propertyCard: {
    width: 280,
    marginRight: CommercialSpacing.md,
    borderRadius: CommercialBorderRadius.large,
    overflow: 'hidden',
    ...CommercialShadows.small,
  },
  propertyCardSelected: {
    ...CommercialShadows.medium,
  },
  propertyCardContent: {
    backgroundColor: CommercialColors.secondaryBackground,
    padding: CommercialSpacing.lg,
    borderWidth: 2,
    borderColor: CommercialColors.separator,
  },
  propertyName: {
    ...CommercialTypography.headline,
    color: CommercialColors.label,
    marginBottom: CommercialSpacing.xs,
  },
  propertyNameSelected: {
    color: CommercialColors.systemBlue,
  },
  propertyAddress: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.secondaryLabel,
    marginBottom: CommercialSpacing.xs,
  },
  propertyAddressSelected: {
    color: CommercialColors.systemBlueDark,
  },
  propertyType: {
    ...CommercialTypography.caption1,
    color: CommercialColors.tertiaryLabel,
  },
  propertyTypeSelected: {
    color: CommercialColors.systemBlue,
  },
  propertyCardContentSelected: {
    borderColor: CommercialColors.systemBlue,
  },
  scoreSection: {
    marginBottom: CommercialSpacing.xxl,
  },
  scoreCard: {
    borderRadius: CommercialBorderRadius.large,
    overflow: 'hidden',
    ...CommercialShadows.medium,
  },
  scoreCardBackground: {
    backgroundColor: CommercialColors.secondaryBackground,
    padding: CommercialSpacing.xl,
    borderWidth: 1,
    borderColor: CommercialColors.separator,
  },
  scoreHeader: {
    alignItems: 'center',
    marginBottom: CommercialSpacing.lg,
  },
  scoreMainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CommercialSpacing.sm,
    marginBottom: CommercialSpacing.xs,
  },
  scoreValue: {
    ...CommercialTypography.largeTitle,
    color: CommercialColors.label,
    fontWeight: '700',
  },
  scoreTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scoreTrendText: {
    ...CommercialTypography.caption1,
    fontWeight: '600',
  },
  scoreLabel: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.secondaryLabel,
  },
  scoreBreakdown: {
    gap: CommercialSpacing.sm,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    marginBottom: CommercialSpacing.sm,
  },
  scoreCategory: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.secondaryLabel,
    width: 100,
  },
  scoreCategoryValue: {
    ...CommercialTypography.headline,
    color: CommercialColors.label,
    fontWeight: '600',
    width: 30,
    textAlign: 'right',
  },
  scoreBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: CommercialColors.systemGray5,
    borderRadius: 4,
    marginHorizontal: CommercialSpacing.md,
    overflow: 'hidden',
  },
  scoreBar: {
    height: '100%',
    borderRadius: 4,
  },
  quickActions: {
    marginBottom: CommercialSpacing.xxl,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CommercialSpacing.md,
  },
  actionCard: {
    width: '48%',
    borderRadius: CommercialBorderRadius.large,
    overflow: 'hidden',
    ...CommercialShadows.small,
  },
  actionCardBackground: {
    backgroundColor: CommercialColors.secondaryBackground,
    padding: CommercialSpacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: CommercialColors.separator,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: CommercialColors.systemBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: CommercialSpacing.md,
  },
  actionTitle: {
    ...CommercialTypography.headline,
    color: CommercialColors.label,
    textAlign: 'center',
    marginBottom: CommercialSpacing.xs,
  },
  actionSubtitle: {
    ...CommercialTypography.caption1,
    color: CommercialColors.secondaryLabel,
    textAlign: 'center',
  },
  recentActivity: {
    marginBottom: CommercialSpacing.xxxl,
  },
  activityList: {
    gap: CommercialSpacing.sm,
  },
  activityItem: {
    borderRadius: CommercialBorderRadius.medium,
    overflow: 'hidden',
  },
  activityItemBackground: {
    backgroundColor: CommercialColors.secondaryBackground,
    flexDirection: 'row',
    alignItems: 'center',
    padding: CommercialSpacing.lg,
    gap: CommercialSpacing.md,
    borderWidth: 1,
    borderColor: CommercialColors.separator,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: CommercialColors.systemBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.label,
    marginBottom: 2,
  },
  activitySubtitle: {
    ...CommercialTypography.caption1,
    color: CommercialColors.secondaryLabel,
  },
});