import { ArrowRight, UserRoundPlus } from "lucide-react";

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
      <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center gap-5 shadow-shape">
         <button
            onClick={handleGuestModalClick}
            type="button"
            className="flex items-center gap-2 flex-1 text-left"
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

         <div className="w-px h-6 bg-zinc-800"></div>
         <button
            onClick={handleConfirmTripModalClick}
            className="flex items-center gap-2 bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium hover:bg-lime-400"
         >
            Confirmar viagem <ArrowRight className="size-5" />
         </button>
      </div>
   );
};

export default InviteGuestsStep;
