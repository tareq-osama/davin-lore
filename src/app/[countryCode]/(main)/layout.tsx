import { Suspense } from "react"
import ClientToaster from "../../../components/client-toaster"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"

// Simple fallback footer component
function FallbackFooter() {
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

export default async function PageLayout(props: {
  children: React.ReactNode
  params: Promise<{ countryCode: string }>
}) {
  return (
    <>
      <Nav />
      {props.children}
      <Suspense fallback={<FallbackFooter />}>
        <Footer />
      </Suspense>
      <ClientToaster />
    </>
  )
}
