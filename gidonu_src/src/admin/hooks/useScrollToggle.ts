import { useEffect } from "react";

export function useScrollToggle(isActive: boolean) {
    useEffect(() => {
        if(isActive)
            document.body.style.overflowY = "hidden";
        else
            document.body.style.overflowY = "auto";
    }, [isActive]);
}