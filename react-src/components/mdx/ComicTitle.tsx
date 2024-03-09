import { ReactNode } from "react"

export const ComicTitle = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-row justify-center m-4 text-4xl">{children}</div>
  )
}
