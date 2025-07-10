@@ .. @@
               <TextInput
                 style={styles.input}
-                placeholder="CA"
+                placeholder="TX"
                 placeholderTextColor={CommercialColors.lightTertiaryLabel}
                 value={formData.state}
                 onChangeText={(value) => handleInputChange('state', value.toUpperCase())}
                 autoCapitalize="characters"
                 maxLength={2}
               />