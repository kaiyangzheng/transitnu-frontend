import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://transitnu-api.herokuapp.com',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export async function getLines(setLines){
    return axiosInstance.get('/api/v1/line')
    .then(res => {
        setLines(res.data);
    })
    .catch(err => {
        console.log(err.toJSON());
    })
}

export async function getStops(setStops){
    return axiosInstance.get('/api/v1/stop')
    .then(res => {
        setStops(res.data);
    })
    .catch(err => {
        console.log(err.toJSON());
    })
}

export async function getTrains(setTrains){
    return axiosInstance.get('/api/v1/train')
    .then(res => {
        setTrains(res.data);
    })
    .catch(err => {
        console.log(err.toJSON());
    })
}