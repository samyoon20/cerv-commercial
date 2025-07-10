import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView 
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Wrench, Shield, Leaf, Droplets, Paintbrush, CircleCheck as CheckCircle, ChevronRight } from 'lucide-react-native';
import { CommercialColors, CommercialTypography, CommercialBorderRadius, CommercialSpacing } from '@/themes/commercialDesignSystem';

const COMMERCIAL_SERVICES = [
  {
    id: 'pest',
    name: 'Pest Services',
    description: 'Professional pest control and prevention services for commercial properties',
    icon: Shield,
    basePrice: 800,
    frequency: ['monthly', 'quarterly', 'bi-annual'],
    recommended: true,
    available: true,
  },
  {
    id: 'tree',
    name: 'Tree Services',
    description: 'Tree trimming, pruning, removal, and arborist services',
    icon: Leaf,
    basePrice: 1200,
    frequency: ['quarterly', 'bi-annual'],
    recommended: false,
    available: true,
  },
  {
    id: 'pool',
    name: 'Pool Services',
    description: 'Complete pool maintenance, cleaning, and chemical balancing services',
    icon: Droplets,
    basePrice: 1200,
    frequency: ['weekly', 'bi-weekly', 'monthly'],
    recommended: true,
    available: true,
  },
  {
    id: 'landscape',
    name: 'Landscape Services',
    description: 'Professional landscaping maintenance including mowing, trimming, and seasonal care',
    icon: Leaf,
    basePrice: 1800,
    frequency: ['weekly', 'bi-weekly', 'monthly'],
    recommended: true,
    available: true,
  },
  {
    id: 'exterior',
    name: 'Exterior Services',
    description: 'Exterior cleaning, pressure washing, and building maintenance services',
    icon: Paintbrush,
    basePrice: 2000,
    frequency: ['monthly', 'quarterly', 'bi-annual'],
    recommended: false,
    available: true,
  },
  {
    id: 'janitorial',
    name: 'Janitorial Services',
    description: 'Comprehensive interior cleaning services for commercial properties',
    icon: Paintbrush,
    basePrice: 1000,
    frequency: ['monthly', 'quarterly'],
    recommended: false,
    available: true,
  },
  {
    id: 'waste',
    name: 'Waste Services',
    description: 'Waste management and recycling services',
    icon: Wrench,
    basePrice: 900,
    frequency: ['weekly', 'bi-weekly', 'monthly'],
    recommended: false,
    available: true,
  },
];

export default function ServiceSelectionScreen() {
  const { propertyType, squareFootage } = useLocalSearchParams();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleBack = () => {
    router.back();
  };

  const toggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  const handleContinue = () => {
    if (selectedServices.length === 0) {
      return;
    }
    
    const serviceIds = selectedServices.join(',');
    router.push({
      pathname: '/instant-quote',
      params: { 
        propertyType, 
        squareFootage,
        serviceIds
      }
    });
  };

  // Get recommended services based on property type
  const getRecommendedServices = () => {
    if (propertyType === 'office') {
      return ['pest', 'janitorial', 'exterior'];
    } else if (propertyType === 'retail') {
      return ['pest', 'landscape', 'janitorial'];
    } else if (propertyType === 'warehouse') {
      return ['pest', 'exterior', 'waste'];
    } else {
      return ['pest', 'landscape'];
    }
  };

  const recommendedServices = getRecommendedServices();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft color={CommercialColors.label} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Services</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.titleSection}>
            <View style={styles.iconContainer}>
              <Wrench color={CommercialColors.systemBlue} size={32} />
            </View>
            <Text style={styles.title}>Choose Your Services</Text>
            <Text style={styles.subtitle}>
              Select the services you need for your commercial property
            </Text>
          </View>

          <View style={styles.propertyInfo}>
            <Text style={styles.propertyInfoTitle}>Property Information</Text>
            <View style={styles.propertyInfoContent}>
              <Text style={styles.propertyInfoText}>
                <Text style={styles.propertyInfoLabel}>Type: </Text>
                {String(propertyType).replace('_', ' ').charAt(0).toUpperCase() + String(propertyType).replace('_', ' ').slice(1)}
              </Text>
              <Text style={styles.propertyInfoText}>
                <Text style={styles.propertyInfoLabel}>Size: </Text>
                {Number(squareFootage).toLocaleString()} sq ft
              </Text>
            </View>
          </View>

          <View style={styles.recommendedSection}>
            <Text style={styles.sectionTitle}>Recommended for Your Property</Text>
            <Text style={styles.sectionSubtitle}>Based on your property type and size</Text>
            
            {COMMERCIAL_SERVICES.filter(service => recommendedServices.includes(service.id)).map(service => {
              const isSelected = selectedServices.includes(service.id);
              const ServiceIcon = service.icon;
              
              return (
                <TouchableOpacity
                  key={service.id}
                  style={[styles.serviceCard, isSelected && styles.serviceCardSelected]}
                  onPress={() => toggleService(service.id)}
                >
                  <View style={styles.serviceCardContent}>
                    <View style={[styles.serviceIconContainer, isSelected && styles.serviceIconContainerSelected]}>
                      <ServiceIcon color={isSelected ? CommercialColors.white : CommercialColors.systemBlue} size={24} />
                    </View>
                    
                    <View style={styles.serviceInfo}>
                      <View style={styles.serviceNameRow}>
                        <Text style={[styles.serviceName, isSelected && styles.serviceNameSelected]}>
                          {service.name}
                        </Text>
                        {service.recommended && (
                          <View style={styles.recommendedBadge}>
                            <Text style={styles.recommendedText}>Recommended</Text>
                          </View>
                        )}
                      </View>
                      
                      <Text style={[styles.serviceDescription, isSelected && styles.serviceDescriptionSelected]}>
                        {service.description}
                      </Text>
                      
                      <Text style={[styles.servicePrice, isSelected && styles.servicePriceSelected]}>
                        Starting at ${service.basePrice.toLocaleString()}/month
                      </Text>
                    </View>
                    
                    <View style={[styles.checkboxContainer, isSelected && styles.checkboxContainerSelected]}>
                      {isSelected && <CheckCircle color={CommercialColors.white} size={20} />}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.additionalSection}>
            <Text style={styles.sectionTitle}>Additional Services</Text>
            <Text style={styles.sectionSubtitle}>Customize your maintenance plan</Text>
            
            {COMMERCIAL_SERVICES.filter(service => !recommendedServices.includes(service.id)).map(service => {
              const isSelected = selectedServices.includes(service.id);
              const ServiceIcon = service.icon;
              
              return (
                <TouchableOpacity
                  key={service.id}
                  style={[styles.serviceCard, isSelected && styles.serviceCardSelected]}
                  onPress={() => toggleService(service.id)}
                >
                  <View style={styles.serviceCardContent}>
                    <View style={[styles.serviceIconContainer, isSelected && styles.serviceIconContainerSelected]}>
                      <ServiceIcon color={isSelected ? CommercialColors.white : CommercialColors.systemBlue} size={24} />
                    </View>
                    
                    <View style={styles.serviceInfo}>
                      <Text style={[styles.serviceName, isSelected && styles.serviceNameSelected]}>
                        {service.name}
                      </Text>
                      <Text style={[styles.serviceDescription, isSelected && styles.serviceDescriptionSelected]}>
                        {service.description}
                      </Text>
                      <Text style={[styles.servicePrice, isSelected && styles.servicePriceSelected]}>
                        Starting at ${service.basePrice.toLocaleString()}/month
                      </Text>
                    </View>
                    
                    <View style={[styles.checkboxContainer, isSelected && styles.checkboxContainerSelected]}>
                      {isSelected && <CheckCircle color={CommercialColors.white} size={20} />}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Why choose Cerv Commercial?</Text>
            <View style={styles.infoRow}>
              <CheckCircle color={CommercialColors.systemBlue} size={16} />
              <Text style={styles.infoText}>Vetted, licensed, and insured service providers</Text>
            </View>
            <View style={styles.infoRow}>
              <CheckCircle color={CommercialColors.systemBlue} size={16} />
              <Text style={styles.infoText}>Consolidated billing and reporting</Text>
            </View>
            <View style={styles.infoRow}>
              <CheckCircle color={CommercialColors.systemBlue} size={16} />
              <Text style={styles.infoText}>24/7 emergency support</Text>
            </View>
            <View style={styles.infoRow}>
              <CheckCircle color={CommercialColors.systemBlue} size={16} />
              <Text style={styles.infoText}>Customizable service plans</Text>
            </View>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        <View style={styles.bottomSection}>
          <TouchableOpacity 
            style={[styles.continueButton, selectedServices.length === 0 && styles.disabledButton]} 
            onPress={handleContinue}
            disabled={selectedServices.length === 0}
          >
            <View style={styles.continueButtonBackground}>
              <Text style={styles.continueButtonText}>
                Get Instant Quote ({selectedServices.length} {selectedServices.length === 1 ? 'service' : 'services'})
              </Text>
              <ChevronRight color={CommercialColors.white} size={20} />
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
    backgroundColor: CommercialColors.secondaryBackground,
    borderRadius: CommercialBorderRadius.large,
    padding: CommercialSpacing.lg,
    marginBottom: CommercialSpacing.xxl,
    borderWidth: 1,
    borderColor: CommercialColors.separator,
  },
  propertyInfoTitle: {
    ...CommercialTypography.headline,
    color: CommercialColors.label,
    marginBottom: CommercialSpacing.sm,
  },
  propertyInfoContent: {
    gap: CommercialSpacing.xs,
  },
  propertyInfoText: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.secondaryLabel,
  },
  propertyInfoLabel: {
    fontWeight: '600',
    color: CommercialColors.label,
  },
  recommendedSection: {
    marginBottom: CommercialSpacing.xxl,
  },
  additionalSection: {
    marginBottom: CommercialSpacing.xxl,
  },
  sectionTitle: {
    ...CommercialTypography.title3,
    color: CommercialColors.label,
    marginBottom: CommercialSpacing.xs,
  },
  sectionSubtitle: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.secondaryLabel,
    marginBottom: CommercialSpacing.lg,
  },
  serviceCard: {
    borderRadius: CommercialBorderRadius.large,
    marginBottom: CommercialSpacing.md,
    borderWidth: 2,
    borderColor: CommercialColors.separator,
    backgroundColor: CommercialColors.cardBackground,
    overflow: 'hidden',
  },
  serviceCardSelected: {
    borderColor: CommercialColors.systemBlue,
    backgroundColor: CommercialColors.systemBlueLight,
  },
  serviceCardContent: {
    flexDirection: 'row',
    padding: CommercialSpacing.lg,
    alignItems: 'center',
    gap: CommercialSpacing.sm,
  },
  serviceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: CommercialColors.systemBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceIconContainerSelected: {
    backgroundColor: CommercialColors.systemBlue,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CommercialSpacing.sm,
    marginBottom: 4,
  },
  serviceName: {
    ...CommercialTypography.headline,
    color: CommercialColors.label,
  },
  serviceNameSelected: {
    color: CommercialColors.systemBlueDark,
  },
  recommendedBadge: {
    backgroundColor: CommercialColors.systemBlueLight,
    paddingHorizontal: CommercialSpacing.sm,
    paddingVertical: 2,
    borderRadius: CommercialBorderRadius.small,
  },
  recommendedText: {
    ...CommercialTypography.caption2,
    fontWeight: '600',
    color: CommercialColors.systemBlue,
  },
  serviceDescription: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.secondaryLabel,
    marginBottom: 4,
  },
  serviceDescriptionSelected: {
    color: CommercialColors.systemBlueDark,
  },
  servicePrice: {
    ...CommercialTypography.caption1,
    fontWeight: '600',
    color: CommercialColors.systemBlue,
  },
  servicePriceSelected: {
    color: CommercialColors.systemBlueDark,
  },
  checkboxContainer: {
    width: '47%',
    height: 120,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: CommercialColors.separator,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxContainerSelected: {
    backgroundColor: CommercialColors.systemBlue,
    borderColor: CommercialColors.systemBlue,
  },
  infoCard: {
    backgroundColor: CommercialColors.secondaryBackground,
    borderRadius: CommercialBorderRadius.large,
    padding: CommercialSpacing.xl,
    marginBottom: CommercialSpacing.xxl,
    borderWidth: 1,
    borderColor: CommercialColors.separator,
  },
  infoTitle: {
    ...CommercialTypography.headline,
    color: CommercialColors.label,
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
    color: CommercialColors.secondaryLabel,
    flex: 1,
  },
  bottomSpacing: {
    height: CommercialSpacing.xl,
  },
  bottomSection: {
    paddingHorizontal: CommercialSpacing.xxl,
    paddingVertical: CommercialSpacing.xxl,
    borderTopWidth: 1,
    borderTopColor: CommercialColors.separator,
  },
  continueButton: {
    borderRadius: CommercialBorderRadius.large,
    overflow: 'hidden',
  },
  disabledButton: {
    opacity: 0.5,
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