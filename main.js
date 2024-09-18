
import { HowLongToBeatService } from 'howlongtobeat';
let hltbService = new HowLongToBeatService();

const games = [];
let page = 0;
while(true){
    const wishlist = await (await fetch(`https://store.steampowered.com/wishlist/profiles/${process.env.STEAM_ID}/wishlistdata/?p=${page}`)).json();
    if(wishlist.length == 0){
        break;
    }

    for (const [_, value] of Object.entries(wishlist)) {
        games.push(value.name);
    }

    page += 1;
}

const gameEntries = [];
for(const game of games){
    console.log(game);
    const result = await hltbService.search(game);
    const gameEntry = {
        name: game,
        main: null,
        extra: null,
        completionist: null,
    }

    if(result.length > 0){
        gameEntry.main = result[0].gameplayMain;
        gameEntry.extra = result[0].gameplayMainExtra;
        gameEntry.completionist = result[0].gameplayCompletionist;
    }

    gameEntries.push(gameEntry);
}

const headers = ["Name", "Main", "Extra", "Completionist"];
const csvRows = [headers.join(",")];

for (const entry of gameEntries) {
    const row = [
        `"${entry.name}"`,
        entry.main,
        entry.extra,
        entry.completionist
    ].join(",");
    csvRows.push(row);
}

const csvContent = csvRows.join("\n");
const filePath = "wishlist.csv";
await Bun.write(filePath, csvContent);
console.log(`Wrote list to ${filePath}`);

export {}