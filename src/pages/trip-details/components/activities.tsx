import { CircleCheck, Trash2 } from "lucide-react";
import { api } from "../../../lib/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import DeleteActivityModal from "./delete_activity_modal";

interface Activity {
   id: string;
   date: string;
   activities: {
      id: string;
      title: string;
      occurs_at: string;
   }[];
}

const Activities = () => {
   const { tripId } = useParams();

   const [activities, setActivities] = useState<Activity[]>([]);
   const [isDeleteActivityModal, setIsDeleteActivityModal] =
      useState<boolean>(false);

   function handleDeleteActivityModalClick() {
      if (isDeleteActivityModal === true) {
         return setIsDeleteActivityModal(false);
      }
      setIsDeleteActivityModal(true);
   }

   useEffect(() => {
      api.get(`trips/${tripId}/activities`).then((response) => {
         setActivities(response.data.activities);
      });
   }, [tripId]);

   return (
      <div className="space-y-8">
         {activities.map((day) => (
            <div key={day.date} className="space-y-2.5">
               <div className="flex gap-2 items-baseline">
                  <span className="text-xl font-semibold text-zinc-300">
                     Dia {format(day.date, "d")}
                  </span>
                  <span className="text-xs text-zinc-500">
                     {format(day.date, "EEEE", { locale: ptBR })}
                  </span>
               </div>

               {day.activities.length > 0 ? (
                  <div className="space-y-3">
                     {day.activities.map((activitiy) => (
                        <div key={activitiy.id} className="space-y-2.5">
                           <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                              <CircleCheck className="size-5 text-lime-300" />
                              <span className="text-zinc-100">
                                 {activitiy.title}
                              </span>

                              <div className="ml-auto flex items-center gap-2">
                                 <span className="text-zinc-400 text-sm ">
                                    {format(activitiy.occurs_at, "HH:mm")}
                                 </span>

                                 <button
                                    onClick={handleDeleteActivityModalClick}
                                 >
                                    <Trash2 className="size-4 text-zinc-500 hover:text-red-500 " />
                                 </button>

                                 {isDeleteActivityModal && (
                                    <DeleteActivityModal
                                       activityId={activitiy.id}
                                       handleDeleteActivityModalClick={
                                          handleDeleteActivityModalClick
                                       }
                                    />
                                 )}
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               ) : (
                  <p className="text-zinc-500 text-sm">
                     Nenhuma atividade cadastrada nessa data.
                  </p>
               )}
            </div>
         ))}
      </div>
   );
};

export default Activities;
