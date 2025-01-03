"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface User {
  user_id: number;
  username: string;
  email: string;
  user_role: string;
}

const UserEditDialog = ({
  isOpen,
  onClose,
  user,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (updatedUser: User) => void;
}) => {
  const [editedUser, setEditedUser] = useState<User | null>(null);

  // Modal açıldığında kullanıcı bilgilerini yükle
  useEffect(() => {
    if (isOpen && user) {
      setEditedUser({ ...user }); // Derin kopya ile state'e aktar
    }
  }, [isOpen, user]);

  // Giriş alanı değişikliklerini handle eden fonksiyon
  const handleInputChange = (field: keyof User, value: string) => {
    setEditedUser((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  // Kaydet butonuna basıldığında düzenlemeleri kaydet
  const handleSave = () => {
    if (editedUser) {
      console.log("Saving edited user:", editedUser); // Debug log
      onSave(editedUser);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={editedUser?.username || ""}
              onChange={(e) => handleInputChange("username", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={editedUser?.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              value={editedUser?.user_role || ""}
              onChange={(e) => handleInputChange("user_role", e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditDialog;
