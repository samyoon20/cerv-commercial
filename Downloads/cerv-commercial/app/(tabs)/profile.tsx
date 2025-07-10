import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Alert,
  Switch,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, CreditCard, MapPin, Bell, CircleHelp as HelpCircle, Shield, LogOut, ChevronRight, CreditCard as Edit3 } from 'lucide-react-native';
import { CommercialColors, CommercialSpacing, CommercialTypography, CommercialBorderRadius } from '@/themes/commercialDesignSystem';

export default function ProfileTab() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing will be available soon.');
  };

  const handlePaymentMethods = () => {
    Alert.alert('Payment Methods', 'Manage your payment methods here.');
  };

  const handleAddresses = () => {
    Alert.alert('Addresses', 'Manage your service addresses here.');
  };

  const handleSupport = () => {
    Alert.alert('Support', 'Contact our support team for assistance.');
  };

  const handlePrivacy = () => {
    Alert.alert('Privacy', 'Review our privacy policy and data handling.');
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => {
          Alert.alert('Signed Out', 'You have been signed out successfully.');
        }}
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Edit3 color={CommercialColors.textSecondary} size={20} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Profile Card */}
            <View style={styles.profileCard}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <User color={CommercialColors.systemBlue} size={32} />
                </View>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>John Doe</Text>
                <Text style={styles.profileEmail}>john.doe@example.com</Text>
                <Text style={styles.profileAddress}>123 Main Street, Beverly Hills, CA 90210</Text>
              </View>
            </View>

            {/* Account Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account</Text>
              
              <TouchableOpacity style={styles.menuItem} onPress={handlePaymentMethods}>
                <View style={styles.menuItemBackground}>
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIcon}>
                      <CreditCard color={CommercialColors.textSecondary} size={20} />
                    </View>
                    <View style={styles.menuText}>
                      <Text style={styles.menuTitle}>Payment Methods</Text>
                      <Text style={styles.menuSubtitle}>Manage cards and payment options</Text>
                    </View>
                  </View>
                  <ChevronRight color={CommercialColors.textTertiary} size={20} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={handleAddresses}>
                <View style={styles.menuItemBackground}>
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIcon}>
                      <MapPin color={CommercialColors.textSecondary} size={20} />
                    </View>
                    <View style={styles.menuText}>
                      <Text style={styles.menuTitle}>Service Addresses</Text>
                      <Text style={styles.menuSubtitle}>Manage your property locations</Text>
                    </View>
                  </View>
                  <ChevronRight color={CommercialColors.textTertiary} size={20} />
                </View>
              </TouchableOpacity>
            </View>

            {/* Preferences Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preferences</Text>
              
              <View style={styles.menuItem}>
                <View style={styles.menuItemBackground}>
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIcon}>
                      <Bell color={CommercialColors.textSecondary} size={20} />
                    </View>
                    <View style={styles.menuText}>
                      <Text style={styles.menuTitle}>Push Notifications</Text>
                      <Text style={styles.menuSubtitle}>Service updates and reminders</Text>
                    </View>
                  </View>
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    trackColor={{ false: CommercialColors.surfaceTertiary, true: CommercialColors.primaryLight }}
                    thumbColor={notificationsEnabled ? CommercialColors.primary : CommercialColors.textSecondary}
                  />
                </View>
              </View>

              <View style={styles.menuItem}>
                <View style={styles.menuItemBackground}>
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIcon}>
                      <MapPin color={CommercialColors.textSecondary} size={20} />
                    </View>
                    <View style={styles.menuText}>
                      <Text style={styles.menuTitle}>Location Services</Text>
                      <Text style={styles.menuSubtitle}>For better service matching</Text>
                    </View>
                  </View>
                  <Switch
                    value={locationEnabled}
                    onValueChange={setLocationEnabled}
                    trackColor={{ false: CommercialColors.surfaceTertiary, true: CommercialColors.primaryLight }}
                    thumbColor={locationEnabled ? CommercialColors.primary : CommercialColors.textSecondary}
                  />
                </View>
              </View>
            </View>

            {/* Support Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Support</Text>
              
              <TouchableOpacity style={styles.menuItem} onPress={handleSupport}>
                <View style={styles.menuItemBackground}>
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIcon}>
                      <HelpCircle color={CommercialColors.textSecondary} size={20} />
                    </View>
                    <View style={styles.menuText}>
                      <Text style={styles.menuTitle}>Help & Support</Text>
                      <Text style={styles.menuSubtitle}>Get help with your services</Text>
                    </View>
                  </View>
                  <ChevronRight color={CommercialColors.textTertiary} size={20} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={handlePrivacy}>
                <View style={styles.menuItemBackground}>
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIcon}>
                      <Shield color={CommercialColors.textSecondary} size={20} />
                    </View>
                    <View style={styles.menuText}>
                      <Text style={styles.menuTitle}>Privacy & Security</Text>
                      <Text style={styles.menuSubtitle}>Data protection and security</Text>
                    </View>
                  </View>
                  <ChevronRight color={CommercialColors.textTertiary} size={20} />
                </View>
              </TouchableOpacity>
            </View>

            {/* Account Stats */}
            <View style={styles.statsSection}>
              <Text style={styles.sectionTitle}>Account Stats</Text>
              
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>12</Text>
                  <Text style={styles.statLabel}>Services Completed</Text>
                </View>
                
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>3</Text>
                  <Text style={styles.statLabel}>Active Services</Text>
                </View>
                
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>8.7</Text>
                  <Text style={styles.statLabel}>Home Score</Text>
                </View>
                
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>6mo</Text>
                  <Text style={styles.statLabel}>Member Since</Text>
                </View>
              </View>
            </View>

            {/* Sign Out */}
            <TouchableOpacity style={styles.signOutButton} onPress={handleLogout}>
              <View style={styles.signOutBackground}>
                <LogOut color={CommercialColors.error} size={20} />
                <Text style={styles.signOutText}>Sign Out</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.bottomSpacing} />
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
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
    paddingHorizontal: CommercialSpacing.lg,
    paddingVertical: CommercialSpacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: CommercialColors.border,
  },
  headerTitle: {
    ...CommercialTypography.title2,
    color: CommercialColors.textPrimary,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CommercialColors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: CommercialColors.border,
  },
  content: {
    flex: 1,
    paddingHorizontal: CommercialSpacing.xxl,
    paddingTop: CommercialSpacing.xl,
  },
  profileCard: {
    backgroundColor: CommercialColors.cardBackground,
    borderRadius: CommercialBorderRadius.extraLarge,
    padding: CommercialSpacing.xxl,
    marginBottom: CommercialSpacing.xxl,
    borderWidth: 0.5,
    borderColor: CommercialColors.separator,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: CommercialSpacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: CommercialColors.systemBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: CommercialColors.systemBlue,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    ...CommercialTypography.title2,
    color: CommercialColors.textPrimary,
    marginBottom: 4,
  },
  profileEmail: {
    ...CommercialTypography.body,
    color: CommercialColors.textSecondary,
    marginBottom: CommercialSpacing.sm,
  },
  profileAddress: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.textTertiary,
    textAlign: 'center',
  },
  section: {
    marginBottom: CommercialSpacing.xxxl,
  },
  sectionTitle: {
    ...CommercialTypography.headline,
    color: CommercialColors.textPrimary,
    marginBottom: CommercialSpacing.lg,
  },
  menuItem: {
    borderRadius: CommercialBorderRadius.large,
    marginBottom: CommercialSpacing.sm,
    overflow: 'hidden',
  },
  menuItemBackground: {
    backgroundColor: CommercialColors.cardBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: CommercialSpacing.lg,
    borderWidth: 0.5,
    borderColor: CommercialColors.separator,
    borderRadius: CommercialBorderRadius.large,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CommercialColors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: CommercialSpacing.lg,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    ...CommercialTypography.headline,
    color: CommercialColors.textPrimary,
    marginBottom: 2,
  },
  menuSubtitle: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.textSecondary,
  },
  statsSection: {
    marginBottom: CommercialSpacing.xxxl,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CommercialSpacing.md,
  },
  statCard: {
    backgroundColor: CommercialColors.cardBackground,
    flex: 1,
    minWidth: '45%',
    borderRadius: CommercialBorderRadius.large,
    padding: CommercialSpacing.xl,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: CommercialColors.separator,
  },
  statValue: {
    ...CommercialTypography.title2,
    color: CommercialColors.systemBlue,
    marginBottom: 4,
  },
  statLabel: {
    ...CommercialTypography.caption1,
    fontWeight: '600',
    color: CommercialColors.textSecondary,
    textAlign: 'center',
  },
  signOutButton: {
    borderRadius: CommercialBorderRadius.large,
    marginBottom: CommercialSpacing.xxxl,
    overflow: 'hidden',
  },
  signOutBackground: {
    backgroundColor: CommercialColors.errorLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: CommercialSpacing.lg,
    paddingHorizontal: CommercialSpacing.xxl,
    borderWidth: 0.5,
    borderColor: CommercialColors.error,
    gap: CommercialSpacing.sm,
    borderRadius: CommercialBorderRadius.large,
  },
  signOutText: {
    ...CommercialTypography.callout,
    fontWeight: '700',
    color: CommercialColors.error,
  },
  bottomSpacing: {
    height: CommercialSpacing.xl,
  },
});