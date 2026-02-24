<script lang="ts">
  import { store } from './store.svelte';
  import type { InvoiceItem } from './types';

  function addItem(): void {
    store.invoice.items.push({ name: '', unit: 'mj', quantity: '1', price: '0' });
  }

  function removeItem(index: number): void {
    store.invoice.items.splice(index, 1);
  }

  function itemTotal(item: InvoiceItem): string {
    const qty = parseFloat(item.quantity) || 0;
    const price = parseFloat(item.price) || 0;
    return (qty * price).toFixed(2).replace('.', ',');
  }
</script>

<div class="form">
  <div class="form-section">
    <p class="form-section-title">Kupac</p>

    <div class="field">
      <label for="cust-name">Naziv</label>
      <input id="cust-name" type="text" bind:value={store.customer.name} />
    </div>

    <div class="field-row">
      <div class="field">
        <label for="cust-city">Grad</label>
        <input id="cust-city" type="text" bind:value={store.customer.city} />
      </div>
      <div class="field">
        <label for="cust-street">Ulica i kbr.</label>
        <input id="cust-street" type="text" bind:value={store.customer.street} />
      </div>
    </div>

    <div class="field">
      <label for="cust-country">Država</label>
      <input id="cust-country" type="text" bind:value={store.customer.country} />
    </div>

    <div class="field">
      <label for="cust-id">PDV ID / OIB</label>
      <input id="cust-id" type="text" bind:value={store.customer.id} />
    </div>
  </div>

  <div class="form-section">
    <p class="form-section-title">Račun</p>

    <div class="field">
      <label for="inv-num">Broj računa</label>
      <input id="inv-num" type="text" bind:value={store.invoice.number} placeholder="npr. 3/1/1" />
    </div>

    <div class="field-row">
      <div class="field">
        <label for="inv-date">Datum računa</label>
        <input id="inv-date" type="date" bind:value={store.invoice.invoiceDate} />
      </div>
      <div class="field">
        <label for="svc-date">Datum isporuke</label>
        <input id="svc-date" type="date" bind:value={store.invoice.serviceDate} />
      </div>
    </div>

    <div class="field">
      <label for="due-date">Datum dospijeća</label>
      <input id="due-date" type="date" bind:value={store.invoice.dueDate} />
    </div>
  </div>

  <div class="form-section">
    <div class="section-header">
      <p class="form-section-title">Stavke</p>
      <button class="btn" onclick={addItem}>+ Dodaj stavku</button>
    </div>

    {#if store.invoice.items.length > 0}
      <div class="items-header">
        <span class="col-code">#</span>
        <span class="col-name">Naziv</span>
        <span class="col-unit">J.mj.</span>
        <span class="col-qty">Količina</span>
        <span class="col-price">Cijena</span>
        <span class="col-total">Iznos</span>
        <span class="col-del"></span>
      </div>

      {#each store.invoice.items as item, i}
        <div class="item-card">
          <div class="item-card-header">
            <span class="item-code">#{i + 1}</span>
            <input class="input-name" type="text" placeholder="Naziv stavke" bind:value={item.name} />
            <button class="btn btn-danger btn-del" onclick={() => removeItem(i)}>×</button>
          </div>
          <div class="item-card-body">
            <div class="item-field">
              <label>J.mj.</label>
              <input type="text" bind:value={item.unit} />
            </div>
            <div class="item-field">
              <label>Količina</label>
              <input type="number" min="0" step="0.001" bind:value={item.quantity} />
            </div>
            <div class="item-field">
              <label>Cijena</label>
              <input type="number" min="0" step="0.01" bind:value={item.price} />
            </div>
            <div class="item-field item-field-total">
              <label>Iznos</label>
              <span class="item-total">{itemTotal(item)}</span>
            </div>
          </div>
        </div>
      {/each}
    {:else}
      <p class="empty-note">Nema stavki. Klikni "+ Dodaj stavku".</p>
    {/if}
  </div>
</div>

<style>
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .item-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 8px;
    background: white;
  }

  .item-card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    background: #f7f7f7;
    border-bottom: 1px solid #e0e0e0;
  }

  .item-code {
    font-size: 11px;
    font-weight: 600;
    color: #aaa;
    flex-shrink: 0;
  }

  .input-name {
    flex: 1;
    border: 1px solid #d0d0d0;
    border-radius: 4px;
    padding: 5px 8px;
    font-size: 13px;
    font-family: inherit;
    background: white;
    color: #1a1a1a;
    outline: none;
    transition: border-color 0.15s;
    min-width: 0;
  }

  .input-name:focus {
    border-color: #1a1a1a;
  }

  .btn-del {
    padding: 4px 8px;
    font-size: 14px;
    line-height: 1;
    flex-shrink: 0;
  }

  .item-card-body {
    display: flex;
    gap: 0;
    padding: 10px;
    gap: 10px;
  }

  .item-field {
    display: flex;
    flex-direction: column;
    gap: 3px;
    flex: 1;
  }

  .item-field label {
    font-size: 10px;
    font-weight: 600;
    color: #aaa;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .item-field input {
    border: 1px solid #d0d0d0;
    border-radius: 4px;
    padding: 5px 8px;
    font-size: 13px;
    font-family: inherit;
    background: white;
    color: #1a1a1a;
    outline: none;
    transition: border-color 0.15s;
    min-width: 0;
    width: 100%;
    box-sizing: border-box;
  }

  .item-field input:focus {
    border-color: #1a1a1a;
  }

  .item-field-total {
    align-items: flex-end;
  }

  .item-total {
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;
    padding: 5px 0;
  }

  .empty-note {
    font-size: 12px;
    color: #aaa;
    font-style: italic;
  }
</style>
