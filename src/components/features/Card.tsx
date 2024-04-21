'use client'

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { features } from "@/constants/features"
import Link from "next/link"


export default function FeatureCard() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 justify-center">
    {
        features.map((feature) => (
          <Link href={`/features/${feature.id}`}>
            <Card className="w-[350px]  bg-blue-100 text-blue-900 cursor-pointer hover:text-blue-400 transition-all duration-100" key={feature.id}>
            <CardContent className="min-h-[250px] flex items-center justify-center">
                <feature.icon size={70} />
            </CardContent>
            <CardFooter className="flex text-lg justify-center">
                {feature.name}
            </CardFooter>
          </Card>
          </Link>
        ))
        
    }
    </div>
  )
}
