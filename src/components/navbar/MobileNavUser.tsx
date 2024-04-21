"use client";
import { useUser } from "@/hooks/use-user";
import Link from "next/link";
import LogoutButton from "@/components/auth/LogoutButton";

export default function MobileNavUser({
  closeOnCurrent,
}: {
  closeOnCurrent: (path: string) => void;
}) {
  const user = useUser((state) => state.user);
  return (
    <div className="space-y-6 border-t border-gray-200 px-4 py-6 text-center">
      {!user ? (
        <>
          <div className="flow-root">
            <Link
              href="/login"
              onClick={() => closeOnCurrent("/login")}
              className="-m-2 block p-2 font-medium text-gray-900"
            >
              login
            </Link>
          </div>
          <div className="flow-root">
            <Link
              onClick={() => closeOnCurrent("/register")}
              href="/register"
              className="-m-2 block p-2 font-medium text-gray-900"
            >
              register
            </Link>
          </div>
        </>
      ) : (
  <>
      <LogoutButton />
  </>
      )}
    </div>
  );
}
