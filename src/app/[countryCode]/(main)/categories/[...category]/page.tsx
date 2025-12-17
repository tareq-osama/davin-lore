import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
}

export async function generateStaticParams() {
  try {
    const product_categories = await listCategories({
      limit: 100,
      offset: 0,
    })

    if (!product_categories || product_categories.length === 0) {
      return []
    }

    const regions = await listRegions()
    
    if (!regions || !Array.isArray(regions)) {
      console.warn("No regions available during build, returning empty params")
      return []
    }

    const countryCodes = regions
      .map((r) => r.countries?.map((c) => c.iso_2))
      .flat()
      .filter(Boolean) as string[]

    if (!countryCodes || countryCodes.length === 0) {
      console.warn("No country codes available during build, returning empty params")
      return []
    }

    const categoryHandles = product_categories
      .map((category: any) => category?.handle)
      .filter(Boolean)

    if (!categoryHandles || categoryHandles.length === 0) {
      return []
    }

    const staticParams = countryCodes
      .map((countryCode: string) =>
        categoryHandles.map((handle: string) => ({
          countryCode,
          category: [handle],
        }))
      )
      .flat()

    return staticParams || []
  } catch (error) {
    console.error(
      `Failed to generate static paths for category pages: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    )
    return []
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  try {
    const productCategory = await getCategoryByHandle(params.category)

    const title = productCategory.name + " | DAVINELORÉ"

    const description = productCategory.description ?? `${title} category.`

    return {
      title: `${title} | DAVINELORÉ`,
      description,
      alternates: {
        canonical: `${params.category.join("/")}`,
      },
    }
  } catch (error) {
    notFound()
  }
}

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams

  const productCategory = await getCategoryByHandle(params.category)

  if (!productCategory) {
    notFound()
  }

  return (
    <CategoryTemplate
      category={productCategory}
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  )
}
