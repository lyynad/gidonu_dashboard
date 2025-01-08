import {useEffect, useMemo, useState} from "react";
import {cn} from "../../../gn-toolbox/toolbox/utils";

interface GnInputProps {
  name: string;
  value: string;
  className?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
}

export default function GnInput({value, name, className, handleChange, readonly = false}: GnInputProps) {
  const [val, setVal] = useState(value);
  const [isFocusedClass, setIsFocusedClass] = useState('');

  useEffect(() => {
    if(readonly) setIsFocusedClass('-translate-y-4 scale-75');
    else if(!val) setIsFocusedClass('');
    else if(!isFocusedClass) setIsFocusedClass('-translate-y-4 scale-75')
  }, [val]);

  return (
    <div className={cn("relative w-full p-3")}>
      <input className={cn("peer p-2 h-full outline-none bg-transparent rounded-lg border border-color-main w-80", className!, readonly ? "cursor-not-allowed" : "")} value={val}
             onChange={(e) => {setVal(e.target.value); if(handleChange) handleChange(e)}}
             readOnly={readonly}
      />
      <div className={cn("top-3 bg absolute px-2 mx-2 my-1 text-xl origin-[0]",
        "transition-transform peer-focus:scale-75 bg-[#E8E8E8] peer-focus:-translate-y-4", isFocusedClass)}
      >{name}</div>
    </div>
  )
}