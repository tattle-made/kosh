import React from 'react'
import { Container } from 'react-bootstrap';
import { SectionQueue } from '../sections/SectionQueueManager';


/**
* @author
* @function Queue
**/

const Queue = () => {
    return (
        <Container>
            <SectionQueue basePath={'ui/test'}/>
        </Container>
    )
}

export default Queue