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

  return (
    <div className={cn(`relative w-full ${readonly ? "opacity-[0.5]" : ""}`)}>
      <div className="text-[3.2cqw] ml-[1cqw]">{name}</div>
      <input className={cn("peer p-2 h-full outline-none bg-transparent rounded-lg border border-color-main w-[45cqw] mt-[0.5cqw] text-[2.5cqw] font-light", className!, readonly ? "cursor-not-allowed" : "")} value={val}
             onChange={(e) => {setVal(e.target.value); if(handleChange) handleChange(e)}}
             readOnly={readonly}
      />
    </div>
  )
}