// This example constructs an EIP1559 transaction
import * as ethers from 'ethers'
import { FlashbotsBundleProvider, FlashbotsBundleResolution } from '@flashbots/ethers-provider-bundle'
import * as config from './config'

const provider = new ethers.providers.InfuraProvider(config.CHAIN_ID, config.INFURA_KEY)
const wallet = config.WALLET_PRIVKEY ? new ethers.Wallet(config.WALLET_PRIVKEY, provider) : ethers.Wallet.createRandom()
const authSigner = config.FLASHBOTS_AUTH_KEY ? new ethers.Wallet(config.FLASHBOTS_AUTH_KEY) : ethers.Wallet.createRandom()

export const run = async (): Promise<boolean> => {
  const flashbotsProvider = await FlashbotsBundleProvider.create(
    provider, // a normal ethers.js provider, to perform gas estimiations and nonce lookups
    authSigner, // ethers.js signer wallet, only for signing request payloads, not transactions
    config.FLASHBOTS_EP
  )

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

  const signedTransactions = await flashbotsProvider.signBundle([
    {
      signer: wallet,
      transaction: eip1559Transaction
    }
  ])

  console.log("siulating...")
  const targetBlock = latestBlockNumber + 1
  const simulation = await flashbotsProvider.simulate(signedTransactions, targetBlock)
  console.log(simulation)
  if ('error' in simulation) {
    console.warn(`Simulation Error: ${simulation.error.message}`)
    return false
  }


  console.log("submitting...")
  const bundleSubmission = await flashbotsProvider.sendRawBundle(signedTransactions, targetBlock)
  console.log('bundle submitted, waiting...')
  if ('error' in bundleSubmission) {
    throw new Error(bundleSubmission.error.message)
  }

  const waitResponse = await bundleSubmission.wait()
  console.log(`Submission wait Response: ${FlashbotsBundleResolution[waitResponse]}`)

  // Get bundle and user stats
  console.log({
    bundleStats: await flashbotsProvider.getBundleStats(simulation.bundleHash, targetBlock),
    userStats: await flashbotsProvider.getUserStats()
  })

  return true
}
