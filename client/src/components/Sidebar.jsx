import { Link } from 'react-router-dom';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent
} from './ui/accordion'
import { index } from '../contanst';
import logoUrl from '@/assets/react.svg'
import { Dot } from 'lucide-react';
const Sidebar = () => {
    return (
        <div className='w-64 bg-white border-r shadow-sm flex flex-col sticky h-screen p-4'>
            <div className="p-4 border-b">
                <Link to="/admin/home" className="flex items-center justify-center">
                    <img
                        src="/vite.svg"
                        alt="Logo"
                        className="h-10 w-auto"
                    />
                </Link>
            </div>
            <div className="">
                <Accordion
                    type="single"
                    collapsible
                    className="w-full space-y-1"
                >
                    {
                        index.map((item, idx) => (
                            <AccordionItem key={idx} value={`item-${idx}`}
                                className="border-none">
                                {item.children ?
                                    (
                                        <>
                                            <AccordionTrigger className="hover:no-underline hover:bg-gray-100 rounded-lg px-3 py-2.5">
                                                <div className='flex items-center gap-3'>
                                                    <span className="w-5 h-5">{item.icons}</span>
                                                    <span className="text-sm font-medium">{item.label}</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-2">
                                                <ul className="ml-4 space-y-1">
                                                    {
                                                        item.children.map((sub, subIdx) => (
                                                            <li key={subIdx}
                                                                className='flex p-1 text-sm rounded-md hover:bg-blue-50 hover:text-blue-600'
                                                            >
                                                                <Dot />
                                                                <Link to={sub.path}
                                                                    className="">
                                                                    {sub.title}
                                                                </Link>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </AccordionContent>
                                        </>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors w-full"
                                        >
                                            <span className="w-5 h-5">{item.icons}</span>
                                            <span className="text-sm font-medium">{item.label}</span>
                                        </Link>
                                    )}
                            </AccordionItem>
                        ))}
                </Accordion>
            </div>
        </div >
    )
}
export default Sidebar