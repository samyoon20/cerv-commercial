import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { Building2, Shield, Clock, Users } from 'lucide-react-native';
import { CommercialColors, CommercialTypography, CommercialBorderRadius, CommercialSpacing } from '@/themes/commercialDesignSystem';

export default function OnboardingScreen() {
  const handleSkip = () => {
    router.push('/auth');
  };

  const handleContinue = () => {
    router.push('/auth');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <View style={styles.overlay} />
        
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Building2 color={CommercialColors.white} size={40} />
            </View>
            <Text style={styles.logoText}>Cerv Commercial</Text>
          </View>

          <View style={styles.heroSection}>
            <Text style={styles.title}>Professional Property Management</Text>
            <Text style={styles.subtitle}>
              Streamline maintenance, manage multiple properties, and maintain excellence across your commercial portfolio
            </Text>
          </View>

          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <Shield color={CommercialColors.systemBlue} size={24} />
              <Text style={styles.featureText}>Verified Professionals</Text>
            </View>
            <View style={styles.feature}>
              <Clock color={CommercialColors.systemBlue} size={24} />
              <Text style={styles.featureText}>24/7 Support</Text>
            </View>
            <View style={styles.feature}>
              <Users color={CommercialColors.systemBlue} size={24} />
              <Text style={styles.featureText}>Multi-User Access</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <View style={styles.continueButtonBackground}>
                <Text style={styles.continueButtonText}>Get Started</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipButtonText}>Skip for now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommercialColors.lightBackground,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  backgroundImageStyle: {
    opacity: 0.8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    flex: 1,
    paddingHorizontal: CommercialSpacing.xxl,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: CommercialColors.systemBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: CommercialSpacing.lg,
  },
  logoText: {
    ...CommercialTypography.largeTitle,
    color: CommercialColors.white,
  },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: CommercialSpacing.xl,
  },
  title: {
    ...CommercialTypography.largeTitle,
    color: CommercialColors.white,
    textAlign: 'center',
    marginBottom: CommercialSpacing.lg,
  },
  subtitle: {
    ...CommercialTypography.body,
    color: CommercialColors.secondaryLabel,
    textAlign: 'center',
    maxWidth: 320,
  },
  featuresContainer: {
    paddingHorizontal: CommercialSpacing.xl,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: CommercialSpacing.xl,
    backgroundColor: CommercialColors.lightBackground,
    paddingHorizontal: CommercialSpacing.xl,
    paddingVertical: CommercialSpacing.lg,
    borderRadius: CommercialBorderRadius.large,
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
  },
  featureText: {
    ...CommercialTypography.headline,
    color: CommercialColors.lightLabel,
    marginLeft: CommercialSpacing.md,
  },
  buttonContainer: {
    gap: CommercialSpacing.lg,
  },
  continueButton: {
    borderRadius: CommercialBorderRadius.large,
    overflow: 'hidden',
  },
  continueButtonBackground: {
    backgroundColor: CommercialColors.systemBlue,
    paddingVertical: CommercialSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    ...CommercialTypography.headline,
    color: CommercialColors.white,
  },
  skipButton: {
    paddingVertical: CommercialSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButtonText: {
    ...CommercialTypography.callout,
    color: CommercialColors.tertiaryLabel,
  },
});