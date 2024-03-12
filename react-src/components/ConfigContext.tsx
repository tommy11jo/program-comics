import React, { createContext, useContext, ReactNode } from "react"

interface Config {
  alignItems: "flex-start" | "flex-end" | "center"
}

const defaultConfig: Config = {
  alignItems: "flex-start",
}

const ConfigContext = createContext<Config | undefined>(undefined)

interface ConfigProviderProps {
  children: ReactNode
  config?: Config
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({
  children,
  config = defaultConfig,
}) => {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  )
}

export const useConfig = () => {
  const context = useContext(ConfigContext)
  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider")
  }
  return context
}
