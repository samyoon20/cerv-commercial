// Commercial Apple-inspired design system for Cerv Commercial
export const CommercialColors = {
  // Light Theme for Onboarding/Auth
  lightBackground: '#FFFFFF',
  lightSecondaryBackground: '#F8F9FA',
  lightTertiaryBackground: '#F1F3F4',
  
  // Dark Theme for Main App (Apple-inspired)
  background: '#000000',
  secondaryBackground: '#1C1C1E',
  tertiaryBackground: '#2C2C2E', 
  groupedBackground: '#000000',
  
  // Card/Surface Colors
  cardBackground: '#1C1C1E',
  elevatedBackground: '#2C2C2E',
  
  // Text Colors (Dark Mode)
  label: '#FFFFFF',
  secondaryLabel: '#EBEBF599',
  tertiaryLabel: '#EBEBF54D',
  quaternaryLabel: '#EBEBF52E',
  
  // Additional text colors for consistency
  textPrimary: '#FFFFFF',
  textSecondary: '#EBEBF599',
  textTertiary: '#EBEBF54D',
  
  // Light Text Colors (for onboarding)
  lightLabel: '#000000',
  lightSecondaryLabel: '#6B7280',
  lightTertiaryLabel: '#9CA3AF',
  
  // Separator Colors
  separator: '#38383A',
  opaqueSeparator: '#38383A',
  lightSeparator: '#E5E7EB',
  border: '#38383A',
  
  // Fill Colors (Dark Mode)
  systemFill: '#7878805C',
  secondarySystemFill: '#78788052',
  tertiarySystemFill: '#7676803D',
  quaternarySystemFill: '#7676802E',
  
  // Apple-inspired Grays
  systemGray: '#8E8E93',
  systemGray2: '#636366',
  systemGray3: '#48484A',
  systemGray4: '#3A3A3C',
  systemGray5: '#2C2C2E',
  systemGray6: '#1C1C1E',
  
  // Primary System Colors (Blue-focused instead of green)
  systemBlue: '#007AFF',
  systemBlueLight: '#007AFF33',
  systemBlueDark: '#0056CC',
  
  // Secondary Colors
  systemPurple: '#5856D6',
  systemPurpleLight: '#5856D633',
  
  // Success Colors (minimal green usage)
  systemGreen: '#34C759',
  systemGreenLight: '#34C75933',
  
  // Warning/Alert Colors
  systemOrange: '#FF9500',
  systemOrangeLight: '#FF950033',
  systemRed: '#FF3B30',
  systemRedLight: '#FF3B3033',
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  lightGray: '#F2F2F7',
  mediumGray: '#C7C7CC',
  darkGray: '#8E8E93',
  
  // Additional surface colors
  surface: '#1C1C1E',
  surfaceSecondary: '#2C2C2E',
  surfaceTertiary: '#3A3A3C',
  
  // Primary colors for consistency
  primary: '#007AFF',
  primaryLight: '#007AFF33',
  primaryDark: '#0056CC',
};

export const CommercialShadows = {
  // Apple-style shadows
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  
  elevated: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  floating: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

export const CommercialSpacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const CommercialTypography = {
  // Apple San Francisco font system
  largeTitle: {
    fontSize: 34,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
    fontWeight: 700 as const,
    lineHeight: 41,
    letterSpacing: 0.37,
  },
  
  title1: {
    fontSize: 28,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
    fontWeight: 700 as const,
    lineHeight: 34,
    letterSpacing: 0.36,
  },
  
  title2: {
    fontSize: 22,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
    fontWeight: 700 as const,
    lineHeight: 28,
    letterSpacing: 0.35,
  },
  
  title3: {
    fontSize: 20,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    fontWeight: 600 as const,
    lineHeight: 25,
    letterSpacing: 0.38,
  },
  
  headline: {
    fontSize: 17,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    fontWeight: 600 as const,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  
  body: {
    fontSize: 17,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    fontWeight: 400 as const,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  
  callout: {
    fontSize: 16,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    fontWeight: 400 as const,
    lineHeight: 21,
    letterSpacing: -0.32,
  },
  
  subheadline: {
    fontSize: 15,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    fontWeight: 400 as const,
    lineHeight: 20,
    letterSpacing: -0.24,
  },
  
  footnote: {
    fontSize: 13,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    fontWeight: 400 as const,
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  
  caption1: {
    fontSize: 12,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    fontWeight: 400 as const,
    lineHeight: 16,
    letterSpacing: 0,
  },
  
  caption2: {
    fontSize: 11,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    fontWeight: 400 as const,
    lineHeight: 13,
    letterSpacing: 0.07,
  },
};

export const CommercialBorderRadius = {
  small: 6,
  medium: 8,
  large: 12,
  extraLarge: 16,
  round: 50,
};