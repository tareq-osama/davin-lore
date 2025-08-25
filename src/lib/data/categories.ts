"use server"

import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const listCategories = async (query?: Record<string, any>) => {
  try {
    const next = {
      ...(await getCacheOptions("categories")),
    }

    const limit = query?.limit || 100
    const offset = query?.offset || 0

    const result = await sdk.client
      .fetch<{ product_categories: HttpTypes.StoreProductCategory[] }>(
        "/store/product-categories",
        {
          method: "GET",
          query: {
            limit,
            offset,
            fields: "*products,*products.variants,*products.variants.calculated_price,*products.variants.inventory_quantity,*products.metadata,*products.tags",
            ...query,
          },
          headers: {},
          next,
          cache: "no-store", // Changed from "force-cache" to ensure fresh data
        }
      )

    // Validate the response structure
    if (!result || typeof result !== 'object') {
      console.warn("Invalid categories response structure:", result)
      return []
    }

    if (!Array.isArray(result.product_categories)) {
      console.warn("Product categories is not an array:", result.product_categories)
      return []
    }

    // Sanitize each category to ensure serializability
    const sanitizedCategories = result.product_categories
      .filter(category => category && typeof category === 'object')
      .map(category => ({
        id: category.id,
        name: category.name,
        handle: category.handle,
        parent_category: category.parent_category ? {
          id: category.parent_category.id,
          name: category.parent_category.name,
          handle: category.parent_category.handle,
        } : null,
        category_children: Array.isArray(category.category_children) ? category.category_children
          .filter(child => child && typeof child === 'object')
          .map(child => ({
            id: child.id,
            name: child.name,
            handle: child.handle,
          }))
          .filter(child => child.id && child.name && child.handle) : [],
        // Only include essential, serializable properties
      }))
      .filter(category => category.id && category.name && category.handle)

    return sanitizedCategories
  } catch (error: any) {
    console.error("Error fetching categories:", error)
    // Return empty array instead of throwing
    return []
  }
}

export const getCategoryByHandle = async (categoryHandle: string[]) => {
  try {
    const handle = `${categoryHandle.join("/")}`

    const next = {
      ...(await getCacheOptions("categories")),
    }

    const result = await sdk.client
      .fetch<HttpTypes.StoreProductCategoryListResponse>(
        `/store/product-categories`,
        {
          method: "GET",
          query: {
            handle: [handle],
            fields: "*products,*products.variants,*products.variants.calculated_price,*products.variants.inventory_quantity,*products.metadata,*products.tags",
          },
          headers: {},
          next,
          cache: "no-store", // Changed from "force-cache" to ensure fresh data
        }
      )

    return result.product_categories[0] || null
  } catch (error: any) {
    console.error(`Error fetching category by handle ${categoryHandle}:`, error)
    return null
  }
}
