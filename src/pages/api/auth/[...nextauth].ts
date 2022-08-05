import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

/* Exporting the NextAuth function with the GithubProvider function as a parameter. */
export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
})