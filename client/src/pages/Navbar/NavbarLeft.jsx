import React from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';
import { index } from './settings/index';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { FaChevronCircleDown } from 'react-icons/fa'
const NavbarLeft = () => {
  return (
    <ul className='navbar-left'>
      {
        index.map(item => (
          <li key={item.title} className='menu-item'>
            {
              item.children ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    {item.title}
                    <FaChevronCircleDown />
                    <DropdownMenuContent className={'dropdown-menu__content'}>                      {
                      item.children.map((sub, idx) => (
                        <React.Fragment key={sub.title}>
                          {idx !== 0 && <DropdownMenuSeparator />}
                          <DropdownMenuItem asChild>
                            <NavLink to={sub.path} className={'dropdown-item'}>
                              <span>{sub.title}</span>
                            </NavLink>
                          </DropdownMenuItem>
                        </React.Fragment>
                      ))
                    }
                    </DropdownMenuContent>
                  </DropdownMenuTrigger>
                </DropdownMenu>
              ) : (
                <NavLink to={item.path}><span>{item.title}</span></NavLink>
              )
            }
          </li>
        ))
      }
    </ul>
  )
}

export default NavbarLeft;
