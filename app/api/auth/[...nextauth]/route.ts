import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { Profile } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProviders from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProviders({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user?.email });
      (session.user as { id: string }).id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      await connectToDB();

      const userExists = await User.findOne({ email: profile?.email });

      if (!userExists) {
        await User.create({
          username: profile?.name,
          email: profile?.email,
          image: profile?.image,
        });
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
