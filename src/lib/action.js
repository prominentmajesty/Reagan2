"use server";

import { revalidatePath } from "next/cache";
import {User} from './models';
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from 'bcryptjs';

export const googleLogin = async () => {
    "use server";
    await signIn('google');
}

export const handleLogout = async () => {
  "use server";
  await signOut();
};

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