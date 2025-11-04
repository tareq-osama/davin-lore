import { Button as MedusaButton, Heading as MedusaHeading, Text as MedusaText } from "@medusajs/ui"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ShadcnTestPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="space-y-4">
          <MedusaHeading level="h1" className="text-4xl">
            ShadCN & Medusa UI Integration Test
          </MedusaHeading>
          <MedusaText className="text-lg text-ui-fg-subtle">
            This page demonstrates both UI libraries working seamlessly together.
          </MedusaText>
        </div>

        <Separator />

        {/* Medusa UI Section */}
        <section className="space-y-4">
          <MedusaHeading level="h2" className="text-2xl">
            Medusa UI Components
          </MedusaHeading>
          <div className="flex gap-4 flex-wrap">
            <MedusaButton variant="primary">Primary Button</MedusaButton>
            <MedusaButton variant="secondary">Secondary Button</MedusaButton>
            <MedusaButton variant="transparent">Transparent Button</MedusaButton>
          </div>
          <MedusaText className="text-base-regular">
            These are the existing Medusa UI components that power your e-commerce functionality.
          </MedusaText>
        </section>

        <Separator />

        {/* ShadCN Components Section */}
        <section className="space-y-6">
          <MedusaHeading level="h2" className="text-2xl">
            ShadCN Components
          </MedusaHeading>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Card Component</CardTitle>
                <CardDescription>A beautiful card from ShadCN</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  This card component uses ShadCN styling and can be used for product displays, features, or any content.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="default">Featured</Badge>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Another Card</CardTitle>
                <CardDescription>With different badges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integration Test</CardTitle>
                <CardDescription>Mixed components</CardDescription>
              </CardHeader>
              <CardContent>
                <MedusaText className="text-sm mb-3">
                  Medusa Text inside ShadCN Card
                </MedusaText>
                <MedusaButton size="small" variant="secondary">
                  Medusa Button
                </MedusaButton>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <div className="mt-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Integration Overview</CardTitle>
                    <CardDescription>How both libraries work together</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <MedusaText>
                      ✓ Medusa UI components imported from @medusajs/ui
                    </MedusaText>
                    <MedusaText>
                      ✓ ShadCN components imported from @/components/ui/*
                    </MedusaText>
                    <MedusaText>
                      ✓ Both use Tailwind CSS for styling
                    </MedusaText>
                    <MedusaText>
                      ✓ No conflicts or style clashing
                    </MedusaText>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="features" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge>Coexistence</Badge>
                      <MedusaText>Both libraries work side by side</MedusaText>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Flexibility</Badge>
                      <MedusaText>Choose the best component for each use case</MedusaText>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">No Breaking Changes</Badge>
                      <MedusaText>Existing Medusa UI components unchanged</MedusaText>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="technical" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>ShadCN components use @/ path alias (resolves to src/)</li>
                      <li>Medusa UI uses @medusajs/ui package import</li>
                      <li>Both share Radix UI primitives foundation</li>
                      <li>Tailwind CSS variables for theming</li>
                      <li>clx utility for Medusa, cn utility for ShadCN</li>
                      <li>React 19 RC compatible</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <Separator />

        {/* Use Cases Section */}
        <section className="space-y-4">
          <MedusaHeading level="h2" className="text-2xl">
            Recommended Usage
          </MedusaHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Use Medusa UI For
                  <Badge variant="secondary">E-commerce</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Core e-commerce flows (checkout, cart, product pages)</p>
                <p>• Existing components and features</p>
                <p>• Medusa-integrated functionality</p>
                <p>• Consistent brand experience</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Use ShadCN For
                  <Badge variant="default">New Features</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• New features not requiring Medusa styling</p>
                <p>• Complex interactions and data tables</p>
                <p>• Rich UI patterns (command palette, tooltips)</p>
                <p>• Marketing and content pages</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <div className="flex justify-center gap-4 pt-8">
          <MedusaButton variant="primary" size="large">
            Continue Shopping
          </MedusaButton>
        </div>
      </div>
    </div>
  )
}

