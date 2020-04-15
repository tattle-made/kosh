import React, {useState} from 'react'
import {Box, Text, Button, CheckBox, Collapsible, RangeInput} from 'grommet'

const SearchFilter = ({onSave, init}) => {
    const APPROXIMATE_THRESHOLD = 40;

    const[collapse, setCollapse]=useState(false)
    const[duplicate, setDuplicate]=useState(true);
    const[approximate, setApproximate]=useState(true);
    const [approximateThreshold, setApproximateThreshold] = React.useState(APPROXIMATE_THRESHOLD);
    const[similar, setSimilar]=useState(true);
    const[stories, setStories]=useState(true);

    return(
        <Box 
            gap="medium" 
            width={'medium'}
        >
            <Button onClick={() => setCollapse(!collapse)} >
                <Text size={'small'}> settings </Text>
            </Button>
            <Collapsible open={collapse}>
                <Box gap={'medium'}>
                <CheckBox
                    checked={duplicate}
                    label="Duplicate Posts"
                    onChange={(event) => setDuplicate(event.target.checked)}/>
                <Box direction={'row'} align={'center'} gap={'small'}>
                    <CheckBox
                        checked={approximate}
                        label="Approximate Matches"
                        onChange={(event) => setApproximate(event.target.checked)}/>
                    <Text size="'small"> {approximateThreshold} </Text>
                    <RangeInput onChange={(e) => setApproximateThreshold(e.target.value)} value={approximateThreshold} />
                </Box>
                <CheckBox
                    checked={similar}
                    label="Semantically Similar Posts"
                    onChange={(event) => setSimilar(event.target.checked)}/>
                <CheckBox
                    checked={stories}
                    label="External Stories"
                    onChange={(event) => setStories(event.target.checked)}/>

                <Button 
                    width={'small'} 
                    label={'save'} 
                    onClick={ ()=> {
                        setCollapse(!collapse)
                        onSave({duplicate, approximate, similar, stories})
                    }}
                />
                </Box>
            </Collapsible>
        </Box>
    )
}

export default SearchFilter;