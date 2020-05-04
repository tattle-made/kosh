import React, { useState, Item } from 'react';
import { Breadcrumb, Row, Col, Image, Table, Button, Form } from 'react-bootstrap';
import { Box, Heading, Tab, Tabs } from 'grommet';

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

var array = [];
var items = [
    'denny_admin changed location from Punjab to Maharashtra',

];

for(let i = 0; i < items.length; i++) {
    array.push(
    <Item key={i} item={items[i]} />
    );
}

const PostMetadataChanges = () => {
    // const [currentData, setCurrentData] = useState(dataObj)
    return (
        <Box direction={'column'} margin={'small'}>
            <Breadcrumb>
                <Breadcrumb.Item href="/posts"> Posts </Breadcrumb.Item>
                <Breadcrumb.Item href="/post/1"> 1 </Breadcrumb.Item>
                <Breadcrumb.Item href="/posts/1/metadata">Metadata</Breadcrumb.Item>
                <Breadcrumb.Item href="/posts/1/metadata/changes" active>Changes</Breadcrumb.Item>
            </Breadcrumb>
            <Form.Control as="select" className="w-50" custom>
                <option>Template</option>
                <option>Tattle</option>
                <option>Factcheck</option>
                <option>MSR</option>
            </Form.Control>
            <div>

            </div>
        </Box>
    );
};

export default PostMetadataChanges;
