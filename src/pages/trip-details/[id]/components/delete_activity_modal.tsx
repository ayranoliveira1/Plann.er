import { LoaderCircle, X } from "lucide-react";
import Button from "../../../../components/button";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../../lib/api";
import { toast } from "react-toastify";
import { useState } from "react";

interface DeleteActivityModalProps {
   handleDeleteActivityModalClick: () => void;
   activityId: string;
}

const DeleteActivityModal = ({
   handleDeleteActivityModalClick,
   activityId,
}: DeleteActivityModalProps) => {
   const [loading, setLoading] = useState<boolean>(false);
   const navigate = useNavigate();

   const { tripId } = useParams();

   async function deleteActivity() {
      setLoading(true);

      if (!tripId) {
         toast.error("Erro ao deletar atividade", {
            position: "top-right",
         });
      }

      if (!activityId) {
         toast.error("Erro ao deletar atividade.", {
            position: "top-right",
         });

         return;
      }

      await api.delete(`trips/${tripId}/activities/${activityId}`);

      handleDeleteActivityModalClick();

      navigate(0);
   }

   return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
         <div className="w-[380px] rounded-xl bg-zinc-900 py-5 px-6 shadow-shape space-y-5">
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Deletar atividade</h2>

                  <button
                     type="button"
                     onClick={handleDeleteActivityModalClick}
                  >
                     <X className="size-5 text-zinc-400" />
                  </button>
               </div>

               <p className="text-sm text-zinc-400">
                  Tem certeza que deseja deletar esta atividade?
               </p>
            </div>

            <div className="flex items-center gap-2">
               {loading ? (
                  <Button
                     onClick={deleteActivity}
                     variant="secondary"
                     size="full"
                  >
                     <LoaderCircle className="size-5 animate-spin" />
                     Deletar
                  </Button>
               ) : (
                  <Button
                     onClick={deleteActivity}
                     variant="secondary"
                     size="full"
                  >
                     Deletar
                  </Button>
               )}

               <Button
                  variant="danger"
                  size="full"
                  onClick={handleDeleteActivityModalClick}
               >
                  Cancelar
               </Button>
            </div>
         </div>
      </div>
   );
};

export default DeleteActivityModal;
