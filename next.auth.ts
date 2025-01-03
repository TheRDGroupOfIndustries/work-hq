import NextAuth from "next-auth"
import { CustomUser } from "./lib/types"

declare module "next-auth" {
  interface Session {
    user: CustomUser
  }
}