"use client";

import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { applyActionCode, signInWithEmailAndPassword } from "firebase/auth";
import {  useUser } from "@/hooks/use-user";
import { User } from "@/types/user";
import { addUserToDatabase } from "@/lib/firestore/addUser";
import {auth} from "@/config/firebase";

interface VerifyEmailProps {
  actionCode: string;
  email: string;
  password: string;
}

const VerifyEmail = ({
  actionCode,
  email,
  password,
}: VerifyEmailProps) => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerify, setIsVerify] = useState(false);

  const router = useRouter();
  const setUser = useUser((state) => state.setUser);

  console.log(`email ${email} password ${password}`);
  console.log(`actionCode ${actionCode}`);

  useEffect(() => {
    if (actionCode) {
      applyActionCode(auth, actionCode)
        .then((res) => {
          signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
              toast.success("Email verified successfully");
              addUserToDatabase(user?.user as User);
              setIsVerify(true);
              setIsLoading(false);
              if (user?.user && user.user.emailVerified) {
                const userInfo = {
                  uid: user.user.uid,
                  displayName: user.user.displayName || "",
                  email: user.user.email || "",
                  emailVerified: user.user.emailVerified,
                  photoURL: user.user.photoURL || "",
                  providerId: user.user.providerData[0].providerId,
                };

                setUser(userInfo);
                router.push("/");
              }
            })
            .catch((error) => {
              setError(true);
              setIsLoading(false);
              toast.error(" Error login");
              console.log(error);
            });
        })
        .catch((error) => {
          setError(true);
          setIsLoading(false);
          console.log(error);
          toast.error("Invalid or expired action code");
        });
      }
    }, [actionCode , email, password, router, setUser]);
    
    if (error) {
      return (
        <div className="flex flex-col items-center gap-2 mt-8">
          <XCircle className="h-8 w-8 text-red-600" />
          <h3 className="font-semibold text-xl">There was a problem</h3>
          <p className="text-muted-foreground text-sm">
            please check your email and click to the link to verify your email
          </p>
        </div>
      );
    }
  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2 mt-8">
        <Loader2 className="animate-spin h-8 w-8 text-zinc-300" />
        <h3 className="font-semibold text-xl">Verifying...</h3>
        <p className="text-muted-foreground text-sm">
          This won&apos;t take long.
        </p>
      </div>
    );
  }


  if (isVerify) {
    return (
      <div className="flex h-full flex-col items-center justify-center mt-8">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image src="/hippo-email-sent.png" fill alt="the email was sent" />
        </div>

        <h3 className="font-semibold text-2xl">You&apos;re all set!</h3>
        <p className="text-muted-foreground text-center mt-1">
          Thank you for verifying your email.
        </p>
      </div>
    );
  }

  if (!isVerify && !isLoading && !error) {
    return (
      <>
        <div className="flex h-full flex-col items-center justify-center mt-8">
          <h3 className="font-semibold text-2xl">Check your email</h3>
          <p className="text-muted-foreground text-center">
            We&apos;ve sent a verification link to your email. {email}
          </p>
          <div className="relative mb-4 h-60 w-60 text-muted-foreground">
            <Image src="/hippo-email-sent.png" fill alt="the email was sent" />
          </div>
        </div>
      </>
    );
  }
};

export default VerifyEmail;
