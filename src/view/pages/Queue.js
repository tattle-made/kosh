import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import App from '../sections/SectionQueueManager/App';

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
            <App basePath={'ui'}/>
        </Container>
    )
}

export default Queue