import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  try {
    let collections: Array<{ id: string; title: string; handle: string }> = []
    let productCategories: Array<{
      id: string;
      name: string;
      handle: string;
      parent_category: { id: string; name: string; handle: string } | null;
      category_children: Array<{ id: string; name: string; handle: string }>;
    }> = []

    try {
      const collectionsResult = await listCollections({
        limit: "100",
        offset: "0",
      })
      
      // Sanitize collections data to ensure serializability
      if (collectionsResult?.collections && Array.isArray(collectionsResult.collections)) {
        collections = collectionsResult.collections.map(collection => ({
          id: collection.id,
          title: collection.title,
          handle: collection.handle,
          // Only include essential, serializable properties
        })).filter(Boolean)
      }
    } catch (error) {
      console.error("Error fetching collections in footer:", error)
      collections = []
    }

    try {
      const categoriesResult = await listCategories({
        limit: 100,
        offset: 0,
      })
      
      // Sanitize categories data to ensure serializability
      if (Array.isArray(categoriesResult)) {
        productCategories = categoriesResult.map(category => ({
          id: category.id,
          name: category.name,
          handle: category.handle,
          parent_category: category.parent_category ? {
            id: category.parent_category.id,
            name: category.parent_category.name,
            handle: category.parent_category.handle,
          } : null,
          category_children: Array.isArray(category.category_children) ? category.category_children.map((child: any) => ({
            id: child.id,
            name: child.name,
            handle: child.handle,
          })) : [],
          // Only include essential, serializable properties
        })).filter(Boolean)
      }
    } catch (error) {
      console.error("Error fetching categories in footer:", error)
      productCategories = []
    }

    // Ensure we have arrays even if the API calls fail
    if (!Array.isArray(collections)) collections = []
    if (!Array.isArray(productCategories)) productCategories = []

    return (
      <footer className="border-t border-ui-border-base w-full">
        <div className="content-container flex flex-col w-full">
          <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-40">
            <div>
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
              >
                DAVINELORÉ
              </LocalizedClientLink>
            </div>
            <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
              {productCategories && Array.isArray(productCategories) && productCategories.length > 0 && (
                <div className="flex flex-col gap-y-2">
                  <span className="txt-small-plus txt-ui-fg-base">
                    Categories
                  </span>
                  <ul
                    className="grid grid-cols-1 gap-2"
                    data-testid="footer-categories"
                  >
                    {productCategories.slice(0, 6).map((c) => {
                      if (!c || !c.id || !c.name || !c.handle) return null

                      if (c.parent_category) {
                        return null
                      }

                      const children = c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                      return (
                        <li
                          className="flex flex-col gap-2 text-ui-fg-subtle txt-small"
                          key={c.id}
                        >
                          <LocalizedClientLink
                            className={clx(
                              "hover:text-ui-fg-base",
                              children && "txt-small-plus"
                            )}
                            href={`/categories/${c.handle}`}
                            data-testid="category-link"
                          >
                            {c.name}
                          </LocalizedClientLink>
                          {children && (
                            <ul className="grid grid-cols-1 ml-3 gap-2">
                              {children &&
                                children.map((child) => (
                                  <li key={child.id}>
                                    <LocalizedClientLink
                                      className="hover:text-ui-fg-base"
                                      href={`/categories/${child.handle}`}
                                      data-testid="category-link"
                                    >
                                      {child.name}
                                    </LocalizedClientLink>
                                  </li>
                                ))}
                            </ul>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
              {collections && Array.isArray(collections) && collections.length > 0 && (
                <div className="flex flex-col gap-y-2">
                  <span className="txt-small-plus txt-ui-fg-base">
                    Collections
                  </span>
                  <ul
                    className={clx(
                      "grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small",
                      {
                        "grid-cols-2": (collections?.length || 0) > 3,
                      }
                    )}
                  >
                    {collections.slice(0, 6).map((c) => {
                      if (!c || !c.id || !c.title || !c.handle) return null
                      
                      return (
                        <li key={c.id}>
                          <LocalizedClientLink
                            className="hover:text-ui-fg-base"
                            href={`/collections/${c.handle}`}
                            data-testid="collection-link"
                          >
                            {c.title}
                          </LocalizedClientLink>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">Medusa</span>
                <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                  <li>
                    <a
                      href="https://github.com/medusajs"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-ui-fg-base"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://docs.medusajs.com"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-ui-fg-base"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/medusajs/nextjs-starter-medusa"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-ui-fg-base"
                    >
                      Source code
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex w-full mb-16 justify-between text-ui-fg-muted">
            <Text className="txt-compact-small">
              © {new Date().getFullYear()} DAVINELORÉ. All rights reserved.
            </Text>
            <MedusaCTA />
          </div>
        </div>
      </footer>
    )
  } catch (error) {
    console.error("Footer component error:", error)
    // Return a simple fallback footer if the main footer fails
    return (
      <footer className="border-t border-ui-border-base w-full">
        <div className="content-container flex flex-col w-full">
          <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-40">
            <div>
              <a href="/" className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase">
                DAVINELORÉ
              </a>
            </div>
            <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">Categories</span>
                <p className="text-ui-fg-subtle txt-small">Loading...</p>
              </div>
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">Collections</span>
                <p className="text-ui-fg-subtle txt-small">Loading...</p>
              </div>
            </div>
          </div>
          <div className="flex w-full mb-16 justify-between text-ui-fg-muted">
            <p className="txt-compact-small">
              © {new Date().getFullYear()} DAVINELORÉ. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    )
  }
}
