"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dispatch, SetStateAction, useState } from "react"
import { update } from "../actions"
import { useRouter } from "next/navigation"
import Delete from "./DeleteButton"
import { Pencil, SquarePen } from "lucide-react"
import { HiOutlinePencilSquare } from "react-icons/hi2"
import { FaRegEdit } from "react-icons/fa"

export default function Taskitems({ id, tarefa, editando, setedit }: { id: number, tarefa: string, editando: number | null, setedit: Dispatch<SetStateAction<number | null>> }) {
    const router = useRouter()


    const [inputedit, setinput] = useState("")

    async function ConfirmEdit() {
        if (inputedit.trim() === "") {
            alert("Você precisar colocar um novo valor, não uma string vazia! :)")
            return
        }

        await update(inputedit, id)
        setinput("")
        setedit(0)
        alert("Edição confirmada!")
        router.refresh()
    }
    return (
        <>
            {editando === id ? <div className="flex items-center gap-2 max-w-sm mt-2"><Input value={inputedit} onChange={(e) => setinput(e.target.value)} placeholder="Qual vai ser o novo valor?" /> <Button onClick={ConfirmEdit}>Confirmar</Button> </div> :
                <div> {tarefa} <Button variant="secondary" size="icon" onClick={() => setedit(id)} className="bg-[#2A2C31] hover:bg-[#34363C] rounded-sm mr-1" title="Faça alterações nessa tarefa"><Pencil color="#ffffff" /></Button><Delete tarefa={tarefa} id={id} /></div>
            }
        </>
    )

}