import { createContext, useContext, useState } from 'react'

export const DatingSettingContext = createContext(null)

export const useDatingSettingContext = () => {
  return useContext(DatingSettingContext)
}

export const DatingSettingContextProvider = ({ children }) => {
  const [datingSetting, setDatingSetting] = useState(
    JSON.parse(localStorage.getItem('datingSetting')) || null
  )
  return (
    <DatingSettingContext.Provider value={{ datingSetting, setDatingSetting }}>
      {children}
    </DatingSettingContext.Provider>
  )
}
