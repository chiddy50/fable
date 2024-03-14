import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const TooltipComponent =  ({ children })  => {
    return (
        <TooltipProvider>
            <Tooltip>
                {children}
            </Tooltip>
        </TooltipProvider>
    )
}

export default TooltipComponent