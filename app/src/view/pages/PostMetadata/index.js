import React, { useState } from 'react';
import { Box, Heading, Tab, Tabs } from 'grommet';
import MetadataTabFactCheckService from './MetadataTabFactCheckService';
import MetadataTabTattle from './MetadataTabTattle';
import MetadataTabMSR from './MetadataTabMSR';

var textData = {
    id: 1,
    type: 'text',
    label: 'Text',
    value: 'Lorem ipsum.',
    author: 100,
};
var numberData = {
    id: 2,
    type: 'number',
    label: 'Number',
    value: 15,
    author: 101,
};
var dateData = {
    id: 3,
    type: 'date',
    label: 'Date',
    value: '2020-03-22',
    author: 102,
};
var locationTextData = {
    id: 4,
    type: 'location_text',
    label: 'Location Text',
    value: 'Punjab',
    author: 103,
};
var locationCoordData = {
    id: 5,
    type: 'location_lat_lon',
    label: 'Location Coordinates',
    value: [59.69512, 20.51566],
    author: 102,
};
var dateRangeData = {
    id: 6,
    type: 'dateRange',
    label: 'Date Range',
    value: ['2020-03-10T00:00:00.000Z', '2020-03-27T00:00:00.000Z'],
    author: 106,
};
var enumData = {
    id: 7,
    type: 'text',
    label: 'Selection',
    value: 'Photo',
    author: 109,
};

var dataObj = {
    textData: textData,
    numberData: numberData,
    dateData: dateData,
    locationTextData: locationTextData,
    locationCoordData: locationCoordData,
    dateRangeData: dateRangeData,
    enumData: enumData,
};

/**
 * @author
 * @function PostMetadata
 **/

const PostMetadata = () => {
    // const [currentData, setCurrentData] = useState(dataObj)
    return (
        <Box direction={'column'} margin={'small'}>
            <Heading level={1}> Metadata </Heading>
            <Tabs justify="start">
                <Tab title="Tattle" alignSelf="start">
                    <MetadataTabTattle />
                </Tab>
                <Tab title="Factcheck">
                    <MetadataTabFactCheckService />
                </Tab>
                <Tab title="MSR">
                    <MetadataTabMSR />
                </Tab>
            </Tabs>
        </Box>
    );
};

export default PostMetadata;
