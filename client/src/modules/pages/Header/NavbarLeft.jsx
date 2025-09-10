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
    <div className='navbar-left'>
      <ul className='navbar-menu'>
        {
          index.map(item => (
            <li key={item.title} className='menu-item'>
              {
                item.children ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="dropdown-menu">
                      {item.title}
                      <FaChevronCircleDown />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={'dropdown-menu__content'}> {
                      item.children.map((sub, idx) => (
                        <React.Fragment key={sub.title}>
                          {idx !== 0 && <DropdownMenuSeparator />}
                          <DropdownMenuItem asChild>
                            <NavLink to={sub.path} className={'dropdown-item'}>
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