import fs from 'fs';

const value = fs.readFileSync('./info.txt', 'utf8');
const text = value.replace("GEEK.geekitemPreload =", "").replaceAll(";", "").trim();
const json = JSON.parse(text);

console.log(JSON.stringify(json, null, 4));

fs.writeFileSync('../build/info2.json', JSON.stringify({
    name: json.item.name,
    yearpublished: json.item.yearpublished,
    minplayers: json.item.minplayers,
    maxplayers: json.item.maxplayers,
    minplaytime: json.item.minplaytime,
    maxplaytime: json.item.maxplaytime,
    minage: json.item.minage,
    short_description: json.item.short_description,
    polls: {
        userplayers: {
            best: {
                min: json.item.polls.userplayers.best[0].min,
                max: json.item.polls.userplayers.best[0].max,
            },
            recommended: {
                min: json.item.polls.userplayers.recommended[0].min,
                max: json.item.polls.userplayers.recommended[0].max,
            }
        },
        playerage: json.item.polls.playerage,
        boardgameweight: {
            averageweight: json.item.polls.boardgameweight.averageweight,
            range: {
                1: 'Light',
                2: 'Medium Light',
                3: 'Medium',
                4: 'Medium Heavy',
                5: 'Heavy',
            }
        }
    },
    links: {
        boardgamedesigner: json.item.links.boardgamedesigner,
        boardgamesolodesigner: json.item.links.boardgamesolodesigner,
        boardgameartist: json.item.links.boardgameartist,
        boardgamepublisher: json.item.links.boardgamepublisher,
        boardgamedeveloper: json.item.links.boardgamedeveloper,
        boardgamegraphicdesigner: json.item.links.boardgamegraphicdesigner,
        boardgamesculptor: json.item.links.boardgamesculptor,
        boardgameeditor: json.item.links.boardgameeditor,
        boardgamewriter: json.item.links.boardgamewriter,
        boardgameinsertdesigner: json.item.links.boardgameinsertdesigner,
        boardgamecategory: json.item.links.boardgamecategory,
        boardgamemechanic: json.item.links.boardgamemechanic,
    }
}, null, 4), 'utf8');

// weitere Verarbeitung...
