export default function capitalize (value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function capitalizeWords (value: string): string {
  return value
    .toLowerCase()
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
}
