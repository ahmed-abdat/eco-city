import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { sendEmailVerification } from "firebase/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SendEmailVerficationModel({
  email = "",
  user,
}: {
  email: string;
  user: any;
}) {
  const router = useRouter();

  const sendEmailVerificationes = () => {
    sendEmailVerification(user)
      .then(() => {
        const sentToEmail = user?.email ? user.email : email;
        toast.success(`Verification email sent to ${sentToEmail}.`);
        router.push("/verify-email?email=" + sentToEmail);
      })
      .catch((error) => {
        toast.error("Something went wrong. Please try again. " + error.message);
      });
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader className="text-center">
        <AlertDialogTitle>Send a new verification email ?</AlertDialogTitle>
        <AlertDialogDescription>
          to request a new verification email to your email address{" "}
          <span className="font-semibold">{email}</span>{' '}
          please click on the send button and check your email inbox
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="flex flex-row">
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={sendEmailVerificationes}>
          send email verification
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
