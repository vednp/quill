import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
export default function Nav() {
  return (
    <nav className="sticky h-14 flex inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between ">
          <Link href="/" className="flex z-50 font-semibold">
            <span>quill.</span>
          </Link>
        </div>
      </MaxWidthWrapper>
      <div className="hidden items-center space-x-4 mr-4 sm:flex">
        <>
          <Link
            href="/pricing"
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
            })}
          >
            Pricing
          </Link>
          <LoginLink
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
            })}
          >
            Sign in
          </LoginLink>
          <RegisterLink
            className={buttonVariants({
              size: "sm",
            })}
          >
            Get started <ArrowRight className="ml-1.5 h-5 w-5" />
          </RegisterLink>
        </>
      </div>
    </nav>
  );
}
