"use client";
export const dynamic = "force-dynamic";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { clear } from "../actions";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";
export default function Clear() {
  const router = useRouter();

  async function cleaning() {
    const confirmed = confirm(
      "Tem certeza? Isso vai apagar todas as tarefas da sua lista permanentemente",
    );

    if (confirmed) {
      await clear();
      alert("Sua lista foi apagada");
      router.refresh();
    }
  }

  return (
    <DropdownMenuItem onClick={cleaning} className="cursor-pointer">
      <TriangleAlert className="text-amber-500 dark:text-yellow-400" />{" "}
      <h1 className="text-yellow-500">Limpar</h1>
    </DropdownMenuItem>
  );
}
