import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { Device, deviceTypeOptions } from '../types'
import {
  LabelWithInput,
  PrimaryButton,
  SecondaryButton,
  TextInput,
} from './forms'

export default function DeviceForm({
  device,
  onSave,
  onClose,
}: {
  device?: Device
  onSave: (id?: string) => (data: any) => void
  onClose: () => void
}) {
  const { register, control, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(onSave(device?.id))}>
      <h1 className="text-xl font-bold mb-4">
        {device?.id ? 'Edit' : 'Add'} Device
      </h1>
      <LabelWithInput label="System Name*">
        <TextInput
          {...register('system_name', {
            required: true,
            value: device?.system_name,
          })}
          required
        />
      </LabelWithInput>
      <LabelWithInput label="Type*">
        <Controller
          name="type"
          control={control}
          defaultValue={device?.type}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              onChange={(option) => field.onChange(option?.value)}
              value={deviceTypeOptions.find((o) => o.value === field.value)}
              options={deviceTypeOptions}
              required
            />
          )}
        ></Controller>
      </LabelWithInput>
      <LabelWithInput label="HD Capacity*">
        <TextInput
          {...register('hdd_capacity', {
            required: true,
            value: device?.hdd_capacity,
          })}
          required
          type="number"
        />
      </LabelWithInput>
      <div className="inline-grid grid-cols-2 gap-2">
        <PrimaryButton type="submit">Save</PrimaryButton>
        <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
      </div>
    </form>
  )
}
