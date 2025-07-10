Here's the fixed version with proper closing brackets and structure. I've added missing brackets and fixed the syntax errors while maintaining the original functionality:

[Previous code remains the same until the MOCK_PROPERTIES array]

```javascript
// Fix for MOCK_PROPERTIES array
const MOCK_PROPERTIES: CommercialProperty[] = [
  {
    id: 'prop-1',
    name: 'Downtown Austin Office',
    address: '123 Congress Ave',
    city: 'Austin',
    state: 'TX',
    zipCode: '78701',
    propertyType: 'office',
    squareFootage: 150000,
    floors: 25,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'prop-2',
    name: 'South Austin Retail Center',
    address: '456 South Lamar Blvd',
    city: 'Austin',
    state: 'TX',
    zipCode: '78704',
    propertyType: 'retail',
    squareFootage: 75000,
    floors: 2,
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'prop-3',
    name: 'East Austin Industrial Complex',
    address: '789 East 6th St',
    city: 'Austin',
    state: 'TX',
    zipCode: '78702',
    propertyType: 'warehouse',
    squareFootage: 100000,
    floors: 1,
    isActive: true,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: new Date().toISOString()
  }
];

// Fix for PROPERTY_TYPE_SERVICES object
const PROPERTY_TYPE_SERVICES = {
  'office': [
    {
      id: 'janitorial-services',
      name: 'Janitorial Services',
      description: 'Professional cleaning services for office spaces',
      icon: Paintbrush,
      estimatedCost: '500 - 2,000',
      estimatedTime: 'Daily/Weekly'
    },
    {
      id: 'pest-services',
      name: 'Pest Services',
      description: 'Comprehensive pest control for office environments',
      icon: Shield,
      estimatedCost: '200 - 600',
      estimatedTime: '1-2 days'
    }
  ],
  'retail': [
    {
      id: 'janitorial-services',
      name: 'Janitorial Services',
      description: 'Retail space cleaning services',
      icon: Paintbrush,
      estimatedCost: '400 - 1,500',
      estimatedTime: 'Daily/Weekly'
    }
  ],
  'warehouse': [
    {
      id: 'janitorial-services',
      name: 'Janitorial Services',
      description: 'Industrial cleaning services',
      icon: Paintbrush,
      estimatedCost: '800 - 3,000',
      estimatedTime: 'Weekly'
    }
  ],
  'mixed_use': [
    {
      id: 'janitorial-services',
      name: 'Janitorial Services',
      description: 'Comprehensive cleaning for mixed-use properties',
      icon: Paintbrush,
      estimatedCost: '1,000 - 4,000',
      estimatedTime: 'Daily/Weekly'
    }
  ],
  'other': [
    {
      id: 'general-maintenance',
      name: 'General Maintenance',
      description: 'Basic maintenance services',
      icon: Wrench,
      estimatedCost: '200 - 1,000',
      estimatedTime: 'As needed'
    }
  ]
};

[Rest of the code remains the same]
```

The main fixes include:
1. Properly closing the MOCK_PROPERTIES array
2. Restructuring the PROPERTY_TYPE_SERVICES object with proper nesting and closing brackets
3. Removing duplicate service definitions
4. Ensuring consistent object structure throughout the services arrays

The rest of the code (component logic, styles, etc.) remains unchanged as it was properly structured in the original.