import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Building2, CircleCheck as CheckCircle } from 'lucide-react-native';
import { CommercialColors, CommercialTypography, CommercialBorderRadius, CommercialSpacing } from '@/themes/commercialDesignSystem';

const PROPERTY_TYPES = [
  { id: 'office', label: 'Office Building', description: 'Corporate offices, co-working spaces' },
  { id: 'retail', label: 'Retail Space', description: 'Stores, shopping centers, malls' },
  { id: 'warehouse', label: 'Warehouse', description: 'Storage, distribution centers' },
  { id: 'mixed_use', label: 'Mixed Use', description: 'Combined residential/commercial' },
  { id: 'industrial', label: 'Industrial', description: 'Manufacturing, production facilities' },
  { id: 'other', label: 'Other', description: 'Specialized commercial properties' },
];

export default function PropertySetupScreen() {
  const [formData, setFormData] = useState({
    companyName: '',
    propertyName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    propertyType: '',
    squareFootage: '',
    floors: '',
    specialInstructions: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (isVerified) setIsVerified(false);
  };

  const handlePropertyTypeSelect = (typeId: string) => {
    setFormData(prev => ({ ...prev, propertyType: typeId }));
  };

  const handleSubmit = async () => {
    const { companyName, propertyName, address, city, state, zipCode, propertyType } = formData;
    
    if (!companyName.trim() || !propertyName.trim() || !address.trim() || !city.trim() || !state.trim() || !zipCode.trim() || !propertyType) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (isMounted.current) {
        // Instead of going directly to tabs, route to service selection
        router.push({
          pathname: '/service-selection',
          params: {
            propertyType: formData.propertyType,
            squareFootage: formData.squareFootage || '10000'
          }
        });
      }
      
    } catch {
      Alert.alert('Setup Failed', 'Unable to set up your property. Please check and try again.');
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft color={CommercialColors.lightLabel} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Property Setup</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.titleSection}>
            <View style={styles.iconContainer}>
              <Building2 color={CommercialColors.systemBlue} size={32} />
            </View>
            <Text style={styles.title}>Set up your first property</Text>
            <Text style={styles.subtitle}>
              We'll use this information to provide accurate quotes and connect you with the right service providers
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Company Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your company name"
                placeholderTextColor={CommercialColors.lightTertiaryLabel}
                value={formData.companyName}
                onChangeText={(value) => handleInputChange('companyName', value)}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Property Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Downtown Office Building"
                placeholderTextColor={CommercialColors.lightTertiaryLabel}
                value={formData.propertyName}
                onChangeText={(value) => handleInputChange('propertyName', value)}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Property Type *</Text>
              <View style={styles.propertyTypeGrid}>
                {PROPERTY_TYPES.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    style={[
                      styles.propertyTypeOption,
                      formData.propertyType === type.id && styles.propertyTypeOptionSelected
                    ]}
                    onPress={() => handlePropertyTypeSelect(type.id)}
                  >
                    <Text style={[
                      styles.propertyTypeLabel,
                      formData.propertyType === type.id && styles.propertyTypeLabelSelected
                    ]}>
                      {type.label}
                    </Text>
                    <Text style={[
                      styles.propertyTypeDescription,
                      formData.propertyType === type.id && styles.propertyTypeDescriptionSelected
                    ]}>
                      {type.description}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Property Address *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter property address"
                placeholderTextColor={CommercialColors.lightTertiaryLabel}
                value={formData.address}
                onChangeText={(value) => handleInputChange('address', value)}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 2 }]}>
                <Text style={styles.label}>City *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="City name"
                  placeholderTextColor={CommercialColors.lightTertiaryLabel}
                  value={formData.city}
                  onChangeText={(value) => handleInputChange('city', value)}
                  autoCapitalize="words"
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>State *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="CA"
                  placeholderTextColor={CommercialColors.lightTertiaryLabel}
                  value={formData.state}
                  onChangeText={(value) => handleInputChange('state', value.toUpperCase())}
                  autoCapitalize="characters"
                  maxLength={2}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>ZIP Code *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter ZIP code"
                placeholderTextColor={CommercialColors.lightTertiaryLabel}
                value={formData.zipCode}
                onChangeText={(value) => handleInputChange('zipCode', value)}
                keyboardType="numeric"
                maxLength={5}
              />
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Square Footage</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 50000"
                  placeholderTextColor={CommercialColors.lightTertiaryLabel}
                  value={formData.squareFootage}
                  onChangeText={(value) => handleInputChange('squareFootage', value)}
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Floors</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 5"
                  placeholderTextColor={CommercialColors.lightTertiaryLabel}
                  value={formData.floors}
                  onChangeText={(value) => handleInputChange('floors', value)}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Special Instructions</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Access codes, special requirements, etc."
                placeholderTextColor={CommercialColors.lightTertiaryLabel}
                value={formData.specialInstructions}
                onChangeText={(value) => handleInputChange('specialInstructions', value)}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          </View>

          {isVerified && (
            <View style={styles.verificationSuccess}>
              <CheckCircle color={CommercialColors.systemBlue} size={24} />
              <Text style={styles.verificationText}>Property setup completed successfully!</Text>
            </View>
          )}

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>What happens next?</Text>
            <Text style={styles.infoText}>
              • We'll verify your property details{'\n'}
              • Connect you with local service providers{'\n'}
              • Set up your custom maintenance schedule{'\n'}
              • Calculate your initial Cerv Score
            </Text>
          </View>
        </ScrollView>

        <View style={styles.bottomSection}>
          <TouchableOpacity 
            style={[styles.submitButton, isLoading && styles.disabledButton]} 
            onPress={handleSubmit}
            disabled={isLoading || isVerified}
          >
            <View style={[
              styles.submitButtonBackground,
              isVerified && { backgroundColor: CommercialColors.systemBlue }
            ]}>
              {isLoading ? (
                <ActivityIndicator color={CommercialColors.white} size="small" />
              ) : isVerified ? (
                <>
                  <CheckCircle color={CommercialColors.white} size={20} />
                  <Text style={styles.submitButtonText}>Complete</Text>
                </>
              ) : (
                <Text style={styles.submitButtonText}>Set Up Property</Text>
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
    paddingHorizontal: CommercialSpacing.xxl,
  },
  titleSection: {
    alignItems: 'center',
    marginTop: CommercialSpacing.xxxl,
    marginBottom: 40,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: CommercialColors.systemBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: CommercialSpacing.xxl,
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
  form: {
    marginBottom: CommercialSpacing.xxxl,
  },
  inputGroup: {
    marginBottom: CommercialSpacing.xxl,
  },
  inputRow: {
    flexDirection: 'row',
    gap: CommercialSpacing.lg,
  },
  label: {
    ...CommercialTypography.headline,
    color: CommercialColors.lightLabel,
    marginBottom: CommercialSpacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
    borderRadius: CommercialBorderRadius.large,
    paddingHorizontal: CommercialSpacing.lg,
    paddingVertical: CommercialSpacing.lg,
    ...CommercialTypography.body,
    backgroundColor: CommercialColors.lightBackground,
    color: CommercialColors.lightLabel,
  },
  textArea: {
    minHeight: 80,
  },
  propertyTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CommercialSpacing.md,
  },
  propertyTypeOption: {
    flex: 1,
    minWidth: '45%',
    padding: CommercialSpacing.lg,
    borderRadius: CommercialBorderRadius.medium,
    borderWidth: 2,
    borderColor: CommercialColors.lightSeparator,
    backgroundColor: CommercialColors.lightBackground,
  },
  propertyTypeOptionSelected: {
    borderColor: CommercialColors.systemBlue,
    backgroundColor: CommercialColors.systemBlueLight,
  },
  propertyTypeLabel: {
    ...CommercialTypography.subheadline,
    fontWeight: '600',
    color: CommercialColors.lightLabel,
    marginBottom: 4,
  },
  propertyTypeLabelSelected: {
    color: CommercialColors.systemBlueDark,
  },
  propertyTypeDescription: {
    ...CommercialTypography.caption1,
    color: CommercialColors.lightSecondaryLabel,
  },
  propertyTypeDescriptionSelected: {
    color: CommercialColors.systemBlueDark,
  },
  verificationSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CommercialColors.systemBlueLight,
    paddingVertical: CommercialSpacing.lg,
    paddingHorizontal: CommercialSpacing.xl,
    borderRadius: CommercialBorderRadius.large,
    marginBottom: CommercialSpacing.xxl,
    gap: CommercialSpacing.sm,
    borderWidth: 1,
    borderColor: CommercialColors.systemBlue,
  },
  verificationText: {
    ...CommercialTypography.headline,
    color: CommercialColors.systemBlueDark,
  },
  infoCard: {
    backgroundColor: CommercialColors.lightSecondaryBackground,
    padding: CommercialSpacing.xxl,
    borderRadius: CommercialBorderRadius.large,
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
  },
  infoTitle: {
    ...CommercialTypography.headline,
    color: CommercialColors.lightLabel,
    marginBottom: CommercialSpacing.md,
  },
  infoText: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.lightSecondaryLabel,
  },
  bottomSection: {
    paddingHorizontal: CommercialSpacing.xxl,
    paddingVertical: CommercialSpacing.xxl,
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