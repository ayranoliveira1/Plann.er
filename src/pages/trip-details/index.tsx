import { Plus } from "lucide-react";
import { useState } from "react";
import CreateActivityModal from "./components/create-activity-modal";
import ImportantLinks from "./components/important-links";
import Guests from "./components/guests";
import Activities from "./components/activities";
import DestinationAndDateHeader from "./components/destination-and-date-header";
import Button from "../../components/button";

const TripDetailsPage = () => {
   const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
      useState<boolean>(false);

   function handleCreateActivityModalClick() {
      if (isCreateActivityModalOpen === true) {
         return setIsCreateActivityModalOpen(false);
      }
      setIsCreateActivityModalOpen(true);
   }

   return (
      <div className="max-w-6xl py-10 mx-auto space-y-8">
         <DestinationAndDateHeader />

         <main className="flex gap-16 px-4">
            <section className="flex-1 space-y-6">
               <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-semibold">Atividades</h2>

                  <Button onClick={handleCreateActivityModalClick}>
                     <Plus className="size-5" />
                     Cadastrar atividade
                  </Button>
               </div>

               <Activities />
            </section>

            <section className="w-80 space-y-6">
               <ImportantLinks />

               <div className="w-full h-px bg-zinc-800"></div>

               <Guests />
            </section>
         </main>

         {isCreateActivityModalOpen && (
            <CreateActivityModal
               handleCreateActivityModalClick={handleCreateActivityModalClick}
            />
         )}
      </div>
   );
};

export default TripDetailsPage;
