import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Alert,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Building2, ChevronRight, Wrench, Shield, Paintbrush, Leaf, Droplets } from 'lucide-react-native';
import { CommercialColors, CommercialTypography, CommercialBorderRadius, CommercialSpacing } from '@/themes/commercialDesignSystem';
import type { CommercialProperty } from '@/types/commercial';

const MOCK_PROPERTIES: CommercialProperty[] = [
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
    updatedAt: new Date().toISOString()
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
    updatedAt: new Date().toISOString()
  },
  {
    id: 'prop-3',
    name: 'East Austin Industrial Complex',
    address: '789 East 6th St',
    city: 'Austin',
    state: 'TX',
    zipCode: '78702',
    propertyType: 'warehouse',
    squareFootage: 100000,
    floors: 1,
    isActive: true,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: new Date().toISOString()
  }
];

const SERVICES = [
  {
    id: 'pest',
    name: 'Pest Services',
    description: 'Professional pest control and prevention services for commercial properties',
    icon: Shield,
    options: [
      { id: 'pest-regular', name: 'Regular Pest Control', price: '200-400/month' },
      { id: 'pest-premium', name: 'Premium Pest Management', price: '400-800/month' },
      { id: 'pest-emergency', name: 'Emergency Treatment', price: '300-600/visit' }
    ]
  },
  {
    id: 'pool',
    name: 'Pool Services',
    description: 'Complete pool maintenance, cleaning, and chemical balancing services',
    icon: Droplets,
    options: [
      { id: 'pool-weekly', name: 'Weekly Pool Maintenance', price: '200-400/month' },
      { id: 'pool-biweekly', name: 'Bi-Weekly Pool Service', price: '150-300/month' },
      { id: 'pool-repair', name: 'Pool Equipment Repair', price: 'Varies' }
    ]
  },
  {
    id: 'landscape',
    name: 'Landscape Services',
    description: 'Professional landscaping maintenance including mowing, trimming, and seasonal care',
    icon: Leaf,
    options: [
      { id: 'landscape-basic', name: 'Basic Landscape Maintenance', price: '400-800/month' },
      { id: 'landscape-premium', name: 'Premium Landscape Care', price: '800-1500/month' },
      { id: 'landscape-seasonal', name: 'Seasonal Cleanup', price: '500-1000/visit' }
    ]
  },
  {
    id: 'tree',
    name: 'Tree Services',
    description: 'Tree trimming, pruning, removal, and arborist services',
    icon: Leaf,
    options: [
      { id: 'tree-trimming', name: 'Tree Trimming & Pruning', price: '300-1000/visit' },
      { id: 'tree-removal', name: 'Tree Removal', price: '500-2000/tree' },
      { id: 'tree-health', name: 'Tree Health Assessment', price: '200-400/visit' }
    ]
  },
  {
    id: 'exterior',
    name: 'Exterior Services',
    description: 'Exterior cleaning, pressure washing, and building maintenance services',
    icon: Paintbrush,
    options: [
      { id: 'exterior-pressure', name: 'Pressure Washing', price: '300-800/visit' },
      { id: 'exterior-window', name: 'Window Cleaning', price: '400-1200/visit' },
      { id: 'exterior-facade', name: 'Facade Maintenance', price: '800-2000/visit' }
    ]
  },
  {
    id: 'janitorial',
    name: 'Janitorial Services',
    description: 'Comprehensive interior cleaning services for commercial properties',
    icon: Paintbrush,
    options: [
      { id: 'janitorial-daily', name: 'Daily Cleaning Service', price: '1000-3000/month' },
      { id: 'janitorial-weekly', name: 'Weekly Deep Cleaning', price: '400-1200/month' },
      { id: 'janitorial-special', name: 'Special Event Cleaning', price: '300-800/visit' }
    ]
  },
  {
    id: 'waste',
    name: 'Waste Services',
    description: 'Waste management and recycling services',
    icon: Wrench,
    options: [
      { id: 'waste-regular', name: 'Regular Waste Collection', price: '200-600/month' },
      { id: 'waste-recycling', name: 'Recycling Program', price: '150-400/month' },
      { id: 'waste-special', name: 'Special Waste Disposal', price: '300-800/visit' }
    ]
  }
];

export default function RequestWorkScreen() {
  const [selectedProperty, setSelectedProperty] = useState<CommercialProperty | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showServiceOptions, setShowServiceOptions] = useState(false);
  const [description, setDescription] = useState('');

  const handleBack = () => {
    if (showServiceOptions) {
      setShowServiceOptions(false);
      return;
    }
    router.back();
  };

  const handlePropertySelect = (property: CommercialProperty) => {
    setSelectedProperty(property);
    setSelectedService(null);
    setSelectedOption(null);
    setShowServiceOptions(false);
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setSelectedOption(null);
    setShowServiceOptions(true);
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleContinue = () => {
    if (!selectedProperty || !selectedService) {
      Alert.alert('Missing Information', 'Please select a property and service before continuing.');
      return;
    }

    if (showServiceOptions && !selectedOption) {
      Alert.alert('Missing Information', 'Please select a service option before continuing.');
      return;
    }

    if (showServiceOptions && selectedOption) {
      // Simulate getting an instant quote
      const selectedServiceObj = SERVICES.find(s => s.id === selectedService);
      const selectedOptionObj = selectedServiceObj?.options.find(o => o.id === selectedOption);
      
      Alert.alert(
        'Instant Quote',
        `Your quote for ${selectedOptionObj?.name} at ${selectedProperty.name} is ready!\n\nEstimated Price: ${selectedOptionObj?.price}\n\nWould you like to schedule this service?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Schedule Now', 
            onPress: () => {
              Alert.alert('Service Scheduled', 'Your service has been scheduled. You will receive a confirmation email shortly.');
              router.push('/(tabs)');
            }
          }
        ]
      );
      return;
    }

    setShowServiceOptions(true);
  };

  const getSelectedService = () => {
    return SERVICES.find(s => s.id === selectedService);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft color={CommercialColors.label} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {showServiceOptions ? getSelectedService()?.name || 'Select Options' : 'Request Work'}
          </Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {!showServiceOptions ? (
            <>
              <View style={styles.titleSection}>
                <View style={styles.iconContainer}>
                  <Wrench color={CommercialColors.systemBlue} size={32} />
                </View>
                <Text style={styles.title}>Request Professional Services</Text>
                <Text style={styles.subtitle}>
                  Get instant quotes for commercial property maintenance and services
                </Text>
              </View>

              {/* Property Selection */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Select Property</Text>
                <Text style={styles.sectionSubtitle}>Choose which property needs service</Text>
                
                <View style={styles.propertyList}>
                  {MOCK_PROPERTIES.map((property) => (
                    <TouchableOpacity
                      key={property.id}
                      style={[
                        styles.propertyCard,
                        selectedProperty?.id === property.id && styles.propertyCardSelected
                      ]}
                      onPress={() => handlePropertySelect(property)}
                    >
                      <View style={styles.propertyCardContent}>
                        <View style={[
                          styles.propertyIconContainer,
                          selectedProperty?.id === property.id && styles.propertyIconContainerSelected
                        ]}>
                          <Building2 
                            color={selectedProperty?.id === property.id ? CommercialColors.white : CommercialColors.systemBlue} 
                            size={24} 
                          />
                        </View>
                        
                        <View style={styles.propertyInfo}>
                          <Text style={[
                            styles.propertyName,
                            selectedProperty?.id === property.id && styles.propertyNameSelected
                          ]}>
                            {property.name}
                          </Text>
                          <Text style={[
                            styles.propertyAddress,
                            selectedProperty?.id === property.id && styles.propertyAddressSelected
                          ]}>
                            {property.address}, {property.city}, {property.state}
                          </Text>
                          <Text style={[
                            styles.propertyDetails,
                            selectedProperty?.id === property.id && styles.propertyDetailsSelected
                          ]}>
                            {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)} • {property.squareFootage.toLocaleString()} sq ft
                          </Text>
                        </View>
                        
                        <View style={[
                          styles.radioButton,
                          selectedProperty?.id === property.id && styles.radioButtonSelected
                        ]}>
                          {selectedProperty?.id === property.id && (
                            <View style={styles.radioButtonInner} />
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Service Selection */}
              {selectedProperty && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Select Service Type</Text>
                  <Text style={styles.sectionSubtitle}>
                    Choose from our professional services
                  </Text>
                  
                  <View style={styles.serviceGrid}>
                    {SERVICES.map((service) => {
                      const ServiceIcon = service.icon;
                      return (
                        <TouchableOpacity
                          key={service.id}
                          style={[
                            styles.serviceCard,
                            selectedService === service.id && styles.serviceCardSelected
                          ]}
                          onPress={() => handleServiceSelect(service.id)}
                        >
                          <View style={styles.serviceCardContent}>
                            <View style={[
                              styles.serviceIconContainer,
                              selectedService === service.id && styles.serviceIconContainerSelected
                            ]}>
                              <ServiceIcon 
                                color={selectedService === service.id ? CommercialColors.white : CommercialColors.systemBlue} 
                                size={24} 
                              />
                            </View>
                            <Text style={[
                              styles.serviceName,
                              selectedService === service.id && styles.serviceNameSelected
                            ]}>
                              {service.name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              )}
            </>
          ) : (
            <>
              {/* Service Options */}
              <View style={styles.serviceDetailHeader}>
                <View style={styles.serviceDetailIconContainer}>
                  {getSelectedService()?.icon && (
                    <getSelectedService()!.icon color={CommercialColors.white} size={32} />
                  )}
                </View>
                <Text style={styles.serviceDetailTitle}>{getSelectedService()?.name}</Text>
                <Text style={styles.serviceDetailDescription}>{getSelectedService()?.description}</Text>
              </View>

              <View style={styles.serviceOptionsSection}>
                <Text style={styles.sectionTitle}>Select Service Option</Text>
                <Text style={styles.sectionSubtitle}>Choose the specific service you need</Text>
                
                <View style={styles.serviceOptionsList}>
                  {getSelectedService()?.options.map((option) => (
                    <TouchableOpacity
                      key={option.id}
                      style={[
                        styles.serviceOptionCard,
                        selectedOption === option.id && styles.serviceOptionCardSelected
                      ]}
                      onPress={() => handleOptionSelect(option.id)}
                    >
                      <View style={styles.serviceOptionCardContent}>
                        <View style={styles.serviceOptionInfo}>
                          <Text style={[
                            styles.serviceOptionName,
                            selectedOption === option.id && styles.serviceOptionNameSelected
                          ]}>
                            {option.name}
                          </Text>
                          <Text style={[
                            styles.serviceOptionPrice,
                            selectedOption === option.id && styles.serviceOptionPriceSelected
                          ]}>
                            ${option.price}
                          </Text>
                        </View>
                        
                        <View style={[
                          styles.radioButton,
                          selectedOption === option.id && styles.radioButtonSelected
                        ]}>
                          {selectedOption === option.id && (
                            <View style={styles.radioButtonInner} />
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Service Images */}
              <View style={styles.serviceImagesSection}>
                <Text style={styles.sectionTitle}>Service Gallery</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.serviceImagesScroll}>
                  <View style={styles.serviceImageContainer}>
                    <Image 
                      source={{ uri: 'https://images.pexels.com/photos/3626733/pexels-photo-3626733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
                      style={styles.serviceImage}
                    />
                  </View>
                  <View style={styles.serviceImageContainer}>
                    <Image 
                      source={{ uri: 'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
                      style={styles.serviceImage}
                    />
                  </View>
                  <View style={styles.serviceImageContainer}>
                    <Image 
                      source={{ uri: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
                      style={styles.serviceImage}
                    />
                  </View>
                </ScrollView>
              </View>

              {/* Additional Details */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Additional Details</Text>
                <Text style={styles.sectionSubtitle}>
                  Provide any specific requirements or preferences (optional)
                </Text>
                
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Describe any specific needs, timing preferences, or special requirements..."
                    placeholderTextColor={CommercialColors.tertiaryLabel}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>
              </View>
            </>
          )}

          <View style={styles.bottomSpacing} />
        </ScrollView>

        <View style={styles.bottomSection}>
          <TouchableOpacity 
            style={[
              styles.continueButton,
              (!selectedProperty || !selectedService || (showServiceOptions && !selectedOption)) && styles.disabledButton
            ]} 
            onPress={handleContinue}
            disabled={!selectedProperty || !selectedService || (showServiceOptions && !selectedOption)}
          >
            <View style={styles.continueButtonBackground}>
              <Text style={styles.continueButtonText}>
                {showServiceOptions ? 'Get Instant Quote' : 'Continue'}
              </Text>
              <ChevronRight color={CommercialColors.white} size={20} />
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
  propertyList: {
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
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CommercialSpacing.md,
  },
  serviceCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: CommercialBorderRadius.large,
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
    flex: 1,
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