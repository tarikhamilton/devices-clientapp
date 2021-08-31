import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import Select, { ActionMeta } from 'react-select'
import { createDevice, getDevices, removeDevice, updateDevice } from './api'
import { Label, LabelWithInput, PrimaryButton } from './components/forms'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Device, deviceTypeOptions } from './types'
import './fade.css'
import DeviceListItem from './components/DeviceListItem'
import DeviceForm from './components/DeviceForm'

function App() {
  const [devices, setDevices] = useState<Device[]>([])
  const [showModal, setShowModal] = useState(false)
  const [filterBy, setFilterBy] = useState<any[]>([])
  const [sortBy, setSortBy] = useState<string>('')
  const [ModalContent, setModalContent] = useState<() => JSX.Element>()

  const handleSave = (id?: string) => async (device: Partial<Device>) => {
    await (id ? updateDevice(id, device) : createDevice(device))
    getAndSetDevices()
    setShowModal(false)
  }

  const getAndSetDevices = async () => {
    const data = await getDevices()
    setDevices(data)
  }

  useEffect(() => {
    ;(async () => await getAndSetDevices())()
  }, [])

  return (
    <main className="container mx-auto py-8 px-4">
      <Modal isOpen={!!showModal} onRequestClose={() => setShowModal(false)}>
        {ModalContent && <ModalContent />}
      </Modal>
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl text-ninja-blue font-bold mb-4">
          Device Dashboard
        </h1>
        <div className="flex items-end justify-between mb-4">
          <div className="flex-grow grid grid-cols-2 gap-2 mr-2">
            <LabelWithInput label="Filter By" noMargin>
              <Select
                isMulti
                options={deviceTypeOptions}
                onChange={(options) => {
                  setFilterBy(options.map(({ value }) => value))
                }}
              ></Select>
            </LabelWithInput>
            <LabelWithInput label="Sort By" noMargin>
              <Select
                defaultValue={{ label: 'None', value: '' }}
                options={[
                  { label: 'None', value: '' },
                  { label: 'HDD - Lowest to Highest', value: 'hdd' },
                  { label: 'System Name - A-Z', value: 'system' },
                ]}
                onChange={(option) => {
                  setSortBy(option!.value)
                }}
              ></Select>
            </LabelWithInput>
          </div>
          <PrimaryButton
            className="mb-0.5"
            onClick={() => {
              setModalContent(() => () =>
                DeviceForm({
                  onSave: handleSave,
                  onClose: () => setShowModal(false),
                }),
              )
              setShowModal(true)
            }}
          >
            Add Device
          </PrimaryButton>
        </div>
      </header>
      <section>
        <TransitionGroup>
          {devices
            .sort((a, b) => {
              switch (sortBy) {
                case 'system':
                  if (a.system_name < b.system_name) return -1
                  if (a.system_name > b.system_name) return 1
                  return 0
                case 'hdd':
                  return a.hdd_capacity - b.hdd_capacity
                default:
                  return 0
              }
            })
            .filter(({ type }) =>
              filterBy.length ? filterBy.includes(type) : true,
            )
            .map((device: Device) => (
              <CSSTransition key={device.id} classNames="fade" timeout={200}>
                <DeviceListItem
                  {...device}
                  onEditClick={() => {
                    setModalContent(() => () =>
                      DeviceForm({
                        device,
                        onSave: handleSave,
                        onClose: () => setShowModal(false),
                      }),
                    )
                    setShowModal(true)
                  }}
                  onRemoveClick={async () => {
                    await removeDevice(device.id)
                    getAndSetDevices()
                  }}
                />
              </CSSTransition>
            ))}
        </TransitionGroup>
      </section>
    </main>
  )
}

export default App
