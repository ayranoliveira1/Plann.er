import { Calendar, LoaderCircle, MapPin, X } from "lucide-react";
import Button from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { api } from "../../../lib/api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface UpdateDestinationAndDateModalProps {
   handleUpdateDestinationAndDateModalClick: () => void;
}

const UpdateDestinationAndDateModal = ({
   handleUpdateDestinationAndDateModalClick,
}: UpdateDestinationAndDateModalProps) => {
   const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
   const [destination, setDestination] = useState<string>("");
   const [eventStartAndEndDate, setEventStartAndEndDate] = useState<
      DateRange | undefined
   >();

   const [errorDestination, setErrorDestination] = useState<boolean>(false);
   const [errorMinDestination, setErrorMinDestination] =
      useState<boolean>(false);
   const [errorDate, setErrorDate] = useState<boolean>(false);
   const [errorStarDate, setErrorStarDate] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(false);

   const { tripId } = useParams();

   async function updateTrip() {
      try {
         setErrorDate(false);
         setErrorMinDestination(false);
         setErrorStarDate(false);

         if (!destination) {
            setErrorDestination(true);
            return;
         }

         setErrorDestination(false);

         if (destination.length < 4) {
            setErrorMinDestination(true);
            return;
         }

         setErrorMinDestination(false);

         if (!eventStartAndEndDate?.from || !eventStartAndEndDate?.to) {
            setErrorDate(true);
            return;
         }

         setErrorDate(false);

         if (
            eventStartAndEndDate?.from < new Date() ||
            eventStartAndEndDate?.to < new Date()
         ) {
            setErrorStarDate(true);
            return;
         }

         setLoading(true);

         await api.put(`trips/${tripId}`, {
            destination,
            starts_at: eventStartAndEndDate.from,
            ends_at: eventStartAndEndDate.to,
         });

         handleUpdateDestinationAndDateModalClick();

         toast.success("Viagem atualizada com sucesso!", {
            position: "top-right",
         });

         setTimeout(() => {
            window.document.location.reload();
         }, 6000);
      } catch (error) {
         toast.error("Erro ao atualizar viagem!", {
            position: "top-right",
         });
      }
   }

   function handleDatePickerClick() {
      if (isDatePickerOpen === true) {
         return setIsDatePickerOpen(false);
      }
      setIsDatePickerOpen(true);
   }

   const displayedDate =
      eventStartAndEndDate?.from && eventStartAndEndDate?.to
         ? format(eventStartAndEndDate.from, "dd' de 'LLL")
              .concat(" até ")
              .concat(format(eventStartAndEndDate.to, "dd' de 'LLL"))
         : null;

   return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
         <div className="w-[640px] rounded-xl bg-zinc-900 py-5 px-6 shadow-shape space-y-5">
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Atualiza viagem</h2>

                  <button
                     type="button"
                     onClick={handleUpdateDestinationAndDateModalClick}
                  >
                     <X className="size-5 text-zinc-400" />
                  </button>
               </div>

               <p className="text-sm text-zinc-400">
                  Todos convidados podem visualizar o local e data da viagem.
               </p>
            </div>

            <div className="flex flex-col gap-1">
               <div className="space-y-3">
                  <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                     <MapPin className="size-5 text-zinc-400" />
                     <input
                        name="title"
                        placeholder="Destino"
                        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 "
                        onChange={(event) => setDestination(event.target.value)}
                     />
                  </div>

                  {errorDestination && (
                     <span className="text-sm text-red-500 pl-1">
                        Por favor, informe um destino.
                     </span>
                  )}

                  {errorMinDestination && (
                     <span className="text-sm text-red-500 pl-1">
                        Por favor, informe um destino com pelo menos 4
                        caracteres.
                     </span>
                  )}

                  <div className="flex items-center gap-2 bg-zinc-950 h-14 px-4 border border-zinc-800 rounded-lg">
                     <button
                        onClick={handleDatePickerClick}
                        className="flex items-center gap-2 text-left w-[230px]"
                     >
                        <Calendar className="size-5 text-zinc-400" />
                        <span className="bg-transparent text-lg text-zinc-400 w-32 outline-none flex-1">
                           {displayedDate ||
                              "Data" ||
                              eventStartAndEndDate?.from?.toString()}
                        </span>
                     </button>

                     {isDatePickerOpen && (
                        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                           <div className=" rounded-xl bg-zinc-900 py-5 px-6 shadow-shape space-y-5">
                              <div className="space-y-2">
                                 <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">
                                       Confirmar criação de viagem
                                    </h2>

                                    <button
                                       type="button"
                                       onClick={handleDatePickerClick}
                                    >
                                       <X className="size-5 text-zinc-400" />
                                    </button>
                                 </div>
                              </div>

                              <DayPicker
                                 mode="range"
                                 selected={eventStartAndEndDate}
                                 onSelect={setEventStartAndEndDate}
                              />
                           </div>
                        </div>
                     )}
                  </div>

                  {errorDate && (
                     <span className="text-sm text-red-500 pl-1">
                        Por favor, informe uma data.
                     </span>
                  )}

                  {errorStarDate && (
                     <span className="text-sm text-red-500 pl-1">
                        Por favor, a data de inição deve ser posterior a data
                        atual.
                     </span>
                  )}

                  {loading ? (
                     <Button onClick={updateTrip} size="full" type="submit">
                        <LoaderCircle className="animate-spin size-5" />
                        Atualizar viagem
                     </Button>
                  ) : (
                     <Button onClick={updateTrip} size="full" type="submit">
                        Atualizar viagem
                     </Button>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default UpdateDestinationAndDateModal;
