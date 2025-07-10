import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, Clock, Users, ChevronRight, CircleCheck as CheckCircle } from 'lucide-react-native';
import { CommercialColors, CommercialTypography, CommercialBorderRadius, CommercialSpacing } from '@/themes/commercialDesignSystem';

// Generate next 14 days
const generateDates = () => {
  const dates = [];
  const today = new Date();
  
  for (let i = 3; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push({
      date: date.toISOString().split('T')[0],
      display: date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      }),
      dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'long' })
    });
  }
  return dates;
};

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];

export default function SchedulingScreen() {
  const { propertyType, squareFootage, serviceIds, frequencies, monthlyTotal, annualTotal } = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const dates = generateDates();
  const parsedServiceIds = (serviceIds as string).split(',');
  const parsedFrequencies = JSON.parse(frequencies as string);

  const handleBack = () => {
    router.back();
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (!selectedDate || !selectedTime || !contactName || !contactEmail || !contactPhone) {
      return;
    }
    
    router.push({
      pathname: '/signup-complete',
      params: {
        propertyType,
        squareFootage,
        serviceIds,
        frequencies,
        monthlyTotal,
        annualTotal,
        date: selectedDate,
        time: selectedTime
      }
    });
  };

  const isFormComplete = selectedDate && selectedTime && contactName && contactEmail && contactPhone;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft color={CommercialColors.lightLabel} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Schedule Consultation</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.titleSection}>
            <View style={styles.iconContainer}>
              <Calendar color={CommercialColors.systemBlue} size={32} />
            </View>
            <Text style={styles.title}>Schedule Your Consultation</Text>
            <Text style={styles.subtitle}>
              Select a date and time for your initial consultation with our property management team
            </Text>
          </View>

          <View style={styles.quoteInfo}>
            <Text style={styles.quoteInfoTitle}>Your Quote Summary</Text>
            <View style={styles.quoteRow}>
              <Text style={styles.quoteLabel}>Monthly Total:</Text>
              <Text style={styles.quoteValue}>${Number(monthlyTotal).toLocaleString()}</Text>
            </View>
            <View style={styles.quoteRow}>
              <Text style={styles.quoteLabel}>Annual Total:</Text>
              <Text style={styles.quoteValue}>${Number(annualTotal).toLocaleString()}</Text>
            </View>
            <View style={styles.quoteRow}>
              <Text style={styles.quoteLabel}>Selected Services:</Text>
              <Text style={styles.quoteValue}>{parsedServiceIds.length}</Text>
            </View>
          </View>

          <View style={styles.dateSection}>
            <View style={styles.sectionHeader}>
              <Calendar color={CommercialColors.systemBlue} size={20} />
              <Text style={styles.sectionTitle}>Select a Date</Text>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.dateScroll}
            >
              {dates.map((dateItem) => (
                <TouchableOpacity
                  key={dateItem.date}
                  style={[
                    styles.dateOption,
                    selectedDate === dateItem.date && styles.dateOptionSelected
                  ]}
                  onPress={() => handleDateSelect(dateItem.date)}
                >
                  <Text style={[
                    styles.dateText,
                    selectedDate === dateItem.date && styles.dateTextSelected
                  ]}>
                    {dateItem.display}
                  </Text>
                  <Text style={[
                    styles.dayText,
                    selectedDate === dateItem.date && styles.dayTextSelected
                  ]}>
                    {dateItem.dayOfWeek}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.timeSection}>
            <View style={styles.sectionHeader}>
              <Clock color={CommercialColors.systemBlue} size={20} />
              <Text style={styles.sectionTitle}>Select a Time</Text>
            </View>
            <View style={styles.timeGrid}>
              {TIME_SLOTS.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeOption,
                    selectedTime === time && styles.timeOptionSelected
                  ]}
                  onPress={() => handleTimeSelect(time)}
                >
                  <Text style={[
                    styles.timeText,
                    selectedTime === time && styles.timeTextSelected
                  ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.contactSection}>
            <View style={styles.sectionHeader}>
              <Users color={CommercialColors.systemBlue} size={20} />
              <Text style={styles.sectionTitle}>Contact Information</Text>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor={CommercialColors.lightTertiaryLabel}
                value={contactName}
                onChangeText={setContactName}
                autoCapitalize="words"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email address"
                placeholderTextColor={CommercialColors.lightTertiaryLabel}
                value={contactEmail}
                onChangeText={setContactEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                placeholderTextColor={CommercialColors.lightTertiaryLabel}
                value={contactPhone}
                onChangeText={setContactPhone}
                keyboardType="phone-pad"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Special Instructions (Optional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Any additional information or special requirements"
                placeholderTextColor={CommercialColors.lightTertiaryLabel}
                value={specialInstructions}
                onChangeText={setSpecialInstructions}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>What to expect</Text>
            <View style={styles.infoRow}>
              <CheckCircle color={CommercialColors.systemBlue} size={16} />
              <Text style={styles.infoText}>A property management expert will contact you to confirm your appointment</Text>
            </View>
            <View style={styles.infoRow}>
              <CheckCircle color={CommercialColors.systemBlue} size={16} />
              <Text style={styles.infoText}>During the consultation, we'll discuss your specific needs and finalize your service plan</Text>
            </View>
            <View style={styles.infoRow}>
              <CheckCircle color={CommercialColors.systemBlue} size={16} />
              <Text style={styles.infoText}>You'll receive a detailed proposal with final pricing and service schedule</Text>
            </View>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        <View style={styles.bottomSection}>
          <TouchableOpacity 
            style={[styles.continueButton, !isFormComplete && styles.disabledButton]}
            onPress={handleContinue}
            disabled={!isFormComplete}
          >
            <View style={styles.continueButtonBackground}>
              <Text style={styles.continueButtonText}>Complete Sign Up</Text>
              <ChevronRight color={CommercialColors.white} size={20} />
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
  quoteInfo: {
    backgroundColor: CommercialColors.systemBlueLight,
    borderRadius: CommercialBorderRadius.large,
    padding: CommercialSpacing.lg,
    marginBottom: CommercialSpacing.xxl,
    borderWidth: 1,
    borderColor: CommercialColors.systemBlue,
  },
  quoteInfoTitle: {
    ...CommercialTypography.headline,
    color: CommercialColors.systemBlueDark,
    marginBottom: CommercialSpacing.md,
  },
  quoteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: CommercialSpacing.xs,
  },
  quoteLabel: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.systemBlueDark,
  },
  quoteValue: {
    ...CommercialTypography.headline,
    color: CommercialColors.systemBlueDark,
  },
  dateSection: {
    marginBottom: CommercialSpacing.xxl,
  },
  timeSection: {
    marginBottom: CommercialSpacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CommercialSpacing.sm,
    marginBottom: CommercialSpacing.md,
  },
  sectionTitle: {
    ...CommercialTypography.title3,
    color: CommercialColors.lightLabel,
  },
  dateScroll: {
    marginHorizontal: -CommercialSpacing.xxl,
    paddingHorizontal: CommercialSpacing.xxl,
  },
  dateOption: {
    padding: CommercialSpacing.md,
    borderRadius: CommercialBorderRadius.medium,
    borderWidth: 2,
    borderColor: CommercialColors.lightSeparator,
    backgroundColor: CommercialColors.lightBackground,
    marginRight: CommercialSpacing.md,
    minWidth: 120,
    alignItems: 'center',
  },
  dateOptionSelected: {
    borderColor: CommercialColors.systemBlue,
    backgroundColor: CommercialColors.systemBlueLight,
  },
  dateText: {
    ...CommercialTypography.subheadline,
    fontWeight: '600',
    color: CommercialColors.lightLabel,
    marginBottom: 4,
  },
  dateTextSelected: {
    color: CommercialColors.systemBlueDark,
  },
  dayText: {
    ...CommercialTypography.caption1,
    color: CommercialColors.lightSecondaryLabel,
  },
  dayTextSelected: {
    color: CommercialColors.systemBlueDark,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CommercialSpacing.md,
  },
  timeOption: {
    paddingHorizontal: CommercialSpacing.lg,
    paddingVertical: CommercialSpacing.md,
    borderRadius: CommercialBorderRadius.medium,
    borderWidth: 1,
    borderColor: CommercialColors.lightSeparator,
    backgroundColor: CommercialColors.lightBackground,
    minWidth: '22%',
    alignItems: 'center',
  },
  timeOptionSelected: {
    borderColor: CommercialColors.systemBlue,
    backgroundColor: CommercialColors.systemBlueLight,
    borderWidth: 2,
  },
  timeText: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.lightLabel,
  },
  timeTextSelected: {
    color: CommercialColors.systemBlueDark,
    fontWeight: '600',
  },
  contactSection: {
    marginBottom: CommercialSpacing.xxl,
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
    minHeight: 80,
    textAlignVertical: 'top',
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: CommercialSpacing.sm,
    marginBottom: CommercialSpacing.sm,
  },
  infoText: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.lightSecondaryLabel,
    flex: 1,
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