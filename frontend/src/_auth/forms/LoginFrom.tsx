import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from 'react-toastify';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})


function LoginFrom() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    axios.post(import.meta.env.VITE_ENDPOINT_BASE_URL + 'login', {
      email: values.email,
      password: values.password,
      device_name: 'react-app',
    })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        toast.success(res.data.message)
        form.reset();
        navigate("/");
      })
      .catch((err) => {
        const errs = err.response.data;
        if (errs.errors) {
          if(errs.email){
            toast.error(errs.email[0])
          }

          if(errs.password){
            toast.error(errs.password[0])
          }
        }

        if (errs.message) {
          toast.error(errs.message)
        }
      });
  }
  
  return (
    <div className="w-[60%]">
      <div className="mb-3">
        <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter text-center">Login</h2>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-center">
              <Button type="submit">Submit</Button>
            </div>
            <p className="text-center">
              Don't have an account?
              <Link to="/register" className="text-blue-500"> Sign Up</Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default LoginFrom