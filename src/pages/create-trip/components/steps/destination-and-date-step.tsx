import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import Button from "../../../../components/button";

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
