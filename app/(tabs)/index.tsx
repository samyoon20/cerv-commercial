{
       id: 'prop-1',
       name: 'Downtown Office Tower',
       address: '123 Congress Ave',
       city: 'Austin',
       state: 'TX',
       zipCode: '78701',
       propertyType: 'office',
       squareFootage: 150000,
       floors: 25,
}

{
      id: 'prop-2',
      name: 'Westside Retail Center',
      address: '456 South Lamar Blvd',
      city: 'Austin',
      state: 'TX',
      zipCode: '78704',
      propertyType: 'retail',
      squareFootage: 75000,
      floors: 2,
}

{
      id: 'prop-3',
      name: 'Industrial Park Unit A',
      address: '789 East Riverside Dr',
      city: 'Austin',
      state: 'TX',
      zipCode: '78741',
      propertyType: 'warehouse',
      squareFootage: 200000,
      floors: 1,
}

{
  'prop-1': {
    overall: 87,
    pest: 90,
    janitorial: 85,
    landscaping: 88,
    pool: 92,
    exterior: 82,
    lastUpdated: new Date().toISOString(),
    propertyId: 'prop-1',
    trend: 'improving',
  }
}

{
  'prop-2': {
    overall: 82,
    pest: 85,
    janitorial: 80,
    landscaping: 85,
    pool: 88,
    exterior: 75,
    lastUpdated: new Date().toISOString(),
    propertyId: 'prop-2',
    trend: 'stable',
  }
}

{
  'prop-3': {
    overall: 86,
    pest: 88,
    janitorial: 82,
    landscaping: 90,
    pool: 85,
    exterior: 85,
    lastUpdated: new Date().toISOString(),
    propertyId: 'prop-3',
    trend: 'improving',
  }
}

{
              <View style={styles.scoreBreakdown}>
                {[
                  { key: 'pest', label: 'Pest Services', value: currentScore.pest },
                  { key: 'janitorial', label: 'Janitorial', value: currentScore.janitorial },
                  { key: 'landscaping', label: 'Landscaping', value: currentScore.landscaping },
                  { key: 'pool', label: 'Pool Services', value: currentScore.pool },
                ].map((item) => (
                  <View key={item.key} style={styles.scoreItem}>
                    <Text style={styles.scoreItemLabel}>{item.label}</Text>
                    <Text style={styles.scoreItemValue}>{item.value}</Text>
                  </View>
                ))}
              </View>
}

{
                  {
                    id: '1',
                    type: 'service',
                    title: 'Pool Maintenance Completed',
                    property: 'Downtown Office Tower',
                    time: '2 hours ago',
                    icon: <Building2 color={CommercialColors.systemBlue} size={16} />,
                  }
}

{
                  {
                    id: '2',
                    type: 'issue',
                    title: 'Pest Control Issue Reported',
                    property: 'Westside Retail Center',
                    time: '4 hours ago',
                    icon: <AlertTriangle color={CommercialColors.systemOrange} size={16} />,
                  }
}