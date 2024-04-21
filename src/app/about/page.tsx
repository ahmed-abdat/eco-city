import MaxWidthWrapper from "@/components/MaxWithWrapper";
import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <MaxWidthWrapper>
      <section className="flex items-center flex-col sm:flex-row mt-4 sm:gap-x-4 gap-y-4">
        <div className="w-full sm:max-w-[50%]">
          <div className="about">
            <h1 className="font-bold text-lg">About Us</h1>
            <p>
              About Us Eco-City is your tool to help make your city cleaner and
              safer. With our app, you can easily report:
              - Unlawful Construction: Take a photo and report construction that seems
              illegal or unsafe. Your reports help ensure building projects
              comply with safety regulations.
              - Garbage: Report piles of garbage
              or overflowing bins. This helps city services respond quickly to
              keep public spaces clean.
              - Sanitation Problems: If you notice
              clogged drains or other unsanitary conditions, you can report them
              through Eco-City for a healthier city.
              Use Eco-City to make a positive impact on your community. Join us in creating cleaner,
              safer, and more sustainable cities.
            </p>
          </div>
        </div>
        <div className="left-side">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/marketplace-37e56.appspot.com/o/Black%20White%20and%20Green%20Modern%20Technology%20Animated%20Logo%20(3).png?alt=media&token=875e9939-b7b3-4965-a5cd-370f4651013d"
            alt="about"
            width={400}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
      </section>
    </MaxWidthWrapper>
  );
}
