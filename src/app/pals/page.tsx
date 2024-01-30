
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
                    className="h-12 w-12 rounded-full border lg:h-12 lg:w-12"
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
                <div className="mt-3 flex flex-col items-center text-sm">
                        <span className="text-xs font-medium text-muted-foreground">
                    attack Power
                  </span>
                  <p className="text-gray-600">                    {targetPal.description}</p>



                </div>
              </div>


          )}
          {targetPal && (
              <div className="info-card p-4  rounded-lg shadow-md">
                {/* Basic Information */}

                {/* Skills List */}
                <div className="mt-4">
                  <h3 className="font-semibold text-center text-lg mb-4">Skills</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {targetPal.skills.map((skill, index) => (
                        <div key={index} className="skill-card bg-white rounded-lg shadow p-4 hover:bg-gray-100">
                          <h4 className="font-bold text-primary mb-1">{skill.name} (Lvl {skill.level})</h4>
                          <p className="text-sm text-gray-500 mb-2">Power: {skill.power} | Cooldown: {skill.cooldown}</p>
                          <p className="text-gray-600">{skill.description}</p>
                        </div>
                    ))}
                  </div>
                </div>
                {/* drop List */}

                <div className="mt-6">
                  <h3 className="font-semibold text-center text-lg mb-4">Drops</h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    {targetPal.drops.map((drop, index) => (
                        <div key={index} className="drop-card bg-white rounded-lg shadow p-3 hover:bg-gray-100">
                          <span className="font-bold text-primary">{drop}</span>
                        </div>
                    ))}
                  </div>
                </div>


                {/* Stats */}
                <div className="mt-4">
                  <h3 className="font-semibold text-center text-lg mb-4">Stats</h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {Object.entries(targetPal.stats).map(([key, value], index) => (
                        <div key={index} className="stat-tab p-2 rounded-lg shadow-lg bg-white hover:bg-gray-100">
                          <span className="block text-sm font-semibold text-gray-700">{key}</span>
                          <span className="block text-md font-bold text-primary mt-1">{value}</span>
                        </div>
                    ))}
                  </div>
                </div>
                {/* aura */}

                <div className="mt-6">
                  <h3 className="font-semibold text-center text-lg mb-4">Aura</h3>
                  <div className="aura-card bg-white rounded-lg shadow p-4 hover:bg-gray-100">
                    <h4 className="font-bold text-primary mb-2">{targetPal.aura.name}</h4>
                    <p className="text-gray-600">{targetPal.aura.description}</p>
                  </div>
                </div>
              </div>
          )}


        </div>
      </main>
  )
}
