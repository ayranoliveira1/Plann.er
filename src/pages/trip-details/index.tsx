import { Calendar, MapPin, Plus, Settings2 } from "lucide-react";
import { useState } from "react";
import CreateActivityModal from "./components/create-activity-modal";
import ImportantLinks from "./components/important-links";
import Guests from "./components/guests";
import Activities from "./components/activities";

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
         <header className="px-4 h-16 rounded-xl bg-zinc-90c0 shadow-shape flex items-center justify-between">
            <div className="flex items-center gap-2">
               <MapPin className="size-5 text-zinc-400" />
               <span className="text-zinc-100">Florianópolis, Brasil</span>
            </div>

            <div className="flex items-center gap-5">
               <div className="flex items-center gap-2">
                  <Calendar className="size-5 text-zinc-400" />
                  <span className="text-zinc-100">17 a 23 de adosto</span>
               </div>

               <div className="w-px h-6 bg-zinc-800"></div>

               <button className="flex items-center gap-2 bg-zinc-800 text-zinc-300 rounded-lg px-5 py-2 font-medium hover:bg-zinc-700">
                  Alterar local/data <Settings2 className="size-5" />
               </button>
            </div>
         </header>

         <main className="flex gap-16 px-4">
            <section className="flex-1 space-y-6">
               <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-semibold">Atividades</h2>

                  <button
                     onClick={handleCreateActivityModalClick}
                     className="flex items-center gap-2 bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium hover:bg-lime-400"
                  >
                     <Plus className="size-5" />
                     Cadastrar atividade
                  </button>
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
