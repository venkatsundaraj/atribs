import { useSession } from "@/lib/auth-utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Logout from "../_components/logout";

interface layoutProps {
  children: React.ReactNode;
}

const layout = async ({ children }: layoutProps) => {
  const auth = await useSession();
  if (!auth.success) {
    redirect("/signup");
  }
  return (
    <div className="flex flex-col items-center justify-center gap-16">
      <nav className="flex items-center justify-center gap-6">
        <Link
          href={"/dashboard/vehicle/all"}
          className="underline hover:text-blue-500"
        >
          all
        </Link>
        <p>/</p>
        <Link
          href={"/dashboard/vehicle/create"}
          className="underline hover:text-blue-500"
        >
          create
        </Link>
        <br />
        <Suspense fallback={<p>Loading...</p>}>
          <Logout />
        </Suspense>
      </nav>

      {children}
    </div>
  );
};

export default layout;
