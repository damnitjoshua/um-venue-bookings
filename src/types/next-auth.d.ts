import type { JWT as NextAuthJWT } from "next-auth/jwt/types";
import { User } from "./auth";

// import type { Session as NextAuthSession } from "next-auth/src/core/types";

declare module "next-auth" {
	interface Session {
    userDetails: User;
    user: User
	}
}

declare module "next-auth/jwt" {
	interface JWT extends NextAuthJWT {
    user: User;
	}
}
