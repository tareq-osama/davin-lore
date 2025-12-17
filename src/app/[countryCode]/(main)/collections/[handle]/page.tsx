import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCollectionByHandle, listCollections } from "@lib/data/collections"
import { listRegions } from "@lib/data/regions"
import { StoreCollection, StoreRegion } from "@medusajs/types"
import CollectionTemplate from "@modules/collections/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type Props = {
  params: Promise<{ handle: string; countryCode: string }>
  searchParams: Promise<{
    page?: string
    sortBy?: SortOptions
  }>
}

export const PRODUCT_LIMIT = 24

export async function generateStaticParams() {
  try {
    const { collections } = await listCollections({
      limit: "100",
      offset: "0",
    })

    if (!collections || collections.length === 0) {
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

    const collectionHandles = collections
      .map((collection: StoreCollection) => collection?.handle)
      .filter(Boolean) as string[]

    if (!collectionHandles || collectionHandles.length === 0) {
      return []
    }

    const staticParams = countryCodes
      .map((countryCode: string) =>
        collectionHandles.map((handle: string) => ({
          countryCode,
          handle,
        }))
      )
      .flat()

    return staticParams || []
  } catch (error) {
    console.error(
      `Failed to generate static paths for collection pages: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    )
    return []
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const collection = await getCollectionByHandle(params.handle)

  if (!collection) {
    notFound()
  }

  const metadata = {
    title: `${collection.title} | DAVINELORÉ`,
    description: `${collection.title} collection`,
  } as Metadata

  return metadata
}

export default async function CollectionPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams

  const collection = await getCollectionByHandle(params.handle).then(
    (collection: StoreCollection) => collection
  )

  if (!collection) {
    notFound()
  }

  return (
    <CollectionTemplate
      collection={collection}
      page={page}
      sortBy={sortBy}
      countryCode={params.countryCode}
    />
  )
}
