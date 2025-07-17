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
import { 
  MessageCircle, 
  Send, 
  Phone, 
  Wrench,
} from 'lucide-react-native';
import { CommercialColors, CommercialSpacing, CommercialTypography, CommercialBorderRadius } from '@/themes/commercialDesignSystem';

const MOCK_CONVERSATIONS = [
  {
    id: '1',
    type: 'account_manager',
    name: 'Mike Johnson - Account Manager',
    service: 'Pool Maintenance',
    lastMessage: 'I\'ll be there around 10 AM tomorrow for the pool cleaning.',
    timestamp: '2 hours ago',
    unread: false,
    avatar: '🧑‍🔧',
  },
  {
    id: '2',
    type: 'sales',
    name: 'Sarah Wilson - Support Specialist',
    service: 'General Inquiry',
    lastMessage: 'Hi! How can we help you today?',
    timestamp: '1 day ago',
    unread: true,
    avatar: '💬',
  },
  {
    id: '3',
    type: 'technician',
    name: 'David Lee - Landscaping Specialist',
    service: 'Landscaping',
    lastMessage: 'Great! The garden is looking much better now.',
    timestamp: '3 days ago',
    unread: false,
    avatar: '👩‍🌾',
  },
];

const MOCK_MESSAGES = [
  {
    id: '1',
    sender: 'technician',
    message: 'Hi! I\'m Mike, your pool maintenance technician.',
    timestamp: '10:00 AM',
    isUser: false,
  },
  {
    id: '2',
    sender: 'user',
    message: 'Hi Mike! Looking forward to getting the pool cleaned.',
    timestamp: '10:05 AM',
    isUser: true,
  },
  {
    id: '3',
    sender: 'technician',
    message: 'Perfect! I\'ll be there around 10 AM tomorrow. Should take about an hour.',
    timestamp: '10:07 AM',
    isUser: false,
  },
  {
    id: '4',
    sender: 'user',
    message: 'Sounds good! See you then.',
    timestamp: '10:10 AM',
    isUser: true,
  },
];

export default function ChatTab() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversation(conversationId);
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    Alert.alert('Message Sent', 'Your message has been sent!');
    setMessageText('');
  };

  const handleCallTechnician = () => {
    Alert.alert('Call Technician', 'Calling feature will be available soon.');
  };

  const selectedConv = MOCK_CONVERSATIONS.find(c => c.id === selectedConversation);

  if (selectedConversation && selectedConv) {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundContainer}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.chatHeader}>
              <TouchableOpacity style={styles.backButton} onPress={handleBackToList}>
                <Text style={styles.backButtonText}>← Back</Text>
              </TouchableOpacity>
              <View style={styles.chatHeaderInfo}>
                <Text style={styles.chatHeaderName}>{selectedConv.name}</Text>
                <Text style={styles.chatHeaderService}>{selectedConv.service}</Text>
              </View>
              <TouchableOpacity style={styles.callButton} onPress={handleCallTechnician}>
                <Phone color={CommercialColors.systemBlue} size={20} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
              {MOCK_MESSAGES.map(message => (
                <View
                  key={message.id}
                  style={[
                    styles.messageWrapper,
                    message.isUser ? styles.userMessageWrapper : styles.techMessageWrapper
                  ]}
                >
                  <View
                    style={[
                      styles.messageBubble,
                      message.isUser ? styles.userMessage : styles.techMessage
                    ]}
                  >
                    <Text
                      style={[
                        styles.messageText,
                        message.isUser ? styles.userMessageText : styles.techMessageText
                      ]}
                    >
                      {message.message}
                    </Text>
                  </View>
                  <Text style={styles.messageTimestamp}>{message.timestamp}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.messageInput}>
              <TextInput
                style={styles.textInput}
                placeholder="Type a message..."
                placeholderTextColor={CommercialColors.textTertiary}
                value={messageText}
                onChangeText={setMessageText}
                multiline
                maxLength={500}
              />
              <TouchableOpacity
                style={[styles.sendButton, !messageText.trim() && styles.sendButtonDisabled]}
                onPress={handleSendMessage}
                disabled={!messageText.trim()}
              >
                <Send color={messageText.trim() ? CommercialColors.white : CommercialColors.textSecondary} size={18} />
                <Send color={messageText.trim() ? CommercialColors.white : CommercialColors.systemGray} size={18} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Messages</Text>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.conversationsList}>
              {MOCK_CONVERSATIONS.map(conversation => (
                <TouchableOpacity
                  key={conversation.id}
                  style={styles.conversationCard}
                  onPress={() => handleConversationSelect(conversation.id)}
                >
                  <View style={styles.conversationBackground}>
                    <View style={styles.avatarContainer}>
                      <Text style={styles.avatar}>{conversation.avatar}</Text>
                      {conversation.unread && <View style={styles.unreadIndicator} />}
                    </View>

                    <View style={styles.conversationInfo}>
                      <View style={styles.conversationHeader}>
                        <Text style={styles.conversationName}>{conversation.name}</Text>
                        <Text style={styles.conversationTimestamp}>{conversation.timestamp}</Text>
                      </View>
                      
                      <Text style={styles.conversationService}>{conversation.service}</Text>
                      
                      <Text
                        style={[
                          styles.lastMessage,
                          conversation.unread && styles.unreadMessage
                        ]}
                        numberOfLines={2}
                      >
                        {conversation.lastMessage}
                      </Text>
                    </View>

                    <View style={styles.conversationMeta}>
                      {conversation.type === 'technician' ? (
                        <Wrench color={CommercialColors.tertiaryLabel} size={16} />
                      ) : (
                        <MessageCircle color={CommercialColors.tertiaryLabel} size={16} />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {MOCK_CONVERSATIONS.length === 0 && (
              <View style={styles.emptyState}>
                <MessageCircle color={CommercialColors.tertiaryLabel} size={48} />
                <Text style={styles.emptyStateTitle}>No messages yet</Text>
                <Text style={styles.emptyStateText}>
                  Your conversations with technicians and support will appear here
                </Text>
              </View>
            )}

            <View style={styles.helpSection}>
              <Text style={styles.helpTitle}>Need help?</Text>
              <Text style={styles.helpText}>
                Chat with our support team for questions about services, billing, or scheduling.
              </Text>
              
              <TouchableOpacity style={styles.contactSupportButton}>
                <View style={styles.supportButtonBackground}>
                  <MessageCircle color={CommercialColors.systemBlue} size={20} />
                  <Text style={styles.contactSupportText}>Contact Support</Text>
                </View>
              </TouchableOpacity>
            </View>

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
    paddingHorizontal: CommercialSpacing.lg,
    paddingVertical: CommercialSpacing.lg,
    borderBottomWidth: 0.5,
    borderBottomColor: CommercialColors.separator,
  },
  headerTitle: {
    ...CommercialTypography.title2,
    color: CommercialColors.label,
  },
  content: {
    flex: 1,
    paddingHorizontal: CommercialSpacing.lg,
    paddingTop: CommercialSpacing.lg,
  },
  conversationsList: {
    gap: CommercialSpacing.md,
    marginBottom: CommercialSpacing.xxxl,
  },
  conversationCard: {
    borderRadius: CommercialBorderRadius.large,
    overflow: 'hidden',
  },
  conversationBackground: {
    backgroundColor: CommercialColors.cardBackground,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: CommercialSpacing.lg,
    borderWidth: 0.5,
    borderColor: CommercialColors.separator,
    gap: CommercialSpacing.md,
    borderRadius: CommercialBorderRadius.large,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    fontSize: 32,
    width: 48,
    height: 48,
    textAlign: 'center',
    lineHeight: 48,
    backgroundColor: CommercialColors.secondarySystemFill,
    borderRadius: 24,
  },
  unreadIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: CommercialColors.systemRed,
    borderWidth: 2,
    borderColor: CommercialColors.background,
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  conversationName: {
    ...CommercialTypography.headline,
    color: CommercialColors.label,
  },
  conversationTimestamp: {
    ...CommercialTypography.caption1,
    color: CommercialColors.tertiaryLabel,
  },
  conversationService: {
    ...CommercialTypography.caption1,
    fontWeight: '600',
    color: CommercialColors.systemBlue,
    marginBottom: 6,
  },
  lastMessage: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.secondaryLabel,
  },
  unreadMessage: {
    fontWeight: '600',
    color: CommercialColors.label,
  },
  conversationMeta: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    ...CommercialTypography.title3,
    color: CommercialColors.label,
    marginTop: CommercialSpacing.lg,
    marginBottom: CommercialSpacing.sm,
  },
  emptyStateText: {
    ...CommercialTypography.body,
    color: CommercialColors.secondaryLabel,
    textAlign: 'center',
    maxWidth: 280,
  },
  helpSection: {
    backgroundColor: CommercialColors.cardBackground,
    borderRadius: CommercialBorderRadius.large,
    padding: CommercialSpacing.xl,
    borderWidth: 0.5,
    borderColor: CommercialColors.separator,
  },
  helpTitle: {
    ...CommercialTypography.headline,
    color: CommercialColors.label,
    marginBottom: CommercialSpacing.sm,
  },
  helpText: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.secondaryLabel,
    marginBottom: CommercialSpacing.lg,
  },
  contactSupportButton: {
    borderRadius: CommercialBorderRadius.medium,
    overflow: 'hidden',
  },
  supportButtonBackground: {
    backgroundColor: CommercialColors.systemBlueLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: CommercialSpacing.md,
    paddingHorizontal: CommercialSpacing.xl,
    borderWidth: 0.5,
    borderColor: CommercialColors.systemBlue,
    gap: CommercialSpacing.sm,
    borderRadius: CommercialBorderRadius.medium,
  },
  contactSupportText: {
    ...CommercialTypography.subheadline,
    fontWeight: '600',
    color: CommercialColors.systemBlue,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: CommercialSpacing.xxl,
    paddingVertical: CommercialSpacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: CommercialColors.separator,
    gap: CommercialSpacing.lg,
  },
  backButton: {
    paddingVertical: CommercialSpacing.sm,
    paddingHorizontal: CommercialSpacing.md,
  },
  backButtonText: {
    ...CommercialTypography.headline,
    color: CommercialColors.systemBlue,
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatHeaderName: {
    ...CommercialTypography.headline,
    color: CommercialColors.label,
  },
  chatHeaderService: {
    ...CommercialTypography.subheadline,
    color: CommercialColors.secondaryLabel,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CommercialColors.systemBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: CommercialColors.systemBlue,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: CommercialSpacing.xxl,
    paddingVertical: CommercialSpacing.lg,
  },
  messageWrapper: {
    marginBottom: CommercialSpacing.lg,
  },
  userMessageWrapper: {
    alignItems: 'flex-end',
  },
  techMessageWrapper: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: CommercialSpacing.lg,
    paddingVertical: CommercialSpacing.md,
    borderRadius: CommercialBorderRadius.large,
    marginBottom: 4,
  },
  userMessage: {
    backgroundColor: CommercialColors.systemBlue,
    borderBottomRightRadius: 4,
  },
  techMessage: {
    backgroundColor: CommercialColors.cardBackground,
    borderWidth: 1,
    borderColor: CommercialColors.separator,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    ...CommercialTypography.subheadline,
  },
  userMessageText: {
    color: CommercialColors.white,
  },
  techMessageText: {
    color: CommercialColors.label,
  },
  messageTimestamp: {
    ...CommercialTypography.caption1,
    color: CommercialColors.tertiaryLabel,
  },
  messageInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: CommercialSpacing.xxl,
    paddingVertical: CommercialSpacing.lg,
    borderTopWidth: 1,
    borderTopColor: CommercialColors.separator,
    gap: CommercialSpacing.md,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: CommercialColors.separator,
    borderRadius: 20,
    paddingHorizontal: CommercialSpacing.lg,
    paddingVertical: CommercialSpacing.md,
    ...CommercialTypography.body,
    maxHeight: 100,
    backgroundColor: CommercialColors.cardBackground,
    color: CommercialColors.label,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: CommercialBorderRadius.round,
    backgroundColor: CommercialColors.systemBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: CommercialColors.systemGray4,
  },
  bottomSpacing: {
    height: CommercialSpacing.xl,
  },
});