import { ArrowRight, UserRoundPlus } from "lucide-react";
import Button from "../../../../components/button";

interface InviteGuestsStepProps {
   handleGuestModalClick: () => void;
   handleConfirmTripModalClick: () => void;
   emailToInvite: string[];
}

const InviteGuestsStep = ({
   handleGuestModalClick,
   handleConfirmTripModalClick,
   emailToInvite,
}: InviteGuestsStepProps) => {
   return (
      <div className="lg:h-16 px-4 lg:bg-zinc-900 rounded-xl flex lg:flex-row flex-col items-center gap-5 lg:shadow-shape">
         <button
            onClick={handleGuestModalClick}
            type="button"
            className="flex items-center w-[305px] lg:w-full p-4 lg:p-0 bg-zinc-900 lg:bg-transparent rounded-xl gap-2 flex-1 text-left shadow-shape lg:shadow-none"
         >
            <UserRoundPlus className="size-5 text-zinc-400" />

            {emailToInvite.length > 0 ? (
               <span className="text-lg text-zinc-400 flex-1">
                  {emailToInvite.length} pessoa(s) convidada(s)
               </span>
            ) : (
               <span className="text-lg text-zinc-400 flex-1">
                  Quem estará na viagem?
               </span>
            )}
         </button>

         <div className="w-px h-6 hidden lg:block bg-zinc-800"></div>

         <Button onClick={handleConfirmTripModalClick}>
            Confirmar viagem
            <ArrowRight className="size-5" />
         </Button>
      </div>
   );
};

export default InviteGuestsStep;
