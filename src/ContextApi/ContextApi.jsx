import React, { createContext, useState } from 'react'

export const addPetResponseContext = createContext()
export const editPetResponseContext = createContext()

function ContextApi({ children }) {
    const [addPetResponse, setAddPetResponse] = useState("")
    const [editPetResponse, setEditPetResponse] = useState("")
    return (
        <>
            <addPetResponseContext.Provider value={{ addPetResponse, setAddPetResponse }}>
                <editPetResponseContext.Provider value={{ editPetResponse, setEditPetResponse }}>
                    {children}
                </editPetResponseContext.Provider>
            </addPetResponseContext.Provider>

        </>
    )
}

export default ContextApi