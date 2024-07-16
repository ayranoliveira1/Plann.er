import { Link2, Tag, X } from "lucide-react";
import Button from "../../../components/button";
import { FormEvent, useState } from "react";
import { api } from "../../../lib/api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface CreateLinkModalProps {
   handleCreateActivityModalClick: () => void;
}

const CreateLinkModal = ({
   handleCreateActivityModalClick,
}: CreateLinkModalProps) => {
   const [errorTitle, setErrorTitle] = useState<boolean>(false);
   const [errorMinTitle, setErrorMinTitle] = useState<boolean>(false);
   const [errorUrl, setErrorUrl] = useState<boolean>(false);

   const { tripId } = useParams();

   async function createLink(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();

      try {
         const data = new FormData(event.currentTarget);

         const title = data.get("title")?.toString();
         const url = data.get("url")?.toString();

         setErrorUrl(false);
         setErrorMinTitle(false);

         if (!title) {
            setErrorTitle(true);
            return;
         }

         setErrorTitle(false);

         if (title.length < 4) {
            setErrorMinTitle(true);
            return;
         }

         if (!url) {
            setErrorUrl(true);
            return;
         }

         await api.post(`trips/${tripId}/links`, {
            title,
            url,
         });

         handleCreateActivityModalClick();

         toast.success("Link criado com sucesso!", {
            position: "top-right",
         });

         setTimeout(() => {
            window.document.location.reload();
         }, 6000);
      } catch (error) {
         toast.error("Erro ao criar link!", {
            position: "top-right",
         });
      }
   }

   return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
         <div className="w-[640px] rounded-xl bg-zinc-900 py-5 px-6 shadow-shape space-y-5">
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Cadastrar link</h2>

                  <button
                     type="button"
                     onClick={handleCreateActivityModalClick}
                  >
                     <X className="size-5 text-zinc-400" />
                  </button>
               </div>

               <p className="text-sm text-zinc-400">
                  Todos convidados podem visualizar os links importantes.
               </p>
            </div>

            <div className="flex flex-col gap-1">
               <form className="space-y-3" onSubmit={createLink}>
                  <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                     <Tag className="size-5 text-zinc-400" />
                     <input
                        name="title"
                        placeholder="Titulo do link"
                        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 "
                     />
                  </div>

                  {errorTitle && (
                     <span className="text-xs text-red-500 pl-1">
                        Por favor, informe um tiúlo para o link
                     </span>
                  )}

                  {errorMinTitle && (
                     <span className="text-xs text-red-500 pl-1">
                        Por favor, informe um tiúlo com pelo menos 4 caracteres
                     </span>
                  )}

                  <div className="flex items-center gap-2">
                     <div className="h-14 px-4 flex-1 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Link2 className="size-5 text-zinc-400" />
                        <input
                           type="url"
                           name="url"
                           placeholder="URL"
                           className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                        />
                     </div>
                  </div>

                  {errorUrl && (
                     <span className="text-xs text-red-500 pl-1">
                        Por favor, informe uma URL
                     </span>
                  )}

                  <Button size="full" type="submit">
                     Salvar <link rel="stylesheet" href="" />
                  </Button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default CreateLinkModal;
