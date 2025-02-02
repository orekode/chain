const ethers = require('@vechain/ethers')

try {

  const wallet = ethers.Wallet.fromMnemonic("legal harvest census nephew galaxy bind dismiss escape logic clean balance nasty", "m/44'/818'/0'/0/0");
  console.log(wallet)
}
catch (err) {
  console.error(err.message)
}