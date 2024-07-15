import { Mail, User, X } from "lucide-react";
import Button from "../../../components/button";

interface CreateInviteGuestModalProps {
   handleCreateGuestModalClick: () => void;
}

const CreateInviteGuestModal = ({
   handleCreateGuestModalClick,
}: CreateInviteGuestModalProps) => {
   return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
         <div className="w-[640px] rounded-xl bg-zinc-900 py-5 px-6 shadow-shape space-y-5">
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                     Cadastrar participante
                  </h2>

                  <button type="button" onClick={handleCreateGuestModalClick}>
                     <X className="size-5 text-zinc-400" />
                  </button>
               </div>

               <p className="text-sm text-zinc-400">
                  Todos convidados podem visualizar os Participantes.
               </p>
            </div>

            <div className="flex flex-col gap-1">
               <form className="space-y-3">
                  <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                     <User className="size-5 text-zinc-400" />
                     <input
                        name="name"
                        placeholder="Seu nome completo"
                        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 "
                     />
                  </div>

                  <div className="flex items-center gap-2">
                     <div className="h-14 px-4 flex-1 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Mail className="size-5 text-zinc-400" />
                        <input
                           type="email"
                           name="email"
                           placeholder="Seu e-mail"
                           className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                        />
                     </div>
                  </div>

                  <Button size="full" type="submit">
                     Salvar participante
                  </Button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default CreateInviteGuestModal;
