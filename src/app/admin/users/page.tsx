/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { MoreHorizontal, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  addUser,
  deleteUser,
  getUsersByDate,
  updateUser,
} from "@/lib/admin/adminService";
import { passwordSchema } from "@/schemas/passwords";

const UsersPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editUser, setEditUser] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    user_role: "user" as "user" | "admin",
    password: "",
  });
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const startDate = new Date(
          new Date().setDate(new Date().getDate() - 10)
        )
          .toISOString()
          .split("T")[0];
        const endDate = new Date().toISOString().split("T")[0];
        const users = await getUsersByDate(startDate, endDate);
        setData(users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAdd = async () => {
    try {
      const isValid = passwordSchema.safeParse(newUser.password).success;
      if (!isValid) {
        setPasswordError(
          passwordError || "Password does not meet the criteria."
        );
        return;
      }
      const addedUser = await addUser(newUser);
      setData((prevData) => [...prevData, addedUser]);
      setIsAddDialogOpen(false);
      setNewUser({ username: "", email: "", user_role: "user", password: "" });
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setEditUser({ ...user, password: "" }); // Kullanıcı mevcut değerleriyle başlat, şifre boş
    setIsEditDialogOpen(true);
  };

  const handleDelete = (user: any) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      if (userToDelete) {
        await deleteUser(userToDelete.user_id);
        setData((prevData) =>
          prevData.filter((user: any) => user.user_id !== userToDelete.user_id)
        );
      }
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleSave = async () => {
    try {
      if (
        editUser.password &&
        !passwordSchema.safeParse(editUser.password).success
      ) {
        setPasswordError("Password does not meet the criteria.");
        return;
      }

      const userToUpdate = {
        ...editUser,
        password: editUser.password || undefined, // Şifre yoksa güncellenmeyecek
      };

      await updateUser(selectedUser.user_id, userToUpdate);

      setData((prevData) =>
        prevData.map((user: any) =>
          user.user_id === selectedUser.user_id ? userToUpdate : user
        )
      );

      console.log("User updated successfully");
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditUser((prev: any) => ({ ...prev, [field]: value }));
    if (field === "password") setPasswordError(null); // Şifre değişirse hatayı sıfırla
  };

  const columns = [
    {
      accessorKey: "user_id",
      header: "ID",
    },
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "date_joined",
      header: "Date Joined",
      cell: ({ getValue }: any) =>
        new Date(getValue()).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      accessorKey: "user_role",
      header: "Role",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(user)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(user)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button variant="default" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2" />
          Add User
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={data}
        filters={[
          { placeholder: "Filter by username...", columnKey: "username" },
          { placeholder: "Filter by email...", columnKey: "email" },
        ]}
      />
      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="add-username">Username</Label>
              <Input
                id="add-username"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="add-email">Email</Label>
              <Input
                id="add-email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="add-password">Password</Label>
              <Input
                id="add-password"
                type="password"
                value={newUser.password || ""}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="add-role">Role</Label>
              <Select
                value={newUser.user_role}
                onValueChange={(value) =>
                  setNewUser({ ...newUser, user_role: value as "user" | "admin" })
                }
              >
                <SelectTrigger id="add-role">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-username">Username</Label>
              <Input
                id="edit-username"
                value={editUser?.username || ""}
                onChange={(e) => handleInputChange("username", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                value={editUser?.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="edit-role">Role</Label>
              <Select
                value={editUser?.user_role || ""}
                onValueChange={(value) => handleInputChange("user_role", value)}
              >
                <SelectTrigger id="edit-role">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this user?</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;
