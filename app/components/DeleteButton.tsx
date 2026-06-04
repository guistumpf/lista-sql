"use client"

import { Button } from "@/components/ui/button";
import { deletar } from "../actions";
import { useRouter } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Trash2 } from "lucide-react";

export default function Delete({ tarefa, id}: { tarefa: string ,id:number}){
    const router = useRouter()
    function del(){
    const confirmed = confirm(`A seguinte tarefa será deletada: ${tarefa}`)
if(confirmed){
            deletar(id)
 router.refresh()
 alert("Tarefa Deletada!")
}}

return <Button onClick={del} className="bg-[#F87171] hover:bg-[#3A1F1F] rounded-sm" title="Excluir tarefa"><Trash2 color="#ffffff" /></Button>


}