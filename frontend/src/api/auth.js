import axiosReady from "./axiosConfig";

export const apiLogin = async (email, motDePasse) => {
    const res = axiosReady.post("/api/v1/auth/login", {
        "email": email,
        "password": motDePasse
    })
    return res;
};

export const apiSignUp = async (email, motDePasse, nom, prenoms) => {
    const res = axiosReady.post("/api/v1/auth/register", {
        "email": email,
        "hashed_password": motDePasse,
        "nom": nom,
        "prenoms": prenoms
    })
    return res;
};