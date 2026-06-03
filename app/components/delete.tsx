"use client"

import { Button } from "@/components/ui/button";
import { deletar } from "../actions";

export default function Delete({id}: {id:number}){
function del(){
    deletar(id)
}

return <Button onClick={del}>X</Button>


}