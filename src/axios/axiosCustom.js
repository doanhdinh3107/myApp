import axios from "axios";
import { getToken, removeToken, setToken } from "../service/LocalStorageService";
//axiosInstance la 1 doi tuong axios duoc tao ra voi cac config mac dinh co the tai sd ma k can phai config lai cac tham so nay
const baseUrl = "http://localhost:8080"
const axiosInstance = axios.create({
        baseURL: baseUrl,
        //dinh nghia baseUrl cua cac yeu cau sd axiosINsatnce nay
        headers: {
            'Content-Type': 'application/json',
            "Authorization": getToken() ? `Bearer ${getToken()}` : null
        }
    })
    //interceptor la bo chan bat cac loi xay ra trong qua trinh gui yeu cau http su dung axios
axiosInstance.interceptors.response.use((response) => {
        //day la callback xu ly khi co reponse tra ve
        //tra ve du lieu khong chinh sua gi
        return response;
    },
    async(error) => {
        const url = error.config.url
        const originalRequest = error.config
        if (!error.response) {
            alert(
                'A server/network error occurred. ' +
                'Looks like CORS might be the problem. ' +
                'Sorry about this - we will get it fixed shortly.'
            );
            //chuyen den xu ly loi o promise
            //dung qua trinh xu ly ngat(interception) va bao hieu qua trinh xu ly loi hoan tat
            //tiep tuc tra lai loi de xu ly trong ham goi yeu cau http su dung axiosInstance
            return Promise.reject(error)
        }
        if (error.response.status === 401 && url === `${baseUrl}/refreshToken`) {
            window.location.href = "/login"
            return Promise.reject(error)
        }
        if (error.response.status === 401 && error.response.data.result == "token invalid") {
            //neu token het han hoac co van de gi do goi lai de lay tojen neu ma k dc nua thi chuyen ve trang login
            //can phai return promise o day de nhung tk tiep theo co the su dung then de lay dl
            return axios.post("http://localhost:8080/refreshToken", JSON.stringify({ "token": getToken() }), {
                    headers: {
                        'Content-Type': 'application/json',

                    }
                }).then(
                    (response) => {
                        console.log(response.data.token)
                        setToken(response.data.token)
                        originalRequest.headers['Authorization'] =
                            'Bearer ' + response.data.token;

                        return axiosInstance(originalRequest);
                    }
                )
                .catch((err) => {
                    console.log(err)
                        //xu ly loi khi khong the tao token moi tu endpoint refesh

                    return Promise.reject(err);
                })


        }
        return Promise.reject(error);
    }
)
export default axiosInstance;