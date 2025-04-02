"use client"

import { createContext, useContext, useState } from "react"

interface RightPanelContextType<T> {
  panelContent: T | null
  setPanelContent: (content: T | null) => void
}

const RightPanelContext = createContext<RightPanelContextType<any> | null>(null)

export function RightPanelProvider({ children }: { children: React.ReactNode }) {
  const [panelContent, setPanelContent] = useState<any>(null)

  return <RightPanelContext.Provider value={{ panelContent, setPanelContent }}>{children}</RightPanelContext.Provider>
}

export function useRightPanel<T>() {
  const context = useContext(RightPanelContext)
  if (!context) {
    throw new Error("useRightPanel must be used within a RightPanelProvider")
  }
  return context as RightPanelContextType<T>
}

