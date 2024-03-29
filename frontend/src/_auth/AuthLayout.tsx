import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";

function AuthLayout() {
  const { isAuth } = useUserContext();
  return (
    <>
      {isAuth ? (
        <Navigate to="/" />
      ): (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
        </>
      )}
    </>
  )
}

export default AuthLayout