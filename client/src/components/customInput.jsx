import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
const CustomInput = ({
    label,
    name,
    type = "text",
    className = '',
    autoComplete = "",
    placeholder = "",
    ...restProps
}) => {
    const { register, formState: { errors } } = useFormContext();
    const error = errors[name];
    return (
        <>
            {restProps.required}
            <div className={`space-y-2${className}`}>
                <Label htmlFor={name} className="text-sm font-medium text-gray-700">
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
                    className={`${error ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
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