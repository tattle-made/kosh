import React, { useState, useEffect } from 'react';
import { Box, Heading, Text } from 'grommet';
import { RealTimeUserActivityFeed } from './components/RealTimeUserActivityFeed';
import { Molecules } from '@tattle-made/ui';
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

const MetadatatabSharechatSocialRealtime = () => {
    const [fetching, setFetching] = useState(false);
    const [emotion, setEmotion] = useState(payload.emotion);
    const [cta, setCta] = useState(payload.cta);
    const [factualClaim, setFactualClaim] = useState(payload.factual_claim);
    const [verifiable, setVerifiable] = useState(payload.verifiable);
    const [place, setPlace] = useState(payload.place);
    const [citizenJournalism, setCitizenJournalism] = useState(
        payload.citizen_journalism,
    );
    const [factChecked, setFactChecked] = useState(payload.fact_checked);

    useEffect(() => {
        setFetching(true);
    });

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
                    updateCallback={setFactualClaim}
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
