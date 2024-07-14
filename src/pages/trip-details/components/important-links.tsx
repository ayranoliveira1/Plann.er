import { Link2, Plus } from "lucide-react";
import Button from "../../../components/button";
import { api } from "../../../lib/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Links {
   id: string;
   title: string;
   url: string;
}

const ImportantLinks = () => {
   const [links, setLinks] = useState<Links[]>([]);

   const { tripId } = useParams();

   useEffect(() => {
      api.get(`trips/${tripId}/links`).then((response) => {
         setLinks(response.data.links);
      });
   }, [tripId]);

   return (
      <div className="space-y-6">
         <h2 className="font-semibold text-xl">Links Importantes</h2>

         <div className="space-y-5">
            {links.map((link) => (
               <div
                  key={link.id}
                  className="flex items-center justify-between gap-4"
               >
                  <div className="space-y-1.5 text">
                     <span className="block font-medium text-zinc-100">
                        {link.title}
                     </span>
                     <a
                        href="#"
                        className="block text-xs text-zinc-400 truncate hover:underline hover:text-zinc-200"
                     >
                        {link.url}
                     </a>
                  </div>
                  <Link2 className="size-5 text-zinc-400 shrink-0" />
               </div>
            ))}
         </div>

         <Button variant="secondary" size="full">
            <Plus className="size-5" />
            Cadastrar novo link
         </Button>
      </div>
   );
};

export default ImportantLinks;
