import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import Button from "../../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

interface DestinationAdnDateStepProps {
   isGuestInputOpen: boolean;
   handleGuestInputClick: () => void;
   setDestination: (destination: string) => void;
   setEventStartAndEndDate: (
      eventStartAndEndDate: DateRange | undefined
   ) => void;
   eventStartAndEndDate: DateRange | undefined;
}

const DestinationAdnDateStep = ({
   isGuestInputOpen,
   handleGuestInputClick,
   setDestination,
   eventStartAndEndDate,
   setEventStartAndEndDate,
}: DestinationAdnDateStepProps) => {
   const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

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
      <div className="lg:h-16 px-4 lg:bg-zinc-900 rounded-xl lg:flex-row flex-col flex items-center gap-5 shadow-shape">
         <div className="flex items-center gap-2 lg:flex-1 lg:bg-transparent p-4 lg:p-0 rounded-xl shadow-shape lg:shadow-none bg-zinc-900">
            <MapPin className="size-5 text-zinc-400" />
            <input
               type="text"
               placeholder="Para onde você vai?"
               className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
               disabled={isGuestInputOpen}
               onChange={(event) => setDestination(event.target.value)}
            />
         </div>

         <button
            onClick={handleDatePickerClick}
            disabled={isGuestInputOpen}
            className="w-[305px] flex items-center gap-2 text-left lg:w-[230px] lg:bg-transparent p-4 lg:p-0 rounded-xl shadow-shape lg:shadow-none bg-zinc-900"
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

                        <button type="button" onClick={handleDatePickerClick}>
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

         <div className="w-px h-6 hidden lg:block bg-zinc-800"></div>

         {isGuestInputOpen ? (
            <Button onClick={handleGuestInputClick} variant="secondary">
               Alterar local/data
               <Settings2 className="size-5" />
            </Button>
         ) : (
            <Button onClick={handleGuestInputClick}>
               Continuar
               <ArrowRight className="size-5" />
            </Button>
         )}
      </div>
   );
};

export default DestinationAdnDateStep;
