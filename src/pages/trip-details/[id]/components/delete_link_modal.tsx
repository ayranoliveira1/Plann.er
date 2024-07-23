import { LoaderCircle, X } from "lucide-react";
import Button from "../../../../components/button";
import { api } from "../../../../lib/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

interface DeleteLinkModalProps {
   handleDeleteLinkModalClick: () => void;
   linkId: string;
}
const DeleteLinkModal = ({
   handleDeleteLinkModalClick,
   linkId,
}: DeleteLinkModalProps) => {
   const [loading, setLoading] = useState<boolean>(false);

   const { tripId } = useParams();
   const navigate = useNavigate();

   async function deleteLink() {
      setLoading(true);

      if (!tripId) {
         toast.error("Erro ao deletar link.", {
            position: "top-right",
         });
         return;
      }

      if (!linkId) {
         toast.error("Erro ao deletar link.", {
            position: "top-right",
         });
         return;
      }

      await api.delete(`trips/${tripId}/links/${linkId}`);

      handleDeleteLinkModalClick();

      navigate(0);
   }
   return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
         <div className="w-[380px] rounded-xl bg-zinc-900 py-5 px-6 shadow-shape space-y-5">
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Deletar Link</h2>

                  <button type="button" onClick={handleDeleteLinkModalClick}>
                     <X className="size-5 text-zinc-400" />
                  </button>
               </div>

               <p className="text-sm text-zinc-400">
                  Tem certeza que deseja deletar este link?
               </p>
            </div>

            <div className="flex items-center gap-2">
               {loading ? (
                  <Button variant="secondary" size="full">
                     <LoaderCircle className="size-5 animate-spin" />
                     Deletar
                  </Button>
               ) : (
                  <Button onClick={deleteLink} variant="secondary" size="full">
                     Deletar
                  </Button>
               )}

               <Button
                  variant="danger"
                  size="full"
                  onClick={handleDeleteLinkModalClick}
               >
                  Cancelar
               </Button>
            </div>
         </div>
      </div>
   );
};

export default DeleteLinkModal;
