"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { auth } from "@/config/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import {
  AuthCredentialsValidatorRegister,
  TAuthCredentialsValidatorRegister,
} from "@/lib/validators/account-credentials-validator";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Social } from "@/components/auth/Social";
import { addUserToDatabase } from "@/app/actions";
import { User } from "@/types/user";
import { useEffect } from "react";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidatorRegister>({
    resolver: zodResolver(AuthCredentialsValidatorRegister),
  });

  const [createUserWithEmailAndPassword, _, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handelSignUp = (email: string, password: string, Username: string) => {
    try {
      createUserWithEmailAndPassword(email, password)
        .then((user) => {
          if (user?.user) {
            addUserToDatabase({
              ...user.user,
              displayName: Username,
        images: [], // Add this line
        points: 0, // Add this line
              
            } as User);
            updateProfile( user.user, {
              displayName: Username,
            })
              .then(() => {
                console.log("user updated");
              })
              .catch((error) => {
                console.log("error updating user", error);
              });
          }
          if (user?.user && !user.user.emailVerified) {
            const actionCodeSettings = {
              url: `https://marketsplace.vercel.app?email=${user.user.email}&password=${password}`,
            };
            sendEmailVerification(user.user, actionCodeSettings)
              .then(() => {
                const sentToEmail = user?.user.email;
                toast.success(`Verification email sent to ${sentToEmail}.`);
                router.push("/verify-email?email=" + sentToEmail);
              })
              .catch((error) => {
                toast.error(
                  "Something went wrong. Please try again. " + error.message
                );
              });
          }
        })
        .catch((error) => {
          toast.error(
            "Something went wrong. Please try again. " + error.message
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(error?.code.includes('auth/email-already-in-use')){
      toast.error('Email already in use')
    }

  },[error])

  const onSubmit = ({
    email,
    password,
    Username,
  }: TAuthCredentialsValidatorRegister) => {
    handelSignUp(email, password, Username);
  };

  return (
    <>
      <div className="container relative flex pt-8 mb-8 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
          <Link href="/" aria-label="Logo" >
                  <Image src={'https://firebasestorage.googleapis.com/v0/b/marketplace-37e56.appspot.com/o/Black%20White%20and%20Green%20Modern%20Technology%20Animated%20Logo%20(2).png?alt=media&token=ffbef2a1-1ae6-487d-ae41-8366861dfc3a'}  alt="logo" width={100} height={100}/>
                  {/* <Icons.logo className="h-10 w-10" /> */}
                </Link>
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>

            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="/login"
            >
              Already have an account? login
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="Username" className="mb-1">
                    username
                  </Label>
                  <Input
                    {...register("Username")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.Username || error,
                    })}
                    placeholder="your username"
                  />
                  {errors?.Username && (
                    <p className="text-sm text-red-500">
                      {errors.Username.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="email" className="mb-1">
                    Email
                  </Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email || error,
                    })}
                    placeholder="you@example.com"
                  />
                  {errors?.email ? (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  ) : error?.code.includes('email-already-in-use') && <p className="text-sm text-red-500">
                  Email already in use
                </p>}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="password" className="mb-1">
                    Password
                  </Label>
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

                <Button disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign up
                </Button>
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
