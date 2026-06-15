// ── GENERIC PLANT-STAGE SVG ICONS ────────────────────────────
// Simple, line-based icons representing phenological stages.
// Designed to work on both light and dark themes via currentColor / CSS variables.

const STAGE_ICONS = {
  dormancy: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 40V18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M24 24L16 18M24 24L32 18M24 30L17 25M24 30L31 25" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="24" cy="14" r="2" fill="currentColor" opacity="0.5"/>
    <circle cx="16" cy="18" r="1.5" fill="currentColor" opacity="0.5"/>
    <circle cx="32" cy="18" r="1.5" fill="currentColor" opacity="0.5"/>
    <path d="M10 40h28" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
  </svg>`,

  emerge: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 40V22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M24 26C24 26 16 24 14 18C14 18 22 18 24 26Z" fill="currentColor" opacity="0.18" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    <path d="M24 22C24 22 32 20 34 14C34 14 26 14 24 22Z" fill="currentColor" opacity="0.18" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    <path d="M10 40h28" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
  </svg>`,

  flower: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 40V24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <circle cx="24" cy="14" r="4" fill="currentColor" opacity="0.25" stroke="currentColor" stroke-width="2"/>
    <circle cx="17" cy="18" r="3.5" fill="currentColor" opacity="0.25" stroke="currentColor" stroke-width="2"/>
    <circle cx="31" cy="18" r="3.5" fill="currentColor" opacity="0.25" stroke="currentColor" stroke-width="2"/>
    <circle cx="24" cy="14" r="1.3" fill="currentColor"/>
    <circle cx="17" cy="18" r="1" fill="currentColor"/>
    <circle cx="31" cy="18" r="1" fill="currentColor"/>
    <path d="M10 40h28" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
  </svg>`,

  fruitset: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 40V22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M24 24L16 20M24 24L32 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <circle cx="16" cy="22" r="3" fill="currentColor" opacity="0.3" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="32" cy="22" r="3" fill="currentColor" opacity="0.3" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="24" cy="17" r="3" fill="currentColor" opacity="0.3" stroke="currentColor" stroke-width="1.5"/>
    <path d="M10 40h28" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
  </svg>`,

  fruitdev: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 40V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M24 22L15 17M24 22L33 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <circle cx="15" cy="19" r="4.5" fill="currentColor" opacity="0.32" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="33" cy="19" r="4.5" fill="currentColor" opacity="0.32" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="24" cy="14" r="4.5" fill="currentColor" opacity="0.32" stroke="currentColor" stroke-width="1.5"/>
    <path d="M10 40h28" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
  </svg>`,

  ripening: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 40V22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M24 24L16 19M24 24L32 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <circle cx="16" cy="21" r="4.5" fill="currentColor" opacity="0.55" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="32" cy="21" r="4.5" fill="currentColor" opacity="0.55" stroke="currentColor" stroke-width="1.5"/>
    <path d="M10 40h28" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
  </svg>`,

  stress: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 40V24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M24 26L17 21M24 26L31 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M14 12L17 8M24 10L24 6M34 12L31 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <circle cx="14" cy="14" r="1.3" fill="currentColor"/>
    <circle cx="24" cy="12" r="1.3" fill="currentColor"/>
    <circle cx="34" cy="14" r="1.3" fill="currentColor"/>
    <path d="M10 40h28" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
  </svg>`,

  maintenance: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 40V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M24 24c-4-2-8 0-10 4M24 28c4-2 8 0 10 4M24 20c-3-3-3-7 0-10M24 20c3-3 3-7 0-10" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.7"/>
    <path d="M10 40h28" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
  </svg>`,

  generic: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 40V18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M24 24c-5-1-9 2-11 6M24 20c5-1 9 2 11 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.6"/>
    <circle cx="24" cy="14" r="3" fill="currentColor" opacity="0.3" stroke="currentColor" stroke-width="1.5"/>
    <path d="M10 40h28" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
  </svg>`,
};
