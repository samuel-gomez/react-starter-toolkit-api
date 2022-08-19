const { API_KEY } = process.env;

export const options = {
  method: "GET",
  headers: {
    "cache-control": "no-cache",
    "x-apikey": API_KEY,
  },
};

export const TIMEOUT = 1000;
export const TIMEOUTOVER = 21000;
export const API = 'api/'

export const MESSAGES = {
    BAD_REQUEST: 'Erreur : format incorrect',
    NOT_FOUND: 'Erreur : Element introuvable',
    SERVOR_ERROR: 'Erreur technique, contacter le support',
    SERVOR_UNAUTHORIZED: 'Erreur : not authorized',
}