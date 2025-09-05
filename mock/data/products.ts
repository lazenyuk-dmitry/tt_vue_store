import { Product, Rarity } from '../types/products'
import { getRandomFromArray, getRandomInt } from '../utils'

const rarities: Rarity[] = [
  'consumer',
  'industrial',
  'mil-spec',
  'restricted',
  'classified',
  'covert',
]

const tags = [
  'rare',
  'vintage',
  'collectible',
  'premium',
  'exclusive',
  'steel',
  'tactical',
  'survival',
  'decorative',
  'training',
]

function randomTags(): string[] {
  return tags.sort(() => Math.random() - 0.5).slice(0, getRandomInt(0, 3))
}

function randomImage(id: number) {
  return `https://picsum.photos/seed/product-${id}/400/300`
}

function generateNames(count: number): string[] {
  const prefixes = [
    'Shadow',
    'Crimson',
    'Night',
    'Tiger',
    'Frost',
    'Venom',
    'Phantom',
    'Steel',
    'Ghost',
    'Blood',
  ]
  const base = [
    'Knife',
    'Dagger',
    'Karambit',
    'Bayonet',
    'Machete',
    'Tanto',
    'Dirk',
    'Cleaver',
    'Stiletto',
    'Hunter',
  ]
  const suffixes = [
    'MK-II',
    'Prime',
    'X',
    'Edge',
    'Elite',
    'Series',
    'Viper',
    'Claw',
    'Strike',
    'Prototype',
  ]

  const names: Set<string> = new Set()

  while (names.size < count) {
    const name = [
      Math.random() > 0.3 ? getRandomFromArray(prefixes) : '',
      getRandomFromArray(base),
      Math.random() > 0.5 ? getRandomFromArray(suffixes) : '',
    ]
      .filter(Boolean)
      .join(' ')

    names.add(name)
  }

  return Array.from(names)
}

if (!(globalThis as any)._mockProducts) {
  (globalThis as any)._mockProducts = generateNames(getRandomInt(50, 100)).map((name, i) => ({
    id: i + 1,
    name,
    price: getRandomInt(20, 1000),
    rarity: rarities[getRandomInt(0, rarities.length - 1)],
    inStock: Math.random() > 0.2,
    tags: randomTags(),
    image: randomImage(i + 1),
  }))
}

export const products: Product[] = (globalThis as any)._mockProducts
