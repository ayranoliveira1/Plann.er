import { AtSign, Plus, X } from "lucide-react";
import { FormEvent } from "react";
import Button from "../../../components/button";

interface InviteGuestsModalProps {
   handleGuestModalClick: () => void;
   emailToInvite: string[];
   addToemailToInvite: (event: FormEvent<HTMLFormElement>) => void;
   removeEmailToInvite: (email: string) => void;
   repeatedEmail: string;
}

const InviteGuestsModal = ({
   handleGuestModalClick,
   emailToInvite,
   addToemailToInvite,
   removeEmailToInvite,
   repeatedEmail,
}: InviteGuestsModalProps) => {
   return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
         <div className="md:w-[640px] w-[90%] rounded-xl bg-zinc-900 py-5 px-6 shadow-shape space-y-5">
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                     selecionar convidados
                  </h2>

                  <button type="button" onClick={handleGuestModalClick}>
                     <X className="size-5 text-zinc-400" />
                  </button>
               </div>

               <p className="text-sm text-zinc-400">
                  Os convidados irão receber e-mails para confirmar a
                  participação na viagem.
               </p>
            </div>

            <div className="flex flex-wrap gap-2">
               {emailToInvite.map((email) => (
                  <div
                     key={email}
                     className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2 text-[10px] lg:text-sm"
                  >
                     <span className="text-zinc-300">{email}</span>
                     <button
                        onClick={() => removeEmailToInvite(email)}
                        type="button"
                     >
                        <X className="size-3 text-zinc-400" />
                     </button>
                  </div>
               ))}
            </div>

            <div className="w-full h-px bg-zinc-800"></div>

            <div className="flex flex-col gap-1 w-full">
               <form
                  onSubmit={addToemailToInvite}
                  className="lg:p-2.5 lg:bg-zinc-950 lg:border lg:border-zinc-800 rounded-lg flex items-center flex-col lg:flex-row gap-2"
               >
                  <div className="px-2 py-3 w-full flex items-center bg-zinc-950 lg:bg-transparent flex-1 gap-2 lg:border-none border border-zinc-800 rounded-lg ">
                     <AtSign className="size-5 text-zinc-400" />
                     <input
                        type="email"
                        name="email"
                        placeholder="Digite o email do convidado"
                        className="bg-transparent w-full lg:text-lg placeholder-zinc-400 outline-none flex-1 "
                     />
                  </div>

                  <Button type="submit">
                     Convidar
                     <Plus className="size-3" />
                  </Button>
               </form>

               <p
                  className={`text-sm ${repeatedEmail} text-red-500 px-1 pt-[-20px]`}
               >
                  Este email já foi adicionado
               </p>
            </div>
         </div>
      </div>
   );
};

export default InviteGuestsModal;
