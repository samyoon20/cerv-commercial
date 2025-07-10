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
import { FileText, Download, Calendar, TrendingUp, Building2, DollarSign, TriangleAlert as AlertTriangle, ChevronRight } from 'lucide-react-native';
import { CommercialColors, CommercialShadows, CommercialSpacing, CommercialTypography, CommercialBorderRadius } from '@/themes/commercialDesignSystem';
import type { MonthlyReport } from '@/types/commercial';

const MOCK_REPORTS: MonthlyReport[] = [
  {
    id: 'report-1',
    portfolioId: 'portfolio-1',
    month: '2024-01',
    summary: {
      totalVisits: 45,
      completedServices: 42,
      openIssues: 3,
      totalSpend: 12500,
      cervScoreChange: 3,
    },
    propertyBreakdown: {
      'prop-1': {
        visits: 18,
        services: 17,
        issues: 1,
        spend: 5200,
        cervScore: 87,
      },
      'prop-2': {
        visits: 15,
        services: 14,
        issues: 1,
        spend: 3800,
        cervScore: 82,
      },
      'prop-3': {
        visits: 12,
        services: 11,
        issues: 1,
        spend: 3500,
        cervScore: 86,
      },
    },
    serviceBreakdown: {
      'HVAC Maintenance': { count: 12, cost: 4800 },
      'Cleaning Services': { count: 18, cost: 3600 },
      'Landscaping': { count: 8, cost: 2400 },
      'Security Systems': { count: 4, cost: 1700 },
    },
    createdAt: '2024-02-01T00:00:00Z',
    exportUrl: 'https://example.com/reports/january-2024.pdf',
  },
  {
    id: 'report-2',
    portfolioId: 'portfolio-1',
    month: '2023-12',
    summary: {
      totalVisits: 38,
      completedServices: 36,
      openIssues: 2,
      totalSpend: 11200,
      cervScoreChange: 1,
    },
    propertyBreakdown: {
      'prop-1': {
        visits: 16,
        services: 15,
        issues: 1,
        spend: 4800,
        cervScore: 84,
      },
      'prop-2': {
        visits: 12,
        services: 12,
        issues: 0,
        spend: 3200,
        cervScore: 82,
      },
      'prop-3': {
        visits: 10,
        services: 9,
        issues: 1,
        spend: 3200,
        cervScore: 84,
      },
    },
    serviceBreakdown: {
      'HVAC Maintenance': { count: 10, cost: 4000 },
      'Cleaning Services': { count: 15, cost: 3000 },
      'Landscaping': { count: 6, cost: 1800 },
      'Security Systems': { count: 5, cost: 2400 },
    },
    createdAt: '2024-01-01T00:00:00Z',
    exportUrl: 'https://example.com/reports/december-2023.pdf',
  },
];

export default function ReportsTab() {
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

  const handleExportReport = (report: MonthlyReport) => {
    Alert.alert('Export Report', `Exporting ${report.month} report as PDF...`);
  };

  const handleViewDetails = (reportId: string) => {
    Alert.alert('Report Details', `Viewing detailed report for ${reportId}`);
  };

  const getScoreColor = (change: number) => {
    if (change > 0) return CommercialColors.systemBlue;
    if (change < 0) return CommercialColors.systemRed;
    return CommercialColors.systemGray;
  };

  const getScoreIcon = (change: number) => {
    if (change > 0) return <TrendingUp color={CommercialColors.systemBlue} size={16} />;
    if (change < 0) return <TrendingUp color={CommercialColors.systemRed} size={16} style={{ transform: [{ rotate: '180deg' }] }} />;
    return <TrendingUp color={CommercialColors.systemGray} size={16} style={{ transform: [{ rotate: '90deg' }] }} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundView}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Reports & Analytics</Text>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Period Selector */}
            <View style={styles.periodSelector}>
              <Text style={styles.sectionTitle}>Report Period</Text>
              <View style={styles.periodTabs}>
                {[
                  { id: 'monthly', label: 'Monthly' },
                  { id: 'quarterly', label: 'Quarterly' },
                  { id: 'yearly', label: 'Yearly' },
                ].map((period) => (
                  <TouchableOpacity
                    key={period.id}
                    style={[
                      styles.periodTab,
                      selectedPeriod === period.id && styles.periodTabActive
                    ]}
                    onPress={() => setSelectedPeriod(period.id as any)}
                  >
                    <Text style={[
                      styles.periodTabText,
                      selectedPeriod === period.id && styles.periodTabTextActive
                    ]}>
                      {period.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Reports List */}
            <View style={styles.reportsList}>
              <Text style={styles.sectionTitle}>Available Reports</Text>
              
              {MOCK_REPORTS.map((report) => (
                <View key={report.id} style={styles.reportCard}>
                  <View style={styles.reportCardBackground}>
                    <View style={styles.reportHeader}>
                      <View style={styles.reportInfo}>
                        <View style={styles.reportTitleRow}>
                          <FileText color={CommercialColors.systemBlue} size={20} />
                          <Text style={styles.reportTitle}>
                            {new Date(report.month + '-01').toLocaleDateString('en-US', {
                              month: 'long',
                              year: 'numeric'
                            })} Report
                          </Text>
                        </View>
                        <Text style={styles.reportDate}>
                          Generated {new Date(report.createdAt).toLocaleDateString()}
                        </Text>
                      </View>
                      
                      <TouchableOpacity 
                        style={styles.exportButton}
                        onPress={() => handleExportReport(report)}
                      >
                        <Download color={CommercialColors.systemBlue} size={18} />
                      </TouchableOpacity>
                    </View>

                    {/* Summary Stats */}
                    <View style={styles.summaryStats}>
                      <View style={styles.statItem}>
                        <View style={styles.statIcon}>
                          <Calendar color={CommercialColors.systemBlue} size={16} />
                        </View>
                        <View style={styles.statContent}>
                          <Text style={styles.statValue}>{report.summary.totalVisits}</Text>
                          <Text style={styles.statLabel}>Total Visits</Text>
                        </View>
                      </View>

                      <View style={styles.statItem}>
                        <View style={styles.statIcon}>
                          <Building2 color={CommercialColors.systemPurple} size={16} />
                        </View>
                        <View style={styles.statContent}>
                          <Text style={styles.statValue}>{report.summary.completedServices}</Text>
                          <Text style={styles.statLabel}>Services</Text>
                        </View>
                      </View>

                      <View style={styles.statItem}>
                        <View style={styles.statIcon}>
                          <AlertTriangle color={CommercialColors.systemOrange} size={16} />
                        </View>
                        <View style={styles.statContent}>
                          <Text style={styles.statValue}>{report.summary.openIssues}</Text>
                          <Text style={styles.statLabel}>Open Issues</Text>
                        </View>
                      </View>

                      <View style={styles.statItem}>
                        <View style={styles.statIcon}>
                          <DollarSign color={CommercialColors.systemBlue} size={16} />
                        </View>
                        <View style={styles.statContent}>
                          <Text style={styles.statValue}>${(report.summary.totalSpend / 1000).toFixed(0)}K</Text>
                          <Text style={styles.statLabel}>Total Spend</Text>
                        </View>
                      </View>
                    </View>

                    {/* Cerv Score Change */}
                    <View style={styles.scoreChange}>
                      <View style={styles.scoreChangeContent}>
                        {getScoreIcon(report.summary.cervScoreChange)}
                        <Text style={styles.scoreChangeLabel}>Cerv Score Change:</Text>
                        <Text style={[
                          styles.scoreChangeValue,
                          { color: getScoreColor(report.summary.cervScoreChange) }
                        ]}>
                          {report.summary.cervScoreChange > 0 ? '+' : ''}{report.summary.cervScoreChange}
                        </Text>
                      </View>
                    </View>

                    {/* Property Breakdown Preview */}
                    <View style={styles.propertyBreakdown}>
                      <Text style={styles.breakdownTitle}>Property Performance</Text>
                      {Object.entries(report.propertyBreakdown).slice(0, 2).map(([propertyId, data]) => {
                        const propertyName = propertyId === 'prop-1' ? 'Downtown Office Tower' :
                                           propertyId === 'prop-2' ? 'Westside Retail Center' :
                                           'Industrial Park Unit A';
                        
                        return (
                          <View key={propertyId} style={styles.propertyItem}>
                            <Text style={styles.propertyName}>{propertyName}</Text>
                            <View style={styles.propertyStats}>
                              <Text style={styles.propertyStatText}>
                                {data.services} services • ${(data.spend / 1000).toFixed(1)}K
                              </Text>
                              <Text style={[
                                styles.propertyScore,
                                { color: getScoreColor(data.cervScore - 80) }
                              ]}>
                                Score: {data.cervScore}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                    </View>

                    {/* View Details Button */}
                    <TouchableOpacity 
                      style={styles.viewDetailsButton}
                      onPress={() => handleViewDetails(report.id)}
                    >
                      <View style={styles.viewDetailsBackground}>
                        <Text style={styles.viewDetailsText}>View Full Report</Text>
                        <ChevronRight color={CommercialColors.systemBlue} size={16} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              
              <TouchableOpacity style={styles.actionCard}>
                <View style={styles.actionCardBackground}>
                  <View style={styles.actionIcon}>
                    <FileText color={CommercialColors.systemPurple} size={24} />
                  </View>
                  <View style={styles.actionContent}>
                    <Text style={styles.actionTitle}>Custom Report</Text>
                    <Text style={styles.actionDescription}>
                      Generate a custom report for specific properties or date ranges
                    </Text>
                  </View>
                  <ChevronRight color={CommercialColors.tertiaryLabel} size={16} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionCard}>
                <View style={styles.actionCardBackground}>
                  <View style={styles.actionIcon}>
                    <TrendingUp color={CommercialColors.systemBlue} size={24} />
                  </View>
                  <View style={styles.actionContent}>
                    <Text style={styles.actionTitle}>Analytics Dashboard</Text>
                    <Text style={styles.actionDescription}>
                      View detailed analytics and trends across your portfolio
                    </Text>
                  </View>
                  <ChevronRight color={CommercialColors.tertiaryLabel} size={16} />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.bottomSpacing} />
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
    paddingHorizontal: CommercialSpacing.xxl,
    paddingVertical: CommercialSpacing.xl,
    borderBottomWidth: 0.5,
    borderBottomColor: CommercialColors.separator,
    backgroundColor: CommercialColors.background,
  },
  headerTitle: {
    ...CommercialTypography.title2,
    color: CommercialColors.label,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  periodSelector: {
    marginBottom: 32,
  },
  sectionTitle: {
    ...CommercialTypography.title2,
    color: CommercialColors.label,
    marginBottom: 16,
  },
  periodTabs: {
    flexDirection: 'row',
    backgroundColor: CommercialColors.systemGray5,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: CommercialColors.separator,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  periodTabActive: {
    backgroundColor: CommercialColors.systemBlue,
  },
  periodTabText: {
    ...CommercialTypography.subheadline,
    fontWeight: '600',
    color: CommercialColors.secondaryLabel,
  },
  periodTabTextActive: {
    color: CommercialColors.white,
  },
  reportsList: {
    marginBottom: 32,
  },
  reportCard: {
    borderRadius: CommercialBorderRadius.extraLarge,
    overflow: 'hidden',
    marginBottom: 16,
  },
  reportCardBackground: {
    backgroundColor: CommercialColors.cardBackground,
    padding: CommercialSpacing.xxl,
    borderWidth: 0.5,
    borderColor: CommercialColors.separator,
    borderRadius: CommercialBorderRadius.extraLarge,
    ...CommercialShadows.card,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  reportTitle: {
    ...CommercialTypography.title3,
    color: CommercialColors.label,
  },
  reportDate: {
    ...CommercialTypography.caption1,
    color: CommercialColors.tertiaryLabel,
  },
  exportButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CommercialColors.systemBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: CommercialColors.systemBlue,
  },
  summaryStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    gap: 8,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: CommercialColors.secondarySystemFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    ...CommercialTypography.headline,
    color: CommercialColors.label,
    marginBottom: 2,
  },
  statLabel: {
    ...CommercialTypography.caption1,
    color: CommercialColors.tertiaryLabel,
  },
  scoreChange: {
    backgroundColor: CommercialColors.secondarySystemFill,
    borderRadius: CommercialBorderRadius.medium,
    padding: CommercialSpacing.md,
    marginBottom: 20,
  },
  scoreChangeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scoreChangeLabel: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.label,
    flex: 1,
  },
  scoreChangeValue: {
    ...CommercialTypography.headline,
    fontWeight: '700',
  },
  propertyBreakdown: {
    marginBottom: 20,
  },
  breakdownTitle: {
    ...CommercialTypography.headline,
    color: CommercialColors.label,
    marginBottom: 12,
  },
  propertyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: CommercialColors.separator,
  },
  propertyName: {
    ...CommercialTypography.subheadline,
    fontWeight: '600',
    color: CommercialColors.label,
    flex: 1,
  },
  propertyStats: {
    alignItems: 'flex-end',
  },
  propertyStatText: {
    ...CommercialTypography.caption1,
    color: CommercialColors.secondaryLabel,
    marginBottom: 2,
  },
  propertyScore: {
    ...CommercialTypography.caption1,
    fontWeight: '600',
  },
  viewDetailsButton: {
    borderRadius: CommercialBorderRadius.medium,
    overflow: 'hidden',
  },
  viewDetailsBackground: {
    backgroundColor: CommercialColors.systemBlueLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: CommercialSpacing.md,
    paddingHorizontal: CommercialSpacing.lg,
    borderRadius: CommercialBorderRadius.medium,
    borderWidth: 1,
    borderColor: CommercialColors.systemBlue,
    gap: CommercialSpacing.sm,
  },
  viewDetailsText: {
    ...CommercialTypography.subheadline,
    fontWeight: '600',
    color: CommercialColors.systemBlue,
  },
  quickActions: {
    marginBottom: 32,
  },
  actionCard: {
    borderRadius: CommercialBorderRadius.large,
    overflow: 'hidden',
    marginBottom: 12,
  },
  actionCardBackground: {
    backgroundColor: CommercialColors.cardBackground,
    flexDirection: 'row',
    alignItems: 'center',
    padding: CommercialSpacing.lg,
    borderWidth: 0.5,
    borderColor: CommercialColors.separator,
    borderRadius: CommercialBorderRadius.large,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CommercialColors.secondarySystemFill,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    ...CommercialTypography.headline,
    color: CommercialColors.label,
    marginBottom: 2,
  },
  actionDescription: {
    ...CommercialTypography.caption1,
    color: CommercialColors.secondaryLabel,
  },
  bottomSpacing: {
    height: CommercialSpacing.xl,
  },
});