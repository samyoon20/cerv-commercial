import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Alert 
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

const PROPERTY_TYPE_SERVICES = {
  'office': [
    {
      id: 'janitorial-services',
      name: 'Janitorial Services',
      description: 'Professional cleaning services for office spaces',
      icon: Paintbrush,
      estimatedCost: '500 - 2,000',
      estimatedTime: 'Daily/Weekly'
    },
    {
      id: 'pest-services',
      name: 'Pest Services',
      description: 'Comprehensive pest control for office environments',
      icon: Shield,
      estimatedCost: '200 - 600',
      estimatedTime: '1-2 days'
    }
  ],
  'retail': [
    {
      id: 'janitorial-services',
      name: 'Janitorial Services',
      description: 'Retail space cleaning services',
      icon: Paintbrush,
      estimatedCost: '400 - 1,500',
      estimatedTime: 'Daily/Weekly'
    }
  ],
  'warehouse': [
    {
      id: 'janitorial-services',
      name: 'Janitorial Services',
      description: 'Industrial cleaning services',
      icon: Paintbrush,
      estimatedCost: '800 - 3,000',
      estimatedTime: 'Weekly'
    }
  ],
  'mixed_use': [
    {
      id: 'janitorial-services',
      name: 'Janitorial Services',
      description: 'Comprehensive cleaning for mixed-use properties',
      icon: Paintbrush,
      estimatedCost: '1,000 - 4,000',
      estimatedTime: 'Daily/Weekly'
    }
  ],
  'other': [
    {
      id: 'general-maintenance',
      name: 'General Maintenance',
      description: 'Basic maintenance services',
      icon: Wrench,
      estimatedCost: '200 - 1,000',
      estimatedTime: 'As needed'
    }
  ]
};

export default function RequestWorkScreen() {
  const [selectedProperty, setSelectedProperty] = useState<CommercialProperty | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [description, setDescription] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handlePropertySelect = (property: CommercialProperty) => {
    setSelectedProperty(property);
    setSelectedService(null);
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const handleContinue = () => {
    if (!selectedProperty || !selectedService) {
      Alert.alert('Missing Information', 'Please select a property and service before continuing.');
      return;
    }

    router.push({
      pathname: '/service-selection',
      params: {
        propertyType: selectedProperty.propertyType,
        squareFootage: selectedProperty.squareFootage.toString()
      }
    });
  };

  const getServicesForProperty = () => {
    if (!selectedProperty) return [];
    return PROPERTY_TYPE_SERVICES[selectedProperty.propertyType] || PROPERTY_TYPE_SERVICES['other'];
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft color={CommercialColors.lightLabel} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Request Work</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
                Recommended services for {selectedProperty.propertyType} properties
              </Text>
              
              <View style={styles.serviceList}>
                {getServicesForProperty().map((service) => {
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
                        
                        <View style={styles.serviceInfo}>
                          <Text style={[
                            styles.serviceName,
                            selectedService === service.id && styles.serviceNameSelected
                          ]}>
                            {service.name}
                          </Text>
                          <Text style={[
                            styles.serviceDescription,
                            selectedService === service.id && styles.serviceDescriptionSelected
                          ]}>
                            {service.description}
                          </Text>
                          <View style={styles.serviceEstimates}>
                            <Text style={[
                              styles.serviceEstimate,
                              selectedService === service.id && styles.serviceEstimateSelected
                            ]}>
                              Cost: ${service.estimatedCost}
                            </Text>
                            <Text style={[
                              styles.serviceEstimate,
                              selectedService === service.id && styles.serviceEstimateSelected
                            ]}>
                              Time: {service.estimatedTime}
                            </Text>
                          </View>
                        </View>
                        
                        <View style={[
                          styles.radioButton,
                          selectedService === service.id && styles.radioButtonSelected
                        ]}>
                          {selectedService === service.id && (
                            <View style={styles.radioButtonInner} />
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* Additional Details */}
          {selectedService && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Additional Details</Text>
              <Text style={styles.sectionSubtitle}>
                Provide any specific requirements or preferences (optional)
              </Text>
              
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Describe any specific needs, timing preferences, or special requirements..."
                  placeholderTextColor={CommercialColors.lightTertiaryLabel}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </View>
          )}

          <View style={styles.bottomSpacing} />
        </ScrollView>

        <View style={styles.bottomSection}>
          <TouchableOpacity 
            style={[
              styles.continueButton,
              (!selectedProperty || !selectedService) && styles.disabledButton
            ]} 
            onPress={handleContinue}
            disabled={!selectedProperty || !selectedService}
          >
            <View style={styles.continueButtonBackground}>
              <Text style={styles.continueButtonText}>Get Instant Quote</Text>
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
    backgroundColor: CommercialColors.lightBackground,
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
    borderBottomColor: CommercialColors.lightSeparator,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CommercialColors.lightSecondaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...CommercialTypography.headline,
    color: CommercialColors.lightLabel,
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
    color: CommercialColors.lightLabel,
    textAlign: 'center',
    marginBottom: CommercialSpacing.md,
  },
  subtitle: {
    ...CommercialTypography.body,
    color: CommercialColors.lightSecondaryLabel,
    textAlign: 'center',
    maxWidth: 320,
  },
  section: {
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
  propertyList: {
    gap: CommercialSpacing.md,
  },
  propertyCard: {
    borderRadius: CommercialBorderRadius.large,
    borderWidth: 2,
    borderColor: CommercialColors.lightSeparator,
    backgroundColor: CommercialColors.lightBackground,
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
    color: CommercialColors.lightLabel,
    marginBottom: 2,
  },
  propertyNameSelected: {
    color: CommercialColors.systemBlueDark,
  },
  propertyAddress: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.lightSecondaryLabel,
    marginBottom: 2,
  },
  propertyAddressSelected: {
    color: CommercialColors.systemBlueDark,
  },
  propertyDetails: {
    ...CommercialTypography.caption1,
    color: CommercialColors.lightTertiaryLabel,
  },
  propertyDetailsSelected: {
    color: CommercialColors.systemBlue,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: CommercialColors.lightSeparator,
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
    gap: CommercialSpacing.md,
  },
  serviceCard: {
    borderRadius: CommercialBorderRadius.large,
    borderWidth: 2,
    borderColor: CommercialColors.lightSeparator,
    backgroundColor: CommercialColors.lightBackground,
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
    gap: CommercialSpacing.md,
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
  serviceName: {
    ...CommercialTypography.headline,
    color: CommercialColors.lightLabel,
    marginBottom: 2,
  },
  serviceNameSelected: {
    color: CommercialColors.systemBlueDark,
  },
  serviceDescription: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.lightSecondaryLabel,
    marginBottom: CommercialSpacing.xs,
  },
  serviceDescriptionSelected: {
    color: CommercialColors.systemBlueDark,
  },
  serviceEstimates: {
    flexDirection: 'row',
    gap: CommercialSpacing.md,
  },
  serviceEstimate: {
    ...CommercialTypography.caption1,
    color: CommercialColors.lightTertiaryLabel,
  },
  serviceEstimateSelected: {
    color: CommercialColors.systemBlue,
  },
  textInputContainer: {
    borderRadius: CommercialBorderRadius.large,
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
    backgroundColor: CommercialColors.lightSecondaryBackground,
    overflow: 'hidden',
  },
  textInput: {
    ...CommercialTypography.body,
    color: CommercialColors.lightLabel,
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
    borderTopColor: CommercialColors.lightSeparator,
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