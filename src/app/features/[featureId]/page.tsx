'use client'

import React from 'react'

import Card from '@/components/features/trash/Trash'
import { features } from '@/constants/features';
import { auth } from '@/config/firebase';
import { useRouter } from 'next/navigation';

export default function page({ params } : { params: { featureId: string }}) {
  const feature = features.find((feature) => feature.id === parseInt(params.featureId));
  console.log(feature);
  if(!feature?.name) return null

  const user = auth.currentUser || null

const router = useRouter()

if (!user) {
  router.push('/login')
}


  
  return (
    <section className='w-full h-full flex justify-center items-center mt-8' >
      <Card report={feature?.name} />
    </section>
  )
}
