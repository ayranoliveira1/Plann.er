import { Calendar, MapPin, X } from "lucide-react";
import Button from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

interface UpdateDestinationAndDateModalProps {
   handleUpdateDestinationAndDateModalClick: () => void;
}

const UpdateDestinationAndDateModal = ({
   handleUpdateDestinationAndDateModalClick,
}: UpdateDestinationAndDateModalProps) => {
   const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
   const [eventStartAndEndDate, setEventStartAndEndDate] = useState<
      DateRange | undefined
   >();

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
                  <h2 className="text-lg font-semibold">Cadastrar atividade</h2>

                  <button
                     type="button"
                     onClick={handleUpdateDestinationAndDateModalClick}
                  >
                     <X className="size-5 text-zinc-400" />
                  </button>
               </div>

               <p className="text-sm text-zinc-400">
                  Todos convidados podem visualizar as atividades.
               </p>
            </div>

            <div className="flex flex-col gap-1">
               <div className="space-y-3">
                  <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                     <MapPin className="size-5 text-zinc-400" />
                     <input
                        name="title"
                        placeholder="Qual a atividade?"
                        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 "
                     />
                  </div>

                  <div className="flex items-center gap-2 bg-zinc-950 h-14 px-4 border border-zinc-800 rounded-lg">
                     <button
                        onClick={handleDatePickerClick}
                        className="flex items-center gap-2 text-left w-[230px]"
                     >
                        <Calendar className="size-5 text-zinc-400" />
                        <span className="bg-transparent text-lg text-zinc-400 w-32 outline-none flex-1">
                           {displayedDate || "Quando?"}
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

                  <Button size="full" type="submit">
                     Salvar atividade
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UpdateDestinationAndDateModal;
