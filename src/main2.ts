// This example constructs an EIP1559 transaction
import * as ethers from 'ethers'
import { FlashbotsBundleProvider } from '@flashbots/ethers-provider-bundle'
import * as config from './config'

const provider = new ethers.providers.InfuraProvider(config.CHAIN_ID, config.INFURA_KEY)
const wallet = config.WALLET_PRIVKEY ? new ethers.Wallet(config.WALLET_PRIVKEY, provider) : ethers.Wallet.createRandom()

export const run = async (): Promise<boolean> => {
  console.log("getting latest blocknumber...")
  const latestBlockNumber = await provider.getBlockNumber()
  console.log("latest blockNumber:", latestBlockNumber)

  console.log(`getting block ${latestBlockNumber}...`)
  const block = await provider.getBlock(latestBlockNumber)
  console.log(block)

  if (block.baseFeePerGas == null) {
    console.error('This chain is not EIP-1559 enabled')
    return false
  }

  const maxBaseFeeInFutureBlock = FlashbotsBundleProvider.getMaxBaseFeeInFutureBlock(block.baseFeePerGas, 1)
  const eip1559Transaction = {
    to: wallet.address,
    type: 2,
    maxFeePerGas: config.PRIORITY_FEE.add(maxBaseFeeInFutureBlock),
    maxPriorityFeePerGas: config.PRIORITY_FEE,
    gasLimit: 21000,
    data: '0x',
    chainId: config.CHAIN_ID
  }

  console.log("Transaction:", eip1559Transaction)

  return true
}
