"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dispatch, SetStateAction, useState } from "react"
import { update } from "../actions"
import { useRouter } from "next/navigation"
import Delete from "./DeleteButton"
import { Check, Pencil, Undo } from "lucide-react"

export default function Taskitems({ id, tarefa, editando, setedit }: { id: number, tarefa: string, editando: number | null, setedit: Dispatch<SetStateAction<number | null>> }) {
    const router = useRouter()
    function cancel() {
        const confirmed = confirm(`Tem certeza? As alterações serão canceladas. Valor Atual: ${tarefa}`)
        if (confirmed) {
            setedit(0)
        }
    }

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
            {editando === id ? <div className="flex items-center gap-2 max-w-sm mt-2">
                <Input value={inputedit} onChange={(e) => setinput(e.target.value)} placeholder="Qual vai ser o novo valor?" /> 
                <Button onClick={cancel} size="icon" className="bg-[#F87171] hover:bg-[#8b0000] rounded-sm" title="Descartar alteração">
                    <Undo color="#ffff"/>
                    </Button>
                    <Button onClick={ConfirmEdit} size="icon" className="rounded-sm bg-[#267D39] hover:bg-[#30543D]" title="Confirme a alteração">
                <Check color="#ffff"/>
                </Button> 
                </div> :
                <>
                    <span className="flex-1 min-w-0 text-sm truncate text-foreground" title={tarefa}>
                        {tarefa}
                    </span>
                    <div className="flex items-center gap-1 flex-shrink-0">

                        <Button variant="secondary" size="icon" onClick={() => setedit(id)} className="bg-[#2A2C31] hover:bg-[#34363C] rounded-sm mr-1" title="Faça alterações nessa tarefa"><Pencil color="#ffffff" /></Button><Delete tarefa={tarefa} id={id} />
                    </div>
                </>
            }
        </>
    )

}