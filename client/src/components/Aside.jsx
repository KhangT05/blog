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
const Aside = () => {
    return (
        <aside className='w-55 h-screen fixed top-0 left-0'>
            <div
                className='w-55 border border-gray-200 
                border-solid flex justify-center items-center h-16 shadow-sm'>
                <img src={logoUrl} alt="Logo" className='text-center' />
            </div>
            <div className="">
                <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                >
                    {
                        index.map((item, idx) => (
                            <AccordionItem key={idx} value={`item-${idx}`}
                                className="border">
                                <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                                    <div className='flex items-center gap-1'>
                                        {item.icons}
                                        {item.label}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ul>
                                        {item.children.map((sub, subIdx) => (
                                            <li key={subIdx}
                                                className='flex p-1 text-sm rounded-md hover:bg-blue-50 hover:text-blue-600'
                                            >
                                                <Dot />
                                                <Link to={sub.path}
                                                    className="">
                                                    {sub.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </div>
        </aside >
    )
}

export default Aside