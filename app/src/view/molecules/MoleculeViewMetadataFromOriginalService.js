import React, { useState, useEffect, useRef } from 'react';
import { Box, Drop, DataTable, Button, Heading, Text } from 'grommet';
import { Eye } from 'react-feather';
/**
 * @author
 * @function MoleculeViewMetadataFromOriginalService
 **/

const MoleculeViewMetadataFromOriginalService = ({ postId }) => {
    const [fetching, setFetching] = useState(false);
    const [showToolTip, setShowToolTip] = useState(false);
    const [data, setData] = useState([
        { name: 'Alan', value: 20 },
        { name: 'Bryan', value: 30 },
        { name: 'Chris', value: 40 },
        { name: 'Eric', value: 80 },
    ]);

    const iconRef = useRef();

    useEffect(() => {
        setFetching(true);
    });

    const onShowToolTip = () => {
        console.log('hi');
        setShowToolTip(true);
    };

    const onHideToolTip = () => {
        setShowToolTip(false);
    };

    return (
        <Box>
            <Button
                plain
                ref={iconRef}
                focusIndicator={false}
                icon={<Eye size={24} />}
                onClick={() => onShowToolTip()}
            />
            {showToolTip && (
                <Drop
                    target={iconRef.current}
                    align={{ top: 'bottom' }}
                    onClickOutside={onHideToolTip}
                    onEsc={onHideToolTip}
                    margin={{ top: 'small', right: 'small' }}
                >
                    <Box pad={'medium'} direction={'column'}>
                        <Heading level={3}> Source Metadata </Heading>

                        <DataTable
                            columns={[
                                {
                                    property: 'name',
                                    header: 'Name',
                                    primary: true,
                                },
                                {
                                    property: 'value',
                                    header: 'Value',
                                },
                            ]}
                            data={data}
                        />
                    </Box>
                </Drop>
            )}
        </Box>
    );
};

export default MoleculeViewMetadataFromOriginalService;
