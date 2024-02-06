import { File } from "$lib/models/File";
export const database = File.getInstance();

export const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;


export const showPassword = () => {
  var inputPassword: any = document.getElementById("userPassword");
  if (inputPassword.type === "password") {
    return inputPassword.type = "text";
  } else {
    return inputPassword.type = "password";
  }
};

export const isValidCredInput = (email:string, password:string, confirmPassword:string|undefined = undefined)=>{
  if(!emailRegex.test(email)){
    throw new Error('*Kindly check the mail entered!');
  }
  if( password.length < 6){
    throw new Error('*Password length should be greater than or equal to 6!');
  }
  if(confirmPassword!=undefined && confirmPassword!=password){
    throw new Error('*Confirm password didn\'t match password!');
  }
  return true;
}