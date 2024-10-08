import { Calendar, MapPin, Settings2 } from "lucide-react";
import Button from "../../../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../../lib/api";
import { format } from "date-fns";
import UpdateDestinationAndDateModal from "./update_destination_and_date_modal";

interface Trip {
   id: string;
   destination: string;
   starts_at: string;
   ends_at: string;
   is_confirmed: boolean;
}

const DestinationAndDateHeader = () => {
   const [trip, setTrip] = useState<Trip | undefined>();
   const [isDestinationAndDateModalOpen, setDestinationAndDateModalOpen] =
      useState(false);

   const { tripId } = useParams();

   function handleDestinationAndDateModalClick() {
      if (isDestinationAndDateModalOpen === true) {
         return setDestinationAndDateModalOpen(false);
      }
      setDestinationAndDateModalOpen(true);
   }

   useEffect(() => {
      api.get(`trips/${tripId}`).then((response) => {
         setTrip(response.data.trip);
      });
   }, [tripId]);

   const displayedDate = trip
      ? format(trip.starts_at, "dd' de 'LLL")
           .concat(" até ")
           .concat(format(trip.ends_at, "dd' de 'LLL"))
      : null;

   return (
      <header className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
         <div className="flex items-center gap-2">
            <MapPin className="size-5 text-zinc-400" />
            <span className="text-zinc-100">{trip?.destination}</span>
         </div>

         <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
               <Calendar className="size-5 text-zinc-400" />
               <span className="text-zinc-100">{displayedDate}</span>
            </div>

            <div className="w-px h-6 bg-zinc-800"></div>

            <Button
               onClick={handleDestinationAndDateModalClick}
               variant="secondary"
            >
               Alterar local/data
               <Settings2 className="size-5" />
            </Button>
         </div>

         {isDestinationAndDateModalOpen && (
            <UpdateDestinationAndDateModal
               handleUpdateDestinationAndDateModalClick={
                  handleDestinationAndDateModalClick
               }
            />
         )}
      </header>
   );
};

export default DestinationAndDateHeader;
