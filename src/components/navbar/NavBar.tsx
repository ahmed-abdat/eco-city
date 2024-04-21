'use client'

import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWithWrapper";
import { Icons } from "@/components/Icons";
import NavItems from "@/components/navbar/NavItems";
// import Cart from "@/components/Cart";
import { cookies } from "next/headers";
// import UserAccountNav from './UserAccountNav'
import MobileNav from "@/components/navbar/MobileNav";
import NavBarUser from "@/components/navbar/NavBarUser";
import UserAvatar from "./UserAvatar";
import NavAvatar from "./NavAvatar";

import Image from "next/image";
import { BsCoin } from "react-icons/bs";
import { auth } from "@/config/firebase";
import { useUser } from "@/hooks/use-user";

const Navbar =  () => {


  

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <MobileNav />

              <div className="ml-4 flex lg:ml-0">
                <Link href="/" aria-label="Logo" >
                  <Image src={'https://firebasestorage.googleapis.com/v0/b/marketplace-37e56.appspot.com/o/Black%20White%20and%20Green%20Modern%20Technology%20Animated%20Logo%20(2).png?alt=media&token=ffbef2a1-1ae6-487d-ae41-8366861dfc3a'}  alt="logo" width={70} height={70}/>
                  {/* <Icons.logo className="h-10 w-10" /> */}
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                {/* <NavItems /> */}
              </div>

              <div className="ml-auto flex items-center">
                <div className=" lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <NavBarUser />
                </div>
                {/* <h1>hi there</h1> */}
                <NavAvatar />

                {/* <div className="ml-4 flow-root lg:ml-6">
                  <Cart />
                </div> */}
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
