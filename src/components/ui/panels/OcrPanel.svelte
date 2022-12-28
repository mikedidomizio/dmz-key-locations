<script>
    import { favorites } from "$store";
    import Panel from "./Panel.svelte";
    import Tesseract from 'tesseract.js';
    import keys_ocr from "$assets/keys_ocr.png"
    import { keys } from "$data/key-data";
    import {getDmzKeysFromWords} from "../../../lib/ocr.js";

    let progress = 0

    const recognize = (base64Image) => {
        return Tesseract.recognize(
            base64Image,
            'eng',
            { logger: m => {
                    if (m.status === 'recognizing text') {
                        progress = parseInt(m.progress * 100)
                    }
            }}).then((data) => {
                return data.data.words.map(word => word.text)
        })
    }

    const onFileSelected = (e) => {
        const image = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = async(e) => {
            const words = await recognize(e.target.result)
            // clears out favorites with ones sfrom files
            $favorites = getDmzKeysFromWords(words)
        };
    }
</script>

<Panel panelTitle={"ocr"} openIcon={"./icons/heart.svg"} closeIconOffset={12}>
    <header>
        <h2>OCR Panel</h2>
        {#if progress > 0}
            <span>{progress}%</span>
        {/if}
        <input on:change={(e)=>onFileSelected(e)} type="file" name="image" accept="image/*" capture="environment">
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
