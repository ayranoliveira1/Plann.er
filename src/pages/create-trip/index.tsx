import {
   ArrowRight,
   Calendar,
   Mail,
   MapPin,
   Settings2,
   User,
   UserRoundPlus,
   X,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import InviteGuestsModal from "./components/invite-guests-modal";

function CreateTrip() {
   const navigate = useNavigate();

   const [isGuestInputOpen, setIsGuestInputOpen] = useState<boolean>(false);
   const [isGuestModalOpen, setIsGuestModalOpen] = useState<boolean>(false);
   const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] =
      useState<boolean>(false);

   const [emailToInvite, setEmailToInvite] = useState<string[]>([]);
   const [repeatedEmail, setRepeatedEmail] = useState<string>("hidden");

   function handleGuestInputClick() {
      if (isGuestInputOpen === true) {
         return setIsGuestInputOpen(false);
      }
      setIsGuestInputOpen(true);
   }

   function handleGuestModalClick() {
      if (isGuestModalOpen === true) {
         return setIsGuestModalOpen(false);
      }
      setIsGuestModalOpen(true);
   }

   function handleConfirmTripModalClick() {
      if (isConfirmTripModalOpen === true) {
         return setIsConfirmTripModalOpen(false);
      }
      setIsConfirmTripModalOpen(true);
   }

   function addToemailToInvite(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();

      const data = new FormData(event.currentTarget);
      const email = data.get("email") as string;

      if (!email) return;

      if (emailToInvite.includes(email)) {
         setRepeatedEmail("block");
         return;
      }

      setEmailToInvite([...emailToInvite, email]);
      setRepeatedEmail("hidden");

      event.currentTarget.reset();
   }

   function removeEmailToInvite(emailToRemove: string) {
      const newEmailList = emailToInvite.filter(
         (email) => email !== emailToRemove
      );

      setEmailToInvite(newEmailList);
   }

   function createTrip() {
      navigate("/trips/123");
   }

   return (
      <main className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
         <div className="max-w-3xl w-full px-6 text-center space-y-10">
            <div className="flex flex-col items-center gap-3">
               <img src="/logo.svg" alt="Plann.er" />
               <p className="text-zinc-300 text-lg">
                  Convide seus amigos e planeje sua próxima viagem!
               </p>
            </div>

            <div className="space-y-4">
               <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center gap-5 shadow-shape">
                  <div className="flex items-center gap-2 flex-1">
                     <MapPin className="size-5 text-zinc-400" />
                     <input
                        type="text"
                        placeholder="Para onde você vai?"
                        className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
                        disabled={isGuestInputOpen}
                     />
                  </div>

                  <div className="flex items-center gap-2">
                     <Calendar className="size-5 text-zinc-400" />
                     <input
                        type="text"
                        placeholder="Quando?"
                        className="bg-transparent text-lg placeholder-zinc-400 w-32 outline-none"
                        disabled={isGuestInputOpen}
                     />
                  </div>

                  <div className="w-px h-6 bg-zinc-800"></div>

                  {isGuestInputOpen ? (
                     <button
                        onClick={handleGuestInputClick}
                        className="flex items-center gap-2 bg-zinc-800 text-zinc-300 rounded-lg px-5 py-2 font-medium hover:bg-zinc-700"
                     >
                        Alterar local/data <Settings2 className="size-5" />
                     </button>
                  ) : (
                     <button
                        onClick={handleGuestInputClick}
                        className="flex items-center gap-2 bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium hover:bg-lime-400"
                     >
                        Continuar <ArrowRight className="size-5" />
                     </button>
                  )}
               </div>

               {isGuestInputOpen && (
                  <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center gap-5 shadow-shape">
                     <button
                        onClick={handleGuestModalClick}
                        type="button"
                        className="flex items-center gap-2 flex-1 text-left"
                     >
                        <UserRoundPlus className="size-5 text-zinc-400" />

                        {emailToInvite.length > 0 ? (
                           <span className="text-lg text-zinc-400 flex-1">
                              {emailToInvite.length} pessoa(s) convidada(s)
                           </span>
                        ) : (
                           <span className="text-lg text-zinc-400 flex-1">
                              Quem estará na viagem?
                           </span>
                        )}
                     </button>

                     <div className="w-px h-6 bg-zinc-800"></div>
                     <button
                        onClick={handleConfirmTripModalClick}
                        className="flex items-center gap-2 bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium hover:bg-lime-400"
                     >
                        Confirmar viagem <ArrowRight className="size-5" />
                     </button>
                  </div>
               )}
            </div>

            <p className="text-zinc-500 text-sm">
               Ao planejar sua viagem pela plann.er você automaticamente
               concorda <br /> com nossos{" "}
               <a href="" className="text-zinc-300 underline">
                  termos de uso
               </a>{" "}
               e{" "}
               <a href="" className="text-zinc-300 underline">
                  políticas de privacidade
               </a>
               .
            </p>
         </div>

         {isGuestModalOpen && (
            <InviteGuestsModal
               handleGuestModalClick={handleGuestModalClick}
               removeEmailToInvite={removeEmailToInvite}
               addToemailToInvite={addToemailToInvite}
               emailToInvite={emailToInvite}
               repeatedEmail={repeatedEmail}
            />
         )}

         {isConfirmTripModalOpen && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
               <div className="w-[640px] rounded-xl bg-zinc-900 py-5 px-6 shadow-shape space-y-5">
                  <div className="space-y-2">
                     <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">
                           Confirmar criação de viagem
                        </h2>

                        <button
                           type="button"
                           onClick={handleConfirmTripModalClick}
                        >
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
                     <form onSubmit={addToemailToInvite} className="space-y-3">
                        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                           <User className="size-5 text-zinc-400" />
                           <input
                              name="name"
                              placeholder="Seu nome completo"
                              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 "
                           />
                        </div>

                        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                           <Mail className="size-5 text-zinc-400" />
                           <input
                              type="email"
                              name="email"
                              placeholder="Seu e-mail pessoal"
                              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 "
                           />
                        </div>

                        <button
                           onClick={createTrip}
                           type="submit"
                           className="flex items-center gap-2 w-full justify-center bg-lime-300 text-lime-950 rounded-lg px-5 h-11 font-medium hover:bg-lime-400"
                        >
                           Confirmar criação da viagem
                        </button>
                     </form>

                     <p
                        className={`text-sm ${repeatedEmail} text-red-500 px-1 pt-[-20px]`}
                     >
                        Este email já foi adicionado
                     </p>
                  </div>
               </div>
            </div>
         )}
      </main>
   );
}

export default CreateTrip;
