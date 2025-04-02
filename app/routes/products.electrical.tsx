import { Link, Outlet } from "@remix-run/react"

export default function ElectricalRoute() {
  return (
    <div className="flex-1 p-8">
      <h1 className="text-2xl font-bold mb-6">
        <Link to={"/products/electrical"}>Electrical Products</Link>
      </h1>

      <Outlet />
    </div>
  )
}

