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
  name: z.string().min(2).max(255),
  email: z.string().email(),
  password: z.string().min(8),
  password_confirmation: z.string().min(8)
})


function RegisterForm() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
      name: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    axios.post(import.meta.env.VITE_ENDPOINT_BASE_URL + 'register', {
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation
    })
      .then(() => {
        form.reset();
        navigate("/login");
      })
      .catch((err) => {
        const errs = err.response.data;
        if (errs.errors) {
          if (errs.name) {
            toast.error(errs.name[0])
          }

          if (errs.email) {
            toast.error(errs.email[0])
          }

          if (errs.password) {
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
        <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter text-center">SignUp</h2>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Confirmation</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password Confirmation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-center">
              <Button type="submit">Submit</Button>
            </div>
            <p className="text-center">
              Already have an account?
              <Link to="/login" className="text-blue-500"> Sign In</Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default RegisterForm