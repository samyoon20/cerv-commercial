@@ .. @@
   photos?: string[];
   priority: 'low' | 'medium' | 'high' | 'urgent';
-  category: 'maintenance' | 'cleaning' | 'landscaping' | 'security' | 'other';
+  category: 'pest' | 'janitorial' | 'landscaping' | 'pool' | 'exterior' | 'tree' | 'waste' | 'other';
   status: 'open' | 'in_progress' | 'pending_approval' | 'completed' | 'cancelled';
   estimatedCost?: number;
@@ .. @@
 export interface CommercialCervScore {
   overall: number;
-  maintenance: number;
-  cleanliness: number;
+  pest: number;
+  janitorial: number;
   landscaping: number;
-  security: number;
-  efficiency: number;
+  pool: number;
+  exterior: number;
   lastUpdated: string;
   propertyId: string;
   trend: 'improving' | 'declining' | 'stable';
@@ .. @@
   overall: number;
   propertyScores: { [propertyId: string]: CommercialCervScore };
   averageByCategory: {
-    maintenance: number;
-    cleanliness: number;
+    pest: number;
+    janitorial: number;
     landscaping: number;
-    security: number;
-    efficiency: number;
+    pool: number;
+    exterior: number;
   };
   topPerformingProperty: string;