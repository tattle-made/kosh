import React from 'react'
import Queue from './Queue'
import RedisStats from './RedisStats'
import Header from './Header'
import useStore from './hooks/useStore'
import { Grommet, Box } from 'grommet'
import TattleTheme from './theme'

export default function App({ basePath }) {
  const {
    state,
    selectedStatuses,
    setSelectedStatuses,
    retryJob,
    retryAll,
    cleanAll,
  } = useStore(basePath)

  return (
    <Grommet theme={TattleTheme} full>
      <Box pad={'medium'}>
        {state.loading ? (
          'Loading...'
        ) : (
          <>
            <RedisStats stats={state.data.stats} />
            {state.data.queues.map(queue => (
              <Queue
                queue={queue}
                key={queue.name}
                selectedStatus={selectedStatuses[queue.name]}
                selectStatus={setSelectedStatuses}
                retryJob={retryJob(queue.name)}
                retryAll={retryAll(queue.name)}
                cleanAll={cleanAll(queue.name)}
              />
            ))}
          </>
        )}
      </Box>
    </Grommet>
  )
}
