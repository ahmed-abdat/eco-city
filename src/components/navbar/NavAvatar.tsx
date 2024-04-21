"use client";

import { useUser } from "@/hooks/use-user";
import UserAvatar from "@/components/navbar/UserAvatar";
import { FaUserCog } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { toast } from "sonner";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";

export default function NavAvatar() {
  const user = useUser((state) => state.user);
  const clearUser = useUser((state) => state.clearUser);
  const router = useRouter();
  const handelLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully");
        router.push("/");
        clearUser();
      })
      .catch((error) => {
        toast.error("Something went wrong. " + error.message);
        console.log(error);
      });
  };
  return (
    <div className="flex flex-1 items-center justify-start">
      {user && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <UserAvatar src={user?.photoURL || "/anonymous-user.jpg"} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/profile')}>
                Profile
                <DropdownMenuShortcut>
                  <FaUserCog size={20} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handelLogout}>
                Log out
                <DropdownMenuShortcut>
                  <LogOut size={20} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );
}
