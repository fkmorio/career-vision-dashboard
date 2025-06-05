
# Developer Guide - Career Vision Platform

## 🛠️ Development Setup

### Environment Requirements

- **Node.js**: v16.0.0 or higher
- **npm**: v8.0.0 or higher
- **TypeScript**: v4.9.0 or higher
- **Modern browser** with ES2020 support

### Quick Start

```bash
# Clone and setup
git clone <repository-url>
cd career-vision-platform
npm install

# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking
```

## 🏗️ Architecture Overview

### Component Architecture

```
src/
├── components/
│   ├── institutions/           # Institution-related components
│   │   ├── CBALevelsCard.tsx          # CBA framework display
│   │   ├── AIRecommendationsPanel.tsx # AI recommendations
│   │   ├── InstitutionFilters.tsx     # Search and filter UI
│   │   ├── InstitutionCard.tsx        # Individual institution display
│   │   ├── PlacementInsightsPanel.tsx # Real-time insights
│   │   ├── DatabaseReporting.tsx      # Analytics and reports
│   │   └── institutionData.ts         # Data models and mock data
│   ├── ui/                     # Reusable UI components (shadcn/ui)
│   ├── InstitutionalProfiles.tsx      # Main institutions page
│   └── InteractiveAI.tsx       # AI assessment interface
├── pages/                      # Route components
├── hooks/                      # Custom React hooks
└── lib/                        # Utility functions
```

### Data Flow

1. **Static Data**: Institutional data stored in `institutionData.ts`
2. **State Management**: React useState for local component state
3. **Props**: Data passed down through component hierarchy
4. **Events**: User interactions handled by event handlers

## 📊 Data Models

### Core Interfaces

```typescript
// Institution model
interface Institution {
  id: number;
  name: string;
  logo: string;
  sector: 'Public University' | 'Private University' | 'National Polytechnic' | 'Public TVET' | 'Private TVET';
  location: string;
  rating: number;
  students: string;
  description: string;
  kuccpsCode: string;
  cutoffPoints: {
    min: string;
    max: string;
    avg: string;
  };
  cbaRequirement: 'level1' | 'level2' | 'level3' | 'level4';
  openings: number;
  clusters: string[];
  programs: string[];
  helbEligible: boolean;
  scholarships: string[];
  facilities: string[];
}

// CBA Level model
interface CBALevel {
  range: string;
  performance: string;
  color: string;
}
```

### Data Sources

Current implementation uses static data in `institutionData.ts`. For production:

1. **Database Integration**: Connect to PostgreSQL/MongoDB
2. **API Layer**: RESTful or GraphQL endpoints
3. **Real-time Updates**: WebSocket connections for live data
4. **Caching**: Redis for performance optimization

## 🎨 Styling Guidelines

### Tailwind CSS Classes

```css
/* Layout */
.container { @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8; }
.grid-responsive { @apply grid grid-cols-1 lg:grid-cols-2 gap-6; }

/* Colors - Kenya Theme */
.text-primary { @apply text-green-800; }
.bg-primary { @apply bg-green-100; }
.border-primary { @apply border-green-200; }

/* CBA Level Colors */
.cba-exceeding { @apply bg-green-100 text-green-800; }
.cba-meeting { @apply bg-blue-100 text-blue-800; }
.cba-approaching { @apply bg-yellow-100 text-yellow-800; }
.cba-below { @apply bg-red-100 text-red-800; }
```

### Component Styling Patterns

```tsx
// Card pattern
<Card className="hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle className="flex items-center">
      <Icon className="w-5 h-5 mr-2" />
      Title
    </CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>

// Badge pattern
<Badge className={cbaLevels[level].color}>
  {cbaLevels[level].performance}
</Badge>
```

## 🔧 Component Development

### Creating New Components

1. **Component File Structure**:
   ```typescript
   // ComponentName.tsx
   import React from 'react';
   import { ComponentProps } from './types';
   
   const ComponentName = ({ prop1, prop2 }: ComponentProps) => {
     return (
       <div>
         {/* Component JSX */}
       </div>
     );
   };
   
   export default ComponentName;
   ```

2. **Props Interface**:
   ```typescript
   interface ComponentProps {
     prop1: string;
     prop2?: number;
     onAction?: () => void;
   }
   ```

3. **Export Pattern**:
   ```typescript
   // index.ts
   export { default as ComponentName } from './ComponentName';
   ```

### Best Practices

1. **TypeScript**: Always use TypeScript for type safety
2. **Props Validation**: Define clear interfaces for all props
3. **Error Boundaries**: Wrap components that might fail
4. **Accessibility**: Include ARIA labels and keyboard navigation
5. **Performance**: Use React.memo for expensive components

## 📱 Responsive Design

### Breakpoint Strategy

```css
/* Mobile First Approach */
.responsive-grid {
  @apply grid grid-cols-1;          /* Mobile */
  @apply md:grid-cols-2;            /* Tablet */
  @apply lg:grid-cols-3;            /* Desktop */
  @apply xl:grid-cols-4;            /* Large Desktop */
}

/* Container Queries */
.adaptive-container {
  @apply w-full;
  @apply max-w-sm mx-auto;          /* Mobile */
  @apply md:max-w-2xl;              /* Tablet */
  @apply lg:max-w-4xl;              /* Desktop */
  @apply xl:max-w-6xl;              /* Large Desktop */
}
```

## 🧪 Testing Strategy

### Unit Testing

```typescript
// Component.test.tsx
import { render, screen } from '@testing-library/react';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### Integration Testing

```typescript
// Integration.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import InstitutionalProfiles from './InstitutionalProfiles';

describe('InstitutionalProfiles Integration', () => {
  it('filters institutions correctly', () => {
    render(<InstitutionalProfiles />);
    
    const searchInput = screen.getByPlaceholderText('Search institutions...');
    fireEvent.change(searchInput, { target: { value: 'Nairobi' } });
    
    expect(screen.getByText('University of Nairobi')).toBeInTheDocument();
  });
});
```

## 🚀 Performance Optimization

### Code Splitting

```typescript
// Lazy loading for large components
const InstitutionalProfiles = React.lazy(() => import('./InstitutionalProfiles'));

// Usage with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <InstitutionalProfiles />
</Suspense>
```

### Memory Management

```typescript
// Cleanup in useEffect
useEffect(() => {
  const subscription = subscribeTo(updates);
  
  return () => {
    subscription.unsubscribe();
  };
}, []);
```

### Bundle Optimization

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-select'],
        },
      },
    },
  },
});
```

## 🔐 Security Considerations

### Input Validation

```typescript
// Sanitize user input
const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

// Validate data types
const validateInstitution = (data: unknown): Institution => {
  // Use zod or similar for runtime validation
  return institutionSchema.parse(data);
};
```

### XSS Prevention

```typescript
// Safe HTML rendering
import DOMPurify from 'dompurify';

const SafeHTML = ({ content }: { content: string }) => (
  <div dangerouslySetInnerHTML={{ 
    __html: DOMPurify.sanitize(content) 
  }} />
);
```

## 📊 Analytics Integration

### Event Tracking

```typescript
// Analytics utility
const trackEvent = (eventName: string, properties: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
};

// Usage in components
const handleInstitutionClick = (institution: Institution) => {
  trackEvent('institution_viewed', {
    institution_name: institution.name,
    sector: institution.sector,
  });
};
```

## 🔄 State Management

### Local State Patterns

```typescript
// Complex state with useReducer
const institutionReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_INSTITUTIONS':
      return { ...state, institutions: action.payload };
    default:
      return state;
  }
};

const useInstitutions = () => {
  const [state, dispatch] = useReducer(institutionReducer, initialState);
  
  return { state, dispatch };
};
```

### Global State (Future)

```typescript
// Context API pattern
const InstitutionContext = createContext<InstitutionContextType | null>(null);

export const InstitutionProvider = ({ children }: { children: ReactNode }) => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  
  return (
    <InstitutionContext.Provider value={{ institutions, setInstitutions }}>
      {children}
    </InstitutionContext.Provider>
  );
};
```

## 🐛 Debugging

### Development Tools

```typescript
// Debug utility
const debug = (label: string, data: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(label);
    console.log(data);
    console.groupEnd();
  }
};

// Error boundary
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Component Error:', error, errorInfo);
    // Send to error reporting service
  }
}
```

### Common Issues

1. **Hydration Mismatches**: Ensure server and client render the same content
2. **Memory Leaks**: Clean up subscriptions and timers
3. **Performance**: Use React DevTools Profiler
4. **Bundle Size**: Analyze with webpack-bundle-analyzer

## 🚢 Deployment

### Build Process

```bash
# Production build
npm run build

# Build verification
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

### Environment Variables

```bash
# .env.production
VITE_API_URL=https://api.careervision.ke
VITE_ANALYTICS_ID=GA_MEASUREMENT_ID
VITE_ENVIRONMENT=production
```

### Deployment Checklist

- [ ] TypeScript compilation passes
- [ ] All tests pass
- [ ] Bundle size is optimized
- [ ] Environment variables set
- [ ] Analytics configured
- [ ] Error tracking enabled
- [ ] Performance monitoring active

## 📚 Learning Resources

### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

### Tools
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Tailwind Play](https://play.tailwindcss.com/)

---

**Happy Coding! 🚀**
