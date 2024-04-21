"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { toast } from "sonner";
import { app, auth , db } from "@/config/firebase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useUser } from "@/hooks/use-user";
import { User } from "@/types/user";
import { Social } from "@/components/auth/Social";
import SendEmailVerficationModel from "@/components/auth/SendEmailVerficationModel";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { addUserToDatabase } from "@/app/actions";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Image from "next/image";

const Page = () => {
  const router = useRouter();

  const setUser = useUser((state) => state.setUser);
  const [email, setEmail] = useState<string>("");

  const [isNeedSendEmailVerification, setiSNeedSendEmailVerification] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const firestore = getFirestore(app);

  const checkIfUserExist = useCallback(async (email: string) => {
    const usersRef = collection(db, "users");
    let user = null;
    const q = query(usersRef, where("email", "==", `${email}`));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          user = doc.data();
          return true;
        }
      });
      if (user) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Error getting documents: ", error);
      return false;
    }
  }, [ firestore])


  useEffect(() => {
    const handelError = async (error: any, email: string) => {
      if (email) {
        const isUserExist = await checkIfUserExist(email);
        if (isUserExist) {
          setiSNeedSendEmailVerification(false)
          toast.error("Invalid email or password");
        } else {
          setiSNeedSendEmailVerification(false)
          toast.error("You are not registered");
        }
      }
      if (error?.code.includes("too-many-requests")) {
        toast.error("Too many requests. Try again later");
        setiSNeedSendEmailVerification(false)
      }
    };

    if (error) {
      handelError(error, email);
    }
  }, [error, email, checkIfUserExist]);

  const handelLogin = (email: string, password: string) => {
      signInWithEmailAndPassword(email, password).then((userCredentiel) => {
        const user = userCredentiel?.user;  
        if (user && user.emailVerified) {
          const userInfo = {
            uid: user.uid,
            displayName: user.displayName || "",
            email: user.email || "",
            emailVerified: user.emailVerified,
            photoURL: user.photoURL || "",
            providerId: user.providerData[0].providerId,
      images: [], // Add this line
          };

          console.log(user);
          

          setUser(userInfo);
          toast.success("Signed in successfully");
          setiSNeedSendEmailVerification(false)
          router.push("/");
        } else if (user && !user?.emailVerified) {
          toast.error("Please verify your email");
          setiSNeedSendEmailVerification(true);
        }
      }).catch((error) => {
        console.log("error", error);
        setiSNeedSendEmailVerification(false)
      }); 

  };

  const handelResetPassword = async (emaile: string) => {
    console.log(`email`, emaile);
    emaile = emaile ? emaile : email ? email : "";
    const isUserExist = await checkIfUserExist(emaile);

    if (emaile.trim() === "") return toast.error("Please enter your email");
    if (isUserExist) {
      sendPasswordResetEmail(auth, emaile)
        .then(() => {
          toast.success("Password reset email sent");
          router.push("/reset-password?email=" + emaile);
        })
        .catch((error) => {
          toast.error("Something went wrong. " + error.message);
        });
    }else {
      toast.error("You are not registered");
    }
  };

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    handelLogin(email, password);
  };

  return (
    <>
      <div className="container relative flex pt-20 lg:mb-8 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
          <div className="ml-4 flex lg:ml-0">
                <Link href="/" aria-label="Logo" >
                  <Image src={'https://firebasestorage.googleapis.com/v0/b/marketplace-37e56.appspot.com/o/Black%20White%20and%20Green%20Modern%20Technology%20Animated%20Logo%20(2).png?alt=media&token=ffbef2a1-1ae6-487d-ae41-8366861dfc3a'}  alt="logo" width={100} height={100}/>
                  {/* <Icons.logo className="h-10 w-10" /> */}
                </Link>
              </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign in to your account
            </h1>

            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="/register"
            >
              Don&apos;t have an account?
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    {...register("email")}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email || error,
                    })}
                    placeholder="you@example.com"
                  />

                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password || error,
                    })}
                    placeholder="Password"
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign in
                </Button>
              </div>
              <div className="flex flex-row">
                <Button
                  size={"sm"}
                  variant={"link"}
                  className={"text-sm"}
                  onClick={() => handelResetPassword(user?.user?.email || "")}
                  asChild
                >
                  <Link href="#">Forget password ?</Link>
                </Button>
                {isNeedSendEmailVerification && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant={"link"}>
                        send new verification email ?
                      </Button>
                    </AlertDialogTrigger>
                    <SendEmailVerficationModel
                      email={user?.user?.email || ""}
                      user={user?.user}
                    />
                  </AlertDialog>
                )}
              </div>
            </form>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or
                </span>
              </div>
            </div>
            <Social />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
