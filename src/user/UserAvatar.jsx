import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function UserAvatar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/user/login">
          <Button variant="ghost" size="sm">
            Login
          </Button>
        </Link>
        <Link to="/user/register">
          <Button size="sm">Register</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div
        onClick={() => navigate("/user/profile")}
        className="flex items-center gap-2 cursor-pointer hover:bg-accent hover:text-accent-foreground p-2 rounded-md transition-colors"
        title="Xem trang cá nhân"
      >
        <span className="text-sm font-medium hidden md:inline-block">
          {user.username}
        </span>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 ml-2 text-red-500 hover:text-red-600 hover:bg-red-50"
        onClick={logout}
        title="Đăng xuất"
      >
        <LogOut />
      </Button>
    </div>
  );
}
