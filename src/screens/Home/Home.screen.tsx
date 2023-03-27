import React from 'react'

import { Sidebar } from '../../components'
import { Travels } from './Travels.screen'

interface Props {}

export const HomeScreen:React.FC<Props> = (props:Props) => {
    return(
    <>
    <Sidebar>
        <h1>Fast Tour</h1>
    </Sidebar>
    <Travels />
    </>
    )
}