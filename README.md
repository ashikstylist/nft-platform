Boot up local development blockchain
$ npx hardhat node

Connect development blockchain accounts to Metamask
1. Copy private key of the addresses and import to Metamask
2. Connect your metamask to hardhat blockchain, network 127.0.0.1:8545.
3. If you have not added hardhat to the list of networks on your metamask, open up a browser, click the fox icon, then click the top center dropdown button that lists all the available networks then click add networks. A form should pop up. For the "Network Name" field enter "Hardhat". For the "New RPC URL" field enter "http://127.0.0.1:8545". For the chain ID enter "31337". Then click save.

Migrate Smart Contracts
npx hardhat run src/backend/scripts/deploy.js --network localhost

Run Test
$ npx hardhat test

Launch Frontend
$ npm run start

## Screenshots
![NFT Upload](https://i.ibb.co/k2Ck0dk/5.png)
![NFT Listed](https://i.ibb.co/qF05W96/Homepage-Filled-with-NFT.png)
![Mobile View](https://i.ibb.co/BVTydX3/Mobile.png)
![Tab View](https://i.ibb.co/qnWJbLz/Tab-1.png)
