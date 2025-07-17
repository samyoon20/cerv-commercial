import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Alert, 
  Image,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Building2, ChevronRight, Wrench, Shield, Paintbrush, Leaf, Droplets, Plus } from 'lucide-react-native';
import { CommercialColors, CommercialTypography, CommercialBorderRadius, CommercialSpacing } from '@/themes/commercialDesignSystem';
import type { CommercialProperty } from '@/types/commercial';

const SERVICES = [
  {
    id: 'pest',
    name: 'Pest Services',
    description: 'Professional pest control and prevention services for commercial properties',
    icon: Shield,
    price: '200-400/month',
    frequency: 'Monthly'
  },
  {
    id: 'pool',
    name: 'Pool Services',
    description: 'Complete pool maintenance, cleaning, and chemical balancing services',
    icon: Droplets,
    price: '200-400/month',
    frequency: 'Weekly'
  },
  {
    id: 'landscape',
    name: 'Landscape Services',
    description: 'Professional landscaping maintenance including mowing, trimming, and seasonal care',
    icon: Leaf,
    price: '400-800/month',
    frequency: 'Bi-Weekly'
  },
  {
    id: 'tree',
    name: 'Tree Services',
    description: 'Tree trimming, pruning, removal, and arborist services',
    icon: Leaf,
    price: '300-1000/visit',
    frequency: 'Quarterly'
  },
  {
    id: 'exterior',
    name: 'Exterior Services',
    description: 'Exterior cleaning, pressure washing, and building maintenance services',
    icon: Paintbrush,
    price: '300-800/visit',
    frequency: 'Monthly'
  },
  {
    id: 'janitorial',
    name: 'Janitorial Services',
    description: 'Comprehensive interior cleaning services for commercial properties',
    icon: Paintbrush,
    price: '1000-3000/month',
    frequency: 'Daily'
  },
  {
    id: 'waste',
    name: 'Waste Services',
    description: 'Waste management and recycling services',
    icon: Wrench,
    price: '200-600/month',
    frequency: 'Weekly'
  }
];

export default function RequestWorkScreen() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define the function before using it
  const getSelectedService = () => SERVICES.find(s => s.id === selectedService);

  const currentService = getSelectedService();
  const CurrentServiceIcon = currentService?.icon;

  const handleBack = () => {
    router.back();
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const handleContinue = () => {
    if (!selectedService) {
      Alert.alert('Missing Information', 'Please select a service before continuing.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Get selected service details
      const selectedServiceObj = SERVICES.find(s => s.id === selectedService);
      
      Alert.alert(
        'Instant Quote',
        `Your quote for ${selectedServiceObj?.name} is ready!\n\nEstimated Price: ${selectedServiceObj?.price}\n\nFrequency: ${selectedServiceObj?.frequency}\n\nWould you like to add this service?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Add Service', 
            onPress: () => {
              Alert.alert('Service Added', 'Your new service has been added. You will receive a confirmation email shortly.');
              router.push('/(tabs)');
            }
          }
        ]
      );
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft color={CommercialColors.label} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add New Service</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.titleSection}>
            <View style={styles.iconContainer}>
              <Plus color={CommercialColors.systemBlue} size={32} />
            </View>
            <Text style={styles.title}>Add New Service</Text>
            <Text style={styles.subtitle}>
              Select a service to add to your property
            </Text>
          </View>

          {/* Service Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Services</Text>
            <Text style={styles.sectionSubtitle}>
              Choose from our professional services
            </Text>
            
            <View style={styles.serviceList}>
              {SERVICES.map((service) => {
                const ServiceIcon = service.icon;
                const isSelected = selectedService === service.id;
                
                return (
                  <TouchableOpacity
                    key={service.id}
                    style={[
                      styles.serviceCard,
                      isSelected && styles.serviceCardSelected
                    ]}
                    onPress={() => handleServiceSelect(service.id)}
                  >
                    <View style={styles.serviceCardContent}>
                      <View style={[
                        styles.serviceIconContainer,
                        isSelected && styles.serviceIconContainerSelected
                      ]}>
                        <ServiceIcon 
                          color={isSelected ? CommercialColors.white : CommercialColors.systemBlue} 
                          size={24} 
                        />
                      </View>
                      
                      <View style={styles.serviceInfo}>
                        <Text style={[
                          styles.serviceName,
                          isSelected && styles.serviceNameSelected
                        ]}>
                          {service.name}
                        </Text>
                        <Text style={[
                          styles.serviceDescription,
                          isSelected && styles.serviceDescriptionSelected
                        ]}>
                          {service.description}
                        </Text>
                        <View style={styles.serviceDetails}>
                          <Text style={[
                            styles.servicePrice,
                            isSelected && styles.servicePriceSelected
                          ]}>
                            ${service.price} • {service.frequency}
                          </Text>
                        </View>
                      </View>
                      
                      <View style={[
                        styles.radioButton,
                        isSelected && styles.radioButtonSelected
                      ]}>
                        {isSelected && (
                          <View style={styles.radioButtonInner} />
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Additional Details */}
          {selectedService && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Additional Details</Text>
              <Text style={styles.sectionSubtitle}>
                Provide any specific requirements (optional)
              </Text>
              
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Describe any specific needs or special requirements..."
                  placeholderTextColor={CommercialColors.tertiaryLabel}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </View>
          )}

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>How our pricing works</Text>
            <Text style={styles.infoText}>
              • Prices are estimates based on property size and service frequency{'\n'}
              • Final pricing will be confirmed after property assessment{'\n'}
              • All services include professional equipment and supplies{'\n'}
              • Cancel or modify services anytime with 24-hour notice
            </Text>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        <View style={styles.bottomSection}>
          <TouchableOpacity 
            style={[
              styles.continueButton, 
              (!selectedService || isSubmitting) && styles.disabledButton
            ]} 
            onPress={handleContinue}
            disabled={!selectedService || isSubmitting}
          >
            <View style={styles.continueButtonBackground}>
              {isSubmitting ? (
                <ActivityIndicator color={CommercialColors.white} size="small" />
              ) : (
                <>
                  <Text style={styles.continueButtonText}>
                    Get Instant Quote
                  </Text>
                  <ChevronRight color={CommercialColors.white} size={20} />
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginTop: CommercialSpacing.xxl,
    marginBottom: CommercialSpacing.xl,
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
  section: {
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
  serviceList: {
    gap: CommercialSpacing.md,
  },
  propertyCard: {
    borderRadius: CommercialBorderRadius.large,
    borderWidth: 2,
    borderColor: CommercialColors.separator,
    backgroundColor: CommercialColors.cardBackground,
    overflow: 'hidden',
  },
  propertyCardSelected: {
    borderColor: CommercialColors.systemBlue,
    backgroundColor: CommercialColors.systemBlueLight,
  },
  propertyCardContent: {
    flexDirection: 'row',
    padding: CommercialSpacing.lg,
    alignItems: 'center',
    gap: CommercialSpacing.md,
  },
  propertyIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: CommercialColors.systemBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  propertyIconContainerSelected: {
    backgroundColor: CommercialColors.systemBlue,
  },
  propertyInfo: {
    flex: 1,
  },
  propertyName: {
    ...CommercialTypography.headline,
    color: CommercialColors.label,
    marginBottom: 2,
  },
  propertyNameSelected: {
    color: CommercialColors.systemBlueDark,
  },
  propertyAddress: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.secondaryLabel,
    marginBottom: 2,
  },
  propertyAddressSelected: {
    color: CommercialColors.systemBlueDark,
  },
  propertyDetails: {
    ...CommercialTypography.caption1,
    color: CommercialColors.tertiaryLabel,
  },
  propertyDetailsSelected: {
    color: CommercialColors.systemBlue,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: CommercialColors.separator,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: CommercialColors.systemBlue,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: CommercialColors.systemBlue,
  },
  serviceList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CommercialSpacing.md,
  },
  serviceCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: CommercialBorderRadius.medium,
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
    height: '100%',
    padding: CommercialSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: CommercialColors.systemBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: CommercialSpacing.md,
  },
  serviceIconContainerSelected: {
    backgroundColor: CommercialColors.systemBlue,
  },
  serviceName: {
    ...CommercialTypography.headline,
    color: CommercialColors.label,
    textAlign: 'center',
    marginBottom: CommercialSpacing.xs,
  },
  serviceDescription: {
    ...CommercialTypography.caption1,
  },
  serviceNameSelected: {
    color: CommercialColors.systemBlueDark,
  },
  // Service detail view styles
  serviceDetailHeader: {
    alignItems: 'center',
    marginTop: CommercialSpacing.xxxl,
    marginBottom: CommercialSpacing.xxl,
  },
  serviceDetails: {
    marginTop: CommercialSpacing.xs,
  },
  serviceDetailIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: CommercialColors.systemBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: CommercialSpacing.lg,
  },
  serviceDetailTitle: {
    ...CommercialTypography.title1,
    color: CommercialColors.label,
    textAlign: 'center',
    marginBottom: CommercialSpacing.md,
  },
  serviceDetailDescription: {
    ...CommercialTypography.body,
    color: CommercialColors.secondaryLabel,
    textAlign: 'center',
    maxWidth: 320,
  },
  servicePrice: {
    ...CommercialTypography.caption1,
    color: CommercialColors.systemBlue,
  },
  serviceOptionsSection: {
    marginBottom: CommercialSpacing.xxl,
  },
  serviceOptionsList: {
    gap: CommercialSpacing.md,
  },
  serviceOptionCard: {
    borderRadius: CommercialBorderRadius.large,
    borderWidth: 2,
    borderColor: CommercialColors.separator,
    backgroundColor: CommercialColors.cardBackground,
    overflow: 'hidden',
  },
  serviceOptionCardSelected: {
    borderColor: CommercialColors.systemBlue,
    backgroundColor: CommercialColors.systemBlueLight,
  },
  serviceOptionCardContent: {
    flexDirection: 'row',
    padding: CommercialSpacing.lg,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serviceOptionInfo: {
    flex: 1,
  },
  serviceOptionName: {
    ...CommercialTypography.headline,
    color: CommercialColors.label,
    marginBottom: CommercialSpacing.xs,
  },
  serviceOptionNameSelected: {
    color: CommercialColors.systemBlueDark,
  },
  serviceOptionPrice: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.secondaryLabel,
  },
  serviceOptionPriceSelected: {
    color: CommercialColors.systemBlueDark,
  },
  serviceImagesSection: {
    marginBottom: CommercialSpacing.xxl,
  },
  serviceImagesScroll: {
    marginHorizontal: -CommercialSpacing.xxl,
    paddingHorizontal: CommercialSpacing.xxl,
  },
  serviceImageContainer: {
    width: 200,
    height: 150,
    borderRadius: CommercialBorderRadius.medium,
    overflow: 'hidden',
    marginRight: CommercialSpacing.md,
  },
  serviceImage: {
    width: '100%',
    height: '100%',
  },
  textInputContainer: {
    borderRadius: CommercialBorderRadius.large,
    borderWidth: 1,
    borderColor: CommercialColors.separator,
    backgroundColor: CommercialColors.secondaryBackground,
    overflow: 'hidden',
  },
  textInput: {
    ...CommercialTypography.body,
    color: CommercialColors.label,
    padding: CommercialSpacing.lg,
    minHeight: 100,
  },
  infoCard: {
    backgroundColor: CommercialColors.systemBlueLight,
    borderRadius: CommercialBorderRadius.large,
    padding: CommercialSpacing.lg,
    marginBottom: CommercialSpacing.xl,
  },
  infoTitle: {
    ...CommercialTypography.headline,
    color: CommercialColors.systemBlueDark,
    marginBottom: CommercialSpacing.sm,
  },
  infoText: {
    ...CommercialTypography.body,
    color: CommercialColors.systemBlueDark,
    lineHeight: 20,
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