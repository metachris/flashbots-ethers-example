import * as ethers from 'ethers'

export const INFURA_KEY = 'e03fe41147d548a8a8f55ecad18378fb' // process.env.INFURA_API_KEY
export const WALLET_PRIVKEY = '0x116d4e913c8717e8cf898c18e427ec001f51cbc93924b16e95d5549640f32d94' // process.env.PRIVATE_KEY
export const FLASHBOTS_AUTH_KEY = '0x6d795cc0a9392dab1adfb38094cc273cb62625d3504d9eaa2c216845995949c1' // process.env.FLASHBOTS_AUTH_KEY

export const CHAIN_ID = 5 // Goerli
export const GWEI = ethers.BigNumber.from(10).pow(9)
export const PRIORITY_FEE = GWEI.mul(3)
export const FLASHBOTS_EP = 'https://relay-goerli.flashbots.net/'
