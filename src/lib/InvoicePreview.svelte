<script lang="ts">
  import { store } from './store.svelte';
  import type { InvoiceItem } from './types';

  function formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    if (!year || !month || !day) return dateStr;
    return `${day}.${month}.${year}.`;
  }

  function formatNum(n: number): string {
    return n.toLocaleString('hr-HR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function itemTotal(item: InvoiceItem): number {
    return (parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0);
  }

  const grandTotal = $derived(
    store.invoice.items.reduce((sum, item) => sum + itemTotal(item), 0)
  );

  const totalQuantity = $derived(
    store.invoice.items.reduce((sum, item) => sum + (parseFloat(item.quantity) || 0), 0)
  );

  const footerParts = $derived(
    [
      store.company.name,
      store.company.address,
      store.company.oib ? `oib ${store.company.oib}` : '',
      store.company.startingCapital ? `tem.kapital ${store.company.startingCapital}` : '',
    ].filter(Boolean)
  );
</script>

<div class="invoice">
  <!-- Company header -->
  <div class="company-header">
    <strong class="company-name">{store.company.name}</strong>
    {#if store.company.address}
      <span>{store.company.address}</span>
    {/if}
    {#if store.company.oib}
      <span>oib {store.company.oib}</span>
    {/if}
    {#if store.company.iban}
      <span>iban {store.company.iban}</span>
    {/if}
  </div>

  <!-- Customer address block -->
  <div class="customer-address">
    {#if store.customer.name}
      <strong>{store.customer.name}</strong>
    {/if}
    {#if store.customer.street}
      <span>{store.customer.street}</span>
    {/if}
    {#if store.customer.city || store.customer.country}
      <span>{[store.customer.city, store.customer.country].filter(Boolean).join(', ')}</span>
    {/if}
  </div>

  <!-- Invoice title row -->
  <div class="invoice-title-row">
    <h2 class="invoice-title">Račun&nbsp;&nbsp;{store.invoice.number}</h2>
    <div class="invoice-date-block">
      <span class="date-label">Datum računa</span>
      <span class="date-value">{formatDate(store.invoice.invoiceDate)}</span>
    </div>
  </div>

  <!-- Račun section -->
  <div class="inv-section">
    <h3 class="section-title">Račun</h3>
    <table>
      <thead>
        <tr>
          <th>Datum isporuke</th>
          <th>Dospijeće računa</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{formatDate(store.invoice.serviceDate)}</td>
          <td>{formatDate(store.invoice.dueDate)}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Kupac section -->
  <div class="inv-section">
    <h3 class="section-title">Kupac</h3>
    <table>
      <thead>
        <tr>
          <th>Naziv kupca</th>
          <th>Mjesto</th>
          <th>Ulica i kbr.</th>
          <th>Država</th>
          <th>PDV ID, BR./OIB</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{store.customer.name}</td>
          <td>{store.customer.city}</td>
          <td>{store.customer.street}</td>
          <td>{store.customer.country}</td>
          <td>{store.customer.id}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Stavke section -->
  <div class="inv-section">
    <h3 class="section-title">Stavke</h3>
    <table class="items-table">
      <thead>
        <tr>
          <th class="col-code">Šifra robe</th>
          <th>Naziv robe/usluge</th>
          <th>J.mj.</th>
          <th class="num">Količina</th>
          <th class="num">Cijena</th>
          <th class="num">Iznos</th>
        </tr>
      </thead>
      <tbody>
        {#each store.invoice.items as item, i}
          <tr>
            <td class="col-code">{i + 1}</td>
            <td>{item.name}</td>
            <td>{item.unit}</td>
            <td class="num">{formatNum(parseFloat(item.quantity) || 0)}</td>
            <td class="num">{formatNum(parseFloat(item.price) || 0)}</td>
            <td class="num">{formatNum(itemTotal(item))}</td>
          </tr>
        {/each}
        {#if store.invoice.items.length > 0}
          <tr class="total-row">
            <td colspan="3"></td>
            <td class="num">{formatNum(totalQuantity)}</td>
            <td></td>
            <td class="num"><strong>{formatNum(grandTotal)} €</strong></td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>

  <!-- Ukupan iznos -->
  <div class="inv-section">
    <h3 class="section-title">Ukupan iznos računa</h3>
    <p class="total-label">Ukupno €</p>
    <p class="total-value">{formatNum(grandTotal)}</p>
  </div>

  <!-- PDV free -->
  {#if store.company.isPdvFree}
    <div class="inv-section">
      <h3 class="section-title">Oslobođenje od PDV-a</h3>
      <p class="sub-label">Zakonska osnova</p>
      <p>{store.company.pdvFreeText}</p>
    </div>
  {/if}

  <!-- Footer -->
  <footer class="invoice-footer">
    <p>{footerParts.join(', ')}</p>
    {#if store.company.otherInfo}
      <p>{store.company.otherInfo}</p>
    {/if}
  </footer>
</div>

<style>
  .invoice {
    background: white;
    padding: 28px 32px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 10px;
    color: #000;
    line-height: 1.4;
    width: 660px;
    flex-shrink: 0;
    min-height: 933px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }

  /* ── company header ──────────────────────────────── */

  .company-header {
    text-align: center;
    margin-bottom: 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .company-name {
    font-size: 12px;
    font-weight: bold;
  }

  /* ── customer address ────────────────────────────── */

  .customer-address {
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .customer-address strong {
    font-size: 11px;
  }

  /* ── invoice title row ───────────────────────────── */

  .invoice-title-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 18px;
  }

  .invoice-title {
    font-size: 16px;
    font-weight: bold;
    color: #000;
  }

  .invoice-date-block {
    text-align: right;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .date-label {
    font-size: 9px;
    color: #666;
  }

  .date-value {
    font-size: 11px;
    font-weight: 500;
  }

  /* ── sections ────────────────────────────────────── */

  .inv-section {
    margin-bottom: 16px;
  }

  .section-title {
    font-size: 11px;
    font-weight: bold;
    border-bottom: 1px solid #000;
    padding-bottom: 2px;
    margin-bottom: 6px;
  }

  .total-label {
    font-size: 10px;
    color: #555;
    margin-top: 4px;
  }

  .total-value {
    font-size: 12px;
    font-weight: bold;
    margin-top: 2px;
  }

  .sub-label {
    font-size: 10px;
    color: #555;
    margin-bottom: 3px;
  }

  /* ── tables ──────────────────────────────────────── */

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9px;
  }

  th {
    background: #ebebeb;
    font-weight: 600;
    padding: 4px 6px;
    text-align: left;
    border: 1px solid #ccc;
  }

  td {
    padding: 4px 6px;
    border: 1px solid #ccc;
    vertical-align: top;
  }

  .num {
    text-align: right;
  }

  .col-code {
    width: 64px;
  }

  .total-row td {
    border-top: 2px solid #aaa;
    font-weight: 600;
  }

  /* ── print ───────────────────────────────────────── */

  @media print {
    @page {
      size: A4 portrait;
      margin: 0;
    }

    .invoice {
      width: 100%;
      min-height: 0;
      box-shadow: none;
      padding: 14mm 18mm;
    }
  }

  /* ── footer ──────────────────────────────────────── */

  .invoice-footer {
    margin-top: 32px;
    padding-top: 8px;
    border-top: 1px solid #ccc;
    font-size: 9px;
    color: #555;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
</style>
