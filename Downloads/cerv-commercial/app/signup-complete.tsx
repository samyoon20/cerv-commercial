import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircleCheck as CheckCircle, Calendar, Building2, DollarSign, Users } from 'lucide-react-native';
import { CommercialColors, CommercialTypography, CommercialBorderRadius, CommercialSpacing } from '@/themes/commercialDesignSystem';

export default function SignupCompleteScreen() {
  const { 
    propertyType, 
    squareFootage, 
    serviceIds, 
    frequencies, 
    monthlyTotal, 
    annualTotal,
    date,
    time
  } = useLocalSearchParams();

  const parsedServiceIds = (serviceIds as string).split(',');
  
  const handleGoToDashboard = () => {
    router.push('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundContainer}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.successSection}>
            <View style={styles.checkContainer}>
              <View style={styles.checkCircle}>
                <CheckCircle color="#ffffff" size={48} />
              </View>
              <View style={styles.checkRing} />
            </View>
            
            <Text style={styles.successTitle}>Sign-Up Complete!</Text>
            <Text style={styles.successSubtitle}>
              Your commercial property has been successfully registered with Cerv Commercial
            </Text>
          </View>

          <View style={styles.consultationCard}>
            <View style={styles.cardHeader}>
              <Calendar color={CommercialColors.systemBlue} size={24} />
              <Text style={styles.cardTitle}>Consultation Details</Text>
            </View>

            <View style={styles.detailsGrid}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date & Time</Text>
                <Text style={styles.detailValue}>
                  {new Date(date as string).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })} at {time}
                </Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Services</Text>
                <Text style={styles.detailValue}>
                  {parsedServiceIds.length} selected services
                </Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Property Type</Text>
                <Text style={styles.detailValue}>
                  {String(propertyType).replace('_', ' ').charAt(0).toUpperCase() + String(propertyType).replace('_', ' ').slice(1)}
                </Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Size</Text>
                <Text style={styles.detailValue}>
                  {Number(squareFootage).toLocaleString()} sq ft
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.quoteCard}>
            <View style={styles.cardHeader}>
              <DollarSign color={CommercialColors.systemBlue} size={24} />
              <Text style={styles.cardTitle}>Quote Summary</Text>
            </View>

            <View style={styles.detailsGrid}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Monthly Total</Text>
                <Text style={styles.detailValue}>${Number(monthlyTotal).toLocaleString()}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Annual Total</Text>
                <Text style={styles.detailValue}>${Number(annualTotal).toLocaleString()}</Text>
              </View>
              
              <View style={[styles.detailRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Estimated Value</Text>
                <Text style={styles.totalValue}>Excellent</Text>
              </View>
            </View>
          </View>

          <View style={styles.nextStepsCard}>
            <Text style={styles.nextStepsTitle}>What happens next?</Text>
            <View style={styles.stepsList}>
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <Text style={styles.stepText}>
                  You'll receive a confirmation email with your consultation details
                </Text>
              </View>
              
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <Text style={styles.stepText}>
                  Our property management team will contact you 24 hours before your appointment
                </Text>
              </View>
              
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <Text style={styles.stepText}>
                  During the consultation, we'll finalize your service plan and schedule
                </Text>
              </View>
              
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>4</Text>
                </View>
                <Text style={styles.stepText}>
                  After approval, we'll begin implementing your customized property management plan
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.teamCard}>
            <View style={styles.cardHeader}>
              <Users color={CommercialColors.systemBlue} size={24} />
              <Text style={styles.cardTitle}>Your Dedicated Team</Text>
            </View>

            <Text style={styles.teamDescription}>
              You've been assigned a dedicated property management team who will oversee all aspects of your commercial property maintenance.
            </Text>

            <View style={styles.teamMember}>
              <View style={styles.teamMemberIcon}>
                <Text style={styles.teamMemberInitials}>JD</Text>
              </View>
              <View style={styles.teamMemberInfo}>
                <Text style={styles.teamMemberName}>John Davis</Text>
                <Text style={styles.teamMemberRole}>Account Manager</Text>
                <Text style={styles.teamMemberContact}>john.davis@cerv.com • (555) 123-4567</Text>
              </View>
            </View>

            <View style={styles.teamMember}>
              <View style={styles.teamMemberIcon}>
                <Text style={styles.teamMemberInitials}>SW</Text>
              </View>
              <View style={styles.teamMemberInfo}>
                <Text style={styles.teamMemberName}>Sarah Wilson</Text>
                <Text style={styles.teamMemberRole}>Property Specialist</Text>
                <Text style={styles.teamMemberContact}>sarah.wilson@cerv.com • (555) 987-6543</Text>
              </View>
            </View>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.dashboardButton} onPress={handleGoToDashboard}>
            <View style={styles.dashboardButtonBackground}>
              <Building2 color="#ffffff" size={20} />
              <Text style={styles.dashboardButtonText}>Go to Dashboard</Text>
            </View>
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  successSection: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  checkContainer: {
    position: 'relative',
    marginBottom: 32,
  },
  checkCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: CommercialColors.systemBlue,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  checkRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: CommercialColors.systemBlueLight,
    top: -12,
    left: -12,
    zIndex: 1,
  },
  successTitle: {
    fontSize: 28,
    fontFamily: 'System',
    fontWeight: '700',
    color: CommercialColors.lightLabel,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  successSubtitle: {
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '400',
    color: CommercialColors.lightSecondaryLabel,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  consultationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quoteCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: '600',
    color: CommercialColors.lightLabel,
    letterSpacing: -0.3,
  },
  detailsGrid: {
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '400',
    color: CommercialColors.lightSecondaryLabel,
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '600',
    color: CommercialColors.lightLabel,
    flex: 2,
    textAlign: 'right',
  },
  totalRow: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: CommercialColors.lightSeparator,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '600',
    color: CommercialColors.lightLabel,
    flex: 1,
  },
  totalValue: {
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: '700',
    color: CommercialColors.systemBlue,
    flex: 2,
    textAlign: 'right',
    letterSpacing: -0.3,
  },
  nextStepsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
  },
  nextStepsTitle: {
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: '600',
    color: CommercialColors.lightLabel,
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  stepsList: {
    gap: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: CommercialColors.systemBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '600',
    color: '#ffffff',
  },
  stepText: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '400',
    color: CommercialColors.lightSecondaryLabel,
    lineHeight: 20,
    flex: 1,
    paddingTop: 2,
  },
  teamCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
  },
  teamDescription: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '400',
    color: CommercialColors.lightSecondaryLabel,
    marginBottom: 20,
    lineHeight: 20,
  },
  teamMember: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  teamMemberIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: CommercialColors.systemBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  teamMemberInitials: {
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '600',
    color: CommercialColors.systemBlue,
  },
  teamMemberInfo: {
    flex: 1,
  },
  teamMemberName: {
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '600',
    color: CommercialColors.lightLabel,
    marginBottom: 2,
  },
  teamMemberRole: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '400',
    color: CommercialColors.systemBlue,
    marginBottom: 2,
  },
  teamMemberContact: {
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '400',
    color: CommercialColors.lightSecondaryLabel,
  },
  bottomSpacing: {
    height: 20,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: CommercialColors.lightSeparator,
  },
  dashboardButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  dashboardButtonBackground: {
    backgroundColor: CommercialColors.systemBlue,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  dashboardButtonText: {
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: -0.3,
  },
});