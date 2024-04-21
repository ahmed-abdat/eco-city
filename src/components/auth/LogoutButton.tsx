"use client";

import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { toast } from "sonner";
import { buttonVariants } from "../ui/button";
import { useUser } from "@/hooks/use-user";

export default function Logout() {

    const clearUser = useUser((state) => state.clearUser);
  const handelLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully");
        clearUser();
      })
      .catch((error) => {
        toast.error("Something went wrong. " + error.message);
        console.log(error);
      });
  };

  return (
    <Link
      href="#"
      onClick={handelLogout}
      className={buttonVariants({
        variant: "default",
        size : 'lg'
      })}
    >
      Logout
    </Link>
  );
}
