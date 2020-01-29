import { useEffect, useRef, useState } from 'react'
import qs from 'querystring'
import { ARCHIVE_SERVER_PATH } from '../../../../config'

const interval = 5000
const SERVER_BASE_PATH = `${ARCHIVE_SERVER_PATH}/ui`

export default function useStore(basePath) {
  const [state, setState] = useState({
    data: null,
    loading: true,
  })
  const [selectedStatuses, setSelectedStatuses] = useState({})
  const [currentPages, setCurrentPages] = useState(0)

  const poll = useRef()

  useEffect(() => {
    stopPolling()
    runPolling()

    return stopPolling
  }, [selectedStatuses, currentPages])

  const stopPolling = () => {
    if (poll.current) {
      clearTimeout(poll.current)
      poll.current = null
    }
  }

  const runPolling = () => {
    update()
      .catch(error => {
        console.error('Failed to poll', error)
      })
      .then(() => {
        const timeoutId = setTimeout(() => {
          runPolling()
        }, interval)
        poll.current = timeoutId
      })
  }

  const update = () => {
    return fetch(`${SERVER_BASE_PATH}/queues/?${qs.encode(selectedStatuses)}&page=${currentPages}`)
      .then(res => (res.ok ? res.json() : Promise.reject(res)))
      .then(data => setState({ data, loading: false }))
  }

  const retryJob = queueName => job => () =>
    fetch(`${SERVER_BASE_PATH}/queues/${queueName}/${job.id}/retry`, {
      method: 'put',
    }).then(update)

  const retryAll = queueName => () =>
    fetch(`${SERVER_BASE_PATH}/queues/${queueName}/retry`, { method: 'put' }).then(
      update,
    )

  const cleanAll = queueName => () =>
    fetch(`${SERVER_BASE_PATH}/queues/${queueName}/clean`, { method: 'put' }).then(
      update,
    )

  return {
    state,
    retryJob,
    retryAll,
    cleanAll,
    selectedStatuses,
    setSelectedStatuses,
    setCurrentPages
  }
}
