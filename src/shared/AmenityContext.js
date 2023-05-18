import { createContext, useContext, useState } from "react";

export const AmenityContext = createContext(undefined)

export function SearchContextProvider({children}) {
    const [amenityId, setAmenityId] = useState('')

    const value = { amenityId, setAmenityId, }

    return <AmenityContext.Provider value={value}>{children}</AmenityContext.Provider>
}

export function useAmenityContext() {
    return useContext(AmenityContext)
}