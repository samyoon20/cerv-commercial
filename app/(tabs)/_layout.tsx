import { Tabs } from 'expo-router';
import { Building2, FileText, MessageCircle, User } from 'lucide-react-native';
import { CommercialColors, CommercialTypography } from '@/themes/commercialDesignSystem';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: CommercialColors.systemBlue,
        tabBarInactiveTintColor: CommercialColors.systemGray,
        tabBarStyle: {
          backgroundColor: CommercialColors.cardBackground,
          borderTopWidth: 0.5,
          borderTopColor: CommercialColors.separator,
          paddingTop: 6,
          paddingBottom: 34, // Account for safe area
          height: 83,
        },
        tabBarLabelStyle: {
          ...CommercialTypography.caption2,
          fontWeight: 500,
          marginTop: 2,
        },
        tabBarItemStyle: {
          paddingTop: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ size, color }) => (
            <Building2 size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Reports', 
          tabBarIcon: ({ size, color }) => (
            <FileText size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}