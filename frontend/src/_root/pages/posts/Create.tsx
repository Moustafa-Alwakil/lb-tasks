import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from 'react-toastify';

const formSchema = z.object({
    title: z.string().min(5).max(255),
    body: z.string().min(50),
})


function CreatePost() {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            body: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        axios.post(import.meta.env.VITE_ENDPOINT_BASE_URL + 'posts', {
            title: values.title,
            body: values.body,
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then((res) => {
                form.reset();
                navigate("/");
                toast.success(res.data.message)
            })
            .catch((err) => {
                const errs = err.response.data;
                if (errs.errors) {
                    if (errs.title) {
                        toast.error(errs.title[0])
                    }

                    if (errs.password) {
                        toast.error(errs.body[0])
                    }
                }

                if (errs.message) {
                    toast.error(errs.message)
                }
            });
    }

    return (
        <div className="w-[90%]">
            <div className="mb-3">
                <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter text-center">Create Post</h2>
            </div>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="body"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Body</FormLabel>
                                    <FormControl>
                                        <Textarea rows={10} placeholder="Body" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="text-center">
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default CreatePost