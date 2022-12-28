<script>
  import {favorites} from "$store";
  import Panel from "./Panel.svelte";
  import {recognize} from "$scripts/ocr/recognize";

  let progress = 0
  let keys = []

  const onFileSelected = (e) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async (e) => {
      // clears out favorites with ones from file
      keys = await recognize(e.target.result, (progressValue) => progress = progressValue)

      $favorites = keys
    };
  }
</script>

<Panel panelTitle={"ocr"} openIcon={"./icons/heart.svg"} closeIconOffset={12}>
  <header>
    <h2>OCR Panel</h2>
    {#if progress > 0 && progress < 100}
      <span>{progress}%</span>
    {/if}

    <ul>
    {#each keys as key}
      <li>{key}</li>
    {/each}
    </ul>

    {keys.length} keys

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
