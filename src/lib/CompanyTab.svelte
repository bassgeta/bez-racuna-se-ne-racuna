<script lang="ts">
    import { store } from "./store.svelte";
</script>

<div class="form">
  <div class="form-section">
    <p class="form-section-title">Podaci o tvrtki</p>

    <div class="field">
      <label for="c-name">Naziv tvrtke</label>
      <input id="c-name" type="text" bind:value={store.company.name} />
    </div>

    <div class="field">
      <label for="c-address">Adresa</label>
      <input id="c-address" type="text" bind:value={store.company.address} />
    </div>

    <div class="field-row">
      <div class="field">
        <label for="c-oib">OIB</label>
        <input id="c-oib" type="text" bind:value={store.company.oib} />
      </div>
      <div class="field">
        <label for="c-iban">IBAN</label>
        <input id="c-iban" type="text" bind:value={store.company.iban} />
      </div>
    </div>
  </div>

  <div class="form-section">
    <p class="form-section-title">PDV</p>

    <label class="checkbox-field">
      <input type="checkbox" bind:checked={store.company.isPdvFree} />
      <span>Oslobođeno od PDV-a</span>
    </label>

    {#if store.company.isPdvFree}
      <div class="field">
        <label for="c-pdvtext">Zakonska osnova</label>
        <textarea id="c-pdvtext" rows="3" bind:value={store.company.pdvFreeText}></textarea>
      </div>
    {/if}
  </div>

  <div class="form-section">
    <p class="form-section-title">Ostalo</p>

    <div class="field">
      <label for="c-capital">Temeljni kapital (€)</label>
      <input id="c-capital" type="text" bind:value={store.company.startingCapital} />
    </div>

    <div class="field">
      <label for="c-other">Ostale informacije</label>
      <textarea id="c-other" rows="3" bind:value={store.company.otherInfo}></textarea>
    </div>
  </div>
</div>
