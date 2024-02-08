export const getDate = ()=>{
    const currentDate = new Date();
    const day = currentDate.toLocaleDateString('en-US', {weekday:'short'});
    const date = currentDate.getDate();
    const month = currentDate.toLocaleDateString('en-US', {month:'short'});
    return {day,date,month};
}

