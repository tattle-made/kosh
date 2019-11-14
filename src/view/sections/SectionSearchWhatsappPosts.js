import React, { useState, useEffect } from 'react'
import { Grid,    Box, Heading,  Text, Button} from 'grommet'
import { Search } from 'react-feather';

import { useDispatch, useSelector} from 'react-redux';

import {post} from '../../service/shell-server'

import MoleculeSearchFilterOptions from '../molecules/MoleculeSearchFilterOptions';
import MoleculeSemanticallySimilarPost from '../molecules/MoleculeSemanticallySimilarPost';

import {Atoms, Molecules} from '@tattle-made/ui'
import MoleculeDuplicatePost from '../molecules/MoleculeDuplicatePost';

import * as Axios from 'axios';
import {
    setAppStatusLoading,
    setAppStatusMessage,
    setAppStatusError,
    resetAppStatus
} from '../../redux/actions/section-status';
import { Duplicate, FactCheckedStories } from '../../redux/actions/section-search';
import {
    findSimilarFactCheckedStories
} from '../../redux/actions/section-search-fact-checked-stories';
import sectionSearchTextSearch from '../../redux/reducers/section-search-text-search';
import { findMatchingText } from '../../redux/actions/section-search-text-search';
import { findSemanticallySimilarPosts } from '../../redux/actions/section-search-semantic-search';

import {reset as resetSectionSearchDuplication} from '../../redux/actions/section-search-duplicate'
import {reset as resetSectionSearchFCStory} from '../../redux/actions/section-search-fact-checked-stories'
import {reset as resetSectionSearchSemanticSearch} from '../../redux/actions/section-search-semantic-search'
import {reset as resetSectionSearchTextSearch} from '../../redux/actions/section-search-text-search'


const {ExternalLink, MediaBlock, MultiModalInput} = Atoms;
const {MultipleLinks} = ExternalLink;
const {MultipleWithClickMoreButton, SinglePost} = MediaBlock;
const {MoleculeSearchInputForm, MoleculeSinglePost, MoleculeMultiplePosts} = Molecules;

const { findDuplicateImages } = Duplicate

const alsoSeenOnData = {
   loading : false, // true or false,
   // error : 'Could not connect to service.',
	items : [
		{
			title: 'Alt News',
			url : 'https://www.altnews.in/authors-wikipedia-page-vandalised-after-times-critical-cover-story-on-pm-modi/',
			timestamp: "10th May 2019"
		},
		{
			title: 'Boom Live',
			url : 'https://www.boomlive.in/amidst-shutdown-rumours-lakshmi-vilas-bank-files-police-complaint/',
			timestamp: "9th May 2019"
		},
		{
			title: 'Facebook',
			url : 'https://www.altnews.in/authors-wikipedia-page-vandalised-after-times-critical-cover-story-on-pm-modi/',
			timestamp: "8th May 2019"
		}
	]
}

const SemanticallySimilarData = {
   status: 'data  ',
   data :[
      {
          "id": 258,
          "type": "image",
          "data": "",
          "filename": "944d7240-e626-11e9-8887-479c55adcf91",
          "indexed_for_search": false,
          "createdAt": "2019-10-03T21:41:50.000Z",
          "updatedAt": "2019-10-03T21:41:50.000Z",
          "userId": 159,
          "user": {
              "username": "service-text-extract",
              "mediaSource": {
                  "serviceName": "aws",
                  "dirName": "tattle-services"
              }
          },
          "mediaUrl": "https://tattle-services.s3.ap-south-1.amazonaws.com/944d7240-e626-11e9-8887-479c55adcf91"
      },
      {
          "id": 260,
          "type": "image",
          "data": "",
          "filename": "e8d4bd70-e64c-11e9-9181-6390a1c38207",
          "indexed_for_search": false,
          "createdAt": "2019-10-04T02:16:12.000Z",
          "updatedAt": "2019-10-04T02:16:12.000Z",
          "userId": 159,
          "user": {
              "username": "service-text-extract",
              "mediaSource": {
                  "serviceName": "aws",
                  "dirName": "tattle-services"
              }
          },
          "mediaUrl": "https://tattle-services.s3.ap-south-1.amazonaws.com/e8d4bd70-e64c-11e9-9181-6390a1c38207"
      }
  ]
};

const sectionDataDefault={
   status: 'default',
}

const multipleMediaBlockDefaultData = {
   status:'default'
}

const moleculeUrlDefaultData = {
   status: 'default',
}

/**
* @author denny
* @function SectionSearchWhatsappPosts
**/
const SectionSearchWhatsappPosts = () => {
   const defaultOptions = {
      duplicate: true,
      approximate: true,
      similar: true,
      stories: true
   }

   const [fetching, setFetching] = useState(false)
   const [options, setOptions] = useState(defaultOptions)
   
   const [semanticallySimilarResult, setSemanticallySimilarResult] = useState({status : 'default'})

   const dispatch = useDispatch();

   const test = useSelector( state => state.loginUser.username);
   const sectionSearchDuplicate = useSelector( state => state.sectionSearchDuplicate)
   const factCheckedStoriesData = useSelector( state => state.sectionSearchFactCheckedStories)
   const sectionSearchTextSearch = useSelector( state => state.sectionSearchTextSearch)
   const sectionSearchSemanticSearch = useSelector( state => state.sectionSearchSemanticSearch)

   useEffect(()=> {
      setFetching(true)
   })

   useEffect(() => {
      
   })

   const onSubmit = ((payload) => {
      console.log('searched : ', payload);

      if(payload.mode==='file' || payload.mode==='url'){
         dispatch(findDuplicateImages(payload));
         dispatch(findSimilarFactCheckedStories(payload))
      }else if(payload.mode==='tag'){
         dispatch(findSemanticallySimilarPosts(payload))
      }else if(payload.mode==='text'){
         dispatch(findMatchingText(payload))
      }
      

      // dispatch( setAppStatusError('Trying to connect to network') )
   })

 return (
     <Box
        direction={'column'}
        gap={'medium'}
     >

         {/* <Heading level={3}>{test} </Heading> */}

         <MultiModalInput 
            onSubmit={onSubmit}
            s3AuthConf={
                  {
                     url: 'http://13.235.149.236:3003/api/s3-auth',
                     token: localStorage.getItem('token')
                  }
            }
         />

         <MoleculeSearchFilterOptions
            onSave={(options) => setOptions(options)}/>

         <Button
            onClick={() => {
               dispatch(resetSectionSearchDuplication())
               dispatch(resetSectionSearchFCStory())
               dispatch(resetSectionSearchSemanticSearch())
               dispatch(resetSectionSearchTextSearch())
            }}
         >
            <Text size={'xsmall'}> reset </Text>
         </Button>


         <MoleculeSinglePost
            visible={true}
            title={'Duplicate Posts'}
            data={sectionSearchDuplicate}
         />

         <MultipleLinks
            title={'Also seen on'}
            data={ factCheckedStoriesData }
         />

         <MoleculeMultiplePosts
            title={'Text matches'}
            data={ sectionSearchTextSearch}
        />

         <MoleculeMultiplePosts
            title={'Semantically Similar Matches'}
            data={ sectionSearchSemanticSearch }
        />


         {/* <MultipleLinks
            visible={options.stories}
            title={"Also Seen on"}
            loading={alsoSeenOnData.loading}
            links={alsoSeenOnData.items}
            error={alsoSeenOnData.error}
         />

         <MoleculeDuplicatePost
            visible={options.duplicate}
            title={'Duplicate'}
            data={duplicateResult}/>

         <MultipleWithClickMoreButton
            visible={options.approximate}
            label={'Approximate Matches'}
         />

         <MoleculeSemanticallySimilarPost
            visible={true}
            label={'Semantically Similar Matches'}
            data={SemanticallySimilarData}
         /> */}

   </Box>
)
}

export default SectionSearchWhatsappPosts