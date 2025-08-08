import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { X } from "lucide-react"
import { useState, type ReactNode } from "react"

export function PopoverLocation({country}:{country:string}) {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span className='px-1'>{country}</span>
      </PopoverTrigger>
      <PopoverContent className="w-64 absolute top-5 left-[-140px] p-2">
        <div>
          <div className="flex justify-between items-center">
            Is your country {country} <X width={20} onClick={() => setOpen(false)} />
          </div>
          <div className="mt-3 flex justify-between px-2">
            <Button variant={'special'} onClick={() => setOpen(false)} className="rounded-xl">Yes</Button>
            <Button variant={'special_out'} className="rounded-xl">Another country</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
