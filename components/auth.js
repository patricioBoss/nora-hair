// components/auth.jsx
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Auth = ({ children, role }) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const hasUser = !!session?.user;
  const hasAccess=(session, role)=>session?.user?.role.toLowerCase()===role.toLowerCase()
  const router = useRouter();
  useEffect(() => {
    if (!loading) {
      if (!hasUser) {
        router.push("/signin");
      } else if (!hasAccess(session, role)) {
        router.push("/admin/login");
      }
    }
  }, [hasUser, loading]);

  return children;
};

export default Auth