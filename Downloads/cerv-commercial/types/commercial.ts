export interface CommercialProperty {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: 'office' | 'retail' | 'warehouse' | 'mixed_use' | 'industrial' | 'other';
  squareFootage: number;
  floors?: number;
  units?: number;
  parkingSpaces?: number;
  amenities?: string[];
  primaryPhoto?: string;
  photos?: string[];
  specialInstructions?: string;
  accessCodes?: {
    gate?: string;
    building?: string;
    unit?: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CommercialPortfolio {
  id: string;
  userId: string;
  companyName: string;
  properties: CommercialProperty[];
  activePropertyId?: string;
  totalProperties: number;
  averageCervScore: number;
  totalOpenIssues: number;
  monthlySpend: number;
  lastUpdated: string;
}

export type CommercialUserRole = 'owner' | 'regional_manager' | 'property_manager' | 'assistant';

export interface CommercialUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: CommercialUserRole;
  permissions: CommercialUserPermission[];
  portfolioId: string;
  propertyAccess: string[]; // Array of property IDs they can access
  invitedBy?: string;
  invitedAt?: string;
  lastActiveAt?: string;
  profilePhoto?: string;
  title?: string;
  department?: string;
}

export interface CommercialUserPermission {
  resource: string;
  actions: string[];
}

export interface IssueReport {
  id: string;
  propertyId: string;
  reportedBy: string;
  title: string;
  description: string;
  photos: string[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'maintenance' | 'cleaning' | 'landscaping' | 'security' | 'other';
  status: 'open' | 'in_progress' | 'pending_approval' | 'completed' | 'cancelled';
  estimatedCost?: number;
  actualCost?: number;
  quote?: {
    id: string;
    amount: number;
    description: string;
    createdAt: string;
    approvedBy?: string;
    approvedAt?: string;
  };
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface WorkRequest {
  id: string;
  propertyId: string;
  requestedBy: string;
  title: string;
  description: string;
  photos?: string[];
  priority: 'low' | 'medium' | 'high';
  category: 'addition' | 'modification' | 'enhancement' | 'other';
  status: 'pending_quote' | 'pending_approval' | 'approved' | 'in_progress' | 'completed' | 'rejected';
  quote?: {
    id: string;
    amount: number;
    description: string;
    timeline: string;
    createdAt: string;
    approvedBy?: string;
    approvedAt?: string;
  };
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface CommercialCervScore {
  overall: number;
  maintenance: number;
  cleanliness: number;
  landscaping: number;
  security: number;
  efficiency: number;
  lastUpdated: string;
  propertyId: string;
  trend: 'improving' | 'declining' | 'stable';
  monthlyDelta: number;
}

export interface PortfolioCervScore {
  overall: number;
  propertyScores: { [propertyId: string]: CommercialCervScore };
  averageByCategory: {
    maintenance: number;
    cleanliness: number;
    landscaping: number;
    security: number;
    efficiency: number;
  };
  topPerformingProperty: string;
  needsAttentionProperty: string;
  lastUpdated: string;
}

export interface MonthlyReport {
  id: string;
  portfolioId: string;
  month: string; // YYYY-MM format
  summary: {
    totalVisits: number;
    completedServices: number;
    openIssues: number;
    totalSpend: number;
    cervScoreChange: number;
  };
  propertyBreakdown: {
    [propertyId: string]: {
      visits: number;
      services: number;
      issues: number;
      spend: number;
      cervScore: number;
    };
  };
  serviceBreakdown: {
    [serviceType: string]: {
      count: number;
      cost: number;
    };
  };
  createdAt: string;
  exportUrl?: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: CommercialUserRole;
  message: string;
  attachments?: string[];
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  type: 'issue_report' | 'work_request' | 'account_management' | 'general';
  participants: string[];
  relatedItemId?: string; // ID of issue report, work request, etc.
  title: string;
  lastMessage?: ChatMessage;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}