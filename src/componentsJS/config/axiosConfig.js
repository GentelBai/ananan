import $axiox from 'axios'

const baseUrl = "http://localhost:8004/";

$axios.interceptors.request.use(config =>{
        let token = localStorage.getItem("x-auth-token");
        if(token){
            config.headers.token = token;
        }

        if(config.url.indexOf(url) === -1){
            config.url = url + config.url;
        }
        return config;
    }, err =>{
        return Promise.reject(err);
    }
)