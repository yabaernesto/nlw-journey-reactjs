import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { InviteGuestsModal } from './invite-guests-modal'
import { ConfirmTripModal } from './confirm-trip-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGuestsStep } from './steps/invite-guests-step'

export function CreateTripPage() {
  const navigate = useNavigate()

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isQuestsModalOpen, setIsQuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState([
    'yabaernesto@gmail.com'
  ])

  function openQuestsInput() {
    setIsGuestsInputOpen(true)
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false)
  }

  function openQuestsModal() {
    setIsQuestsModalOpen(true)
  }

  function closeQuestsModal() {
    setIsQuestsModalOpen(false)
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false)
  }

  function addToEmailInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }
    
    // validando o email se ja existe
    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([
      ...emailsToInvite, 
      email
    ])
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const emailList = emailsToInvite.filter(email => email !== emailToRemove)
    setEmailsToInvite(emailList)
  }

  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    navigate('/trips/123')
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje a proxima viagem!</p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep 
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            openQuestsInput={openQuestsInput}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep 
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openQuestsModal={openQuestsModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er voce automaticamente concorda 
          com nossos <a href="#" className="text-zinc-300 underline">termos e uso</a> e <a href="#" className="text-zinc-300 underline">politicas de privacidade</a>
        </p>
      </div>

      {isQuestsModalOpen && (
        <InviteGuestsModal 
          addToEmailInvite={addToEmailInvite}
          closeQuestsModal={closeQuestsModal}
          emailsToInvite={emailsToInvite}
          removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal 
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
        />
      )}

    </div>
  )
}
