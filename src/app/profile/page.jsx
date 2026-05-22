"use client";

import { UpdateUserModal } from "@/components/UpdateUserModal";
import { authClient } from "@/lib/auth-client";
import { Avatar, Card } from "@heroui/react";

const ProfilePage = () => {
  const userData = authClient.useSession();
  const user = userData.data?.user;

  return (
    <div>
      <Card className="max-w-96 mx-auto flex flex-col items-center border mt-5 mb-5 p-5 gap-2">
        <Avatar className="h-20 w-20">
          <Avatar.Image
            alt={user?.name || "User"}
            src={user?.image}
            referrerPolicy="no-referrer"
          />
          <Avatar.Fallback>
            {user?.name?.charAt(0) || "U"}
          </Avatar.Fallback>
        </Avatar>

        <h2 className="text-xl font-bold">{user?.name}</h2>
        <p className="text-muted">{user?.email}</p>

        <UpdateUserModal user={user} />
      </Card>
    </div>
  );
};

export default ProfilePage;