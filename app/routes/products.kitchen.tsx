import { Link, Outlet } from "@remix-run/react"

export default function KitchenRoute() {
  return (
    <div className="flex-1 p-8">
      <h1 className="text-2xl font-bold mb-6">
        <Link to={"/products/kitchen"}>Kitchen Hardware</Link>
      </h1>

      <Outlet />
    </div>
  )
}

