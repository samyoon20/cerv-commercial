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
              <Scroll
  )
}