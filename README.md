## Folding@Home Statistics

### Demo Dev
https://foldingcommunity.github.io/fah-stats-front-end/
https://statsbeta.foldingathome.org

### Demo Staging
https://foldingcommunity.github.io/fah-stats-front-end-prod/
https://statsprod.foldingathome.org

### Production
https://stats.foldingathome.org

### What is Folding@Home Statistics
One of the best ways to help Folding@home is by recruiting your friends and family. Start by sharing our project with them. Then join a team or even start your own team. The more points your team earns, the closer we come to finding cures.

On this page you will find access to statistics for individuals and teams who have joined together to earn points and compete with other teams. Some of us are quite intense in our approach to folding. We have team websites, we supe up our computers, and we drive the technology forward by reporting bugs and making suggestions about how to improve the software.

### How to Contribute

1) fork this repository.
2) Create a branch with a meningful name representing the feature or issue you will be working on.
3) After finishing coding, create a PR request to the `DEV` branch.

### Local Environment Setup

1) Install `mkcert`library https://github.com/FiloSottile/mkcert
2) Follow the instructions and generate a certificate and private key for "stats.foldingathome.org"
3) Create a `.env` file at the root of the project with the following:
```
HTTPS=true
SSL_CRT_FILE=${PATHTOCERT} 
SSL_KEY_FILE=${PATHTOKEY}
HOST=stats.foldingathome.org
PORT=443
NODE_ENV=test
```
4) Open your `hostsfile` and add the following line: `127.0.0.1 stats.foldingathome.org`