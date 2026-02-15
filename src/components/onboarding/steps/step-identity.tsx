
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOnboardingStore } from "@/store/onboarding-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
    fullName: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
});

export function StepIdentity() {
    const { fullName, updateData, nextStep } = useOnboardingStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: fullName || "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        updateData({ fullName: values.fullName });
        nextStep();
    }

    return (
        <div className="space-y-6 text-center">
            <div className="space-y-2">
                <h2 className="text-2xl font-medium tracking-tight">
                    Let people recognise you
                </h2>
                <p className="w-full md:w-xs text-md text-muted-foreground m-auto">
                    A real profile helps you build meaningful connections and credibility.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-left max-w-sm mx-auto">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">
                        Continue
                    </Button>
                </form>
            </Form>
        </div>
    );
}
