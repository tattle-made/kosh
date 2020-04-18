import React, { useState, useEffect } from 'react'
import { Box, Text, Button} from 'grommet'
import { useDispatch, useSelector} from 'react-redux';
import MoleculeSearchFilterOptions from '../molecules/MoleculeSearchFilterOptions';
import {Atoms, Molecules} from '@tattle-made/ui'
import { Duplicate } from '../../redux/actions/section-search';
import {
    findSimilarFactCheckedStories
} from '../../redux/actions/section-search-fact-checked-stories';
import { findMatchingText } from '../../redux/actions/section-search-text-search';
import { findSemanticallySimilarPosts } from '../../redux/actions/section-search-semantic-search';

import {reset as resetSectionSearchDuplication} from '../../redux/actions/section-search-duplicate'
import {reset as resetSectionSearchFCStory} from '../../redux/actions/section-search-fact-checked-stories'
import {reset as resetSectionSearchSemanticSearch} from '../../redux/actions/section-search-semantic-search'
import {reset as resetSectionSearchTextSearch} from '../../redux/actions/section-search-text-search'
import { ARCHIVE_SERVER_PATH } from '../../config';

const {ExternalLink, MultiModalInput} = Atoms;
const {MultipleLinks} = ExternalLink;
const {MoleculeSinglePost, MoleculeMultiplePosts} = Molecules;
const { findDuplicateImages } = Duplicate

const S3_AUTH_ENDPOINT = `${ARCHIVE_SERVER_PATH}/api/s3-auth`

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

   const [, setFetching] = useState(false)
   const [, setOptions] = useState(defaultOptions)
   
   // const [] = useState({status : 'default'})

   const dispatch = useDispatch();

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
                     url: S3_AUTH_ENDPOINT,
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