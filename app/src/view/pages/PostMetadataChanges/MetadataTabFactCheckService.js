import React, { useState, useEffect } from 'react'
import { Box, Heading, Tab, Tabs, Button } from 'grommet'
import {Atoms, Molecules} from '@tattle-made/ui'
const {EditableText, EditableEnum, EditableDate, EditableDateRange, EditableNumber, EditableLocationCoord} = Molecules

var textData = {'id':1, 'type':'text', 'label':'Text', 'value':'Lorem ipsum.', 'author':100};

/**
* @author denny
* @function MetadataTabFactCheckService
**/

const MetadataTabFactCheckService = () => {
    const [fetching, setFetching] = useState(false)
    const [currentData, setCurrentData] = useState(textData)

    useEffect(()=> {
        setFetching(true)
    })

    return (
        <Box margin={{top:'small'}}>
            <Heading level={2}> Fact Check Service Fields </Heading>
        </Box>
    )
}

export default MetadataTabFactCheckService