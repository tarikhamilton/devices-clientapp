import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import Select, { ActionMeta } from 'react-select'
import { createDevice, getDevices, removeDevice, updateDevice } from './api'
import { Label, PrimaryButton } from './components/forms'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Device, deviceTypeOptions } from './types'
import './fade.css'
import DeviceListItem from './components/DeviceListItem'
import DeviceForm from './components/DeviceForm'

function App() {
  const [devices, setDevices] = useState<Device[]>([])
  const [showModal, setShowModal] = useState(false)
  const [filterBy, setFilterBy] = useState<any[]>([])
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
    <div className="container mx-auto py-8 px-4">
      <Modal isOpen={!!showModal} onRequestClose={() => setShowModal(false)}>
        {ModalContent && <ModalContent />}
      </Modal>
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl text-ninja-blue font-bold mb-4">
          Device Dashboard
        </h1>
        <div className="flex items-end justify-between mb-4">
          <div className="flex-grow grid grid-cols-2 gap-2 mr-2">
            <label>
              <Label>Filter By</Label>
              <Select
                isMulti
                options={deviceTypeOptions}
                onChange={(
                  options,
                  option: ActionMeta<{ label: string; value: string }>,
                ) => {
                  setFilterBy(options.map(({ value }) => value))
                }}
              ></Select>
            </label>
            <label>
              <Label>Sort By</Label>
              <Select options={[{ label: 'A-Z', value: 'hi' }]}></Select>
            </label>
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
      <section className="">
        <TransitionGroup>
          {devices
            // .sort((a, b) => a - b)
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
    </div>
  )
}

export default App
