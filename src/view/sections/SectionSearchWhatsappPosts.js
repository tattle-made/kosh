import React, { useState, useEffect } from 'react'
import {Box, Heading} from 'grommet'
import { Search } from 'react-feather';

import { useDispatch, useSelector} from 'react-redux';

import {post} from '../../service/shell-server'

import MoleculeSearchFilterOptions from '../molecules/MoleculeSearchFilterOptions';
import MoleculeSemanticallySimilarPost from '../molecules/MoleculeSemanticallySimilarPost';

import {Atoms, Molecules} from '@tattle-made/ui'
import MoleculeDuplicatePost from '../molecules/MoleculeDuplicatePost';

import * as Axios from 'axios';

const {ExternalLink, MediaBlock, MultiModalInput} = Atoms;
const {MultipleLinks} = ExternalLink;
const {MultipleWithClickMoreButton, SinglePost} = MediaBlock;
const {MoleculeSearchInputForm} = Molecules;



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
   const [duplicateResult, setDuplicateResult] = useState({status: 'default'})
   const [semanticallySimilarResult, setSemanticallySimilarResult] = useState({status : 'default'})

   const test = useSelector( state => state.loginUser.username);

   useEffect(()=> {
      setFetching(true)
   })

   useEffect(() => {
      
   })

   const onSubmit = ((payload) => {
      console.log('searched : ', payload);
      if(payload.mode == 'url'){
         setDuplicateResult({status:'loading'})
         post(
            '/search/duplicate',
            {
               url: payload.data.query,
               threshold: 0.6
            },
            '822bc900-0051-11ea-9ede-87c6fdd1a116'
         )
         .then((data) => {
            console.log(' API RESPONSE FOR DUPLICATE ===='); 
            console.log(data);
            return data;
         })
         .then((data) => setDuplicateResult({...data, status:'data'}))
         .catch((err) => console.log(err));
      } else if(payload.mode == 'text'){
         setDuplicateResult({status:'loading'})
         post(
            '/search/tag',
            {
               tag: payload.data.query,
            },
            '822bc900-0051-11ea-9ede-87c6fdd1a116'
         )
         .then((data) => {
            console.log(' API RESPONSE FOR TAG ===='); 
            console.log(data);
            return data;
         })
         .then((data) => setSemanticallySimilarResult({...data, status:'data'}))
         .catch((err) => console.log(err));
      }
   })

 return (
     <Box
        direction={'column'}
        gap={'medium'}
     >

         {/* <Heading level={3}>{test} </Heading> */}

         <MultiModalInput onSubmit={onSubmit}/>
         
         <MoleculeSearchFilterOptions
            onSave={(options) => setOptions(options)}/>

         <MultipleLinks
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
         />

   </Box>
)
}

export default SectionSearchWhatsappPosts