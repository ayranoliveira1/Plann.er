import { CheckCircle2, CircleDashed, UserRoundPlus } from "lucide-react";
import Button from "../../../components/button";
import { api } from "../../../lib/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateInviteGuestModal from "./create-invite-guest-modal";

interface Participant {
   id: string;
   name: string | null;
   email: string;
   is_confirmed: boolean;
}

const Guests = () => {
   const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
   const [participants, setParticipants] = useState<Participant[]>([]);

   const { tripId } = useParams();

   useEffect(() => {
      api.get(`trips/${tripId}/participants`).then((response) => {
         setParticipants(response.data.participants);
      });
   }, [tripId]);

   function handleInviteModalClick() {
      if (isInviteModalOpen === true) {
         return setIsInviteModalOpen(false);
      }
      setIsInviteModalOpen(true);
   }

   return (
      <div className="space-y-6">
         <h2 className="font-semibold text-xl">Convidados</h2>

         <div className="space-y-5">
            {participants.map((participant, index) => (
               <div
                  key={participant.id}
                  className="flex items-center justify-between gap-4"
               >
                  <div className="space-y-1.5 text">
                     <span className="block font-medium text-zinc-100">
                        {participant.name ?? `Convidado ${index}`}
                     </span>
                     <span className="block text-sm text-zinc-400 truncate">
                        {participant.email}
                     </span>
                  </div>
                  {participant.is_confirmed ? (
                     <CheckCircle2 className="size-5 text-lime-400 shrink-0" />
                  ) : (
                     <CircleDashed className="size-5 text-zinc-400 shrink-0" />
                  )}
               </div>
            ))}
         </div>

         <Button
            onClick={handleInviteModalClick}
            variant="secondary"
            size="full"
         >
            <UserRoundPlus className="size-5" />
            Adicionar convidados
         </Button>

         {isInviteModalOpen && (
            <CreateInviteGuestModal
               handleCreateGuestModalClick={handleInviteModalClick}
            />
         )}
      </div>
   );
};

export default Guests;
