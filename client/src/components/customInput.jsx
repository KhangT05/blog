import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
const CustomInput = ({
    label,
    name,
    type = "text",
    className = '',
    required = false,
    ...restProps
}) => {
    const { register, formState: { errors } } = useFormContext();
    const error = errors[name];
    return (
        <div className={className}>
            <Label htmlFor={name}>
                {label}
                {
                    required && <span className="text-sm text-red-600">*</span>
                }
            </Label>
            <Input
                type={type}
                id={name}
                {...register(name)}
                {...restProps}
            />
            {
                error && (
                    <p className="text-sm text-red-600">
                        {error.message}
                    </p>
                )
            }
        </div >
    )
}
export default CustomInput