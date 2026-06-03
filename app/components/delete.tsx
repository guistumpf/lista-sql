"use client"

import { Button } from "@/components/ui/button";
import { deletar } from "../actions";
import { useRouter } from "next/navigation";

export default function Delete({id}: {id:number}){
    const router = useRouter()

    function del(){
    deletar(id)
 router.refresh()
 alert("Tarefa Deletada!")
}

return <Button onClick={del}>X</Button>


}