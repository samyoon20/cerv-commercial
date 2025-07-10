@@ .. @@
 import { ArrowLeft, DollarSign, Calendar, CircleCheck as CheckCircle, ChevronRight, Building2, Wrench, Paintbrush, Leaf, Shield, Zap, Droplets } from 'lucide-react-native';
+import { Bug, Waves, TreePine, Home, Trash2 } from 'lucide-react-native';
 import { CommercialColors, CommercialTypography, CommercialBorderRadius, CommercialSpacing } from '@/themes/commercialDesignSystem';
 
 const COMMERCIAL_SERVICES = {
-  'hvac': {
-    id: 'hvac',
-    name: 'HVAC Maintenance',
-    description: 'Regular maintenance and servicing of heating, ventilation, and air conditioning systems',
-    icon: Zap,
-    basePrice: 1200,
+  'pest': {
+    id: 'pest',
+    name: 'Pest Services',
+    description: 'Professional pest control and prevention services for commercial properties',
+    icon: Bug,
+    basePrice: 800,
     frequency: ['monthly', 'quarterly', 'bi-annual'],
   },
-  'janitorial': {
+  'pool': {
+    id: 'pool',
+    name: 'Pool Services',
+    description: 'Complete pool maintenance, cleaning, and chemical balancing services',
+    icon: Waves,
+    basePrice: 1200,
+    frequency: ['weekly', 'bi-weekly', 'monthly'],
+  },
+  'landscape': {
+    id: 'landscape',
+    name: 'Landscape Services',
+    description: 'Professional landscaping maintenance including mowing, trimming, and garden care',
+    icon: Leaf,
+    basePrice: 1500,
+    frequency: ['weekly', 'bi-weekly', 'monthly'],
+  },
+  'tree': {
+    id: 'tree',
+    name: 'Tree Services',
+    description: 'Tree trimming, pruning, removal, and arborist services for commercial properties',
+    icon: TreePine,
+    basePrice: 2000,
+    frequency: ['quarterly', 'bi-annual', 'annual'],
+  },
+  'exterior': {
+    id: 'exterior',
+    name: 'Exterior Services',
+    description: 'Pressure washing, window cleaning, and exterior building maintenance',
+    icon: Home,
+    basePrice: 1800,
+    frequency: ['monthly', 'quarterly', 'bi-annual'],
+  },
+  'janitorial': {
     id: 'janitorial',
     name: 'Janitorial Services',
     description: 'Comprehensive cleaning services for commercial properties',
     icon: Paintbrush,
-    basePrice: 2500,
+    basePrice: 3000,
     frequency: ['daily', 'weekly', 'bi-weekly'],
   },
-  'landscaping': {
-    id: 'landscaping',
-    name: 'Landscaping',
-    description: 'Professional landscaping services to maintain exterior grounds and enhance curb appeal',
-    icon: Leaf,
-    basePrice: 1800,
-    frequency: ['weekly', 'bi-weekly', 'monthly'],
-  },
-  'security': {
-    id: 'security',
-    name: 'Security Systems',
-    description: 'Installation and maintenance of security systems, cameras, and access control',
-    icon: Shield,
-    basePrice: 3500,
-    frequency: ['quarterly', 'bi-annual', 'annual'],
-  },
-  'plumbing': {
-    id: 'plumbing',
-    name: 'Plumbing Services',
-    description: 'Commercial plumbing maintenance, repairs, and inspections',
-    icon: Droplets,
-    basePrice: 1500,
-    frequency: ['monthly', 'quarterly', 'bi-annual'],
-  },
-  'general': {
-    id: 'general',
-    name: 'General Maintenance',
-    description: 'Comprehensive maintenance services for all aspects of your property',
-    icon: Wrench,
-    basePrice: 2000,
-    frequency: ['monthly', 'quarterly'],
+  'waste': {
+    id: 'waste',
+    name: 'Waste Services',
+    description: 'Commercial waste management, recycling, and disposal services',
+    icon: Trash2,
+    basePrice: 600,
+    frequency: ['weekly', 'bi-weekly', 'monthly'],
   },
 };