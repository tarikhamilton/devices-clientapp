export interface Device {
  id: string
  /** System name. */
  system_name: string
  type: string
  /** HDD capacity. */
  hdd_capacity: number
}

export enum DeviceType {
  WINDOWS_WORKSTATION = 'Windows Workstation',
  WINDOWS_SERVER = 'Windows Server',
  MAC = 'Mac',
}
