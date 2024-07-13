import { Link2, Plus } from "lucide-react";
import Button from "../../../components/button";

const ImportantLinks = () => {
   return (
      <div className="space-y-6">
         <h2 className="font-semibold text-xl">Links Importantes</h2>

         <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
               <div className="space-y-1.5 text">
                  <span className="block font-medium text-zinc-100">
                     Reserva do AirBnB
                  </span>
                  <a
                     href="#"
                     className="block text-xs text-zinc-400 truncate hover:underline hover:text-zinc-200"
                  >
                     https://www.airbnb.com.br/rooms/1047000111111111111111
                  </a>
               </div>
               <Link2 className="size-5 text-zinc-400 shrink-0" />
            </div>

            <div className="flex items-center justify-between gap-4">
               <div className="space-y-1.5 text">
                  <span className="block font-medium text-zinc-100">
                     Reserva da casa
                  </span>
                  <a
                     href="#"
                     className="block text-xs text-zinc-400 truncate hover:underline hover:text-zinc-200"
                  >
                     https://www.notion.com/pages/1047000112354648336?adults=13&children=0&infants=0&pets=0&wishlist_item_id=11003621872995&check_in=2024-08-17&check_out=2024-08-26&source_impression_id=p3_1717600906_P3DL0E-bJZzguEci&previous_page_section_name=1000
                  </a>
               </div>
               <Link2 className="size-5 text-zinc-400 shrink-0" />
            </div>
         </div>

         <Button variant="secondary" size="full">
            <Plus className="size-5" />
            Cadastrar novo link
         </Button>
      </div>
   );
};

export default ImportantLinks;
