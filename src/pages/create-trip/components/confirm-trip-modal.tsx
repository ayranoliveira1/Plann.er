import { LoaderCircle, Mail, User, X } from "lucide-react";
import { FormEvent } from "react";
import Button from "../../../components/button";

interface ConfirmTripModalProps {
   handleConfirmTripModalClick: () => void;
   createTrip: (event: FormEvent<HTMLFormElement>) => void;
   setOwnerName: (ownerName: string) => void;
   setOwnerEmail: (ownerEmail: string) => void;
   loading: boolean;
}

const ConfirmTripModal = ({
   handleConfirmTripModalClick,
   createTrip,
   loading,
   setOwnerName,
   setOwnerEmail,
}: ConfirmTripModalProps) => {
   return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
         <div className="md:w-[640px] w-[90%] rounded-xl bg-zinc-900 py-5 px-6 shadow-shape space-y-5">
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                     Confirmar criação de viagem
                  </h2>

                  <button type="button" onClick={handleConfirmTripModalClick}>
                     <X className="size-5 text-zinc-400" />
                  </button>
               </div>

               <p className="text-sm text-zinc-400">
                  Para concluir a criação da viagem para{" "}
                  <span className="text-zinc-100 font-semibold">
                     Florianópolis, Brasil
                  </span>{" "}
                  nas datas de{" "}
                  <span className="text-zinc-100 font-semibold">
                     16 a 27 de Agosto de 2024
                  </span>{" "}
                  preencha seus dados abaixo:
               </p>
            </div>

            <div className="flex flex-col gap-1">
               <form onSubmit={createTrip} className="space-y-3">
                  <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                     <User className="size-5 text-zinc-400" />
                     <input
                        name="name"
                        placeholder="Seu nome completo"
                        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 "
                        onChange={(event) => setOwnerName(event.target.value)}
                     />
                  </div>

                  <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                     <Mail className="size-5 text-zinc-400" />
                     <input
                        type="email"
                        name="email"
                        placeholder="Seu e-mail pessoal"
                        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 "
                        onChange={(event) => setOwnerEmail(event.target.value)}
                     />
                  </div>

                  <div>teste 2</div>

                  {loading ? (
                     <Button type="submit" size="full">
                        <LoaderCircle className="animate-spin size-5" />
                        Confirmar criação da viagem
                     </Button>
                  ) : (
                     <Button type="submit" size="full">
                        Confirmar criação da viagem
                     </Button>
                  )}
               </form>
            </div>
         </div>
      </div>
   );
};

export default ConfirmTripModal;
