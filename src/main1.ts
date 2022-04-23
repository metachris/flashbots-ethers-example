// This example is a very simple Ethers setup, just querying the block
import * as ethers from 'ethers'
import * as config from './config'

const provider = new ethers.providers.InfuraProvider(config.CHAIN_ID, config.INFURA_KEY)

export const run = async (): Promise<boolean> => {
  console.log("getting latest blocknumber...")
  const latestBlockNumber = await provider.getBlockNumber()
  console.log("latest blockNumber:", latestBlockNumber)

  console.log(`getting block ${latestBlockNumber}...`)
  const block = await provider.getBlock(latestBlockNumber)
  console.log(`block ${latestBlockNumber}:`, block)

  return true
}
