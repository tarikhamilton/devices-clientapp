import { Device } from './types'

export const getDevices = async (): Promise<Device[]> => {
  const response = await fetch(`/devices`)
  return response.json()
}

export const createDevice = async (device: Partial<Device>) => {
  const response = await fetch(`/devices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(device),
  })
  return response.json()
}

export const updateDevice = async (id: string, device: Partial<Device>) => {
  const response = await fetch(`/devices/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(device),
  })
  return response.json()
}

export const removeDevice = async (id: string) => {
  const response = await fetch(`/devices/${id}`, {
    method: 'DELETE',
  })
  return response.json()
}
