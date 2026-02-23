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
        <div class="item-row">
          <span class="col-code item-code">{i + 1}</span>
          <input class="col-name" type="text" placeholder="Naziv" bind:value={item.name} />
          <input class="col-unit" type="text" bind:value={item.unit} />
          <input
            class="col-qty"
            type="number"
            min="0"
            step="0.001"
            bind:value={item.quantity}
          />
          <input
            class="col-price"
            type="number"
            min="0"
            step="0.01"
            bind:value={item.price}
          />
          <span class="col-total item-total">{itemTotal(item)}</span>
          <button class="btn btn-danger col-del" onclick={() => removeItem(i)}>×</button>
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

  .items-header {
    display: flex;
    gap: 6px;
    align-items: center;
    padding: 0 0 4px 0;
    border-bottom: 1px solid #e0e0e0;
    font-size: 10px;
    font-weight: 600;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .item-row {
    display: flex;
    gap: 6px;
    align-items: center;
  }

  .item-row input {
    border: 1px solid #d0d0d0;
    border-radius: 4px;
    padding: 6px 8px;
    font-size: 13px;
    font-family: inherit;
    background: white;
    color: #1a1a1a;
    outline: none;
    transition: border-color 0.15s;
    min-width: 0;
  }

  .item-row input:focus {
    border-color: #1a1a1a;
  }

  .col-code {
    width: 22px;
    flex-shrink: 0;
    text-align: center;
  }

  .col-name {
    flex: 1;
  }

  .col-unit {
    width: 52px;
    flex-shrink: 0;
  }

  .col-qty {
    width: 70px;
    flex-shrink: 0;
  }

  .col-price {
    width: 76px;
    flex-shrink: 0;
  }

  .col-total {
    width: 70px;
    flex-shrink: 0;
    text-align: right;
  }

  .col-del {
    width: 28px;
    flex-shrink: 0;
  }

  .item-code {
    font-size: 12px;
    color: #999;
  }

  .item-total {
    font-size: 12px;
    font-weight: 500;
    color: #333;
  }

  .btn.col-del {
    padding: 6px 8px;
    font-size: 14px;
    line-height: 1;
  }

  .empty-note {
    font-size: 12px;
    color: #aaa;
    font-style: italic;
  }
</style>
