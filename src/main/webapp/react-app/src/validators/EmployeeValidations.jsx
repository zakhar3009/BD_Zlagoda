export const checkValidDateOfBirth = (value) => {
    let birthday = new Date(value);
    let ageDifMs = Date.now() - birthday;
    let ageDate = new Date(ageDifMs);
    if (Math.abs(ageDate.getUTCFullYear() - 1970) < 18)
        return "The employee must be adult!"
};

export const checkValidDateOfStart =(value)=>{
    let dateStart = new Date(value);
    if(Date.now < dateStart)
        return "Date start must be less then today date!";
};

export const checkValidPhoneNumber = (value) =>{
    if(!value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im))
        return "Your phone number isn't validate!";
};

export const checkValidPassword = (value) =>{
    if(value.length < 8)
        return "Password must be at least 8 characters long!";
};

export const checkValidSalary = (value) =>{
    if(value < 0)
        return "Salary must be more then 0!"
};