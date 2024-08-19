import {
   CheckCircle2,
   CircleDashed,
   Trash2,
   UserRoundPlus,
} from "lucide-react";
import Button from "../../../../components/button";
import { api } from "../../../../lib/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateInviteGuestModal from "./create-invite-guest-modal";
import DeleteGuestModal from "./delete_guest_modal";

interface Participant {
   id: string;
   name: string | null;
   email: string;
   is_confirmed: boolean;
}

const Guests = () => {
   const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
   const [participants, setParticipants] = useState<Participant[]>([]);

   const { tripId } = useParams();
   const navigate = useNavigate();

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

   function handleDeleteModalClick() {
      if (isDeleteModalOpen === true) {
         return setIsDeleteModalOpen(false);
      }
      setIsDeleteModalOpen(true);
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
                  <div className="flex items-center gap-2">
                     {participant.is_confirmed ? (
                        <CheckCircle2 className="size-5 text-lime-400 shrink-0" />
                     ) : (
                        <CircleDashed className="size-5 text-zinc-400 shrink-0" />
                     )}

                     <button
                        onClick={async () => {
                           await api.delete(
                              `trips/${tripId}/participants/${participant.id}`
                           );

                           navigate(0);
                        }}
                     >
                        <Trash2 className="size-5 text-zinc-500 hover:text-red-500 " />
                     </button>

                     {isDeleteModalOpen && (
                        <DeleteGuestModal
                           handleDeleteModalClick={handleDeleteModalClick}
                           guestId={participant.id}
                        />
                     )}
                  </div>
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
