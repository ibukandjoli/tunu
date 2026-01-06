import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  // Format EUR: 5 000 €
  const eur = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount)

  // Format FCFA: space separated thousands, no decimals
  const fcfaAmount = Math.round(amount * 655)
  const fcfa = new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: 0,
  }).format(fcfaAmount)

  return { eur, fcfa: `${fcfa} FCFA` }
}
