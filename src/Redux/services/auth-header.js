const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user && user.data.token){
        return {'x-access-token' : 'Bearer ' + user.data.token}
    }else{
        return {}
    }
}

export default authHeader;