import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { SectionQueue } from '../sections/SectionQueueManager';


/**
* @author
* @function Queue
**/

const Queue = () => {
    const [fetching, setFetching] = useState(false)

    useEffect(()=> {
        setFetching(true)
    })

    return (
        <Container>
            <SectionQueue basePath={'ui/test'}/>
        </Container>
    )
}

export default Queue