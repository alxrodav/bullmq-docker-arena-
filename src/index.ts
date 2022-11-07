import Arena from 'bull-arena'
import { Queue, FlowProducer } from 'bullmq'
import path from 'path'

const bootstrap = async () => {
  const configPath = path.resolve('config.json')
  const config = require(configPath)

  Arena({
    BullMQ: Queue,
    FlowBullMQ: FlowProducer,
    ...config,
  })
}

bootstrap().catch(error => {
  console.error(error)
  process.exit(1)
})
