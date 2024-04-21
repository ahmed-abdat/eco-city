"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { toast } from "sonner";
import { useSignInWithGithub, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";
import { addUserToDatabase } from "@/lib/firestore/addUser";

export const Social = () => {
  const router = useRouter();
  const setUser = useUser((state) => state.setUser);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signInWithGithub] = useSignInWithGithub(auth);
  

//   login with google
const handelGoogleLogin = () => {
  signInWithGoogle()
    .then((user) => {
      if (user?.user) {
        const userInfo = {
          uid: user.user.uid,
          displayName: user.user.displayName || "",
          email: user.user.email || "",
          emailVerified: user.user.emailVerified,
          photoURL: user.user.photoURL || "",
          providerId: user.user.providerData[0].providerId,
        };
        addUserToDatabase(userInfo);
        setUser(userInfo);
        toast.success("Signed in successfully");
        router.push("/");
      }
    })
    .catch((error) => {
      toast.error("Something went wrong. " + error.message);
    });
};

//   login with github
const handelGithubLogin = () => {
  signInWithGithub()
    .then((user) => {
      if (user?.user) {
        const userInfo = {
          uid: user.user.uid,
          displayName: user.user.displayName || "",
          email: user.user.providerData[0].email || "",
          emailVerified: user.user.emailVerified,
          photoURL: user.user.photoURL || "",
          providerId: user.user.providerData[0].providerId,
        };
        setUser(userInfo);
        addUserToDatabase(userInfo);
        toast.success("Signed in successfully");
        router.push("/");
      }
    })
    .catch((error) => {
      toast.error("Something went wrong. " + error.message);
    });
};

return (
  <div className="flex items-center w-full gap-x-2">
    <Button
      size={"lg"}
      className="w-full"
      variant={"outline"}
      onClick={handelGoogleLogin}
      aria-label="Google"
      id="google-button"
      role="button"
    >
      <FcGoogle className="w-6 h-6" />
      {/* <span>Sign in with Google</span> */}
    </Button>
    <Button
      size={"lg"}
      className="w-full"
      variant={"outline"}
      onClick={handelGithubLogin}
      aria-label="Github"
      id="github-button"
      role="button"
    >
      <FaGithub className="w-6 h-6" />
      {/* <span>Sign in with Github</span> */}
    </Button>
  </div>
);
};