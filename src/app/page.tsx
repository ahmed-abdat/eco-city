import MaxWidthWrapper from "@/components/MaxWithWrapper";
// import ProductReel from '@/components/ProductReel'
import { Button, buttonVariants } from "@/components/ui/button";
import {
  ArrowDownToLine,
  Building,
  CheckCircle,
  Leaf,
  Trash,
  Waves,
} from "lucide-react";
import Link from "next/link";
import Carde from "@/components/features/Card";

const perks = [
  {
    name: " Report Unlawful Construction",
    Icon: Building,
    description:
      "Use our app to report illegal construction or unpermitted building activities in your neighborhood. By documenting and submitting evidence, you can help ensure that construction in your area complies with safety regulations, contributing to a safer urban environment.",
  },
  {
    name: "Report Garbage",
    Icon: Trash,
    description:
      "Is there garbage piling up in your area? Take a photo and report it through our app. By identifying and reporting waste issues, you can assist city services in keeping streets and public spaces clean, leading to a healthier community.",
  },
  {
    name: "Report Sanitation Problems",
    Icon: Waves,
    description:
      "If you notice sanitation issues like clogged drains, overflowing bins, or unsanitary conditions, you can report them through our app. Your reports will help local authorities address these problems quickly, ensuring a cleaner and more hygienic city.",
  },
];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl font-tajawal ">
          Your City, Cleaner and Safer with 
            <span className="text-blue-600 ml-4">Eco-City</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Use Eco-City to make a positive impact on your community. Join us in
            creating cleaner, safer, and more sustainable cities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="#features" className={buttonVariants()}>
              <Button variant={"default"}>get started &rarr;</Button>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>

      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="m-4 " id="features">
        <Carde />
      </section>
    </>
  );
}
