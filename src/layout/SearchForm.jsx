import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Search } from "lucide-react"; 

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";


const formSchema = z.object({
  query: z.string().optional(), 
  
});

export function SearchForm({ className }) {

  const [searchParams,setSearchParams] = useSearchParams();
  // 2. Khởi tạo form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: searchParams.get("q") || "", // Lấy giá trị ban đầu từ URL
    },
  });

  // Đồng bộ: Nếu URL thay đổi (ví dụ user bấm Back), cập nhật lại ô Input
  useEffect(()=>{
    form.setValue("query", searchParams.get("q") || "")
  },[searchParams])

  // 3. Xử lý khi Submit
  function onSubmit(data) {
    // URLSearchParams
    const params = new URLSearchParams(searchParams);
    // neu co thi set params 
    if(data.query && data.query.trim()){
      params.set("q", data.query.trim());
    }
    // neu khong thi xoa
    else{
      params.delete("q");
    }
    // neu co trang thi reset lai bang 1
    if(params.has("page"))
    {
      params.set("page","1")
    }
    // setSearchParams
    setSearchParams(params);
  }

  return (
    <div className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full items-center space-x-2">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="relative w-full">
                <FormControl>
                  <div className="relative">
                    {/* Icon nằm đè lên Input */}
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Tìm kiếm phim..."
                      className="pl-9 bg-background" // pl-9 để chữ không đè lên icon
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Tìm kiếm</Button>
        </form>
      </Form>
    </div>
  );
}