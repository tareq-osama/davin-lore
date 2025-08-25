"use server"

import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const retrieveCollection = async (id: string) => {
  try {
    const next = {
      ...(await getCacheOptions("collections")),
    }

    const result = await sdk.client
      .fetch<{ collection: HttpTypes.StoreCollection }>(
        `/store/collections/${id}`,
        {
          method: "GET",
          query: {
            fields: "*products,*products.variants,*products.variants.calculated_price,*products.variants.inventory_quantity,*products.metadata,*products.tags",
          },
          headers: {},
          next,
          cache: "no-store", // Changed from "force-cache" to ensure fresh data
        }
      )

    return result.collection
  } catch (error: any) {
    console.error(`Error fetching collection ${id}:`, error)
    return null
  }
}

export const listCollections = async (
  queryParams: Record<string, string> = {}
): Promise<{ collections: HttpTypes.StoreCollection[]; count: number }> => {
  try {
    const next = {
      ...(await getCacheOptions("collections")),
    }

    const limit = queryParams.limit || "100"
    const offset = queryParams.offset || "0"

    const result = await sdk.client
      .fetch<{ collections: HttpTypes.StoreCollection[]; count: number }>(
        "/store/collections",
        {
          method: "GET",
          query: {
            limit,
            offset,
            fields: "*products,*products.variants,*products.variants.calculated_price,*products.variants.inventory_quantity,*products.metadata,*products.tags",
            ...queryParams,
          },
          headers: {},
          next,
          cache: "force-cache", // Temporarily changed back to test if no-store is causing issues
        }
      )

    // Validate the response structure
    if (!result || typeof result !== 'object') {
      console.warn("Invalid collections response structure:", result)
      return { collections: [], count: 0 }
    }

    if (!Array.isArray(result.collections)) {
      console.warn("Collections is not an array:", result.collections)
      return { collections: [], count: 0 }
    }

    // Sanitize each collection to ensure serializability
    const sanitizedCollections = result.collections
      .filter(collection => collection && typeof collection === 'object')
      .map(collection => ({
        id: collection.id,
        title: collection.title,
        handle: collection.handle,
        // Only include essential, serializable properties
      }))
      .filter(collection => collection.id && collection.title && collection.handle)

    return { collections: sanitizedCollections, count: sanitizedCollections.length }
  } catch (error: any) {
    console.error("Error fetching collections:", error)
    // Return empty result instead of throwing
    return { collections: [], count: 0 }
  }
}

export const getCollectionByHandle = async (
  handle: string
): Promise<HttpTypes.StoreCollection | null> => {
  try {
    const next = {
      ...(await getCacheOptions("collections")),
    }

    const result = await sdk.client
      .fetch<HttpTypes.StoreCollectionListResponse>(`/store/collections`, {
        method: "GET",
        query: { handle, fields: "*products" },
        headers: {},
        next,
        cache: "no-store", // Changed from "force-cache" to ensure fresh data
      })

    return result.collections[0] || null
  } catch (error: any) {
    console.error(`Error fetching collection by handle ${handle}:`, error)
    return null
  }
}
