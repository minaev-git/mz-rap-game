import { MAXIMUM_RECORD_TURNS, MAXIMUM_NEWS_READ } from "../../consts";
import type { RecordLoops, RecordNews } from "../../ducks/record";

const loopIdRegExp = /^[a-z]+\d*$/;
const addSeparator = "*";
const removeSeparator = "-";
const loopNamesSeparator = ".";
const chunksSeparator = "_";
const loopsNewsSeparator = "!";
const loopChunkRegExp = /^(\d+)(?:\*([^-]+))?(?:-(.+))?$/;

export function validateLoopId(id: string) {
    if (!loopIdRegExp.test(id)) {
        throw `Invalid loop id ${id}. Loop id should satisfy ${loopIdRegExp.toString()} regular expression.`;
    }
}

export function generateShareHash(
    { startTimestamp, loops, news }: {| startTimestamp: number | null, loops: RecordLoops[], news: RecordNews[] |}
) {
    const loopChunks = [];
    let previousLoops: RecordLoops = [];
    for (let i = 0; i < loops.length; i++) {
        const addedLoops = [];
        const removedLoops = [];
        let loopChunk = "";

        for (const loopId of loops[i]) {
            if (!previousLoops.includes(loopId)) {
                addedLoops.push(loopId);
            }
        }

        for (const prevLoopId of previousLoops) {
            if (!loops[i].includes(prevLoopId)) {
                removedLoops.push(prevLoopId);
            }
        }

        if (addedLoops.length !== 0 || removedLoops.length !== 0) {
            loopChunk = String(i);
            if (addedLoops.length !== 0) {
                loopChunk += `${addSeparator}${addedLoops.join(loopNamesSeparator)}`;
            }
            if (removedLoops.length !== 0) {
                loopChunk += `${removeSeparator}${removedLoops.join(loopNamesSeparator)}`;
            }
        }
        if (loopChunk) {
            loopChunks.push(loopChunk);
        }
        previousLoops = loops[i];
    }

    const newsChunks = [];
    for (const { timestamp, id } of news) {
        newsChunks.push(`${timestamp}${addSeparator}${id}`);
    }
    // i.e. 0*bt1.h1_1*b1_2-bt1_3-h1.b1!0*0_1000*1
    const hash = `${loopChunks.join(chunksSeparator)}${loopsNewsSeparator}${newsChunks.join(chunksSeparator)}`;
    return btoa(hash);
}

export function generatePlayList(hash: string): {| loops: RecordLoops[], news: RecordNews[] |} | null {
    try {
        const decodedHash = atob(hash);
        const [loopPart, newsPart] = decodedHash.split(loopsNewsSeparator);
        const loopChunks = loopPart.split(chunksSeparator);
        const loops: RecordLoops[] = [];
        let loopsCursor = 0;
        for (const loopChunk of loopChunks) {
            const match = loopChunk.match(loopChunkRegExp);
            if (!match) {
                continue;
            }
            let [_, turnNumber, addedLoops = "", removedLoops = ""] = match;
            turnNumber = Number(turnNumber);
            // fill same turns
            for (let i = loopsCursor; i < turnNumber; i++) {
                loops[i] = loops[i - 1];
            }
            // build new turn
            addedLoops = addedLoops ? addedLoops.split(loopNamesSeparator) : [];
            removedLoops = removedLoops ? removedLoops.split(loopNamesSeparator) : [];
            loops[turnNumber] = (loops[turnNumber - 1] || [])
                .concat(addedLoops)
                .filter(id => !removedLoops.includes(id));
            loopsCursor = turnNumber + 1;
            if (loopsCursor > MAXIMUM_RECORD_TURNS) {
                break;
            }
        }
        const news: RecordNews[] = [];
        const newsChunks = newsPart.split(chunksSeparator);
        for (let i = 0; i < newsChunks.length && i < MAXIMUM_NEWS_READ; i++) {
            let [timestamp, id] = newsChunks[i].split(addSeparator);
            news.push({
                timestamp: Number(timestamp),
                id,
            });
        }
        return {
            loops,
            news,
        };
    } catch (e) {
        console.error("Wrong record hash format");
        return null;
    }
}

export function randomInRange(min: number, max: number): number {
    return min + Math.random() * (max - min);
}

export function getRecordFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("r");
}
