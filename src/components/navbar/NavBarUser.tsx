"use client";

import { useUser } from "@/hooks/use-user";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import LogoutButton from "@/components/auth/LogoutButton";
import UserAvatar from "@/components/navbar/UserAvatar";

export default function NavBarUser() {
  const user = useUser((state) => state.user);
  // console.log(user?.photoURL);
  
  return (
    <>
      {user ? null : (
        <Link
          href="/login"
          className={buttonVariants({
            variant: "ghost",
          })}
        >
          Sign in
        </Link>
      )}
      {/* {user ? null : (
        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
      )} */}
      {user ? (
       null
      ) : (
        <Link
          href="/register"
          className={buttonVariants({
            variant: "ghost",
          })}
        >
          Create account
        </Link>
      )}
    </>
  );
}
