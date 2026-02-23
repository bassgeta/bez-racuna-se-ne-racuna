<script lang="ts">
  import { store } from './lib/store.svelte';
  import CompanyTab from './lib/CompanyTab.svelte';
  import CustomerTab from './lib/CustomerTab.svelte';
  import InvoicePreview from './lib/InvoicePreview.svelte';

  let activeTab = $state(0);

  const TABS = ['Tvrtka', 'Kupac i stavke'] as const;

  $effect(() => {
    localStorage.setItem('company', JSON.stringify($state.snapshot(store.company)));
  });
  $effect(() => {
    localStorage.setItem('customer', JSON.stringify($state.snapshot(store.customer)));
  });
  $effect(() => {
    localStorage.setItem('invoice', JSON.stringify($state.snapshot(store.invoice)));
  });
</script>

<div class="app">
  <div class="left-col">
    <nav class="tabs">
      {#each TABS as tab, i}
        <button class="tab" class:active={activeTab === i} onclick={() => (activeTab = i)}>
          {tab}
        </button>
      {/each}
    </nav>

    <div class="panel">
      {#if activeTab === 0}
        <CompanyTab />
      {:else if activeTab === 1}
        <CustomerTab />
      {:else}
        <CustomerTab />
      {/if}
    </div>
  </div>

  <div class="right-col">
    <div class="print-bar">
      <button class="btn print-btn" onclick={() => window.print()}>Spremi PDF / Ispiši</button>
    </div>
    <InvoicePreview />
  </div>
</div>

<style>
  .app {
    display: flex;
    height: 100vh;
    width: 100%;
    overflow: hidden;
  }

  /* ── left column ─────────────────────────────────── */

  .left-col {
    width: 400px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #bbb;
    background: #f0f0f0;
    overflow: hidden;
  }

  .tabs {
    display: flex;
    border-bottom: 1px solid #ccc;
    background: white;
    flex-shrink: 0;
  }

  .tab {
    flex: 1;
    padding: 12px 8px;
    border: none;
    border-bottom: 2px solid transparent;
    border-radius: 0;
    background: white;
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    color: #888;
    transition: color 0.15s, border-color 0.15s, background 0.15s;
  }

  .tab:hover {
    background: #f8f8f8;
    color: #444;
  }

  .tab.active {
    color: #1a1a1a;
    border-bottom-color: #1a1a1a;
    font-weight: 600;
  }

  .panel {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
  }

  /* ── right column ────────────────────────────────── */

  .right-col {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    background: #d8d8d8;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .print-bar {
    width: 660px;
    flex-shrink: 0;
    display: flex;
    justify-content: flex-end;
  }

  /* ── print ───────────────────────────────────────── */

  @media print {
    .app {
      display: block;
      height: auto;
      overflow: visible;
    }

    .left-col,
    .print-bar {
      display: none;
    }

    .right-col {
      display: block;
      padding: 0;
      background: none;
      overflow: visible;
    }
  }
</style>
