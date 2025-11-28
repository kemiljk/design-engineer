import { clerkClient } from "@clerk/nextjs/server";

export async function getUsers() {
  const client = await clerkClient();
  const users = await client.users.getUserList();
  return users.data.map((user) => ({
    id: user.id,
    email: user.emailAddresses[0].emailAddress,
    name: user.firstName,
    avatar: user.imageUrl,
  }));
}
