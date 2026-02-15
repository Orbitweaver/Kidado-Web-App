
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface TagSelectorProps {
    options: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
    className?: string;
}

export function TagSelector({ options, selected, onChange, className }: TagSelectorProps) {
    const toggleTag = (tag: string) => {
        if (selected.includes(tag)) {
            onChange(selected.filter((t) => t !== tag));
        } else {
            onChange([...selected, tag]);
        }
    };

    return (
        <div className={cn("flex flex-wrap gap-2", className)}>
            {options.map((option) => {
                const isSelected = selected.includes(option);
                return (
                    <button
                        key={option}
                        type="button"
                        onClick={() => toggleTag(option)}
                        className={cn(
                            "inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                            isSelected
                                ? "border-transparent bg-primary/10 text-primary hover:bg-primary/20"
                                : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
                        )}
                    >
                        {isSelected && <span className="mr-1 text-primary">•</span>}
                        {option}
                        {isSelected && (
                            <X className="ml-1 h-3 w-3 text-primary/70 hover:text-primary" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
