# ArkPromo

ArkPromo enables retailers to distribute points / savings stamps (as a token) to customers on a blockchain built with Ark’s Ecosystem.
The amount of tokens the customer receives (this is configurable) depends on the spending amount in fiat. 
The application will scan for a wallet address when a customer has made the purchase. The customer opens the Ark Mobile app, shows his QR-code and ArkPromo will send the tokens to the scanned address. 
A few weeks later the same customer enters the store and sees that there is a promotional offer. At the cash register the customer selects the offer from physical device (for example 1$ discount for 5 tokens). 
ArkPromo prompts the user to send the tokens and shows a QR-code. After confirmation the discount is calculated and the user can make the purchase. 
Retailers can manage their promotional offers on the physical device at any time.

With ArkPromo retailers can track the token distribution and this enables stores to monitor how promotional offers are performing.

## Requirements

- A running bridgechain built with Ark.
- A computer which has access to a camera.
- A smartphone with a camera and the Ark Mobile app installed. 

## Installation

1) You need to setup and run your own bridgechain, I recommend using the [Ark Deployer](https://deployer.ark.io) to leverage Ark's blockchain technology.
2) Clone this repository onto the computer you want to run the application on, this computer needs access to a camera.
3) Copy the entire plugin `plugins/event-forwarder` and paste it into `core-your_chain_name/plugins`.
4) [Register the plugin](https://docs.ark.io/guidebook/core/plugins/#installing-plugins) into your bridgechain. Add `"@emsy/event-forwarder": {}` at the bottom of `plugins.json`. See [Configure the plugin](#environment-variables) for the additional properties.
5) Navigate to directory `core-your_chain_name/plugins` and execute `yarn bootstrap`.
6) Restart your relay node with `your_bridgechain relay:restart`.
7) Navigate to directory where you've cloned this project.
8) Run `npm install`.
9) Create a `.env` file and add the values [described here](#environment-variables)
10) Execute `npm start` to run the application.

### Environment variables

```
# This is the port the application will listen to.
SERVER_PORT=3000
# The application uses this wallet to send and receive tokens.
APPLICATION_WALLET_ADDRESS=
APPLICATION_WALLET_BIP39=
# Peers of your bridgechain.
PEERS='http://192.168.1.1:4103,http://192.168.1.2:4103,http://192.168.1.3:4103'
# Amount of tokens the customer will receive per single fiat spent.
TOKENS_PER_SINGLE_FIAT=1.00000000
```

### Configure the plugin

```
"@emsy/event-forwarder": {
	// IP of socket server.
	ip: "127.0.0.1",
	port: 3000,
	// Events which the plugin will forward.
	events: [
	    "block.forged",
	    "transaction.forged"
	]
}
```

[List of possible events](https://docs.ark.io/guidebook/core/events.html#available-events) 

## License

[License](https://github.com/emsy-emsy/arkpromo/blob/master/LICENSE)