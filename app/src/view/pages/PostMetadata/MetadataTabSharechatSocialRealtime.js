import React, { useState, useEffect } from 'react';
import { Box, Heading, Text } from 'grommet';
import { RealTimeUserActivityFeed } from './components/RealTimeUserActivityFeed';
import { Molecules } from '@tattle-made/ui';
import * as socketioClient from 'socket.io-client';
const { EditableText, EditableRadioGroup, EditableEnum } = Molecules;

/**
 * @author
 * @function MetadatatabSharechatSocialRealtime
 **/

const viewers = [
    { id: 24, name: 'denny_admin' },
    { id: 45, name: 'vishal_kohli' },
    { id: 20, name: 'geeta' },
    { id: 20, name: 'neha_reader' },
];

const editors = [
    { id: 45, name: 'kruttika_author', key: 'emotion', value: 'Punjab' },
    { id: 98, name: 'neha', key: 'cta', value: 'yes' },
];

const payload = {
    emotion: {
        id: 7,
        type: 'text',
        label: 'How do you define emotions?',
        value: 'Joy',
        options: [
            'Joy',
            'Trust',
            'Fear',
            'Surprise',
            'Sadness',
            'Disgust',
            'Anger',
            'Anticipation',
        ],
    },
    cta: {
        value: 'Yes',
        options: ['Yes', 'No'],
        label: 'Does it contain a call to action ?',
    },
    factual_claim: {
        value: 'Yes',
        options: ['Yes', 'No'],
        label: 'Does it contain factual claims ?',
    },
    verifiable: {
        value: 'Yes',
        options: ['Yes', 'No'],
        label: 'Does the content come from a source that is verifiable ?',
    },
    place: {
        value: 'Yes',
        options: ['Yes', 'No'],
        label: 'Does it refer to a place ?',
    },
    citizen_journalism: {
        value: 'Yes',
        options: ['Yes', 'No'],
        label: 'Is this this possible citizen journalism ?',
    },
    fact_checked: {
        value: 'Yes',
        options: ['Yes', 'No'],
        label:
            'Does this derive from misinformation that has been fact checked ?',
    },
};

const NCJ = {
    value: 'Yes',
    options: ['Yes', 'No'],
    label: 'Is this this possible citizen journalism ?',
};
const NE = {
    id: 7,
    type: 'text',
    label: 'How do you define emotions?',
    value: 'Joy',
    options: [
        'Joy',
        'Trust',
        'Fear',
        'Surprise',
        'Sadness',
        'Disgust',
        'Anger',
        'Anticipation',
    ],
};
const NCTA = {
    value: 'Yes',
    options: ['Yes', 'No'],
    label: 'Does it contain a call to action ?',
};
const NFC = {
    value: 'Yes',
    options: ['Yes', 'No'],
    label: 'Does it contain factual claims ?',
};
const NV = {
    value: 'Yes',
    options: ['Yes', 'No'],
    label: 'Does the content come from a source that is verifiable ?',
};
const NP = {
    value: 'Yes',
    options: ['Yes', 'No'],
    label: 'Does it refer to a place ?',
};

function getClientConnnectedToRealTimeAnnotationRoom(serverUrl, roomName) {
    return socketioClient.connect(
        `${serverUrl}/annotation?room_name=${roomName}`,
        {
            reconnectionDelay: 0,
            forceNew: true,
            transports: ['websocket'],
        },
    );
}

const MetadatatabSharechatSocialRealtime = () => {
    const [fetching, setFetching] = useState(false);
    const [emotion, setEmotion] = useState(payload.emotion);
    const [client, setClient] = useState({});
    const [cta, setCta] = useState(payload.cta);
    const [factualClaim, setFactualClaim] = useState(payload.factual_claim);
    const [verifiable, setVerifiable] = useState(payload.verifiable);
    const [place, setPlace] = useState(payload.place);
    const [citizenJournalism, setCitizenJournalism] = useState(
        payload.citizen_journalism,
    );
    const [factChecked, setFactChecked] = useState(payload.fact_checked);

    useEffect(() => {
        console.log('connecting to socket');
        const socketClient = getClientConnnectedToRealTimeAnnotationRoom(
            'http://localhost:3003',
            '115095:1',
        );

        socketClient.on('get_metadata', (data) => {
            console.log('metadata received', data);

            NCJ.value = data.citizen_journalism ? 'Yes' : 'No';
            NCTA.value = data.cta ? 'Yes' : 'No';
            NFC.value = data.factual_claim ? 'Yes' : 'No';
            NV.value = data.verifiable ? 'Yes' : 'No';
            NP.value = data.place ? 'Yes' : 'No';
            NE.value = [
                data.emotion.substr(0, 1)[0].toUpperCase(),
                data.emotion.substr(1),
            ].join('');

            // console.log('---->', payload.emotion);
            // console.log('----*', NE);
            setCitizenJournalism(NCJ);
            setEmotion(NE);
            setFactualClaim(NFC);
            setCta(NCTA);
            setVerifiable(NV);
            setPlace(NP);
        });
        socketClient.on('join_room', (data) => {
            console.log('room joined', data);
            socketClient.emit('get_metadata', { roomId: '1150195:1' });
        });
        socketClient.on('connect', () => {
            console.log('client connected');
            socketClient.emit('join_room', { roomId: '1150195:1' });
        });

        setClient(socketClient);
        setFetching(true);
    }, []);

    const updateFactualClaim = (data) => {
        setFactualClaim(data);
        client.emit('stop_edit_metadata', {
            key: 'factual_claim',
            value: data.value === 'Yes' ? true : false,
            roomId: '115095:1',
        });
    };

    return (
        <Box flex>
            <Heading> Sharechat Social Realtime Metadata Fields </Heading>
            <RealTimeUserActivityFeed
                viewers={viewers}
                editors={editors}
                connectionStatus="connected"
            />
            <Box direction={'row'} wrap={true} margin={{ top: 'medium' }}>
                <EditableEnum data={emotion} updateCallback={setEmotion} />
                <EditableRadioGroup
                    data={factualClaim}
                    isEditable={true}
                    updateCallback={updateFactualClaim}
                />
                <EditableRadioGroup
                    data={verifiable}
                    isEditable={true}
                    updateCallback={setVerifiable}
                />
                <EditableRadioGroup
                    data={place}
                    isEditable={true}
                    updateCallback={setPlace}
                />
                <EditableRadioGroup
                    data={citizenJournalism}
                    isEditable={true}
                    updateCallback={setCitizenJournalism}
                />
                <EditableRadioGroup
                    data={cta}
                    isEditable={true}
                    updateCallback={setCta}
                />
                <EditableRadioGroup
                    data={factChecked}
                    isEditable={true}
                    updateCallback={setFactChecked}
                />
            </Box>
        </Box>
    );
};

export default MetadatatabSharechatSocialRealtime;
