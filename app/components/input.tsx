import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


type InputProps = {
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}


export default function CampoTarefa({value, onChange, placeholder}: InputProps) {

return <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        />

}