import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Building2 } from 'lucide-react-native';
import { CommercialColors, CommercialTypography, CommercialBorderRadius, CommercialSpacing } from '@/themes/commercialDesignSystem';

export default function AuthScreen() {
  const [selectedMode, setSelectedMode] = useState<'signup' | 'login' | null>(null);

  const handleBack = () => {
    if (selectedMode) {
      setSelectedMode(null);
    } else {
      router.back();
    }
  };

  const handleSignUp = () => {
    // Skip credential collection, go directly to property setup
    router.push('/property-setup');
  };

  const handleLogin = () => {
    // For demo purposes, go directly to main app
    router.push('/(tabs)');
  };

  if (selectedMode === 'signup') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.backgroundContainer}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <ArrowLeft color={CommercialColors.lightLabel} size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create Account</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Welcome to Cerv Commercial</Text>
              <Text style={styles.subtitle}>
                Professional property management made simple
              </Text>
            </View>

            <View style={styles.benefitsList}>
              <View style={styles.benefit}>
                <View style={styles.benefitIcon}>
                  <Text style={styles.benefitEmoji}>🏢</Text>
                </View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Multi-Property Management</Text>
                  <Text style={styles.benefitText}>
                    Manage your entire commercial portfolio from one dashboard
                  </Text>
                </View>
              </View>

              <View style={styles.benefit}>
                <View style={styles.benefitIcon}>
                  <Text style={styles.benefitEmoji}>👥</Text>
                </View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Team Collaboration</Text>
                  <Text style={styles.benefitText}>
                    Multi-user access with role-based permissions
                  </Text>
                </View>
              </View>

              <View style={styles.benefit}>
                <View style={styles.benefitIcon}>
                  <Text style={styles.benefitEmoji}>📊</Text>
                </View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Detailed Reporting</Text>
                  <Text style={styles.benefitText}>
                    Comprehensive reports and analytics for your properties
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={handleSignUp}>
              <View style={styles.primaryButtonBackground}>
                <Text style={styles.primaryButtonText}>Continue</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.termsText}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  if (selectedMode === 'login') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.backgroundContainer}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <ArrowLeft color={CommercialColors.lightLabel} size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Welcome Back</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Good to see you again</Text>
              <Text style={styles.subtitle}>
                Sign in to continue managing your commercial properties
              </Text>
            </View>

            <View style={styles.loginPrompt}>
              <Text style={styles.loginPromptText}>
                For this demo, we'll take you directly to your dashboard
              </Text>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
              <View style={styles.primaryButtonBackground}>
                <Text style={styles.primaryButtonText}>Continue to Dashboard</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft color={CommercialColors.lightLabel} size={24} />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Building2 color={CommercialColors.systemBlue} size={24} />
            <Text style={styles.logoText}>Cerv Commercial</Text>
          </View>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Let's get started</Text>
            <Text style={styles.subtitle}>
              Choose how you'd like to continue with Cerv Commercial
            </Text>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={() => setSelectedMode('signup')}
            >
              <View style={styles.primaryButtonBackground}>
                <Text style={styles.primaryButtonText}>Create Account</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={() => setSelectedMode('login')}
            >
              <Text style={styles.secondaryButtonText}>Log In</Text>
            </TouchableOpacity>
          </View>
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
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CommercialSpacing.sm,
  },
  logoText: {
    ...CommercialTypography.title3,
    color: CommercialColors.lightLabel,
  },
  content: {
    flex: 1,
    paddingHorizontal: CommercialSpacing.xxl,
    paddingTop: 40,
  },
  titleSection: {
    marginBottom: 40,
    alignItems: 'center',
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
    maxWidth: 280,
  },
  buttonGroup: {
    gap: CommercialSpacing.lg,
    marginTop: 'auto',
    marginBottom: 40,
  },
  primaryButton: {
    borderRadius: CommercialBorderRadius.large,
    overflow: 'hidden',
  },
  primaryButtonBackground: {
    backgroundColor: CommercialColors.systemBlue,
    paddingVertical: CommercialSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    ...CommercialTypography.headline,
    color: CommercialColors.white,
  },
  secondaryButton: {
    paddingVertical: CommercialSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: CommercialColors.lightSeparator,
    borderRadius: CommercialBorderRadius.large,
  },
  secondaryButtonText: {
    ...CommercialTypography.headline,
    color: CommercialColors.lightLabel,
  },
  benefitsList: {
    marginBottom: 40,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: CommercialSpacing.xxl,
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: CommercialColors.systemBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: CommercialSpacing.lg,
  },
  benefitEmoji: {
    fontSize: 20,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    ...CommercialTypography.headline,
    color: CommercialColors.lightLabel,
    marginBottom: CommercialSpacing.xs,
  },
  benefitText: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.lightSecondaryLabel,
  },
  termsText: {
    ...CommercialTypography.caption1,
    color: CommercialColors.lightTertiaryLabel,
    textAlign: 'center',
    marginTop: CommercialSpacing.lg,
    paddingHorizontal: CommercialSpacing.xl,
  },
  loginPrompt: {
    backgroundColor: CommercialColors.systemBlueLight,
    padding: CommercialSpacing.xl,
    borderRadius: CommercialBorderRadius.medium,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: CommercialColors.systemBlue,
  },
  loginPromptText: {
    ...CommercialTypography.subheadline,
    fontWeight: '500',
    color: CommercialColors.systemBlueDark,
    textAlign: 'center',
  },
});