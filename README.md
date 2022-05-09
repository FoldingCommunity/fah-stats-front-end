# Folding@Home Statistics
This repository contains the code for the
[Folding@home stats website](fah-stats-front-end).  If you find any problems
with this website or have suggestions to improve the site, please create an
issue on Github.  This is an Open-Source project so if you are a programmer
you can create a pull request.

# Run a development server
Create the ssl files.
```
mkdir .cert # In the project root directory
openssl req -x509 -newkey rsa:2048 -keyout .cert/key.pem -out .cert/cert.pem -days 365
```

Start the development server
```
npm start
```

# Beta Website
https://foldingcommunity.github.io/fah-stats-front-end/
https://statsbeta.foldingathome.org

This is built automatically by github actions when commits are made to the
fah-stats-front-end repository.

# Production Website
https://foldingcommunity.github.io/fah-stats-front-end-prod/
https://stats.foldingathome.org

To publish to the production site do the following:

```
git clone https://github.com/FoldingCommunity/fah-stats-front-end.git
cd fah-stats-front-end
./publish
```
