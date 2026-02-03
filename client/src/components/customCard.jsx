import { Loader2 } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card"
const CustomCard = ({
    title,
    openHeader,
    openFooter,
    desc,
    loading = false,
    children,
    className = "",
    footerDesc
}) => {
    return (
        <Card>
            {
                openHeader && (
                    <CardHeader className="border-b">
                        <CardTitle> {title} </CardTitle>
                        <CardDescription> {desc} </CardDescription>
                    </CardHeader>
                )
            }
            <CardContent className={`${className}`}>
                {children}
            </CardContent>
            {
                openFooter && (
                    <CardFooter className="flex justify-center">
                        {footerDesc}
                    </CardFooter>
                )
            }
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-block/40 z-10">
                    <div className="size-8 animate-spin text-muted-foreground"> <Loader2 /> </div>
                </div>
            )}
        </Card>
    )
}
export default CustomCard
