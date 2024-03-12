"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const GeneralMenuComponent = ({ label, options }) => {
    const { push } = useRouter()

    return (
        <DropdownMenu>
                <DropdownMenuTrigger className="px-4 py-2 bg-gray-800 text-white outline-none rounded-lg text-sm tracking-wider">{label}</DropdownMenuTrigger>
                <DropdownMenuContent>

                    {
                        options.map((option: object, index: number) =>  (
                            <DropdownMenuItem key={index} className={ option.show ? "" : "hidden" }>
                                <Button onClick={() => push(`${option.href}`) } className="w-full h-full text-xs uppercase tracking-wider">{ option.label }</Button>
                            </DropdownMenuItem>
                        ))
                    }

                </DropdownMenuContent>
            </DropdownMenu>
    )
}

export default GeneralMenuComponent