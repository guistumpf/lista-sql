"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dispatch, SetStateAction, useState } from "react"
import { update } from "../actions"
import { useRouter } from "next/navigation"
import Delete from "./DeleteButton"

export default function Taskitems({id, tarefa, editando, setedit}: {id: number, tarefa: string, editando: number | null, setedit: Dispatch<SetStateAction<number | null>>} ){
const router = useRouter()


const [inputedit, setinput] = useState(tarefa)

 async function ConfirmEdit(){

await update(inputedit, id)
setedit(0)
alert("Edição confirmada!")
router.refresh()
}
return (
    <>
    { editando === id ? <div className="flex items-center gap-2 max-w-sm mt-2"><Input  value={inputedit} onChange={(e) => setinput(e.target.value)}/> <Button onClick={ConfirmEdit}>Confirmar</Button> </div> : 
 <div> {tarefa} <Button onClick={() => setedit(id)}>Edit</Button> | <Delete id={id}/></div>   
}
</>
)

}