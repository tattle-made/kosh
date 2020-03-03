import React from 'react'
import Queue from './Queue'
import RedisStats from './RedisStats'
import Header from './Header'
import useStore from './hooks/useStore'
import { Box } from 'grommet'

export default function Section({ basePath }) {
  const {
    state,
    selectedStatuses,
    setSelectedStatuses,
    retryJob,
    retryAll,
    cleanAll,
    setCurrentPages
  } = useStore(basePath)

  return (
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
                setCurrentPages={setCurrentPages}
                retryJob={retryJob(queue.name)}
                retryAll={retryAll(queue.name)}
                cleanAll={cleanAll(queue.name)}
              />
            ))}
          </>
        )}
      </Box>
  )
}
