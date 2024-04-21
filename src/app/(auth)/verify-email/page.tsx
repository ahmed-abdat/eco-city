import Image from "next/image";

interface VerifyEmailProps {
  searchParams: {
    [key: string]: string;
  };
}

export default function VerifyEmail({ searchParams }: VerifyEmailProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center pt-8 mb-4">
      <div className="relative mb-4 h-60 w-60 text-muted-foreground">
        <Image src="/hippo-email-sent.png" fill alt="the email was sent" />
      </div>
      <h3 className="font-semibold text-2xl">Check your email</h3>
      <p className="text-muted-foreground text-center">
        We&apos;ve sent a verification link to  <span className="font-semibold">{searchParams?.email}</span>
      </p>
    </div>
  );
}
