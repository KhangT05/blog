import React from 'react';
import { NavLink } from 'react-router-dom';
import { index } from '@/contanst/nav';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react';
const NavbarLeft = () => {
  return (
    <div className='flex h-full items-center'>
      <ul className='flex gap-2 p-0 m-0 list-none'>
        {
          index.map((item, idx) => (
            <li key={idx} className='mr-2'>
              {
                item.children ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1.25 cursor-pointer mr-2">
                      {item.title}
                      <ChevronDown />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={''}> {
                      item.children.map((sub, subIdx) => (
                        <React.Fragment key={subIdx}>
                          {subIdx !== 0 && <DropdownMenuSeparator />}
                          <DropdownMenuItem asChild>
                            <NavLink to={sub.path}
                              className={'block w-full px-2 py-3 cursor-pointer font-medium !border-0 !rounded-none hover:bg-[#dee4e9] hover:text-[#476075]'}>
                              {sub.title}
                            </NavLink>
                          </DropdownMenuItem>
                        </React.Fragment>
                      ))
                    }
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <NavLink to={item.path}>{item.title}</NavLink>
                )
              }
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default NavbarLeft;  