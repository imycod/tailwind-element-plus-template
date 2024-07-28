export const getUserInfo = () => http.get("/api/idm-app/user",{},{
    headers:{
        Accept:'application/json'
    }
});

export const getUsers = (data) => http.post("/api/idm-app/users",{data},{
    headers:{
        Accept:'application/json'
    }
});