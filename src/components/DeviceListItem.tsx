import { Device } from '../types'
import { DeleteButton, SecondaryButton } from './buttons'

export default function DeviceListItem({
  system_name,
  type,
  hdd_capacity,
  onEditClick,
  onRemoveClick,
}: Device & { onEditClick: () => void; onRemoveClick: () => void }) {
  return (
    <article className="bg-white flex items-center justify-between p-3 mb-4 shadow-sm text-sm md:text-base">
      <div className="flex flex-col flex-grow md:flex-row">
        <h1 className="md:w-2/5 font-bold">{system_name}</h1>
        <span className="md:w-2/5">{type}</span>
        <span className="md:w-1/5">{hdd_capacity} GB</span>
      </div>
      <div className="grid md:grid-cols-2 gap-2">
        <SecondaryButton onClick={onEditClick}>Edit</SecondaryButton>
        <DeleteButton onClick={onRemoveClick}>Delete</DeleteButton>
      </div>
    </article>
  )
}
