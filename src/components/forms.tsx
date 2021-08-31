import tw from 'twin.macro'

export const Button = tw.button`uppercase font-bold text-xs text-white px-3 md:px-4 py-1 md:py-2 rounded-sm border-solid border transition`

export const PrimaryButton = tw(Button)`bg-ninja-blue border-ninja-blue`

export const SecondaryButton = tw(
  PrimaryButton,
)`bg-transparent text-ninja-blue hover:bg-white`

export const DeleteButton = tw(Button)`bg-ninja-red border-ninja-red`

export const Label = tw.span`block text-sm font-bold mb-1`
