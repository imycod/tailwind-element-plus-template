export const getUserInfo = () => http.get("/api/idm-app/user",{},{
    headers:{
        Accept:'application/json'
    }
});