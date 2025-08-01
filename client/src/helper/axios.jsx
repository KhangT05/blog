import axios from "axios";

export default function requestApi(endpoint,method,body,responseTpye = 'json'){
  const headers = {
    "Accept":"application/json",
    "Content-Type":"application/json",
    // "Access-Control-Allow-Origin":"*"
  }
  const instance = axios.create({headers});
  return instance.request({
    method:method,
    url:`${import.meta.env.VITE_API_URL}${endpoint}`,
    data:body,
    responseType:responseTpye
  })
}