'use client'

import { AppHeader, Combobox } from '~/app/components'
import { type Pal } from '~/types'
import { useState } from 'react'
import { paldeck } from '~/app/paldeck'
import Image from 'next/image'

function getBreedingCombinations(pal: Pal | null) {
  if (!pal) return []
  const { breedingPower } = pal

  let closestMatches = [] as Pal[][]
  let closestDifference = Infinity

  paldeck.forEach((parentA) => {
    paldeck.forEach((parentB) => {
      const average = (parentA.breedingPower + parentB.breedingPower) / 2

      const difference = Math.abs(breedingPower - average)
      if (difference < closestDifference) {
        closestDifference = difference
        closestMatches = [[parentA, parentB]]
      } else if (difference === closestDifference) {
        closestMatches.push([parentA, parentB])
      }
    })
  })

  return closestMatches
}

export default function HomePage() {
  const [targetPal, setTargetPal] = useState<Pal | null>(null)

  function onSelect(pal: Pal | null) {
    setTargetPal(pal)
  }

  return (
    <main>
      <AppHeader />
      <div className="mx-auto flex h-full w-full flex-col gap-3 px-6 pb-3 lg:w-[50%] lg:gap-6 lg:px-0 lg:pb-6">
        <div className="flex flex-col items-center pb-3 pt-6 lg:gap-1.5">
          <h1 className="leading-tighter text-2xl font-bold tracking-tighter [text-wrap:balance] sm:text-4xl md:text-5xl lg:text-6xl/none">
            Find your{' '}
            <span className="text-primary underline underline-offset-2 md:underline-offset-8">
              perfect
            </span>{' '}
            combination
          </h1>
          <p className="text-sm leading-normal text-muted-foreground md:text-lg">
            Select the Pal you want to breed to get started
          </p>
        </div>
        <Combobox
          id="child-selector"
          onSelect={onSelect}
        />
        {targetPal && (
          <h2 className="font-bold tracking-tight md:text-xl">
            Compatible Parents
          </h2>
        )}
        {getBreedingCombinations(targetPal).map((combination, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr,1fr] rounded-md border px-6 py-3 shadow-sm"
          >
            {combination.map((pal, index) => (
              <div
                key={index}
                className="flex flex-col items-center"
              >
                <Image
                  className="h-8 w-8 rounded-full border lg:h-12 lg:w-12"
                  src={`/${pal.name}.webp`}
                  alt={pal.name}
                  width={50}
                  height={50}
                />
                <div className="flex gap-1 text-sm">
                  <span className="font-medium tracking-tight">{pal.name}</span>
                  <span className="font-regular tabular-nums text-muted-foreground">
                    #{pal.paldeckNumber}
                  </span>
                </div>
                <div className="mt-3 flex flex-col items-center text-sm">
                  <span className="text-xl font-medium tabular-nums leading-tight tracking-tighter">
                    {pal.breedingPower}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    Breeding power
                  </span>
                </div>
              </div>
              // <div
              //   key={index}
              //   className="flex items-start gap-4 md:items-center"
              // >
              //   <Image
              //     className="h-8 w-8 rounded-full border lg:h-12 lg:w-12"
              //     src={`/${pal.name}.webp`}
              //     alt={pal.name}
              //     width={50}
              //     height={50}
              //   />
              //   <div>
              //     <div className="flex items-center gap-0.5 text-sm">
              //       <span className="font-medium">{pal.name}</span>
              //       <span className="font-regular text-muted-foreground">
              //         #{pal.paldeckNumber}
              //       </span>
              //     </div>
              //     <div className="grid">
              //       <span className="text-xs text-muted-foreground">
              //         Breeding power
              //       </span>
              //       <span className="text-lg font-medium tracking-tighter">
              //         {pal.breedingPower}
              //       </span>
              //     </div>
              //   </div>
              // </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}
