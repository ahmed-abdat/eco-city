"use client";

import { Icons } from "../Icons";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import {
  PasswordValidator,
  TPasswordValidator,
} from "@/lib/validators/password-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/config/firebase";

export default function ResetPassword({ actionCode }: { actionCode: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPasswordValidator>({
    resolver: zodResolver(PasswordValidator),
  });

  const onSubmit = ({
    confirmPassword,
    newPassword,
  }: {
    confirmPassword: string;
    newPassword: string;
  }) => {
    setLoading(true);
    // Verify the password reset code is valid.
    verifyPasswordResetCode(auth, actionCode)
      .then((email) => {
        confirmPasswordReset(auth, actionCode, newPassword)
          .then((resp) => {
            setLoading(false);
            console.log(resp);
            toast.success("Password reset successfully");
            router.push("/login");
          })
          .catch((error) => {
            setLoading(false);
            toast.error(
              "Error occurred during confirmation or password to weak. Try again."
            );
            console.log(error);
          });
      })
      .catch((error) => {
        setLoading(false);
        toast.error(
          "Invalid or expired action code.  try to reset the password again." +
            error
        );
      });
  };

  return (
    <div className="container relative flex pt-20 lg:mb-8 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="h-20 w-20" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Reset your password
          </h1>
        </div>
        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-2 py-2">
                <Label htmlFor="password">new password</Label>
                <Input
                  type="password"
                  {...register("newPassword")}
                  className={cn({
                    "focus-visible:ring-red-500": errors.newPassword,
                  })}
                  placeholder="new password"
                />
                {errors?.newPassword && (
                  <p className="text-sm text-red-500">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2 py-2">
                <Label htmlFor="password">confirm password</Label>
                <Input
                  type="password"
                  {...register("confirmPassword")}
                  className={cn({
                    "focus-visible:ring-red-500": errors.confirmPassword,
                  })}
                  placeholder="confirm password"
                />
                {errors?.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <Button type="submit">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Reset password
              </Button>
            </div>
            <div className="flex flex-row"></div>
          </form>
        </div>
      </div>
    </div>
  );
}
