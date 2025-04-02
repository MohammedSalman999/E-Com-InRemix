import { Link, Outlet } from "@remix-run/react";

export default function PaintsRoute() {
  return (
    <div className="flex-1 p-2">
      <h1 className="text-2xl font-bold mb-2">
        <Link to={"/products/paints"}>Paints</Link>
      </h1>

      <Outlet />
    </div>
  );
}
