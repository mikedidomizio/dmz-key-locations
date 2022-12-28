<script>
    import { favorites } from "$store";
    import Panel from "./Panel.svelte";
    import Tesseract from 'tesseract.js';
    import keys_ocr from "$assets/keys_ocr.png"
    import { keys } from "$data/key-data";
    import {getDmzKeysFromWords} from "../../../lib/ocr.js";

    // todo do not commit
    let wordsArrFake = [
        "FPS:",
        "B1",
        "LATENCY:",
        "0OMS",
        "PACKETLOSS:",
        "0%",
        "GPU:",
        "6B°",
        "<",
        "KEYSTASH",
        "=R",
        "A",
        "n",
        "B",
        "g",
        "/",
        "—",
        ",",
        "’",
        "/",
        "=",
        "/’1",
        "/",
        "5",
        "—",
        "E",
        "=",
        "—",
        "E",
        "=",
        "CONDITION:",
        "USES",
        "LEFT:",
        "PRISTINE",
        "=3",
        "ABF.",
        "AHMED",
        "GROCERY",
        "AHMED",
        "GROCERY",
        "B.C.",
        "TOOLBOX",
        "BANK",
        "OF",
        "ADAL",
        "CANAL",
        "-",
        "ANTIQUITIES",
        "STORE",
        "OFFICE",
        "-",
        "STORE",
        "OFFICE",
        "-",
        "KEY",
        "TOP",
        "STORY",
        "APARTMENT",
        "103",
        "[",
        "R",
        "PIESGUEGET",
        "-",
        "-",
        "-—",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "CAVERN",
        "BOAT",
        "CONTROL",
        "TOWER",
        "DOWNTOWN",
        "FORT",
        "BARRACK",
        "LONGSHOREMAN'",
        "MAWIZEH",
        "CELL",
        "DOCK",
        "SHACK",
        "KEY",
        "KEY",
        "-",
        "WORN",
        "POST",
        "OFFICE",
        "KEY",
        "S",
        "DUFFEL",
        "BAG",
        "SHOP",
        "KEY",
        "=",
        "E",
        "=",
        "=",
        "E",
        "=",
        "BUNGALOW",
        "POLICE",
        "ACADEMY",
        "POLICE",
        "ACADEMY",
        "SCIENTIST'S",
        "TARAQ",
        "RIVER",
        "TRAVELER'S",
        "ROOM",
        "KEY",
        "KEY",
        "PRIVATE",
        "LOCKER",
        "LOCKER",
        "KEY",
        "-",
        "SUPPLY",
        "SHACK",
        "LUGGAGE",
        "KEY",
        "N",
        "9.9.13447484",
        "[49:255:1720+11]",
        "Tm",
        "[7I]I]I]][B][1E72I]74I]I]E.,!,.LQ.]"
    ]

    const t = getDmzKeysFromWords(wordsArrFake)

    // Tesseract.recognize(
    //     // 'https://tesseract.projectnaptha.com/img/eng_bw.png',
    //     keys_ocr,
    //     'eng',
    //     // { logger: m => console.log(m) }
    // ).then((data) => {
    //     // clears out favorites
    //     $favorites = []
    //     console.log('favorites', $favorites)
    //
    //     const textArr = data.data.words.map(word => word.text)
    //
    //     console.log(data)
    //     if (textArr.length) {
    //         listOfKeys(keys, textArr)
    //     }
    // })

</script>

<Panel panelTitle={"ocr"} openIcon={"./icons/heart.svg"} closeIconOffset={12}>
    <header>
        <h2>OCR Panel</h2>
    </header>
</Panel>

<style>
    h2 {
        margin: 0.5rem 0;
    }

    p {
        opacity: 0.9;
        line-height: 1.3rem;
    }

    header {
        padding: 1rem;
        padding-bottom: 3rem;
    }

    footer {
        position: absolute;
        width: 22rem;
        background-color: var(--color-black);
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;
        margin-top: 1rem;
        box-shadow: 0 0 1rem var(--color-black-dark);
        bottom: 0;
        border-radius: 0 0 0.5rem 0.5rem;
    }

    @media only screen and (max-width: 30rem) {
        footer {
            width: calc(100% - 10px - 1rem);
            border-radius: 0;
            border-bottom-left-radius: 0.5rem;
        }

        footer:not(.scrollbar) {
            width: calc(100% - 10px);
        }
    }

    footer > a {
        display: block;
        display: flex;
        align-items: center;
        height: 3rem;
        width: 3rem;
        margin-right: 1rem;
        background-color: var(--color-black-dark);
        border-radius: 0.5rem;
        padding: 0.3rem;
        text-decoration: none;
        font-weight: bold;
        transition: all 0.1s ease-out;
    }

    @media (hover: hover) {
        footer > a:hover {
            background-color: var(--color-main);
            transform: scale(1.2);
        }
    }

    footer > a img {
        max-height: 2.5rem;
        max-width: 2.5rem;
    }

    footer > a:last-of-type {
        margin-right: 0;
        margin-left: auto;
        width: 9rem;
        padding: 0.3rem 1rem;
        background-color: var(--color-contrast);
        font-weight: bold;
        font-size: 1.2rem;
    }

    @media (hover: hover) {
        footer > a:last-of-type:hover {
            background-color: var(--color-contrast-light);
        }
    }

    footer > a:last-of-type img {
        max-height: 2rem;
        max-width: 2rem;
        margin: 0;
        margin-right: 0.7rem;
    }
</style>
