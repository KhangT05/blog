import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
const CustomInput = ({
    label,
    name,
    type = "text",
    className = '',
    autoComplete = "",
    ...restProps
}) => {
    const { register, formState: { errors } } = useFormContext();
    const error = errors[name];
    return (
        <>
            {restProps.required}
            <div className={className}>
                <Label htmlFor={name}>
                    {label}
                    {
                        restProps.required && <span className="text-sm text-red-600">*</span>
                    }
                </Label>
                <Input
                    type={type}
                    id={name}
                    autoComplete={autoComplete}
                    {...register(name)}
                    {...(restProps.onChange ? { onChange: restProps.onChange } : {})}
                />
                {
                    error && (
                        <div className="error-line">
                            <span className="text-sm text-red-600">
                                {error.message}
                            </span>
                        </div>
                    )
                }
            </div >
        </>

    )
}
export default CustomInput