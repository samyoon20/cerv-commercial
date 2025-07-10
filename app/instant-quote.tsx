import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, DollarSign, Calendar, CircleCheck as CheckCircle, ChevronRight, Building2, Wrench, Paintbrush, Leaf, Shield, Zap, Droplets } from 'lucide-react-native';
import { CommercialColors, CommercialTypography, CommercialBorderRadius, CommercialSpacing } from '@/themes/commercialDesignSystem';

const COMMERCIAL_SERVICES = {
  'pest': {
    id: 'pest',
    name: 'Pest Services',
    description: 'Professional pest control and prevention services for commercial properties',
    icon: Shield,
    basePrice: 800,
    frequency: ['monthly', 'quarterly', 'bi-annual'],
  },
  'pool': {
    id: 'pool',
    name: 'Pool Services',
    description: 'Complete pool maintenance, cleaning, and chemical balancing services',
    icon: Droplets,
    basePrice: 600,
    frequency: ['weekly', 'bi-weekly'],
  },
  'landscape': {
    id: 'landscape',
    name: 'Landscape Services',
    description: 'Professional landscaping maintenance, lawn care, and grounds keeping',
    icon: Leaf,
    basePrice: 1800,
    frequency: ['weekly', 'bi-weekly', 'monthly'],
  },
  'pest': {
    id: 'pest',
    name: 'Pest Services',
    description: 'Professional pest control and prevention services for commercial properties',
    icon: Shield,
    basePrice: 800,
    frequency: ['quarterly', 'bi-annual'],
  },
  'tree': {
    id: 'tree',
    name: 'Tree Services',
    description: 'Tree trimming, pruning, and maintenance services',
    icon: Leaf,
    basePrice: 1500,
    frequency: ['quarterly', 'bi-annual', 'annual'],
  },
  'tree': {
    id: 'tree',
    name: 'Tree Services',
    description: 'Tree trimming, pruning, removal, and arborist services',
    icon: Leaf,
    basePrice: 1200,
    frequency: ['monthly', 'quarterly', 'bi-annual'],
  },
  'exterior': {
    id: 'exterior',
    name: 'Exterior Services',
    description: 'Exterior cleaning, pressure washing, and building maintenance',
    icon: Paintbrush,
    basePrice: 2000,
    frequency: ['weekly', 'bi-weekly'],
  },
  'janitorial': {
    id: 'janitorial',
    name: 'Janitorial Services',
    description: 'Comprehensive interior cleaning services',
    icon: Paintbrush,
    basePrice: 2500,
    frequency: ['daily', 'weekly', 'bi-weekly'],
  },
  'waste': {
    id: 'waste',
    name: 'Waste Services',
    description: 'Waste management and recycling services',
    icon: Wrench,
    basePrice: 900,
    frequency: ['weekly', 'bi-weekly', 'monthly'],
  },
};

const FREQUENCY_DISCOUNTS = {
  'daily': 0.85, // 15% discount for daily service
  'weekly': 0.9, // 10% discount for weekly service
  'bi-weekly': 0.95, // 5% discount for bi-weekly service
  'monthly': 1, // no discount for monthly service
  'quarterly': 1.1, // 10% premium for quarterly service
  'bi-annual': 1.2, // 20% premium for bi-annual service
  'annual': 1.3, // 30% premium for annual service
};

const SIZE_MULTIPLIERS = {
  'small': 0.8, // < 10,000 sq ft
  'medium': 1, // 10,000 - 50,000 sq ft
  'large': 1.3, // 50,000 - 100,000 sq ft
  'xlarge': 1.6, // > 100,000 sq ft
};

export default function InstantQuoteScreen() {
  const { propertyType, squareFootage, serviceIds } = useLocalSearchParams();
  const [selectedFrequencies, setSelectedFrequencies] = useState<{[key: string]: string}>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [quoteReady, setQuoteReady] = useState(false);
  const [quoteTotal, setQuoteTotal] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [annualTotal, setAnnualTotal] = useState(0);
  const [savings, setSavings] = useState(0);

  const selectedServiceIds = (serviceIds as string).split(',');
  const selectedServices = selectedServiceIds.map(id => COMMERCIAL_SERVICES[id as keyof typeof COMMERCIAL_SERVICES]);

  const getSizeCategory = (size: number) => {
    if (size < 10000) return 'small';
    if (size < 50000) return 'medium';
    if (size < 100000) return 'large';
    return 'xlarge';
  };

  const handleBack = () => {
    router.back();
  };

  const handleFrequencyChange = (serviceId: string, frequency: string) => {
    setSelectedFrequencies({
      ...selectedFrequencies,
      [serviceId]: frequency
    });
  };

  const calculateQuote = () => {
    setIsCalculating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const sizeCategory = getSizeCategory(Number(squareFootage));
      const sizeMultiplier = SIZE_MULTIPLIERS[sizeCategory as keyof typeof SIZE_MULTIPLIERS];
      
      let total = 0;
      let standardTotal = 0;
      
      selectedServices.forEach(service => {
        const frequency = selectedFrequencies[service.id] || service.frequency[0];
        const frequencyMultiplier = FREQUENCY_DISCOUNTS[frequency as keyof typeof FREQUENCY_DISCOUNTS];
        
        const servicePrice = service.basePrice * sizeMultiplier * frequencyMultiplier;
        total += servicePrice;
        
        // Calculate standard price without discounts
        const standardPrice = service.basePrice * sizeMultiplier;
        standardTotal += standardPrice;
      });
      
      // Apply bundle discount if multiple services selected
      if (selectedServices.length > 1) {
        const bundleDiscount = 0.05 * (selectedServices.length - 1); // 5% per additional service
        total = total * (1 - bundleDiscount);
      }
      
      setQuoteTotal(Math.round(total));
      setMonthlyTotal(Math.round(total));
      setAnnualTotal(Math.round(total * 12));
      setSavings(Math.round(standardTotal - total));
      
      setQuoteReady(true);
      setIsCalculating(false);
    }, 2000);
  };

  const handleContinue = () => {
    router.push({
      pathname: '/scheduling',
      params: {
        propertyType,
        squareFootage,
        serviceIds,
        frequencies: JSON.stringify(selectedFrequencies),
        monthlyTotal,
        annualTotal
      }
    });
  };

  const allFrequenciesSelected = selectedServices.every(service => 
    selectedFrequencies[service.id]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft color={CommercialColors.lightLabel} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Instant Quote</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.titleSection}>
            <View style={styles.iconContainer}>
              <DollarSign color={CommercialColors.systemBlue} size={32} />
            </View>
            <Text style={styles.title}>Your Custom Quote</Text>
            <Text style={styles.subtitle}>
              Select service frequencies to get an instant quote
            </Text>
          </View>

          <View style={styles.propertyInfo}>
            <View style={styles.propertyIconContainer}>
              <Building2 color={CommercialColors.systemBlue} size={20} />
            </View>
            <View style={styles.propertyDetails}>
              <Text style={styles.propertyInfoTitle}>Property Details</Text>
              <Text style={styles.propertyInfoText}>
                {String(propertyType).replace('_', ' ').charAt(0).toUpperCase() + String(propertyType).replace('_', ' ').slice(1)} • {Number(squareFootage).toLocaleString()} sq ft
              </Text>
            </View>
          </View>

          <View style={styles.servicesSection}>
            <Text style={styles.sectionTitle}>Selected Services</Text>
            <Text style={styles.sectionSubtitle}>Choose frequency for each service</Text>
            
            {selectedServices.map(service => {
              const ServiceIcon = service.icon;
              const selectedFrequency = selectedFrequencies[service.id];
              
              return (
                <View key={service.id} style={styles.serviceCard}>
                  <View style={styles.serviceCardContent}>
                    <View style={styles.serviceHeader}>
                      <View style={styles.serviceIconContainer}>
                        <ServiceIcon color={CommercialColors.systemBlue} size={24} />
                      </View>
                      <View style={styles.serviceInfo}>
                        <Text style={styles.serviceName}>{service.name}</Text>
                        <Text style={styles.serviceDescription}>{service.description}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.frequencySelector}>
                      <Text style={styles.frequencyLabel}>Service Frequency:</Text>
                      <View style={styles.frequencyOptions}>
                        {service.frequency.map(freq => (
                          <TouchableOpacity
                            key={freq}
                            style={[
                              styles.frequencyOption,
                              selectedFrequency === freq && styles.frequencyOptionSelected
                            ]}
                            onPress={() => handleFrequencyChange(service.id, freq)}
                          >
                            <Text style={[
                              styles.frequencyText,
                              selectedFrequency === freq && styles.frequencyTextSelected
                            ]}>
                              {freq.charAt(0).toUpperCase() + freq.slice(1)}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                    
                    <View style={styles.servicePricing}>
                      <Text style={styles.servicePriceLabel}>Base Price:</Text>
                      <Text style={styles.servicePrice}>
                        ${service.basePrice.toLocaleString()}/month
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          {!quoteReady && (
            <TouchableOpacity 
              style={[styles.calculateButton, !allFrequenciesSelected && styles.disabledButton]}
              onPress={calculateQuote}
              disabled={!allFrequenciesSelected || isCalculating}
            >
              <View style={styles.calculateButtonBackground}>
                {isCalculating ? (
                  <ActivityIndicator color={CommercialColors.white} size="small" />
                ) : (
                  <>
                    <DollarSign color={CommercialColors.white} size={20} />
                    <Text style={styles.calculateButtonText}>Calculate Quote</Text>
                  </>
                )}
              </View>
            </TouchableOpacity>
          )}

          {quoteReady && (
            <View style={styles.quoteResults}>
              <View style={styles.quoteHeader}>
                <CheckCircle color={CommercialColors.systemBlue} size={24} />
                <Text style={styles.quoteTitle}>Your Custom Quote</Text>
              </View>
              
              <View style={styles.quoteSummary}>
                <View style={styles.quoteRow}>
                  <Text style={styles.quoteLabel}>Monthly Total:</Text>
                  <Text style={styles.quoteValue}>${monthlyTotal.toLocaleString()}</Text>
                </View>
                <View style={styles.quoteRow}>
                  <Text style={styles.quoteLabel}>Annual Total:</Text>
                  <Text style={styles.quoteValue}>${annualTotal.toLocaleString()}</Text>
                </View>
                <View style={styles.quoteRow}>
                  <Text style={styles.quoteLabel}>Estimated Savings:</Text>
                  <Text style={[styles.quoteValue, styles.savingsValue]}>${savings.toLocaleString()}</Text>
                </View>
              </View>
              
              <View style={styles.quoteNotes}>
                <Text style={styles.quoteNotesText}>
                  This quote includes bundle discounts for multiple services. Final pricing may vary based on property inspection and specific requirements.
                </Text>
              </View>
              
              <TouchableOpacity style={styles.scheduleButton} onPress={handleContinue}>
                <View style={styles.scheduleButtonBackground}>
                  <Calendar color={CommercialColors.white} size={20} />
                  <Text style={styles.scheduleButtonText}>Continue to Scheduling</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>How our pricing works</Text>
            <View style={styles.infoRow}>
              <CheckCircle color={CommercialColors.systemBlue} size={16} />
              <Text style={styles.infoText}>Transparent pricing based on property size and service frequency</Text>
            </View>
            <View style={styles.infoRow}>
              <CheckCircle color={CommercialColors.systemBlue} size={16} />
              <Text style={styles.infoText}>Bundle multiple services for additional savings</Text>
            </View>
            <View style={styles.infoRow}>
              <CheckCircle color={CommercialColors.systemBlue} size={16} />
              <Text style={styles.infoText}>No hidden fees or long-term contracts required</Text>
            </View>
            <View style={styles.infoRow}>
              <CheckCircle color={CommercialColors.systemBlue} size={16} />
              <Text style={styles.infoText}>Flexible payment options including monthly or annual billing</Text>
            </View>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        {quoteReady && (
          <View style={styles.bottomSection}>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <View style={styles.continueButtonBackground}>
                <Text style={styles.continueButtonText}>Continue to Scheduling</Text>
                <ChevronRight color={CommercialColors.white} size={20} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommercialColors.background,
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: CommercialColors.background,
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CommercialColors.secondaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...CommercialTypography.headline,
    color: CommercialColors.label,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: CommercialSpacing.xxl,
  },
  titleSection: {
    alignItems: 'center',
    marginTop: CommercialSpacing.xxxl,
    marginBottom: CommercialSpacing.xxl,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: CommercialColors.systemBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: CommercialSpacing.xl,
  },
  title: {
    ...CommercialTypography.title1,
    color: CommercialColors.label,
    textAlign: 'center',
    marginBottom: CommercialSpacing.md,
  },
  subtitle: {
    ...CommercialTypography.body,
    color: CommercialColors.secondaryLabel,
    textAlign: 'center',
    maxWidth: 320,
  },
  propertyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CommercialColors.lightSecondaryBackground,
    borderRadius: CommercialBorderRadius.large,
    padding: CommercialSpacing.lg,
    marginBottom: CommercialSpacing.xxl,
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
  },
  propertyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CommercialColors.systemBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: CommercialSpacing.md,
  },
  propertyDetails: {
    flex: 1,
  },
  propertyInfoTitle: {
    ...CommercialTypography.headline,
    color: CommercialColors.lightLabel,
    marginBottom: 4,
  },
  propertyInfoText: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.lightSecondaryLabel,
  },
  servicesSection: {
    marginBottom: CommercialSpacing.xxl,
  },
  sectionTitle: {
    ...CommercialTypography.title3,
    color: CommercialColors.lightLabel,
    marginBottom: CommercialSpacing.xs,
  },
  sectionSubtitle: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.lightSecondaryLabel,
    marginBottom: CommercialSpacing.lg,
  },
  serviceCard: {
    borderRadius: CommercialBorderRadius.large,
    marginBottom: CommercialSpacing.md,
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
    backgroundColor: CommercialColors.lightBackground,
    overflow: 'hidden',
  },
  serviceCardContent: {
    padding: CommercialSpacing.lg,
  },
  serviceHeader: {
    flexDirection: 'row',
    marginBottom: CommercialSpacing.md,
  },
  serviceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: CommercialColors.systemBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: CommercialSpacing.md,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    ...CommercialTypography.headline,
    color: CommercialColors.lightLabel,
    marginBottom: 4,
  },
  serviceDescription: {
    ...CommercialTypography.caption1,
    color: CommercialColors.lightSecondaryLabel,
  },
  frequencySelector: {
    marginBottom: CommercialSpacing.md,
  },
  frequencyLabel: {
    ...CommercialTypography.subheadline,
    fontWeight: '600',
    color: CommercialColors.lightLabel,
    marginBottom: CommercialSpacing.sm,
  },
  frequencyOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CommercialSpacing.sm,
  },
  frequencyOption: {
    paddingHorizontal: CommercialSpacing.md,
    paddingVertical: CommercialSpacing.sm,
    borderRadius: CommercialBorderRadius.medium,
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
    backgroundColor: CommercialColors.lightBackground,
  },
  frequencyOptionSelected: {
    borderColor: CommercialColors.systemBlue,
    backgroundColor: CommercialColors.systemBlueLight,
  },
  frequencyText: {
    ...CommercialTypography.caption1,
    color: CommercialColors.lightLabel,
  },
  frequencyTextSelected: {
    color: CommercialColors.systemBlueDark,
    fontWeight: '600',
  },
  servicePricing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: CommercialSpacing.sm,
    borderTopWidth: 1,
    borderTopColor: CommercialColors.lightSeparator,
  },
  servicePriceLabel: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.lightSecondaryLabel,
  },
  servicePrice: {
    ...CommercialTypography.headline,
    color: CommercialColors.systemBlue,
  },
  calculateButton: {
    borderRadius: CommercialBorderRadius.large,
    overflow: 'hidden',
    marginBottom: CommercialSpacing.xxl,
  },
  disabledButton: {
    opacity: 0.5,
  },
  calculateButtonBackground: {
    backgroundColor: CommercialColors.systemBlue,
    paddingVertical: CommercialSpacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: CommercialSpacing.sm,
  },
  calculateButtonText: {
    ...CommercialTypography.headline,
    color: CommercialColors.white,
  },
  quoteResults: {
    backgroundColor: CommercialColors.systemBlueLight,
    borderRadius: CommercialBorderRadius.large,
    padding: CommercialSpacing.xl,
    marginBottom: CommercialSpacing.xxl,
    borderWidth: 1,
    borderColor: CommercialColors.systemBlue,
  },
  quoteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CommercialSpacing.md,
    marginBottom: CommercialSpacing.lg,
  },
  quoteTitle: {
    ...CommercialTypography.title3,
    color: CommercialColors.systemBlueDark,
  },
  quoteSummary: {
    backgroundColor: CommercialColors.lightBackground,
    borderRadius: CommercialBorderRadius.medium,
    padding: CommercialSpacing.lg,
    marginBottom: CommercialSpacing.lg,
  },
  quoteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: CommercialSpacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: CommercialColors.lightSeparator,
  },
  quoteLabel: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.lightSecondaryLabel,
  },
  quoteValue: {
    ...CommercialTypography.headline,
    color: CommercialColors.lightLabel,
  },
  savingsValue: {
    color: CommercialColors.systemBlue,
  },
  quoteNotes: {
    marginBottom: CommercialSpacing.lg,
  },
  quoteNotesText: {
    ...CommercialTypography.caption1,
    color: CommercialColors.systemBlueDark,
    fontStyle: 'italic',
  },
  scheduleButton: {
    borderRadius: CommercialBorderRadius.medium,
    overflow: 'hidden',
  },
  scheduleButtonBackground: {
    backgroundColor: CommercialColors.systemBlue,
    paddingVertical: CommercialSpacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: CommercialSpacing.sm,
  },
  scheduleButtonText: {
    ...CommercialTypography.subheadline,
    fontWeight: '600',
    color: CommercialColors.white,
  },
  infoCard: {
    backgroundColor: CommercialColors.lightSecondaryBackground,
    borderRadius: CommercialBorderRadius.large,
    padding: CommercialSpacing.xl,
    marginBottom: CommercialSpacing.xxl,
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
  },
  infoTitle: {
    ...CommercialTypography.headline,
    color: CommercialColors.lightLabel,
    marginBottom: CommercialSpacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CommercialSpacing.sm,
    marginBottom: CommercialSpacing.sm,
  },
  infoText: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.lightSecondaryLabel,
    flex: 1,
  },
  bottomSpacing: {
    height: CommercialSpacing.xl,
  },
  bottomSection: {
    paddingHorizontal: CommercialSpacing.xxl,
    paddingVertical: CommercialSpacing.xxl,
    borderTopWidth: 1,
    borderTopColor: CommercialColors.lightSeparator,
  },
  continueButton: {
    borderRadius: CommercialBorderRadius.large,
    overflow: 'hidden',
  },
  continueButtonBackground: {
    backgroundColor: CommercialColors.systemBlue,
    paddingVertical: CommercialSpacing.lg,
    paddingHorizontal: CommercialSpacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: CommercialSpacing.sm,
  },
  continueButtonText: {
    ...CommercialTypography.headline,
    color: CommercialColors.white,
  },
});