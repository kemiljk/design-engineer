import { clerkClient } from "@clerk/nextjs";

export async function getUsers() {
  const users = await clerkClient.users.getUserList();
  return users.map((user) => ({
    id: user.id,
    email: user.emailAddresses[0].emailAddress,
    name: user.firstName,
    avatar: user.imageUrl,
  }));
}
