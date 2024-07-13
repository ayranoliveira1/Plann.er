import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";

interface DestinationAdnDateStepProps {
   isGuestInputOpen: boolean;
   handleGuestInputClick: () => void;
}

const DestinationAdnDateStep = ({
   isGuestInputOpen,
   handleGuestInputClick,
}: DestinationAdnDateStepProps) => {
   return (
      <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center gap-5 shadow-shape">
         <div className="flex items-center gap-2 flex-1">
            <MapPin className="size-5 text-zinc-400" />
            <input
               type="text"
               placeholder="Para onde você vai?"
               className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
               disabled={isGuestInputOpen}
            />
         </div>

         <div className="flex items-center gap-2">
            <Calendar className="size-5 text-zinc-400" />
            <input
               type="text"
               placeholder="Quando?"
               className="bg-transparent text-lg placeholder-zinc-400 w-32 outline-none"
               disabled={isGuestInputOpen}
            />
         </div>

         <div className="w-px h-6 bg-zinc-800"></div>

         {isGuestInputOpen ? (
            <button
               onClick={handleGuestInputClick}
               className="flex items-center gap-2 bg-zinc-800 text-zinc-300 rounded-lg px-5 py-2 font-medium hover:bg-zinc-700"
            >
               Alterar local/data <Settings2 className="size-5" />
            </button>
         ) : (
            <button
               onClick={handleGuestInputClick}
               className="flex items-center gap-2 bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium hover:bg-lime-400"
            >
               Continuar <ArrowRight className="size-5" />
            </button>
         )}
      </div>
   );
};

export default DestinationAdnDateStep;
