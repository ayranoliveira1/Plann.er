import { Calendar, Tag, X } from "lucide-react";
import Button from "../../../components/button";
import { FormEvent } from "react";
import { api } from "../../../lib/api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface CreateActivityModalProps {
   handleCreateActivityModalClick: () => void;
}

const CreateActivityModal = ({
   handleCreateActivityModalClick,
}: CreateActivityModalProps) => {
   const { tripId } = useParams();

   async function creteActivity(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();

      const data = new FormData(event.currentTarget);

      const title = data.get("title")?.toString();
      const occurs_at = data.get("occurs_at")?.toString();

      await api.post(`trips/${tripId}/activities`, {
         title,
         occurs_at,
      });

      handleCreateActivityModalClick();

      toast.success("Atividade criada com sucesso!", {
         position: "top-right",
      });

      setTimeout(() => {
         window.document.location.reload();
      }, 6000);
   }

   return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
         <div className="w-[640px] rounded-xl bg-zinc-900 py-5 px-6 shadow-shape space-y-5">
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Cadastrar atividade</h2>

                  <button
                     type="button"
                     onClick={handleCreateActivityModalClick}
                  >
                     <X className="size-5 text-zinc-400" />
                  </button>
               </div>

               <p className="text-sm text-zinc-400">
                  Todos convidados podem visualizar as atividades.
               </p>
            </div>

            <div className="flex flex-col gap-1">
               <form className="space-y-3" onSubmit={creteActivity}>
                  <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                     <Tag className="size-5 text-zinc-400" />
                     <input
                        name="title"
                        placeholder="Qual a atividade?"
                        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 "
                     />
                  </div>

                  <div className="flex items-center gap-2">
                     <div className="h-14 px-4 flex-1 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Calendar className="size-5 text-zinc-400" />
                        <input
                           type="datetime-local"
                           name="occurs_at"
                           placeholder="Data e hora da atividade"
                           className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                        />
                     </div>
                  </div>

                  <Button size="full" type="submit">
                     Salvar atividade
                  </Button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default CreateActivityModal;
