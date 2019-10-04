import React from 'react'
import {Button, Spinner} from 'react-bootstrap'
import {HeadingTwo} from '../atomic-components/text'

const StatefulButton = (props) => {
    return(
        props.status==='default' || props.status==false
        ? 
            <Button variant="color-primary-one" type="submit">
                {props.label}
            </Button>
        :
        props.status==='upload' || props.status==true
        ?
            <Button variant="color-primary-one" disabled>
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                {props.inProgressLabel ? props.inProgressLabel : 'Submitting'}
            </Button>
        :
        props.status==='error'
        ?
            <HeadingTwo text={props.errorMessage}/>
        :
        props.status==='success'
        ?
            <HeadingTwo text={props.successMessage}/>
        :
            <div> Form is in unknown state </div>
    )
}

export default StatefulButton;