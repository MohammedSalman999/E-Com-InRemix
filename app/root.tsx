import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react"
import type { LinksFunction, LoaderFunction } from "@remix-run/node"

import "./tailwind.css"

// Clerk authentication imports
import { ClerkApp, useUser } from "@clerk/remix"
import { rootAuthLoader } from "@clerk/remix/ssr.server"
import { useAuth } from "@clerk/remix"

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Beleza&family=Inter:wght@100..900&display=swap",
  },
]

export const loader: LoaderFunction = (args) => rootAuthLoader(args)

function App() {
  const { user, isLoaded } = useUser()
  const { isSignedIn } = useAuth()

  return (
    <html lang="en" className="font-sans">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet context={{ user, isLoaded }} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default ClerkApp(App)
