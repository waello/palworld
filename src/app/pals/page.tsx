
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

export default function About() {
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
              Pals
            </h1>
            <p className="text-sm leading-normal text-muted-foreground md:text-lg">
              Select the Pal you want  to get info
            </p>
          </div>
          <Combobox
              id="child-selector"
              onSelect={onSelect}
          />
          {targetPal && (
              <h2 className="font-bold tracking-tight md:text-xl">
                Pal Info
              </h2>
          )}



          {targetPal && (
              <div
                  className="flex flex-col items-center">
                <Image
                    className="h-8 w-8 rounded-full border lg:h-12 lg:w-12"
                    src={`/${targetPal.name}.webp`}
                    alt={targetPal.name}
                    width={50}
                    height={50}
                />
                <div className="flex gap-1 text-sm">
                  <span className="font-medium tracking-tight">{targetPal.name}</span>
                  <span className="font-regular tabular-nums text-muted-foreground">
                    #{targetPal.paldeckNumber}
                  </span>
                </div>
                <div className="mt-3 flex flex-col items-center text-sm">
                  <span className="text-xl font-medium tabular-nums leading-tight tracking-tighter">
                    {targetPal.breedingPower}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    Breeding power
                  </span>
                </div>
                <div className="mt-3 flex flex-col items-center text-sm">
                  <span className="text-xl font-medium tabular-nums leading-tight tracking-tighter">
                    {targetPal.stats['Attack']}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    attack Power
                  </span>
                </div>
              </div>


          )}
          {targetPal && (
              <div className="info-card p-4  rounded-lg shadow-md">
                {/* Basic Information */}

                {/* Skills List */}
                <div className="mt-4">
                  <h3 className="font-semibold text-center">Skills</h3>
                  {targetPal.skills.map((skill, index) => (
                      <div key={index} className="mt-2">
                        <span className="font-bold">{skill.name}</span> (Lvl {skill.level}):
                        <span className="ml-2">{skill.description}</span>
                      </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-4">
                  <h3 className="font-semibold text-center">Stats</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(targetPal.stats).map(([key, value], index) => (
                        <div key={index} className="flex justify-between">
                          <span className="font-medium">{key}</span>
                          <span className="font-regular">{value}</span>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
          )}


        </div>
      </main>
  )
}
