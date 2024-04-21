'use client'
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { auth } from "@/config/firebase";
import { updateUser } from "@/app/actions";
import { useState } from "react";

export default function ProfileForm({
  className,
  // email,
  displayName,
}: React.ComponentProps<"form"> & { email?: string; displayName?: string }) {
  const [name, setName] = useState(displayName || '');
  const handelUpdateProfile = async () => {
    const uid = auth?.currentUser?.uid || null;

    if (!uid) return console.log("no user");

    if(name === displayName) return console.log('no changes')
    try {
      console.log(uid);
      await updateUser(uid, {
        displayName: name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          defaultValue={displayName}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <Button type="submit" onClick={handelUpdateProfile}>Save changes</Button>
    </div>
  );
}
