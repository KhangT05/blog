import { NavLink } from 'react-router-dom';
// SHADCN
import {
    Card,
    CardAction,
    CardContent,
    CardDescription
} from '@/components/ui/card'
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent
} from '@/components/ui/collapsible'
// ICONS
import { LuAlignCenter } from "react-icons/lu";
import { RxDotFilled } from "react-icons/rx"
import { index } from './settings';
import './sidebar.css'
const Sidebar = () => {
    return (
        <div className='nav-header'>
            <Card className="">
                <LuAlignCenter />
                <ul>
                    <li>a</li>
                    <li>b</li>
                    <li>c</li>
                </ul>
            </Card>
            <ul className='nav-header__content'>
                {
                    index.map((item, idx) => (
                        <li key={idx}>
                            <Collapsible>
                                <CollapsibleTrigger className="nav-content__trigger">
                                    {item.title}
                                </CollapsibleTrigger>
                                <ul>
                                    {item.children.map((sub, subIdx) => (
                                        <li key={subIdx}>
                                            <CollapsibleContent>
                                                <NavLink to={sub.path} className="nav-content__coll">
                                                    <RxDotFilled />{sub.title}
                                                </NavLink>
                                            </CollapsibleContent>
                                        </li>
                                    ))}
                                </ul>
                            </Collapsible>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Sidebar