import { ArrowLeft, DollarSign, Calendar, CircleCheck as CheckCircle, ChevronRight, Building2, Wrench, Paintbrush, Leaf, Shield, Zap, Droplets } from 'lucide-react-native';
import { Bug, Waves, TreePine, Home, Trash2 } from 'lucide-react-native';
import { CommercialColors, CommercialTypography, CommercialBorderRadius, CommercialSpacing } from '@/themes/commercialDesignSystem';

const COMMERCIAL_SERVICES = {
  'pest': {
    id: 'pest',
    name: 'Pest Services',
    description: 'Professional pest control and prevention services for commercial properties',
    icon: Bug,
    basePrice: 800,
    frequency: ['monthly', 'quarterly', 'bi-annual'],
  },
  'pool': {
    id: 'pool',
    name: 'Pool Services',
    description: 'Complete pool maintenance, cleaning, and chemical balancing services',
    icon: Waves,
    basePrice: 1200,
    frequency: ['weekly', 'bi-weekly', 'monthly'],
  },
  'landscape': {
    id: 'landscape',
    name: 'Landscape Services',
    description: 'Professional landscaping maintenance including mowing, trimming, and garden care',
    icon: Leaf,
    basePrice: 1500,
    frequency: ['weekly', 'bi-weekly', 'monthly'],
  },
  'tree': {
    id: 'tree',
    name: 'Tree Services',
    description: 'Tree trimming, pruning, removal, and arborist services for commercial properties',
    icon: TreePine,
    basePrice: 2000,
    frequency: ['quarterly', 'bi-annual', 'annual'],
  },
  'exterior': {
    id: 'exterior',
    name: 'Exterior Services',
    description: 'Pressure washing, window cleaning, and exterior building maintenance',
    icon: Home,
    basePrice: 1800,
    frequency: ['monthly', 'quarterly', 'bi-annual'],
  },
  'janitorial': {
    id: 'janitorial',
    name: 'Janitorial Services',
    description: 'Comprehensive cleaning services for commercial properties',
    icon: Paintbrush,
    basePrice: 3000,
    frequency: ['daily', 'weekly', 'bi-weekly'],
  },
  'waste': {
    id: 'waste',
    name: 'Waste Services',
    description: 'Commercial waste management, recycling, and disposal services',
    icon: Trash2,
    basePrice: 600,
    frequency: ['weekly', 'bi-weekly', 'monthly'],
  },
};