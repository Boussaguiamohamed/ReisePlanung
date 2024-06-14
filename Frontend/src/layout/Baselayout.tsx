import { AddIcon, HamburgerIcon, InfoIcon, ReactIcon, Search2Icon, SearchIcon } from '@chakra-ui/icons';
import {Box, Flex, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList} from '@chakra-ui/react'
import React from 'react'

export type BaseLayoutProps = {
    children: React.ReactNode;
}

export const BaseLayout = ({children}:BaseLayoutProps)  => {
    return (
        <Flex 
        height="100%" 
        width={"100%"} 
        bg={"blue.200"}
        flexDirection={"column"}
        >
            
        <Box h={50} bg={"blue.400"}>
        <Menu>
            <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
            size='lg'
            color={"white"}
            />
            <MenuList>
                <MenuItem as='a' href='/' icon={<ReactIcon color={'blue.500'} />} >Home</MenuItem> 
                <MenuDivider />
                <MenuItem as='a' href='/details' icon={<InfoIcon color={'blue.500'} />} >Reisen Ansicht</MenuItem>
                <MenuItem as='a' href='/reisesuchen' icon={<InfoIcon color={'blue.500'}  /> } >Reiseziel Ansicht</MenuItem>
                <MenuDivider />
                <MenuItem as='a' href='/addreiseziel' icon={<AddIcon color={'blue.500'} />} >Reiseziele zu Reisen hinzufügen und entfernen</MenuItem>
                <MenuDivider />
                <MenuItem as='a' href='/reise' icon={<Search2Icon color={'blue.500'} />} >Reise suchen</MenuItem>
                <MenuItem as='a' href='/reiseziel'icon={<Search2Icon color={'blue.500'}  /> } >Reisen von Reiseziel suchen</MenuItem>
                <MenuDivider />
                <MenuItem as='a' href='/countries' icon={<SearchIcon color={'blue.500'} />} >Countries infos</MenuItem>
                </MenuList>
                
        </Menu>
        </Box>
            <Box p={4} flex={1}>
            <Box h={'100%'}>
                {children}
                </Box>
            </Box>  
        </Flex>
    )
};
