"use server";
import { revalidatePath } from "next/cache";
import {User} from './models';
import { Students } from "./students";
import { Results } from "./results";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from 'bcryptjs';

export const googleLogin = async () => {
    "use server";
    try{
      await signIn('google');
    }catch(err){
      console.log(err)
      throw err
    }
}

export const login = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};

export const register = async (previousState, formData) => {
  const {email, password, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    connectToDb();

    const user = await User.findOne({ email });

    if (user) {
      return { error: "Email already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("saved to db");

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
}; 

export const handleLogout = async () => {
  "use server";
  try{
    await signOut();
  }catch(err){
    throw err
  }
};

export const studentDetails = async (prevState, formData) => {
  const {

    firstname, 
    othernames,
    age,
    address,
    parentphone,

  } = Object.fromEntries(formData);

  const str = 'SRS'
  const random = Math.floor(Math.random() * (100000 - 100) ) + 5; //44348
  const year = new Date().getFullYear();
  const regNo = `${str}/${year}/${random}`;
  console.log(regNo);
  try{

    const doc = new Students({
      regNo,
      firstname,
      othernames,
      age,
      address,
      parentphone
    });
  
    await doc.save();

    const result  = new Results({
      firstname,
      othernames,
      regNo,
    })

    await result.save();

    return {success : true};  

  }catch(err){
    console.log(err);
    return { error : 'Could not upload student data. No field should be empty'}
  }
}

export const revalidate = (data) => {
  revalidatePath("/portal");
};
