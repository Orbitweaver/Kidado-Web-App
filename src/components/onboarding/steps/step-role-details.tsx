
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Combobox,
    ComboboxContent,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox";

const SCHOOLS = [
    { value: "msb", label: "MSB Educational Institute" },
    { value: "other", label: "Other" },
];

const formSchema = z.object({
    role: z.string().min(1, "Role is required"),
    school: z.string().min(1, "School/University is required"),
    location: z.string().min(1, "Location is required"),
});

import { useState } from "react";
export function StepRoleDetails() {
    const { role, school, location, updateData, nextStep } = useOnboardingStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            role: role || "",
            school: school || "",
            location: location || "",
        },
    });

    const [query, setQuery] = useState("");

    const filteredSchools = query === ""
        ? SCHOOLS
        : SCHOOLS.filter((school) =>
            school.label.toLowerCase().includes(query.toLowerCase())
        );

    const exactMatch = filteredSchools.some((school) =>
        school.label.toLowerCase() === query.toLowerCase()
    );

    function onSubmit(values: z.infer<typeof formSchema>) {
        updateData(values);
        nextStep();
    }

    return (
        <div className="space-y-6 text-center">
            <div className="space-y-2">
                <h2 className="text-2xl font-medium tracking-tight">
                    Tell us who you are
                </h2>
                <p className="text-sm text-muted-foreground">
                    A real profile helps you build meaningful connections and credibility.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left max-w-sm mx-auto">
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem
                            >
                                <FormLabel>Select Role <span className="text-red-500">*</span></FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Role" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="student">Student</SelectItem>
                                        <SelectItem value="teacher">Teacher</SelectItem>
                                        <SelectItem value="parent">Parent</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="school"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>School/University <span className="text-red-500">*</span></FormLabel>
                                <Combobox
                                    value={field.value}
                                    onValueChange={(val) => {
                                        field.onChange(val);
                                    }}
                                >
                                    <ComboboxInput
                                        placeholder="Select or enter School"
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                    <ComboboxContent>
                                        <ComboboxList>
                                            {filteredSchools.map((school) => (
                                                <ComboboxItem key={school.value} value={school.value}>
                                                    {school.label}
                                                </ComboboxItem>
                                            ))}

                                            {query.length > 0 && !exactMatch && (
                                                <ComboboxItem value={query}>
                                                    Create "{query}"
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input placeholder="Indore" {...field} />
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
        </div >
    );
}
