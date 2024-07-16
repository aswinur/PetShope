import { commonApi } from "./commonApi"
import base_url from './server_url'
// register
export const userRegister = async (data) => {
    return await commonApi("POST", `${base_url}/register`, data, "")
}

//login
export const userLogin = async (data) => {
    return await commonApi("POST", `${base_url}/login`, data, "")
}

//sellpet
export const sellpet = async (data, header) => {
    return await commonApi("POST", `${base_url}/sellpet`, data, header)
}

//home-pets
export const homePets = async () => {
    return await commonApi("GET", `${base_url}/home-pets`, "", "")
}

//all pets

export const allPets = async (header, search) => {
    return await commonApi('GET', `${base_url}/all-pets?search=${search}`, "", header)
}

//user-pets
export const userPets = async (header) => {
    return await commonApi("GET", `${base_url}/user-pets`, "", header)
}

//edit-pet
export const editPet = async (id, data, header) => {
    return await commonApi("PUT", `${base_url}/edit-pet/${id}`, data, header)
}

//delete-pet
export const deletePet = async (id, header) => {
    return await commonApi("DELETE", `${base_url}/delete-pet/${id}`, {}, header)
}

//update-profile
export const  updateProfile=async(header,data)=>{
    return await commonApi('PUT',`${base_url}/profile-update`,data,header)
}