import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FilePenLine } from "lucide-react";

export default function ProfileSkelton() {
  return (
    <div className="flex flex-col items-center space-y-2 text-center relative min-h-64 rounded-lg bg-gray-50 pt-14 px-4 pb-6">
      <Skeleton className="rounded-full absolute -top-10 w-[100px] h-[100px]" />
      <Skeleton className="h-5 w-[70%] pt-8" />
      <Skeleton className="h-4 w-[60%] pt-4" />
      <div className="w-full pt-2">
        <Separator className="bg-gray-300" />
      </div>
      <div className="flex items-center justify-between gap-4 w-full pt-2">
        <div>
          <Skeleton className="h-5 w-10 mb-2" />

          <Skeleton className="h-5 w-36" />
        </div>
        <div>
        <Skeleton className="h-5 w-10 mb-2" />
          <Skeleton className="h-5 w-36" />
        </div>
      </div>
      <div className="pt-4 w-full">
        <Skeleton className="w-full rounded-2xl h-10" />
      </div>
    </div>
  );
}
