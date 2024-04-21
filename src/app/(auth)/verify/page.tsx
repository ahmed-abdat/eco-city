import ResetPassword from "@/components/auth/ResetPassword";
import VerifyEmail from "@/components/auth/VerifyEmail";
import { auth } from "@/config/firebase";

interface searchParamsType {
  searchParams: {
    [key: string]: string;
  };
}

export default function VerficationEmail({ searchParams }: searchParamsType) {
  const actionCode = searchParams?.oobCode;
  const mode = searchParams?.mode;
  const continueUrl = searchParams?.continueUrl;
  const email = continueUrl?.split("email=")[1].split("&")[0];
  const password = continueUrl?.split("password=")[1];

  return (
    <>
      {mode === "resetPassword" ? (
        <ResetPassword actionCode={actionCode} />
      ) : mode === "verifyEmail" ? (
        <VerifyEmail actionCode={actionCode} email={email} password={password} />
      ) : (
        <div>Invalid mode</div>
      )}
    </>
  )
}
