import { Outlet } from "react-router-dom";

export function Root() {
  return (
    <>
      <div className="blur"></div>
      <div className="inner">
        <Outlet/>
      </div>
    </>
  )
}
