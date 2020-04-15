import React from 'react'
import useScrolled from './hooks/useScrolled'
import { Box, Image, Heading } from 'grommet'

export default function Header() {
  const scrolled = useScrolled()

  return (
    <nav
      id="header"
      style={{ boxShadow: scrolled ? '0 3px 3px rgba(0,0,0,0.1)' : 'none' }}
    >
      <Box direction={'row'} gap={'small'} pad={'small'}>
        <Box height={'3em'} width={'auto'} overflow={'hidden'}>
          <Image
            fit={'contain'}
            src="http://shell.tattle.co.in/static/media/tattle_monogram_dark.aeb40e2a.png"
          />
        </Box>

        <Heading level={4}> Tattle Queue Manager</Heading>
      </Box>
    </nav>
  )
}
