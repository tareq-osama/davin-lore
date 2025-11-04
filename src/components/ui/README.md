# ShadCN UI Components

This directory contains ShadCN UI components that work alongside Medusa UI in your storefront.

## Available Components

- **card.tsx** - Card container with header, content, and footer sections
- **badge.tsx** - Small status/label indicators with variant support
- **separator.tsx** - Visual divider for sections
- **tabs.tsx** - Tabbed interface for content organization

## Usage

```typescript
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
```

## Adding New Components

### Method 1: Visit ShadCN Website
1. Go to [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components)
2. Browse available components
3. Copy the code for the component you want
4. Create a new file here: `src/components/ui/[component-name].tsx`
5. Paste the component code
6. Install any required Radix UI dependencies

### Method 2: Using CLI (may have Windows issues)
```bash
npx shadcn@latest add [component-name]
```

## Common Radix Dependencies

If you add components manually, you may need:
```bash
yarn add @radix-ui/react-dialog          # For Dialog/Modal
yarn add @radix-ui/react-dropdown-menu   # For Dropdown Menu
yarn add @radix-ui/react-tooltip         # For Tooltip
yarn add @radix-ui/react-popover         # For Popover
yarn add @radix-ui/react-select          # For Select
yarn add @radix-ui/react-checkbox        # For Checkbox
yarn add @radix-ui/react-radio-group     # For Radio Group
yarn add @radix-ui/react-switch          # For Switch
```

## Component Structure

All components follow this pattern:
- Use `cn()` utility from `@/lib/utils` for className merging
- Built on Radix UI primitives for accessibility
- Styled with Tailwind CSS
- Support dark mode via CSS variables
- TypeScript types included

## Examples

See the demo page at `/shadcn-test` for working examples of all components.

## Documentation

- Full integration guide: `SHADCN_INTEGRATION_GUIDE.md` (root directory)
- Integration summary: `INTEGRATION_SUMMARY.md` (root directory)
- ShadCN docs: https://ui.shadcn.com/

