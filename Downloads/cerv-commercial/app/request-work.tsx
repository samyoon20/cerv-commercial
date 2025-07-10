import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, Camera, Calendar, DollarSign, Building2, Wrench, Paintbrush, Leaf, Shield, Zap, Droplets, ChevronRight } from 'lucide-react-native';
import { CommercialColors, CommercialTypography, CommercialBorderRadius, CommercialSpacing } from '@/themes/commercialDesignSystem';
import type { CommercialProperty } from '@/types/commercial';

// Mock data for available properties
const MOCK_PROPERTIES: CommercialProperty[] = [
  {
    id: 'prop-1',
    name: 'Downtown Office Tower',
    address: '123 Business Ave',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90210',
    propertyType: 'office',
    squareFootage: 150000,
    floors: 25,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prop-2',
    name: 'Westside Retail Center',
    address: '456 Commerce St',
    city: 'Santa Monica',
    state: 'CA',
    zipCode: '90401',
    propertyType: 'retail',
    squareFootage: 75000,
    floors: 2,
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prop-3',
    name: 'Industrial Park Unit A',
    address: '789 Industrial Blvd',
    city: 'Carson',
    state: 'CA',
    zipCode: '90745',
    propertyType: 'warehouse',
    squareFootage: 200000,
    floors: 1,
    isActive: true,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: new Date().toISOString(),
  },
];

// Available services based on property type
const PROPERTY_TYPE_SERVICES = {
  'office': [
    {
      id: 'hvac-upgrade',
      name: 'HVAC System Upgrade',
      description: 'Upgrade your HVAC system for better energy efficiency and performance',
      icon: Zap,
      estimatedCost: '15,000 - 50,000',
      estimatedTime: '2-4 weeks',
    },
    {
      id: 'smart-lighting',
      name: 'Smart Lighting Installation',
      description: 'Install smart lighting systems with motion sensors and energy monitoring',
      icon: Zap,
      estimatedCost: '8,000 - 25,000',
      estimatedTime: '1-2 weeks',
    },
    {
      id: 'office-renovation',
      name: 'Office Space Renovation',
      description: 'Modernize your office space with new layouts, furniture, and finishes',
      icon: Paintbrush,
      estimatedCost: '50,000 - 200,000',
      estimatedTime: '4-12 weeks',
    },
    {
      id: 'security-upgrade',
      name: 'Security System Upgrade',
      description: 'Enhance building security with modern access control and surveillance',
      icon: Shield,
      estimatedCost: '10,000 - 30,000',
      estimatedTime: '2-3 weeks',
    },
  ],
  'retail': [
    {
      id: 'storefront-renovation',
      name: 'Storefront Renovation',
      description: 'Update your storefront with modern design and improved visibility',
      icon: Paintbrush,
      estimatedCost: '20,000 - 75,000',
      estimatedTime: '3-6 weeks',
    },
    {
      id: 'retail-lighting',
      name: 'Retail Lighting Upgrade',
      description: 'Enhance product displays with specialized retail lighting solutions',
      icon: Zap,
      estimatedCost: '5,000 - 15,000',
      estimatedTime: '1-2 weeks',
    },
    {
      id: 'security-system',
      name: 'Retail Security System',
      description: 'Install comprehensive security with inventory protection features',
      icon: Shield,
      estimatedCost: '8,000 - 25,000',
      estimatedTime: '1-3 weeks',
    },
    {
      id: 'hvac-retail',
      name: 'HVAC Optimization',
      description: 'Optimize HVAC for retail environments with customer comfort focus',
      icon: Zap,
      estimatedCost: '10,000 - 30,000',
      estimatedTime: '2-4 weeks',
    },
  ],
  'warehouse': [
    {
      id: 'loading-dock',
      name: 'Loading Dock Upgrade',
      description: 'Modernize loading docks with improved safety and efficiency features',
      icon: Wrench,
      estimatedCost: '25,000 - 100,000',
      estimatedTime: '3-8 weeks',
    },
    {
      id: 'warehouse-lighting',
      name: 'Industrial Lighting System',
      description: 'High-efficiency lighting designed for warehouse environments',
      icon: Zap,
      estimatedCost: '15,000 - 50,000',
      estimatedTime: '2-4 weeks',
    },
    {
      id: 'floor-resurfacing',
      name: 'Concrete Floor Resurfacing',
      description: 'Repair and resurface concrete floors for durability and safety',
      icon: Paintbrush,
      estimatedCost: '30,000 - 120,000',
      estimatedTime: '2-6 weeks',
    },
    {
      id: 'warehouse-security',
      name: 'Warehouse Security System',
      description: 'Comprehensive security with inventory and access control',
      icon: Shield,
      estimatedCost: '20,000 - 60,000',
      estimatedTime: '2-5 weeks',
    },
  ],
  'mixed_use': [
    {
      id: 'mixed-renovation',
      name: 'Mixed-Use Renovation',
      description: 'Comprehensive renovation for mixed-use properties',
      icon: Paintbrush,
      estimatedCost: '100,000 - 500,000',
      estimatedTime: '8-24 weeks',
    },
    {
      id: 'mixed-hvac',
      name: 'Multi-Zone HVAC System',
      description: 'Specialized HVAC solutions for mixed residential and commercial spaces',
      icon: Zap,
      estimatedCost: '40,000 - 150,000',
      estimatedTime: '4-10 weeks',
    },
    {
      id: 'mixed-security',
      name: 'Mixed-Use Security System',
      description: 'Integrated security for diverse tenant requirements',
      icon: Shield,
      estimatedCost: '25,000 - 80,000',
      estimatedTime: '3-8 weeks',
    },
  ],
  'industrial': [
    {
      id: 'industrial-electrical',
      name: 'Industrial Electrical Upgrade',
      description: 'Heavy-duty electrical systems for industrial applications',
      icon: Zap,
      estimatedCost: '50,000 - 200,000',
      estimatedTime: '4-12 weeks',
    },
    {
      id: 'industrial-plumbing',
      name: 'Industrial Plumbing Systems',
      description: 'Specialized plumbing for industrial processes and requirements',
      icon: Droplets,
      estimatedCost: '30,000 - 150,000',
      estimatedTime: '3-10 weeks',
    },
    {
      id: 'industrial-ventilation',
      name: 'Industrial Ventilation System',
      description: 'Advanced ventilation and air filtration for industrial environments',
      icon: Zap,
      estimatedCost: '40,000 - 180,000',
      estimatedTime: '4-12 weeks',
    },
  ],
  'other': [
    {
      id: 'general-renovation',
      name: 'General Renovation',
      description: 'Comprehensive property renovation and modernization',
      icon: Paintbrush,
      estimatedCost: 'Varies',
      estimatedTime: 'Varies',
    },
    {
      id: 'custom-project',
      name: 'Custom Project',
      description: 'Tailored solutions for your specific property needs',
      icon: Wrench,
      estimatedCost: 'Custom quote',
      estimatedTime: 'Based on requirements',
    },
  ],
};

// Common services available for all property types
const COMMON_SERVICES = [
  {
    id: 'energy-audit',
    name: 'Energy Efficiency Audit',
    description: 'Comprehensive assessment of energy usage with improvement recommendations',
    icon: Zap,
    estimatedCost: '2,500 - 8,000',
    estimatedTime: '1-2 weeks',
  },
  {
    id: 'landscaping-redesign',
    name: 'Landscaping Redesign',
    description: 'Professional landscaping design and implementation for your property',
    icon: Leaf,
    estimatedCost: '10,000 - 50,000',
    estimatedTime: '2-6 weeks',
  },
  {
    id: 'plumbing-upgrade',
    name: 'Plumbing System Upgrade',
    description: 'Modernize plumbing systems for better efficiency and reliability',
    icon: Droplets,
    estimatedCost: '15,000 - 75,000',
    estimatedTime: '2-8 weeks',
  },
  {
    id: 'ada-compliance',
    name: 'ADA Compliance Upgrade',
    description: 'Ensure your property meets all ADA accessibility requirements',
    icon: Wrench,
    estimatedCost: '8,000 - 40,000',
    estimatedTime: '2-6 weeks',
  },
];

export default function RequestWorkScreen() {
  const [selectedProperty, setSelectedProperty] = useState<CommercialProperty | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [requestTitle, setRequestTitle] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  const [preferredTimeline, setPreferredTimeline] = useState<'asap' | '1-3_months' | '3-6_months' | 'flexible'>('flexible');
  const [budget, setBudget] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handlePropertySelect = (property: CommercialProperty) => {
    setSelectedProperty(property);
    setSelectedService(null); // Reset service selection when property changes
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    
    // Auto-fill title based on service name
    const propertyServices = getServicesForProperty();
    const selectedServiceObj = propertyServices.find(s => s.id === serviceId);
    if (selectedServiceObj) {
      setRequestTitle(selectedServiceObj.name);
    }
  };

  const handleAddPhoto = () => {
    // In a real app, this would use expo-image-picker
    // For demo purposes, we'll add a mock photo URL
    const mockPhotos = [
      'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ];
    
    const randomPhoto = mockPhotos[Math.floor(Math.random() * mockPhotos.length)];
    
    if (photos.length < 5) {
      setPhotos([...photos, randomPhoto]);
    } else {
      Alert.alert('Maximum Photos', 'You can add up to 5 photos per request.');
    }
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };

  const handleSubmitRequest = async () => {
    if (!selectedProperty) {
      Alert.alert('Missing Information', 'Please select a property.');
      return;
    }

    if (!selectedService) {
      Alert.alert('Missing Information', 'Please select a service.');
      return;
    }

    if (!requestTitle.trim()) {
      Alert.alert('Missing Information', 'Please provide a title for your request.');
      return;
    }

    if (!requestDescription.trim()) {
      Alert.alert('Missing Information', 'Please provide a description of your request.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Request Submitted',
        'Your work request has been successfully submitted. We will contact you with a quote within 2 business days.',
        [
          { 
            text: 'OK', 
            onPress: () => {
              router.back();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getServicesForProperty = () => {
    if (!selectedProperty) return [];
    
    const propertyType = selectedProperty.propertyType as keyof typeof PROPERTY_TYPE_SERVICES;
    const typeSpecificServices = PROPERTY_TYPE_SERVICES[propertyType] || [];
    
    return [...typeSpecificServices, ...COMMON_SERVICES];
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundContainer}>
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
              <Plus color={CommercialColors.systemBlue} size={32} />
            </View>
            <Text style={styles.title}>Request Additional Services</Text>
            <Text style={styles.subtitle}>
              Submit a request for additional work or improvements to your property
            </Text>
          </View>

          {/* Property Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Property</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.propertyScroll}
            >
              {MOCK_PROPERTIES.map(property => (
                <TouchableOpacity
                  key={property.id}
                  style={[
                    styles.propertyCard,
                    selectedProperty?.id === property.id && styles.propertyCardSelected
                  ]}
                  onPress={() => handlePropertySelect(property)}
                >
                  <View style={styles.propertyCardContent}>
                    <View style={styles.propertyIcon}>
                      <Building2 
                        color={selectedProperty?.id === property.id ? CommercialColors.white : CommercialColors.systemBlue} 
                        size={24} 
                      />
                    </View>
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
                      {property.city}, {property.state}
                    </Text>
                    <Text style={[
                      styles.propertyType,
                      selectedProperty?.id === property.id && styles.propertyTypeSelected
                    ]}>
                      {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1).replace('_', ' ')} • {property.squareFootage.toLocaleString()} sq ft
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Service Selection */}
          {selectedProperty && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Select Service</Text>
              <Text style={styles.sectionSubtitle}>
                Choose from services available for your property type
              </Text>
              
              <View style={styles.servicesList}>
                {getServicesForProperty().map(service => {
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
                          styles.serviceIcon,
                          isSelected && styles.serviceIconSelected
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
                            <View style={styles.serviceDetail}>
                              <DollarSign 
                                color={isSelected ? CommercialColors.white : CommercialColors.lightSecondaryLabel} 
                                size={14} 
                              />
                              <Text style={[
                                styles.serviceDetailText,
                                isSelected && styles.serviceDetailTextSelected
                              ]}>
                                Est. ${service.estimatedCost}
                              </Text>
                            </View>
                            <View style={styles.serviceDetail}>
                              <Calendar 
                                color={isSelected ? CommercialColors.white : CommercialColors.lightSecondaryLabel} 
                                size={14} 
                              />
                              <Text style={[
                                styles.serviceDetailText,
                                isSelected && styles.serviceDetailTextSelected
                              ]}>
                                {service.estimatedTime}
                              </Text>
                            </View>
                          </View>
                        </View>
                        
                        <View style={[
                          styles.checkboxContainer,
                          isSelected && styles.checkboxContainerSelected
                        ]}>
                          {isSelected && <Plus color={CommercialColors.white} size={16} />}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* Request Details */}
          {selectedService && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Request Details</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Title *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Brief title for your request"
                  placeholderTextColor={CommercialColors.lightTertiaryLabel}
                  value={requestTitle}
                  onChangeText={setRequestTitle}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Description *</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Detailed description of what you need"
                  placeholderTextColor={CommercialColors.lightTertiaryLabel}
                  value={requestDescription}
                  onChangeText={setRequestDescription}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Preferred Timeline</Text>
                <View style={styles.timelineOptions}>
                  {[
                    { id: 'asap', label: 'ASAP' },
                    { id: '1-3_months', label: '1-3 Months' },
                    { id: '3-6_months', label: '3-6 Months' },
                    { id: 'flexible', label: 'Flexible' },
                  ].map((timeline) => (
                    <TouchableOpacity
                      key={timeline.id}
                      style={[
                        styles.timelineOption,
                        preferredTimeline === timeline.id && styles.timelineOptionSelected
                      ]}
                      onPress={() => setPreferredTimeline(timeline.id as any)}
                    >
                      <Text style={[
                        styles.timelineText,
                        preferredTimeline === timeline.id && styles.timelineTextSelected
                      ]}>
                        {timeline.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Budget (Optional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Your budget for this work"
                  placeholderTextColor={CommercialColors.lightTertiaryLabel}
                  value={budget}
                  onChangeText={setBudget}
                  keyboardType="numeric"
                />
              </View>
            </View>
          )}

          {/* Photos */}
          {selectedService && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Photos (Optional)</Text>
              <Text style={styles.sectionSubtitle}>Add photos to help us understand your requirements</Text>
              
              <View style={styles.photoGrid}>
                {photos.map((photo, index) => (
                  <View key={index} style={styles.photoContainer}>
                    <Image source={{ uri: photo }} style={styles.photoThumbnail} />
                    <TouchableOpacity 
                      style={styles.removePhotoButton}
                      onPress={() => handleRemovePhoto(index)}
                    >
                      <X color={CommercialColors.white} size={16} />
                    </TouchableOpacity>
                  </View>
                ))}
                
                {photos.length < 5 && (
                  <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto}>
                    <View style={styles.addPhotoContent}>
                      <Camera color={CommercialColors.lightSecondaryLabel} size={24} />
                      <Text style={styles.addPhotoText}>Add Photo</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}

          {/* Additional Notes */}
          {selectedService && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Additional Notes (Optional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Any additional information or special requirements"
                placeholderTextColor={CommercialColors.lightTertiaryLabel}
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          )}

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>How it works</Text>
            <View style={styles.infoStep}>
              <View style={styles.infoStepNumber}>
                <Text style={styles.infoStepNumberText}>1</Text>
              </View>
              <Text style={styles.infoStepText}>Submit your work request with details</Text>
            </View>
            <View style={styles.infoStep}>
              <View style={styles.infoStepNumber}>
                <Text style={styles.infoStepNumberText}>2</Text>
              </View>
              <Text style={styles.infoStepText}>Receive a detailed quote within 2 business days</Text>
            </View>
            <View style={styles.infoStep}>
              <View style={styles.infoStepNumber}>
                <Text style={styles.infoStepNumberText}>3</Text>
              </View>
              <Text style={styles.infoStepText}>Review and approve the quote</Text>
            </View>
            <View style={styles.infoStep}>
              <View style={styles.infoStepNumber}>
                <Text style={styles.infoStepNumberText}>4</Text>
              </View>
              <Text style={styles.infoStepText}>We'll schedule and complete the work</Text>
            </View>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        <View style={styles.bottomSection}>
          <TouchableOpacity 
            style={[
              styles.submitButton, 
              (!selectedProperty || !selectedService || !requestTitle || !requestDescription || isSubmitting) && styles.disabledButton
            ]}
            onPress={handleSubmitRequest}
            disabled={!selectedProperty || !selectedService || !requestTitle || !requestDescription || isSubmitting}
          >
            <View style={styles.submitButtonBackground}>
              {isSubmitting ? (
                <ActivityIndicator color={CommercialColors.white} size="small" />
              ) : (
                <Text style={styles.submitButtonText}>Submit Work Request</Text>
              )}
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
    paddingHorizontal: CommercialSpacing.lg,
  },
  titleSection: {
    alignItems: 'center',
    marginTop: CommercialSpacing.xxl,
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
    marginBottom: CommercialSpacing.md,
  },
  propertyScroll: {
    marginHorizontal: -CommercialSpacing.lg,
    paddingHorizontal: CommercialSpacing.lg,
  },
  propertyCard: {
    width: 200,
    borderRadius: CommercialBorderRadius.large,
    overflow: 'hidden',
    marginRight: CommercialSpacing.md,
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
  },
  propertyCardSelected: {
    borderColor: CommercialColors.systemBlue,
    backgroundColor: CommercialColors.systemBlue,
  },
  propertyCardContent: {
    padding: CommercialSpacing.md,
    alignItems: 'center',
  },
  propertyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: CommercialColors.systemBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: CommercialSpacing.sm,
  },
  propertyName: {
    ...CommercialTypography.headline,
    color: CommercialColors.lightLabel,
    textAlign: 'center',
    marginBottom: 4,
  },
  propertyNameSelected: {
    color: CommercialColors.white,
  },
  propertyAddress: {
    ...CommercialTypography.caption1,
    color: CommercialColors.lightSecondaryLabel,
    textAlign: 'center',
    marginBottom: 4,
  },
  propertyAddressSelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  propertyType: {
    ...CommercialTypography.caption1,
    color: CommercialColors.lightTertiaryLabel,
    textAlign: 'center',
  },
  propertyTypeSelected: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  servicesList: {
    gap: CommercialSpacing.md,
  },
  serviceCard: {
    borderRadius: CommercialBorderRadius.large,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
    backgroundColor: CommercialColors.lightBackground,
  },
  serviceCardSelected: {
    borderColor: CommercialColors.systemBlue,
    backgroundColor: CommercialColors.systemBlue,
  },
  serviceCardContent: {
    padding: CommercialSpacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: CommercialSpacing.md,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: CommercialColors.systemBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceIconSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    ...CommercialTypography.headline,
    color: CommercialColors.lightLabel,
    marginBottom: 4,
  },
  serviceNameSelected: {
    color: CommercialColors.white,
  },
  serviceDescription: {
    ...CommercialTypography.caption1,
    color: CommercialColors.lightSecondaryLabel,
    marginBottom: 8,
  },
  serviceDescriptionSelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  serviceDetails: {
    flexDirection: 'row',
    gap: CommercialSpacing.md,
  },
  serviceDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  serviceDetailText: {
    ...CommercialTypography.caption1,
    color: CommercialColors.lightSecondaryLabel,
  },
  serviceDetailTextSelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxContainerSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  inputGroup: {
    marginBottom: CommercialSpacing.lg,
  },
  label: {
    ...CommercialTypography.subheadline,
    fontWeight: '600',
    color: CommercialColors.lightLabel,
    marginBottom: CommercialSpacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
    borderRadius: CommercialBorderRadius.medium,
    paddingHorizontal: CommercialSpacing.md,
    paddingVertical: CommercialSpacing.md,
    ...CommercialTypography.body,
    backgroundColor: CommercialColors.lightBackground,
    color: CommercialColors.lightLabel,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  timelineOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CommercialSpacing.sm,
  },
  timelineOption: {
    paddingHorizontal: CommercialSpacing.md,
    paddingVertical: CommercialSpacing.sm,
    borderRadius: CommercialBorderRadius.medium,
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
    backgroundColor: CommercialColors.lightBackground,
  },
  timelineOptionSelected: {
    borderColor: CommercialColors.systemBlue,
    backgroundColor: CommercialColors.systemBlueLight,
  },
  timelineText: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.lightLabel,
  },
  timelineTextSelected: {
    color: CommercialColors.systemBlueDark,
    fontWeight: '600',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CommercialSpacing.md,
  },
  photoContainer: {
    width: 100,
    height: 100,
    borderRadius: CommercialBorderRadius.medium,
    overflow: 'hidden',
    position: 'relative',
  },
  photoThumbnail: {
    width: '100%',
    height: '100%',
  },
  removePhotoButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoButton: {
    width: 100,
    height: 100,
    borderRadius: CommercialBorderRadius.medium,
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoContent: {
    alignItems: 'center',
    gap: 8,
  },
  addPhotoText: {
    ...CommercialTypography.caption1,
    color: CommercialColors.lightSecondaryLabel,
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
  infoStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: CommercialSpacing.sm,
    gap: CommercialSpacing.sm,
  },
  infoStepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: CommercialColors.systemBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoStepNumberText: {
    ...CommercialTypography.caption1,
    fontWeight: '600',
    color: CommercialColors.white,
  },
  infoStepText: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.lightSecondaryLabel,
    flex: 1,
  },
  bottomSpacing: {
    height: CommercialSpacing.xl,
  },
  bottomSection: {
    paddingHorizontal: CommercialSpacing.lg,
    paddingVertical: CommercialSpacing.lg,
    borderTopWidth: 1,
    borderTopColor: CommercialColors.lightSeparator,
  },
  submitButton: {
    borderRadius: CommercialBorderRadius.large,
    overflow: 'hidden',
  },
  disabledButton: {
    opacity: 0.7,
  },
  submitButtonBackground: {
    backgroundColor: CommercialColors.systemBlue,
    paddingVertical: CommercialSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: CommercialSpacing.sm,
  },
  submitButtonText: {
    ...CommercialTypography.headline,
    color: CommercialColors.white,
  },
});