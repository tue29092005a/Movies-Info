
import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string().min(3, "Username phải có ít nhất 3 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  phone: z.string().regex(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
  dob: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', {
    message: "Ngày sinh không hợp lệ",
  }),
});

export const LoginSchema = z.object({
  username: z.string().min(1, "Vui lòng nhập Username"),
  password: z.string().min(1, "Vui lòng nhập Password"),
});