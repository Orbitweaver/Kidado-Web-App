
import * as React from "react";
import { cn } from "@/lib/utils";
import { Briefcase } from "lucide-react";

interface FileUploadProps {
    value: string | null;
    onChange: (file: File | null) => void;
    className?: string;
}

export function FileUpload({ value, onChange, className }: FileUploadProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [preview, setPreview] = React.useState<string | null>(value);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            onChange(file);
        }
    };

    return (
        <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
            <div
                onClick={() => inputRef.current?.click()}
                className="relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-full bg-primary/10 border-2 border-dashed border-primary/20 hover:bg-primary/20 transition-colors overflow-hidden"
            >
                {preview ? (
                    <img src={preview} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                    <Briefcase className="h-10 w-10 text-primary" />
                )}
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
            <p className="text-sm text-muted-foreground">Click to upload image</p>
        </div>
    );
}
