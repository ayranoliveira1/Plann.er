import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import InviteGuestsModal from "./components/invite-guests-modal";
import ConfirmTripModal from "./components/confirm-trip-modal";
import DestinationAdnDateStep from "./components/steps/destination-and-date-step";
import InviteGuestsStep from "./components/steps/invite-guests-step";

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

   function createTrip(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();

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
               <DestinationAdnDateStep
                  handleGuestInputClick={handleGuestInputClick}
                  isGuestInputOpen={isGuestInputOpen}
               />

               {isGuestInputOpen && (
                  <InviteGuestsStep
                     handleGuestModalClick={handleGuestModalClick}
                     handleConfirmTripModalClick={handleConfirmTripModalClick}
                     emailToInvite={emailToInvite}
                  />
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
            <ConfirmTripModal
               handleConfirmTripModalClick={handleConfirmTripModalClick}
               createTrip={createTrip}
               repeatedEmail={repeatedEmail}
            />
         )}
      </main>
   );
}

export default CreateTrip;
