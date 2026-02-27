import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useMemo } from "react";
import { useOnboardingStore } from "@/store/onboarding-store";
import { Button } from "@/components/ui/button";
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
import useGetSelectOptions from "@/hooks/useGetSelectOptions";

const formSchema = z.object({
  role: z.string().min(1, "Role is required"),
  school: z.string().min(1, "School/University is required"),
  schoolName: z.string().optional(),
  city: z.string().min(1, "City is required"),
  country: z.string().optional(),
});

export function StepRoleDetails() {
  const { role, school, schoolName, city, country, updateData, nextStep } =
    useOnboardingStore();

  const { data: selectOptions, isLoading } = useGetSelectOptions();
  const [cityQuery, setCityQuery] = useState("");

  const allCities = useMemo(() => {
    if (!selectOptions?.countries) return [];
    return selectOptions.countries.flatMap((country) =>
      country.cities.map((city) => ({
        city: city,
        country: country.name,
      })),
    );
  }, [selectOptions?.countries]);

  const filteredCities = useMemo(() => {
    if (!cityQuery) return [];
    const lowerQuery = cityQuery.toLowerCase();
    return allCities
      .filter((c) => c.city.toLowerCase().includes(lowerQuery))
      .slice(0, 50);
  }, [allCities, cityQuery]);

  const [schoolQuery, setSchoolQuery] = useState(schoolName || "");

  const filteredSchools = useMemo(() => {
    if (!selectOptions?.institutions) return [];
    if (!schoolQuery) return selectOptions.institutions.slice(0, 50);
    const lowerQuery = schoolQuery.toLowerCase();
    return selectOptions.institutions
      .filter(
        (s) =>
          s.name.toLowerCase().includes(lowerQuery) ||
          s.city.toLowerCase().includes(lowerQuery),
      )
      .slice(0, 50);
  }, [selectOptions?.institutions, schoolQuery]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: role || "",
      school: school || "",
      schoolName: schoolName || "",
      city: city || "",
      country: country || "",
    },
  });

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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 text-left max-w-sm mx-auto"
        >
          <FormField
            control={form.control}
            name="role"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Select Role <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectOptions?.roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="school"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  School/University <span className="text-red-500">*</span>
                </FormLabel>
                <Combobox
                  value={form.watch("schoolName")}
                  onValueChange={(val) => {
                    const selectedSchool = selectOptions?.institutions?.find(
                      (s) => s.name === val,
                    );
                    if (selectedSchool) {
                      field.onChange(selectedSchool.id);
                      form.setValue("schoolName", selectedSchool.name);
                      setSchoolQuery(selectedSchool.name);
                    } else {
                      field.onChange(val || "");
                      form.setValue("schoolName", val || "");
                      setSchoolQuery(val || "");
                    }
                  }}
                  inputValue={schoolQuery}
                  onInputValueChange={setSchoolQuery}
                >
                  <ComboboxInput placeholder="Select or enter School" />
                  <ComboboxContent>
                    <ComboboxList>
                      {isLoading ? (
                        <div className="p-2 text-sm text-muted-foreground text-center">
                          Loading...
                        </div>
                      ) : filteredSchools.length > 0 ? (
                        filteredSchools.map((school) => (
                          <ComboboxItem key={school.id} value={school.name}>
                            {school.name}, {school.city}, {school.country}
                          </ComboboxItem>
                        ))
                      ) : (
                        <div className="p-2 text-sm text-muted-foreground text-center">
                          No schools found
                        </div>
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
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  City <span className="text-red-500">*</span>
                </FormLabel>
                <Combobox
                  value={field.value}
                  onValueChange={(val) => {
                    const value = val?.split(", ");
                    field.onChange(value?.[0]);
                    form.setValue("country", value?.[1]);
                  }}
                  inputValue={cityQuery}
                  onInputValueChange={setCityQuery}
                >
                  <ComboboxInput placeholder="Search city..." />
                  <ComboboxContent>
                    <ComboboxList>
                      {isLoading ? (
                        <div className="p-2 text-sm text-muted-foreground text-center">
                          Loading...
                        </div>
                      ) : filteredCities.length > 0 ? (
                        filteredCities.map((c) => (
                          <ComboboxItem
                            key={`${c.city}-${c.country}`}
                            value={`${c.city}, ${c.country}`}
                          >
                            {c.city}, {c.country}
                          </ComboboxItem>
                        ))
                      ) : cityQuery.length > 0 ? (
                        <div className="p-2 text-sm text-muted-foreground text-center">
                          No cities found
                        </div>
                      ) : (
                        <div className="p-2 text-sm text-muted-foreground text-center">
                          Type to search...
                        </div>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
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
