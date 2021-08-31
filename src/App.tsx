import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import Select from 'react-select'
import { getDevices, removeDevice } from './api'
import { PrimaryButton } from './components/buttons'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Device } from './types'
import './fade.css'
import DeviceListItem from './components/DeviceListItem'

const CreateDevice = () => <div>Create</div>
const EditDevice = () => <div>Edit</div>

function App() {
  const [devices, setDevices] = useState<Device[]>([])
  const [showModal, setShowModal] = useState(false)
  const [ModalContent, setModalContent] = useState<() => JSX.Element>()

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
      <header>
        <h1 className="text-2xl md:text-3xl text-ninja-blue font-bold">
          Device Dashboard
        </h1>
        <div className="flex items-end justify-between mb-4">
          <div className="flex-grow grid grid-cols-2 gap-2 mr-2">
            <label>
              <span className="block">Filter By</span>
              <Select></Select>
            </label>
            <label>
              <span className="block">Sort By</span>
              <Select></Select>
            </label>
          </div>
          <PrimaryButton
          className="mb-0.5"
            onClick={() => {
              setModalContent(() => CreateDevice)
              setShowModal(true)
            }}
          >
            Add Device
          </PrimaryButton>
        </div>
      </header>
      <section className="">
        <TransitionGroup>
          {devices.map((device: Device) => (
            <CSSTransition key={device.id} classNames="fade" timeout={200}>
              <DeviceListItem
                {...device}
                onEditClick={() => {
                  setModalContent(() => EditDevice)
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
