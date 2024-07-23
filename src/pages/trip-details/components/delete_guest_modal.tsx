import { useState } from "react";
import Button from "../../../components/button";
import { LoaderCircle, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../../lib/api";

interface DeleteGuestModalProps {
   handleDeleteModalClick: () => void;
   guestId: string;
}

const DeleteGuestModal = ({
   handleDeleteModalClick,
   guestId,
}: DeleteGuestModalProps) => {
   const [loading, setLoading] = useState<boolean>(false);

   const { tripId } = useParams();
   const navigate = useNavigate();

   async function deleteGuest() {
      setLoading(true);

      if (!tripId) {
         toast.error("Erro ao deletar participante.", {
            position: "top-right",
         });
         return;
      }

      if (!guestId) {
         toast.error("Erro ao deletar participante.", {
            position: "top-right",
         });
         return;
      }

      await api.delete(`trips/${tripId}/participants/${guestId}`);

      handleDeleteModalClick();

      navigate(0);
   }

   return (
      <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
         <div className="w-[380px] rounded-xl bg-zinc-900 py-5 px-6 shadow-shape space-y-5">
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Deletar convidado</h2>

                  <button type="button" onClick={handleDeleteModalClick}>
                     <X className="size-5 text-zinc-400" />
                  </button>
               </div>

               <p className="text-sm text-zinc-400">
                  Tem certeza que deseja deletar este convidado?
               </p>
            </div>

            <div className="flex items-center gap-2">
               {loading ? (
                  <Button variant="secondary" size="full">
                     <LoaderCircle className="size-5 animate-spin" />
                     Deletar
                  </Button>
               ) : (
                  <Button onClick={deleteGuest} variant="secondary" size="full">
                     Deletar
                  </Button>
               )}

               <Button
                  variant="danger"
                  size="full"
                  onClick={handleDeleteModalClick}
               >
                  Cancelar
               </Button>
            </div>
         </div>
      </div>
   );
};

export default DeleteGuestModal;
