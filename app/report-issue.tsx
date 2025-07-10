@@ .. @@
     id: 'issue-1',
     propertyId: 'prop-1',
     reportedBy: 'user-1',
-    title: 'Broken HVAC Unit',
-    description: 'The HVAC unit on the 3rd floor is not functioning properly. Temperature is fluctuating significantly.',
+    title: 'Pest Control Issue',
+    description: 'Noticed increased ant activity in the break room area on the 3rd floor. Need immediate pest control service.',
     photos: [
       'https://images.pexels.com/photos/4489734/pexels-photo-4489734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
     ],
     priority: 'high',
-    category: 'maintenance',
+    category: 'pest',
     status: 'in_progress',
-    estimatedCost: 1200,
+    estimatedCost: 400,
     assignedTo: 'tech-1',
     createdAt: '2024-01-15T10:30:00Z',
     updatedAt: '2024-01-15T14:45:00Z',
@@ .. @@
     id: 'issue-2',
     propertyId: 'prop-1',
     reportedBy: 'user-1',
-    title: 'Lobby Lighting Issues',
-    description: 'Several lights in the main lobby are flickering or completely out. This is creating a poor impression for visitors.',
+    title: 'Exterior Cleaning Needed',
+    description: 'The building exterior windows and facade need professional cleaning. Visibility is poor and affecting building appearance.',
     photos: [
       'https://images.pexels.com/photos/1036657/pexels-photo-1036657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
     ],
     priority: 'medium',
-    category: 'maintenance',
+    category: 'exterior',
     status: 'completed',
     actualCost: 350,
     assignedTo: 'tech-2',
@@ .. @@
     id: 'issue-3',
     propertyId: 'prop-2',
     reportedBy: 'user-1',
-    title: 'Water Leak in Restroom',
-    description: 'There is a water leak in the men\'s restroom on the 2nd floor. Water is pooling near the sink area.',
+    title: 'Landscaping Maintenance',
+    description: 'The front landscaping needs attention - overgrown bushes and dead plants affecting curb appeal.',
     photos: [
       'https://images.pexels.com/photos/5797999/pexels-photo-5797999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
     ],
     priority: 'high',
-    category: 'maintenance',
+    category: 'landscaping',
     status: 'open',
     createdAt: '2024-01-18T11:20:00Z',
     updatedAt: '2024-01-18T11:20:00Z',
@@ .. @@
                 <View style={styles.categoryOptions}>
                   {['maintenance', 'cleaning', 'landscaping', 'security', 'other'].map((category) => (
                   )
                   )
                   }
+                  {['pest', 'janitorial', 'landscaping', 'pool', 'exterior', 'tree', 'waste', 'other'].map((category) => (
                     <TouchableOpacity
                       key={category}
                       style={[
                       ]
                       }
)
)
}