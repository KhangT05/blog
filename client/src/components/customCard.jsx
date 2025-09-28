import { Loader } from "lucide-react"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card"
const CustomCard = ({
    title,
    openHeader = false,
    openFooter = false,
    desc,
    loading = false,
    children,
    className = "",
    footerDesc
}) => {
    return (
        <Card className="relative">
            {
                openHeader && (
                    <CardHeader className="border-b">
                        <CardTitle> {title} </CardTitle>
                        <CardDescription> {desc} </CardDescription>
                    </CardHeader>
                )
            }
            <CardContent className={`${className} p-6`}>
                {children}
            </CardContent>
            {
                openFooter && (
                    <CardFooter>
                        {footerDesc}
                    </CardFooter>
                )
            }
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-block/40 z-10">
                    <div className="size-8 animate-spin text-muted-foreground"> <Loader /> </div>
                </div>
            )}
        </Card>
    )
}
export default CustomCard
