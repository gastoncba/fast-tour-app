import React from 'react'

import { Sidebar, Paragraph } from '../../components'
import { Travels } from './Travels.screen'

interface Props {}

export const HomeScreen:React.FC<Props> = (props:Props) => {
    return(
    <>
    <Sidebar>
        <Paragraph type='title' levelTitle={2} text='Fast Tour' style={{paddingLeft: '50px'}}/>
    </Sidebar>
    <Travels />
    </>
    )
}