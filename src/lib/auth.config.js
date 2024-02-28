import { User } from "./models";
export const authConfig = {
    pages: {
      signIn: "/login",
    },
    providers: [],
    callbacks: {
      // FOR MORE DETAIL ABOUT CALLBACK FUNCTIONS CHECK https://next-auth.js.org/configuration/callbacks
      async jwt({ token, user }) {
        console.log('Testing Tokens..', user);
        if (user) {
          token.id = user.id;
          token.isAdmin = user.isAdmin;
          token.isTeacher = user.isTeacher
        }
        return token;
      },
      async session({ session, token }) {
        if (token) {
          session.user.id = token.id;
          session.user.isAdmin = token.isAdmin;
          session.user.isTeacher = token.isTeacher
        }
        return session;
      },
      authorized({ auth, request }) {
        const user = auth?.user;
        const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
        const isOnPortalPage = request.nextUrl?.pathname.startsWith("/portal");
        const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");
        const isOnHomePage = request.nextUrl?.pathname.startsWith("/");
        // ONLY ADMIN CAN REACH THE ADMIN PAGE
  
        if (isOnAdminPanel && !user?.isAdmin) {
          return false;
        }
  
        // ONLY TEACHER CAN REACH THE PORTAL PAGE
  
        // if (isOnPortalPage && !user?.teacher) {
        //   return false;
        // }

        // if (isOnPortalPage && user?.teacher) {
        //   return Response.redirect(new URL("/portal", request.nextUrl));
        // }
  
        // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE
  
        if (isOnLoginPage && user) {
          return Response.redirect(new URL("/", request.nextUrl));
        }
        return true
      },
    },
  };
  