"use client";

import React, { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Image from "next/image";
import { X } from 'lucide-react';

import Imge from "./Imge";
import { toast } from "sonner";
import { app, auth , db } from "@/config/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { arrayUnion, collection, doc, setDoc, updateDoc } from "firebase/firestore";
export default function UploadImage({ report }: { report: string } ) {
  const [file, setFile] = React.useState<File | null>(null);
  const [loading , setLoading] = useState(false)
  const [note , setNote] = useState('')
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    setFile(file);
  };

  const removeFile = () => {
    setFile(null)
  }

  const handelSendImg = () => {
    if (file && report) {
      UpdateUserImage(file , report)
    }else {
      toast.error('please select a picture')
    }
  }

  
  const UpdateUserImage = (file: File , report : string) => {
    setLoading(true)
    const user = auth?.currentUser || null;
    if (file && user) {
      const storage = getStorage();
      const imageRef = ref(storage, `images/${user?.uid}/${file.name}`);
      uploadBytes(imageRef, file).then(async () => {
        try {
          const downloadURL = await getDownloadURL(imageRef);
          console.log(downloadURL);
          const uid = auth.currentUser?.uid
          if(!uid) return 
          await addImageToDB(report , uid , downloadURL)
          toast.success('picture uploaded succesfuly')
          setLoading(false)
        } catch (error) {
          setLoading(false)
          console.log(error);
          toast.error('error ocurent' + error)
          
        }
      });
    }
  };

  const addImageToDB = async(report : string , uid : string , imgUrl : string) => {
    
    try {
      const docRef = doc(db , 'users' , uid)
      await updateDoc(docRef, {
        images : arrayUnion({
          report ,
          url : imgUrl,
          note
        })
      })
      console.log("Document written with ID: ", uid);
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <Card className="w-[350px] sm:w-[400px] font-aljazira">
      <CardHeader>
        <CardTitle className="text-center"> upload your image </CardTitle>
      </CardHeader>
      <CardContent>
        {file ? (
          <div className="relative">
          <span className="absolute w-[20px] h-[20px] top-1 right-2 cursor-pointer flex bg-gray-300 hover:bg-gray-400 transition-all duration-100 items-center justify-center text-md rounded-full font-semibold p-3" onClick={removeFile}>X</span>
            <Image
              src={URL.createObjectURL(file)}
              width={400}
              height={200}
              alt="user logo"
              className="rounded-lg w-full h-full object-cover cursor-pointer"
            />
          </div>
        ) : (
          <Imge handleFile={handleFile} />
        )}
        <form className="mt-4">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">note</Label>
              <Input id="name" placeholder='write a note' value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between w-full">
        <Button className="w-full" disabled={loading} onClick={handelSendImg}>
          send
        </Button>
      </CardFooter>
    </Card>
  );
}
