@@ .. @@
 import { ArrowLeft, CircleCheck as CheckCircle, ChevronRight, Wrench, Paintbrush, Leaf, Shield, Zap, Droplets } from 'lucide-react-native';
+import { Bug, Waves, TreePine, Home, Trash2 } from 'lucide-react-native';
 import { CommercialColors, CommercialTypography, CommercialBorderRadius, CommercialSpacing } from '@/themes/commercialDesignSystem';
 
 const COMMERCIAL_SERVICES = [
   {
-    id: 'hvac',
-    name: 'HVAC Maintenance',
-    description: 'Regular maintenance and servicing of heating, ventilation, and air conditioning systems',
-    icon: Zap,
-    basePrice: 1200,
+    id: 'pest',
+    name: 'Pest Services',
+    description: 'Professional pest control and prevention services for commercial properties',
+    icon: Bug,
+    basePrice: 800,
     frequency: ['monthly', 'quarterly', 'bi-annual'],
     recommended: true,
     available: true,
   },
   {
-    id: 'janitorial',
+    id: 'pool',
+    name: 'Pool Services',
+    description: 'Complete pool maintenance, cleaning, and chemical balancing services',
+    icon: Waves,
+    basePrice: 1200,
+    frequency: ['weekly', 'bi-weekly', 'monthly'],
+    recommended: false,
+    available: true,
+  },
+  {
+    id: 'landscape',
+    name: 'Landscape Services',
+    description: 'Professional landscaping maintenance including mowing, trimming, and garden care',
+    icon: Leaf,
+    basePrice: 1500,
+    frequency: ['weekly', 'bi-weekly', 'monthly'],
+    recommended: true,
+    available: true,
+  },
+  {
+    id: 'tree',
+    name: 'Tree Services',
+    description: 'Tree trimming, pruning, removal, and arborist services for commercial properties',
+    icon: TreePine,
+    basePrice: 2000,
+    frequency: ['quarterly', 'bi-annual', 'annual'],
+    recommended: false,
+    available: true,
+  },
+  {
+    id: 'exterior',
+    name: 'Exterior Services',
+    description: 'Pressure washing, window cleaning, and exterior building maintenance',
+    icon: Home,
+    basePrice: 1800,
+    frequency: ['monthly', 'quarterly', 'bi-annual'],
+    recommended: true,
+    available: true,
+  },
+  {
+    id: 'janitorial',
     name: 'Janitorial Services',
     description: 'Comprehensive cleaning services for commercial properties including offices, retail spaces, and warehouses',
     icon: Paintbrush,
-    basePrice: 2500,
+    basePrice: 3000,
     frequency: ['daily', 'weekly', 'bi-weekly'],
     recommended: true,
     available: true,
   },
   {
-    id: 'landscaping',
-    name: 'Landscaping',
-    description: 'Professional landscaping services to maintain exterior grounds and enhance curb appeal',
-    icon: Leaf,
-    basePrice: 1800,
-    frequency: ['weekly', 'bi-weekly', 'monthly'],
-    recommended: false,
-    available: true,
-  },
-  {
-    id: 'security',
-    name: 'Security Systems',
-    description: 'Installation and maintenance of security systems, cameras, and access control',
-    icon: Shield,
-    basePrice: 3500,
-    frequency: ['quarterly', 'bi-annual', 'annual'],
-    recommended: false,
-    available: true,
-  },
-  {
-    id: 'plumbing',
-    name: 'Plumbing Services',
-    description: 'Commercial plumbing maintenance, repairs, and inspections',
-    icon: Droplets,
-    basePrice: 1500,
-    frequency: ['monthly', 'quarterly', 'bi-annual'],
-    recommended: true,
-    available: true,
-  },
-  {
-    id: 'general',
-    name: 'General Maintenance',
-    description: 'Comprehensive maintenance services for all aspects of your commercial property',
-    icon: Wrench,
-    basePrice: 2000,
-    frequency: ['monthly', 'quarterly'],
+    id: 'waste',
+    name: 'Waste Services',
+    description: 'Commercial waste management, recycling, and disposal services',
+    icon: Trash2,
+    basePrice: 600,
+    frequency: ['weekly', 'bi-weekly', 'monthly'],
     recommended: false,
     available: true,
   },
@@ .. @@
   const getRecommendedServices = () => {
     // In a real app, this would be more sophisticated based on property type, size, etc.
     if (propertyType === 'office') {
-      return ['hvac', 'janitorial', 'plumbing'];
+      return ['pest', 'janitorial', 'exterior'];
     } else if (propertyType === 'retail') {
-      return ['hvac', 'janitorial', 'security'];
+      return ['pest', 'janitorial', 'landscape'];
     } else if (propertyType === 'warehouse') {
-      return ['hvac', 'security', 'general'];
+      return ['pest', 'exterior', 'waste'];
     } else {
-      return ['hvac', 'janitorial'];
+      return ['pest', 'janitorial'];
     }
   };