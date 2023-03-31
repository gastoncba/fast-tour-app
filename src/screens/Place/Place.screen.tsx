import React from 'react'

import { Paragraph } from '../../components'

interface Props {}

export const PlaceScreen:React.FC<Props> = () => {
    return(
        <Paragraph text='Top de lugares' type='title' levelTitle={1}/>
    )
}