'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { app, auth , db } from "@/config/firebase";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { useUser } from "@/hooks/use-user";
import { useState } from "react";
import { updateProfile } from "firebase/auth";

export default function ModelImag({
  open,
  setOpen,
  file,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  file: File | null;
}) {


  
  
    const [isloading , setIsloading] = useState(false)
    const updateUser = useUser(state => state.updateUser)

  const handelChangePicture = async () => {
    console.log("change picture");
    if (file) {
      UpdateUserImage(file);
    }
  };


  const UpdateUserImage = (file: File) => {
    setIsloading(true)
    const firestore = getFirestore(app);
    const user = auth?.currentUser || null;
    const docRef = doc(db, `users/${user?.uid}`);
    if (file && user) {
      const storage = getStorage();
      const imageRef = ref(storage, `profiles/${user?.uid}/${file.name}`);
      uploadBytes(imageRef, file).then(async () => {
        try {
          const downloadURL = await getDownloadURL(imageRef);
          const updateURL = {
            photoURL: downloadURL,
          };
          await updateProfile(user , updateURL)
          await updateDoc(docRef, updateURL);
          updateUser(updateURL)
          toast.success('profile picture updated')
          setOpen(false)
          setIsloading(false)
        } catch (error) {
          setIsloading(false)
          console.log(error);
          toast.error('error ocurent' + error)
          
        }
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> your new profile picture </DialogTitle>
        </DialogHeader>
        {file && (
          <div className="max-h-[50dvh] w-full overflow-hidden">
            <Image
              src={URL.createObjectURL(file)}
              width={400}
              height={200}
              alt="user logo"
              className="rounded-lg w-full h-full object-cover cursor-pointer"
            />
          </div>
        )}
        <DialogFooter>
          <Button className="w-full" onClick={handelChangePicture} disabled={isloading}>
            set new Profile image
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
