import { MapPin, Calendar, ArrowRight, Settings2, X } from 'lucide-react'
import { Button } from '../../../components/Button';
import { useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  eventStartAndEndDates: DateRange | undefined;
  closeGuestsInput: () => void;
  openQuestsInput: () => void;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
}

export function DestinationAndDateStep({
  isGuestsInputOpen, 
  closeGuestsInput,
  openQuestsInput,
  setDestination,
  eventStartAndEndDates,
  setEventStartAndEndDates
}: DestinationAndDateStepProps) {
  const [isDatePeckerOpen, setIsDatePeckerOpen] = useState(false)

  function openDatePeckerOpen() {
    return setIsDatePeckerOpen(true)
  }

  function setDatePeckerOpen() {
    return setIsDatePeckerOpen(false)
  }

  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
     ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' ate ').concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
     : null

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400"/>
        <input 
          type="text" placeholder="Para onde voce vai?" 
          disabled={isGuestsInputOpen}
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          onChange={event => setDestination(event.target.value)}
        />
      </div>

      <button onClick={openDatePeckerOpen} disabled={isGuestsInputOpen} className="flex items-center gap-2 text-left w-[240px]">
        <Calendar className="size-5 text-zinc-400"/>
        <span className="text-lg text-zinc-400 font-medium w-40 flex-1">
          { displayedDate || 'Quando?' }
        </span>
      </button>

      {isDatePeckerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button onClick={setDatePeckerOpen} type="button">
                  <X className="size-5 text-zinc-400"/>
                </button>
              </div>
            </div>
            <DayPicker
              mode="range"
              locale={ptBR}
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
              disabled={{before: new Date()}}
            />
          </div>
        </div>
      )}

      <div className="w-px h-6 bg-zinc-800"/>

      {isGuestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5"/>
        </Button>
      ) : (
        <Button onClick={openQuestsInput} variant="primary">
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  )
}
