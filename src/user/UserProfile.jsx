import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { GET_userProfile } from "@/api/user/profile";
import { Calendar, Mail, Phone, User, Clock, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";


export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await GET_userProfile();
        if (data) {
          setProfile(data);
        } else {
           navigate("/user/login");
        }
      } catch (error) {
        if (error.message === "UNAUTHORIZED") {
            logout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, logout]);


  const formatDate = (dateString) => {
    if (!dateString) return "Chưa cập nhật";
    return new Date(dateString).toLocaleDateString("vi-VN", {
        day: "2-digit", month: "2-digit", year: "numeric"
    });
  };

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (!profile) return null;

  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl">
      <Card className="shadow-lg border-t-4 border-t-primary">
        
        {/* HEADER: Avatar & Tên & Role */}
        <CardHeader className="flex flex-col sm:flex-row items-center gap-6 pb-8">
          <Avatar className="w-24 h-24 border-4 border-background shadow-md">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${profile.username}&background=random`} />
            <AvatarFallback>{profile.username?.substring(0,2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="text-center sm:text-left space-y-2 flex-1">
            <div className="flex flex-col sm:flex-row items-center gap-3">
                <CardTitle className="text-3xl font-bold">{profile.username}</CardTitle>
                <Badge variant={profile.role === 'admin' ? "destructive" : "secondary"} className="uppercase">
                    {profile.role}
                </Badge>
            </div>
            <CardDescription className="text-base">ID: #{profile.id}</CardDescription>
          </div>
        </CardHeader>

        <Separator />

        {/* BODY: Thông tin chi tiết */}
        <CardContent className="grid gap-6 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Email */}
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="p-2 bg-background rounded-full shadow-sm">
                        <Mail className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase">Email</p>
                        <p className="font-medium text-sm break-all">{profile.email}</p>
                    </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="p-2 bg-background rounded-full shadow-sm">
                        <Phone className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase">Số điện thoại</p>
                        <p className="font-medium">{profile.phone === "string" ? "Chưa cập nhật" : profile.phone}</p>
                    </div>
                </div>

                {/* Ngày sinh (DOB) */}
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="p-2 bg-background rounded-full shadow-sm">
                        <Calendar className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase">Ngày sinh</p>
                        <p className="font-medium">{formatDate(profile.dob)}</p>
                    </div>
                </div>

                {/* Ngày tham gia */}
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="p-2 bg-background rounded-full shadow-sm">
                        <Clock className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase">Ngày tham gia</p>
                        <p className="font-medium">{formatDate(profile.created_at)}</p>
                    </div>
                </div>
            </div>
        </CardContent>

        <CardFooter className="flex justify-end pt-6 pb-6">
            <Button variant="destructive" onClick={logout} className="gap-2">
                <LogOut className="w-4 h-4" /> Đăng xuất
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

