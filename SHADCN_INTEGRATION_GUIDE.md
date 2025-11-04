# ShadCN Integration Guide

## ✅ Integration Complete

ShadCN UI has been successfully integrated into your DAVINELORE storefront and is now ready to use alongside Medusa UI components.

## 📦 What Was Installed

### Dependencies Added
- `class-variance-authority` - Component variant management
- `clsx` - Conditional className utility
- `tailwind-merge` - Tailwind class merging
- `lucide-react` - Icon library for ShadCN components
- `@radix-ui/react-tabs` - Tabs primitive

### Files Created
- `src/lib/utils.ts` - CN utility function for ShadCN components
- `components.json` - ShadCN configuration
- `src/components/ui/card.tsx` - Card component
- `src/components/ui/badge.tsx` - Badge component
- `src/components/ui/separator.tsx` - Separator component
- `src/components/ui/tabs.tsx` - Tabs component
- `src/app/[countryCode]/(main)/shadcn-test/page.tsx` - Demo page

### Configuration Changes
- `tsconfig.json` - Added `@/*` path alias
- `tailwind.config.js` - Added ShadCN color variables and border radius utilities
- `src/styles/globals.css` - Added ShadCN CSS variables for light/dark themes

## 🚀 Usage

### Importing Components

**Medusa UI Components:**
```typescript
import { Button, Heading, Text } from "@medusajs/ui"
```

**ShadCN Components:**
```typescript
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
```

### Utility Functions

**Medusa UI:**
```typescript
import { clx } from "@medusajs/ui"
```

**ShadCN:**
```typescript
import { cn } from "@/lib/utils"
```

## 📝 Component Guidelines

### Use Medusa UI For:
- ✅ Core e-commerce flows (checkout, cart, product pages)
- ✅ Existing components and features
- ✅ Medusa-integrated functionality (payment, shipping)
- ✅ Maintaining consistent brand experience

### Use ShadCN For:
- ✅ New features not requiring Medusa-specific styling
- ✅ Complex interactions (data tables, command palettes)
- ✅ Rich UI patterns (tooltips, popovers, context menus)
- ✅ Marketing and content pages
- ✅ Dashboard or admin sections

## 🎨 Installed ShadCN Components

Currently available components:
- **Card** - Display content in a card container
- **Badge** - Small status or label indicators
- **Separator** - Visual divider between sections
- **Tabs** - Tabbed interface for content organization

## 🔧 Adding More Components

### Method 1: Using ShadCN CLI (may have permission issues on Windows)
```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

### Method 2: Manual Installation
1. Visit [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components)
2. Copy the component code
3. Create file in `src/components/ui/[component-name].tsx`
4. Install any required Radix UI dependencies:
```bash
yarn add @radix-ui/react-[primitive-name]
```

## 🎯 Demo Page

Visit `/shadcn-test` to see both libraries working together with:
- Side-by-side component comparisons
- Integration examples
- Usage recommendations
- Technical details

## 🏗️ Architecture

### Import Paths
- **Medusa UI**: `@medusajs/ui` (npm package)
- **ShadCN**: `@/components/ui/*` (local components via path alias)

### Styling Approach
Both libraries use:
- Tailwind CSS for styling
- Radix UI primitives for accessibility
- CSS variables for theming
- Dark mode support via `class` strategy

### No Conflicts
- Different import paths prevent naming collisions
- CSS variables are namespaced appropriately
- Both can be used in the same file/component

## 🎨 Theming

### CSS Variables
ShadCN components use CSS variables defined in `src/styles/globals.css`:
- `--background`, `--foreground`
- `--primary`, `--secondary`
- `--muted`, `--accent`
- `--card`, `--popover`
- `--destructive`
- `--border`, `--input`, `--ring`

### Dark Mode
The integration supports dark mode via Tailwind's class strategy. CSS variables automatically switch based on the `.dark` class on the HTML element.

## 🔍 Troubleshooting

### Path Alias Not Working
Ensure your editor/IDE has restarted after `tsconfig.json` changes. VSCode users may need to:
1. Press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
2. Select "TypeScript: Restart TS Server"

### Style Conflicts
If you see unexpected styling:
1. Check that you're using `cn()` for ShadCN components
2. Check that you're using `clx()` for Medusa components
3. Verify Tailwind classes aren't being overridden

### Component Not Found
Make sure:
1. The component file exists in `src/components/ui/`
2. Required Radix UI dependencies are installed
3. The import path uses `@/components/ui/` prefix

## 📚 Resources

- [ShadCN Documentation](https://ui.shadcn.com/)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [Medusa UI Documentation](https://docs.medusajs.com/ui)
- [Tailwind CSS](https://tailwindcss.com/)

## 🛡️ Best Practices

1. **Don't refactor existing Medusa components** unless necessary
2. **Keep e-commerce flows stable** - use proven Medusa components
3. **Test thoroughly** when mixing components in the same view
4. **Use consistent naming** - import with clear aliases if needed:
   ```typescript
   import { Button as MedusaButton } from "@medusajs/ui"
   import { Button as ShadcnButton } from "@/components/ui/button"
   ```
5. **Document component choices** in your team guidelines

## ⚡ Performance

- Both libraries are tree-shakeable
- Only imported components are bundled
- Radix UI primitives are shared between libraries
- No significant bundle size increase expected

## 🎉 Next Steps

1. Explore the demo page at `/shadcn-test`
2. Install additional ShadCN components as needed
3. Build new features using the appropriate library
4. Establish team guidelines for component selection

## 💡 Example: Using Both Libraries Together

```typescript
import { Button, Heading } from "@medusajs/ui"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ProductFeature() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heading level="h3">New Feature</Heading>
          <Badge>Beta</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>This card uses ShadCN, but the button uses Medusa UI.</p>
        <Button variant="primary" className="mt-4">
          Learn More
        </Button>
      </CardContent>
    </Card>
  )
}
```

---

**Integration completed successfully!** 🎊

For questions or issues, refer to the resources above or check the demo page implementation.

