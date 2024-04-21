import { TUpdateProfileValidator, UpdateProfileValidator } from "@/lib/validators/update-profile";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { auth } from "@/config/firebase";
import { updateUser } from "@/app/actions";

export default function ProfileForm({
    className,
    // email,
    displayName,
  }: React.ComponentProps<"form"> & { email?: string; displayName?: string }) {
      const {
          register,
          handleSubmit,
          formState: { errors },
        } = useForm<TUpdateProfileValidator>({
          resolver: zodResolver(UpdateProfileValidator),
        });
  
        const onSubmit = async (data: TUpdateProfileValidator) => {
          const uid = auth?.currentUser?.uid || null;

          if(!uid) return console.log('no user');
          try {
            console.log(uid);
            await updateUser(uid, data)
          } catch (error) {
            console.log(error);
            
          }
        }


  
  
    return (
      <form className={cn("grid items-start gap-4", className)} onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" defaultValue={email} {...register('email')} />
        </div> */}
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" defaultValue={displayName} {...register('displayName')}/>
        </div>
        <Button type="submit" >Save changes</Button>
      </form>
    );
  }
