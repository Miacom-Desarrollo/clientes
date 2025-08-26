import axios from 'axios';

const apiUrl = import.meta.env.VITE_MI_URL;

const apiauthmicroservice = axios.create({
  baseURL: apiUrl, 
  headers: {
    'Content-Type': 'application/json',
  },
});
console.log(apiauthmicroservice, "apiUrl");

const microservices = {
  apiauthmicroservice,
};

export default microservices;