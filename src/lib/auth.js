import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

const login = async (credentials) => {
  console.log(credentials);
    try {
      connectToDb();
      const user = await User.findOne({ email: credentials.username });
  
      if (!user) throw new Error("Wrong credentials!");
  
      const isPasswordCorrect = await bcrypt.compare(
        credentials.password,
        user.password
      );
  
      if (!isPasswordCorrect) throw new Error("Wrong credentials!");
  
      return user;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to login!");
    }
  };
  
  export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
  } = NextAuth({
    ...authConfig,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
      CredentialsProvider({
        async authorize(credentials) {
          try {
            const user = await login(credentials);
            return user;
          } catch (err) {
            return null;
          }
        },
      }),
    ],
    callbacks: {
      async signIn({ user, account, profile }) {
        console.log(profile);
        if (account.provider === "google") {
          connectToDb();
          try {
            const user = await User.findOne({ email: profile.email });
  
            if (!user) {
              const newUser = new User({
                username: profile.login,
                email: profile.email,
                image: profile.avatar_url,
              });
  
              await newUser.save();
            }
          } catch (err) {
            console.log(err);
            return false;
          }
        }
        return true;
      },
      ...authConfig.callbacks,
    },
  });