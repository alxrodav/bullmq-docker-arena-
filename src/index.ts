import Arena from 'bull-arena'
import { Queue, FlowProducer } from 'bullmq'
import path from 'path'

const bootstrap = async () => {
  const configPath = path.resolve('arena.json')
  const config = require(configPath);
  const port = Number(process.env.PORT) || 3000

  Arena({
    BullMQ: Queue,
    FlowBullMQ: FlowProducer,
    ...config
  } ,{
    basePath: '/arena',
    port,
  })

  console.log(`BullMQ Arena is running on http://localhost:${port}/arena`)
}

bootstrap().catch(error => {
  console.error(error)
  process.exit(1)
})