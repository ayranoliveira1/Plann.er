import { CircleCheck } from "lucide-react";
import { api } from "../../../lib/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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

                              <span className="text-zinc-400 tetx-sm ml-auto">
                                 {format(activitiy.occurs_at, "HH:mm")}
                              </span>
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
