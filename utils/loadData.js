import axios from 'axios';

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
}
