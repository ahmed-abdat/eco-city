import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatar({
  src,
}: {
  src: string;
}) {
  return (
    <Avatar>
      <AvatarImage
        src={src}
        alt="user avatar"
        sizes="md"
        width={40}
        height={40}
        onClick={() => console.log("clicked avatar")}
        className="cursor-pointer"
      />
      <AvatarFallback>AV</AvatarFallback>
    </Avatar>
  );
}
