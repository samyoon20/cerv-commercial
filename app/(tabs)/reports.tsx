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
import { FileText, Download, Calendar, TrendingUp, Building2, DollarSign, TriangleAlert as AlertTriangle, ChevronRight, X } from 'lucide-react-native';
import { CommercialColors, CommercialShadows, CommercialSpacing, CommercialTypography, CommercialBorderRadius } from '@/themes/commercialDesignSystem';
import type { MonthlyReport } from '@/types/commercial';

const MOCK_REPORTS: { [key: string]: MonthlyReport[] } = {
  monthly: [
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
        'Pest Services': { count: 12, cost: 2400 },
        'Pool Services': { count: 18, cost: 4500 },
        'Landscape Services': { count: 8, cost: 3200 },
        'Janitorial Services': { count: 4, cost: 2400 },
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
        'Pest Services': { count: 10, cost: 2000 },
        'Pool Services': { count: 15, cost: 3750 },
        'Landscape Services': { count: 6, cost: 2400 },
        'Janitorial Services': { count: 5, cost: 3050 },
      },
      createdAt: '2024-01-01T00:00:00Z',
      exportUrl: 'https://example.com/reports/december-2023.pdf',
    },
  ],
  quarterly: [
    {
      id: 'q-report-1',
      portfolioId: 'portfolio-1',
      month: '2024-Q1',
      summary: {
        totalVisits: 135,
        completedServices: 126,
        openIssues: 9,
        totalSpend: 37500,
        cervScoreChange: 8,
      },
      propertyBreakdown: {
        'prop-1': {
          visits: 54,
          services: 51,
          issues: 3,
          spend: 15600,
          cervScore: 87,
        },
        'prop-2': {
          visits: 45,
          services: 42,
          issues: 3,
          spend: 11400,
          cervScore: 82,
        },
        'prop-3': {
          visits: 36,
          services: 33,
          issues: 3,
          spend: 10500,
          cervScore: 86,
        },
      },
      serviceBreakdown: {
        'Pest Services': { count: 36, cost: 7200 },
        'Pool Services': { count: 54, cost: 13500 },
        'Landscape Services': { count: 24, cost: 9600 },
        'Janitorial Services': { count: 12, cost: 7200 },
      },
      createdAt: '2024-04-01T00:00:00Z',
      exportUrl: 'https://example.com/reports/q1-2024.pdf',
    },
  ],
  yearly: [
    {
      id: 'y-report-1',
      portfolioId: 'portfolio-1',
      month: '2023',
      summary: {
        totalVisits: 540,
        completedServices: 504,
        openIssues: 36,
        totalSpend: 150000,
        cervScoreChange: 15,
      },
      propertyBreakdown: {
        'prop-1': {
          visits: 216,
          services: 204,
          issues: 12,
          spend: 62400,
          cervScore: 87,
        },
        'prop-2': {
          visits: 180,
          services: 168,
          issues: 12,
          spend: 45600,
          cervScore: 82,
        },
        'prop-3': {
          visits: 144,
          services: 132,
          issues: 12,
          spend: 42000,
          cervScore: 86,
        },
      },
      serviceBreakdown: {
        'Pest Services': { count: 144, cost: 28800 },
        'Pool Services': { count: 216, cost: 54000 },
        'Landscape Services': { count: 96, cost: 38400 },
        'Janitorial Services': { count: 48, cost: 28800 },
      },
      createdAt: '2024-01-01T00:00:00Z',
      exportUrl: 'https://example.com/reports/2023-annual.pdf',
    },
  ],
};

export default function ReportsTab() {
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [selectedReport, setSelectedReport] = useState<MonthlyReport | null>(null);
  const [showFullReport, setShowFullReport] = useState(false);
  const [showCustomReport, setShowCustomReport] = useState(false);

  const handleExportReport = (report: MonthlyReport) => {
    Alert.alert('Export Report', `Exporting ${report.month} report as PDF...`);
  };

  const handleViewDetails = (report: MonthlyReport) => {
    setSelectedReport(report);
    setShowFullReport(true);
  };

  const handleCustomReport = () => {
    setShowCustomReport(true);
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

  const currentReports = MOCK_REPORTS[selectedPeriod] || [];

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
              
              {currentReports.map((report) => (
                <View key={report.id} style={styles.reportCard}>
                  <View style={styles.reportCardBackground}>
                    <View style={styles.reportHeader}>
                      <View style={styles.reportInfo}>
                        <View style={styles.reportTitleRow}>
                          <FileText color={CommercialColors.systemBlue} size={20} />
                          <Text style={styles.reportTitle}>
                            {selectedPeriod === 'yearly' 
                              ? `${report.month} Annual Report`
                              : selectedPeriod === 'quarterly'
                              ? `${report.month} Report`
                              : new Date(report.month + '-01').toLocaleDateString('en-US', {
                                  month: 'long',
                                  year: 'numeric'
                                }) + ' Report'
                            }
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

                    {/* View Details Button */}
                    <TouchableOpacity 
                      style={styles.viewDetailsButton}
                      onPress={() => handleViewDetails(report)}
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
              
              <TouchableOpacity style={styles.actionCard} onPress={handleCustomReport}>
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

      {/* Full Report Modal */}
      <Modal
        visible={showFullReport}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {selectedReport && (
                selectedPeriod === 'yearly' 
                  ? `${selectedReport.month} Annual Report`
                  : selectedPeriod === 'quarterly'
                  ? `${selectedReport.month} Report`
                  : new Date(selectedReport.month + '-01').toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric'
                    }) + ' Report'
              )}
            </Text>
            <TouchableOpacity onPress={() => setShowFullReport(false)}>
              <X color={CommercialColors.label} size={24} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            {selectedReport && (
              <>
                <View style={styles.fullReportSection}>
                  <Text style={styles.fullReportSectionTitle}>Executive Summary</Text>
                  <Text style={styles.fullReportText}>
                    This {selectedPeriod} report covers {selectedReport.summary.totalVisits} service visits across your portfolio, 
                    with {selectedReport.summary.completedServices} services completed successfully. 
                    Your Cerv Score improved by {selectedReport.summary.cervScoreChange} points, 
                    indicating strong property management performance.
                  </Text>
                </View>

                <View style={styles.fullReportSection}>
                  <Text style={styles.fullReportSectionTitle}>Property Performance</Text>
                  {Object.entries(selectedReport.propertyBreakdown).map(([propertyId, data]) => {
                    const propertyName = propertyId === 'prop-1' ? 'Downtown Austin Office' :
                                       propertyId === 'prop-2' ? 'South Austin Retail Center' :
                                       'East Austin Industrial Complex';
                    
                    return (
                      <View key={propertyId} style={styles.propertyBreakdownCard}>
                        <Text style={styles.propertyBreakdownName}>{propertyName}</Text>
                        <View style={styles.propertyBreakdownStats}>
                          <Text style={styles.propertyBreakdownStat}>Visits: {data.visits}</Text>
                          <Text style={styles.propertyBreakdownStat}>Services: {data.services}</Text>
                          <Text style={styles.propertyBreakdownStat}>Issues: {data.issues}</Text>
                          <Text style={styles.propertyBreakdownStat}>Spend: ${data.spend.toLocaleString()}</Text>
                          <Text style={styles.propertyBreakdownStat}>Score: {data.cervScore}</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>

                <View style={styles.fullReportSection}>
                  <Text style={styles.fullReportSectionTitle}>Service Breakdown</Text>
                  {Object.entries(selectedReport.serviceBreakdown).map(([service, data]) => (
                    <View key={service} style={styles.serviceBreakdownItem}>
                      <Text style={styles.serviceBreakdownName}>{service}</Text>
                      <Text style={styles.serviceBreakdownData}>
                        {data.count} services • ${data.cost.toLocaleString()}
                      </Text>
                    </View>
                  ))}
                </View>

                <View style={styles.fullReportSection}>
                  <Text style={styles.fullReportSectionTitle}>Recommendations</Text>
                  <Text style={styles.fullReportText}>
                    • Continue current maintenance schedule for optimal performance{'\n'}
                    • Consider increasing landscape service frequency during peak season{'\n'}
                    • Monitor pest control effectiveness in humid months{'\n'}
                    • Schedule quarterly deep cleaning for high-traffic areas
                  </Text>
                </View>
              </>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Custom Report Modal */}
      <Modal
        visible={showCustomReport}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Custom Report Builder</Text>
            <TouchableOpacity onPress={() => setShowCustomReport(false)}>
              <X color={CommercialColors.label} size={24} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.customReportSection}>
              <Text style={styles.customReportSectionTitle}>Date Range</Text>
              <View style={styles.customReportOptions}>
                <TouchableOpacity style={styles.customReportOption}>
                  <Text style={styles.customReportOptionText}>Last 30 Days</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.customReportOption}>
                  <Text style={styles.customReportOptionText}>Last 90 Days</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.customReportOption}>
                  <Text style={styles.customReportOptionText}>Custom Range</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.customReportSection}>
              <Text style={styles.customReportSectionTitle}>Properties</Text>
              <View style={styles.customReportOptions}>
                <TouchableOpacity style={styles.customReportOption}>
                  <Text style={styles.customReportOptionText}>All Properties</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.customReportOption}>
                  <Text style={styles.customReportOptionText}>Downtown Austin Office</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.customReportOption}>
                  <Text style={styles.customReportOptionText}>South Austin Retail Center</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.customReportSection}>
              <Text style={styles.customReportSectionTitle}>Services</Text>
              <View style={styles.customReportOptions}>
                <TouchableOpacity style={styles.customReportOption}>
                  <Text style={styles.customReportOptionText}>All Services</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.customReportOption}>
                  <Text style={styles.customReportOptionText}>Pest Services</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.customReportOption}>
                  <Text style={styles.customReportOptionText}>Pool Services</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.customReportOption}>
                  <Text style={styles.customReportOptionText}>Landscape Services</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.generateReportButton}>
              <Text style={styles.generateReportButtonText}>Generate Custom Report</Text>
            </TouchableOpacity>
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
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: CommercialColors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: CommercialColors.separator,
  },
  modalTitle: {
    ...CommercialTypography.title2,
    color: CommercialColors.label,
  },
  modalContent: {
    flex: 1,
    padding: 24,
  },
  fullReportSection: {
    marginBottom: 32,
  },
  fullReportSectionTitle: {
    ...CommercialTypography.title3,
    color: CommercialColors.label,
    marginBottom: 16,
  },
  fullReportText: {
    ...CommercialTypography.body,
    color: CommercialColors.secondaryLabel,
    lineHeight: 24,
  },
  propertyBreakdownCard: {
    backgroundColor: CommercialColors.cardBackground,
    borderRadius: CommercialBorderRadius.medium,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: CommercialColors.separator,
  },
  propertyBreakdownName: {
    ...CommercialTypography.headline,
    color: CommercialColors.label,
    marginBottom: 8,
  },
  propertyBreakdownStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  propertyBreakdownStat: {
    ...CommercialTypography.caption1,
    color: CommercialColors.secondaryLabel,
    backgroundColor: CommercialColors.secondarySystemFill,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  serviceBreakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: CommercialColors.separator,
  },
  serviceBreakdownName: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.label,
  },
  serviceBreakdownData: {
    ...CommercialTypography.caption1,
    color: CommercialColors.secondaryLabel,
  },
  customReportSection: {
    marginBottom: 32,
  },
  customReportSectionTitle: {
    ...CommercialTypography.headline,
    color: CommercialColors.label,
    marginBottom: 16,
  },
  customReportOptions: {
    gap: 8,
  },
  customReportOption: {
    backgroundColor: CommercialColors.cardBackground,
    borderRadius: CommercialBorderRadius.medium,
    padding: 16,
    borderWidth: 1,
    borderColor: CommercialColors.separator,
  },
  customReportOptionText: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.label,
  },
  generateReportButton: {
    backgroundColor: CommercialColors.systemBlue,
    borderRadius: CommercialBorderRadius.large,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  generateReportButtonText: {
    ...CommercialTypography.headline,
    color: CommercialColors.white,
  },
});