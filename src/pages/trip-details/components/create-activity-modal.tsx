import { Calendar, LoaderCircle, Tag, X } from "lucide-react";
import Button from "../../../components/button";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../../../lib/api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface CreateActivityModalProps {
   handleCreateActivityModalClick: () => void;
}

interface Trip {
   id: string;
   destination: string;
   starts_at: string;
   ends_at: string;
   is_confirmed: boolean;
}

const CreateActivityModal = ({
   handleCreateActivityModalClick,
}: CreateActivityModalProps) => {
   const [errorTitle, setErrorTitle] = useState<boolean>(false);
   const [errorMinTitle, setErrorMinTitle] = useState<boolean>(false);
   const [errorOccursAt, setErrorOccursAt] = useState<boolean>(false);
   const [errorDateOccursAt, setErrorDateOccursAt] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(false);

   const [trip, setTrip] = useState<Trip | undefined>();
   const { tripId } = useParams();

   // pegar detalhes da viagem
   useEffect(() => {
      api.get(`trips/${tripId}`).then((response) => {
         setTrip(response.data.trip);
      });
   }, [tripId]);

   // criar atividade
   async function creteActivity(event: FormEvent<HTMLFormElement>) {
      try {
         event.preventDefault();

         const data = new FormData(event.currentTarget);

         const title = data.get("title")?.toString();
         const occurs_at = data.get("occurs_at")?.toString();

         if (!trip) return;

         setErrorOccursAt(false);
         setErrorMinTitle(false);
         setErrorDateOccursAt(false);

         if (!title) {
            setErrorTitle(true);
            return;
         }

         setErrorTitle(false);

         if (title.length < 4) {
            setErrorMinTitle(true);
            return;
         }

         setErrorMinTitle(false);

         if (!occurs_at) {
            setErrorOccursAt(true);
            return;
         }

         setErrorOccursAt(false);

         if (trip?.starts_at > occurs_at || occurs_at > trip?.ends_at) {
            setErrorDateOccursAt(true);
            return;
         }

         setLoading(true);

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
      } catch (error) {
         toast.error("Erro ao criar atividade!", {
            position: "top-right",
         });
      }
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

                  {errorTitle && (
                     <span className="text-xs text-red-500 pl-1">
                        Por favor, informe um nome para a atividade
                     </span>
                  )}

                  {errorMinTitle && (
                     <span className="text-xs text-red-500 pl-1">
                        Por favor, informe pelo menos 4 caracteres
                     </span>
                  )}

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

                  {errorOccursAt && (
                     <span className="text-xs text-red-500 pl-1">
                        Por favor, informe uma data e hora para a atividade
                     </span>
                  )}

                  {errorDateOccursAt && (
                     <span className="text-xs text-red-500 pl-1">
                        Por favor, informe uma data e hora que esteja no
                        planejamento da viagem
                     </span>
                  )}

                  {loading ? (
                     <Button size="full" type="submit">
                        <LoaderCircle className="size-5 animate-spin" />
                        Salvar atividade
                     </Button>
                  ) : (
                     <Button size="full" type="submit">
                        Salvar atividade
                     </Button>
                  )}
               </form>
            </div>
         </div>
      </div>
   );
};

export default CreateActivityModal;
