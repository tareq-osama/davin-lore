"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const listRegions = async () => {
  try {
    const next = {
      ...(await getCacheOptions("regions")),
    }

    const result = await sdk.client
      .fetch<{ regions: HttpTypes.StoreRegion[] }>(`/store/regions`, {
        method: "GET",
        next,
        cache: "no-store", // Changed from "force-cache" to ensure fresh data
      })

    return result.regions
  } catch (error: any) {
    console.error("Error fetching regions:", error)
    return null
  }
}

export const retrieveRegion = async (id: string) => {
  try {
    const next = {
      ...(await getCacheOptions(["regions", id].join("-"))),
    }

    const result = await sdk.client
      .fetch<{ region: HttpTypes.StoreRegion }>(`/store/regions/${id}`, {
        method: "GET",
        next,
        cache: "no-store", // Changed from "force-cache" to ensure fresh data
      })

    return result.region
  } catch (error: any) {
    console.error(`Error fetching region ${id}:`, error)
    return null
  }
}

const regionMap = new Map<string, HttpTypes.StoreRegion>()

export const getRegion = async (countryCode: string) => {
  try {
    if (regionMap.has(countryCode)) {
      return regionMap.get(countryCode)
    }

    const regions = await listRegions()

    if (!regions) {
      console.warn(`No regions found for country code: ${countryCode}`)
      return null
    }

    regions.forEach((region) => {
      region.countries?.forEach((c) => {
        regionMap.set(c?.iso_2 ?? "", region)
      })
    })

    const region = countryCode
      ? regionMap.get(countryCode)
      : regionMap.get("us")

    if (!region) {
      console.warn(`Region not found for country code: ${countryCode}`)
    }

    return region
  } catch (e: any) {
    console.error(`Error getting region for country code ${countryCode}:`, e)
    return null
  }
}
