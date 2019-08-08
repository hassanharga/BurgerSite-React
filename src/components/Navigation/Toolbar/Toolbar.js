import React from 'react';

import  './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = ( props ) => (
    <header className='Toolbar'>
        {/* <div>MENU</div> */}
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className='Logo'>
            <Logo />
        </div>
        <nav className='DesktopOnly'>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;