import { Link2, Plus, Trash2 } from "lucide-react";
import Button from "../../../../components/button";
import { api } from "../../../../lib/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateLinkModal from "./create-link-modal";
import DeleteLinkModal from "./delete_link_modal";

interface Links {
   id: string;
   title: string;
   url: string;
}

const ImportantLinks = () => {
   const [links, setLinks] = useState<Links[]>([]);
   const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] =
      useState<boolean>(false);
   const [isDeleteLinkModal, setIsDeleteLinkModal] = useState<boolean>(false);

   const handleCreateLinkModalClick = () => {
      if (isCreateLinkModalOpen === true) {
         return setIsCreateLinkModalOpen(false);
      }
      setIsCreateLinkModalOpen(true);
   };

   const handleDeleteLinkModalClick = () => {
      if (isDeleteLinkModal === true) {
         return setIsDeleteLinkModal(false);
      }
      setIsDeleteLinkModal(true);
   };

   const { tripId } = useParams();
   const navigate = useNavigate();

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
                  <div className="flex items-center gap-2">
                     <Link2 className="size-5 text-zinc-400 shrink-0" />

                     <button
                        onClick={async () => {
                           await api.delete(`trips/${tripId}/links/${link.id}`);

                           navigate(0);
                        }}
                     >
                        <Trash2 className="size-4 text-zinc-500 hover:text-red-500 " />
                     </button>
                  </div>

                  {isDeleteLinkModal && (
                     <DeleteLinkModal
                        handleDeleteLinkModalClick={handleDeleteLinkModalClick}
                        linkId={link.id}
                     />
                  )}
               </div>
            ))}
         </div>

         <Button
            onClick={handleCreateLinkModalClick}
            variant="secondary"
            size="full"
         >
            <Plus className="size-5" />
            Cadastrar novo link
         </Button>

         {isCreateLinkModalOpen && (
            <CreateLinkModal
               handleCreateActivityModalClick={handleCreateLinkModalClick}
            />
         )}
      </div>
   );
};

export default ImportantLinks;
