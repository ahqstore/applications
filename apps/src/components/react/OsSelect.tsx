import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function OsSelect() {
  return <Select onValueChange={(s) => window.location.pathname = `/applications/${s}`}>
    <SelectTrigger aria-label="Select your OS repository" className="h-10">
      <SelectValue placeholder="Select your OS repository" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="windows">Windows</SelectItem>
      <SelectItem value="linux">Linux</SelectItem>
      <SelectItem value="fdroid">Android</SelectItem>
    </SelectContent>
  </Select>;
}