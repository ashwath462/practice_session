export const getDefaultValues = ()=>{
    fetch(import.meta.env.VITE_CONFIG_API, {
        method: "POST",
        headers:{
            Authorization: import.meta.env.VITE_AUTH_TOKEN
        }
    }).then(res=>{
        // console.log(res.json());
        return res.json();
    }).then(data=>{
        // console.log(data.searchRequest);
        data = data.searchRequest;
        console.log(data);
    })
}
