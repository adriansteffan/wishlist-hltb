
# Wishlist -> How Long To Beat

## Minimalist Documentation:

This project needs [bun](https://bun.sh/) to execute the scripts.

To install our needed dependency, run

```
bun install
```

in the repositories root
(the as the howlongtobeat npm package is broken right now, we are pulling a fork by another github user that fixed it - might break at some point)

Duplicate the `.env.template` and rename it to `.env`

```
cp .env.template .env
```

Then fill out the values.

Finally, run the script using 

```
bun main.js
```