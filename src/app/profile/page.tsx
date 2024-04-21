"use client";

import ProfileSkelton from "@/components/ProfileSkelton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/hooks/use-user";
import { FilePenLine } from "lucide-react";
import Image from "next/image";
import { DrawerDialogDemo } from "@/components/profile/CustomDrawer";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import ModelImag from "@/components/profile/ModelImag";
import { getUser } from "../actions";
import { UpdatUser, User } from "@/types/user";

export default function Profile() {
  const user = useUser((state) => state.user);
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [usere  , setUser] = useState<UpdatUser | null >(user)
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    setFile(file);
  };

  useEffect(() => {
    if (file) {
      setIsOpen(true);
    }
  }, [file]);

  useEffect(() => {
    const fetchUser = async (uid : string) => {
      const user = await getUser(uid)
      console.log(user)
      setUser(user)
    }
    if(user?.uid){
      fetchUser(user.uid)
    }

  }, [user])

  console.log(user);
  

  

  return (
    <div className="container relative flex pt-20 lg:mb-8 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center relative min-h-64 rounded-lg bg-gray-100 pt-14 px-4 pb-6">
            <label
              htmlFor="file"
              className="rounded-full absolute -top-10 cursor-pointer w-[100px] h-[100px] overflow-hidden"
            >
              <Image
                src={user?.photoURL || "/anonymous-user.jpg"}
                alt="user logo"
                fill
                className="rounded-full cursor-pointer object-cover"
              />
            </label>
            <input
              type="file"
              name="file"
              id="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFile}
            />
            {
              file && <ModelImag open={isOpen} setOpen={setIsOpen} file={file} />
            }
            <h2 className="text-xl font-semibold tracking-tight">
              {user?.displayName || 'user display name'}
            </h2>
            <p className="mt-1 text-muted-foreground text-sm ">{user?.email || 'exemple@gmail.com'}</p>
            <div className="w-full pt-2">
              <Separator className="bg-gray-300" />
            </div>
            <div className="flex items-center justify-between gap-4 w-full pt-2">
              <div>
                <div className="text-muted-foreground text-xs pb-1 text-left">
                  ID
                </div>
                <div className="text-xs font-medium">{user?.uid || 'user uid identifier'}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs pb-1 text-left">
                  Provider
                </div>
                <div className="text-sm font-medium">{user?.providerId || 'user log in provider'}</div>
              </div>
            </div>
            <div className="pt-4 w-full">
              {
                user && <DrawerDialogDemo
                displayName={user.displayName}
                email={user.email}
              >
                <Button className="w-full rounded-2xl flex gap-3">
                  <FilePenLine size={20} className="ml-2" />
                  Edit Profile
                </Button>
              </DrawerDialogDemo>
              }
            </div>
          </div>
      </div>
    </div>
  );
}
