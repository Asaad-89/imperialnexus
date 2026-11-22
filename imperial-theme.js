/* ══════════════════════════════════════════════════════════════════════
   IMPERIAL NEXUS — طبقة الهوية البصرية + أيقونات المنتجات
   إصدار 4  |  2026-08-04  |  + العلامة المائية (الهيرو فقط)
   طبقة عرض فقط: لا تمسّ الكتالوج ولا الحسابات ولا محرّك التوافق.
   للتراجع: احذف سطر <script> الذي يستدعي هذا الملف.
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* ---------- 1) خط IBM Plex Mono ---------- */
  if (!document.getElementById("inx-mono-font")) {
    var lk = document.createElement("link");
    lk.id = "inx-mono-font";
    lk.rel = "stylesheet";
    lk.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap";
    document.head.appendChild(lk);
  }

  /* ---------- 2) طبقة الهوية البصرية ---------- */
  var CSS = [
    ":root{--inx-mono:'IBM Plex Mono',ui-monospace,monospace;--inx-panel:#0E0C08;",
    "--inx-hair:rgba(201,150,46,.18);--inx-hair-2:rgba(201,150,46,.55);",
    "--inx-glow:0 14px 40px -18px rgba(201,150,46,.8);}",
    "@keyframes inx-line{from{transform:scaleX(0)}to{transform:scaleX(1)}}",
    "@keyframes inx-rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}",

    ".display{font-weight:300;line-height:1.06;letter-spacing:-.015em;}",

    ".eyebrow{font-family:var(--inx-mono);font-weight:400;font-size:11px;letter-spacing:.28em;gap:14px;}",
    ".eyebrow::before{content:'';width:44px;height:1px;background:var(--gold);flex:0 0 auto;}",
    ".sec-light .eyebrow,.on-light .eyebrow{color:var(--gold-deep);}",

    ".hero{position:relative;}",
    ".hero::before{content:'';position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.5;",
    "background-image:radial-gradient(rgba(201,150,46,.22) 1px,transparent 1px),",
    "linear-gradient(rgba(201,150,46,.05) 1px,transparent 1px),",
    "linear-gradient(90deg,rgba(201,150,46,.05) 1px,transparent 1px);",
    "background-size:52px 52px,52px 52px,52px 52px;}",
    ".hero::after{content:'';position:absolute;inset:0;pointer-events:none;z-index:0;",
    "background:radial-gradient(120% 80% at 50% 0%,rgba(201,150,46,.14),transparent 60%),",
    "linear-gradient(180deg,transparent 40%,var(--ink) 100%);}",
    ".hero-inner{position:relative;z-index:2;}",
    ".hero-inner::before{content:'';position:absolute;inset-inline-end:-14%;top:-18%;width:52%;height:136%;",
    "pointer-events:none;z-index:-1;background:linear-gradient(160deg,rgba(240,220,160,.09),rgba(110,78,27,.02));",
    "clip-path:polygon(28% 0,100% 0,100% 100%,0 100%);border-inline-start:1px solid rgba(201,150,46,.35);}",
    "@media(max-width:900px){.hero-inner::before{display:none;}}",

    ".sec-dark{position:relative;}",
    ".sec-dark::before{content:'';position:absolute;inset:0;pointer-events:none;opacity:.45;",
    "background-image:radial-gradient(rgba(201,150,46,.16) 1px,transparent 1px);background-size:44px 44px;}",
    ".sec-dark>*{position:relative;z-index:1;}",

    ".site-header{background:rgba(7,6,10,.82);backdrop-filter:blur(18px);",
    "-webkit-backdrop-filter:blur(18px);border-bottom:1px solid var(--inx-hair);}",

    ".card{background:var(--inx-panel);border:1px solid var(--inx-hair);border-radius:4px;}",
    ".card:hover{transform:translateY(-4px);border-color:var(--inx-hair-2);",
    "box-shadow:0 24px 50px -30px rgba(0,0,0,.6);}",
    ".sec-light .card,.on-light .card{background:#FFF;border-color:rgba(26,24,20,.10);}",

    ".svc-card{border-radius:4px;}",
    ".svc-card::after{content:'';position:absolute;top:0;inset-inline-start:0;width:100%;height:2px;z-index:3;",
    "background:var(--gold-grad);transform-origin:left;animation:inx-line .6s ease both;}",
    "[dir='rtl'] .svc-card::after{transform-origin:right;}",

    ".stat b{font-family:'Cormorant Garamond',serif;font-weight:300;background-image:var(--gold-grad);",
    "-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;}",
    ".stat span{font-family:var(--inx-mono);font-size:10px;letter-spacing:.22em;",
    "text-transform:uppercase;color:var(--taupe);}",

    ".btn{border-radius:3px;transition:transform .3s ease,filter .3s ease,border-color .3s ease,color .3s ease;}",
    ".btn-primary{box-shadow:var(--inx-glow);}",
    ".btn-primary:hover{transform:translateY(-2px);filter:brightness(1.10);}",
    ".btn-ghost:hover{border-color:var(--gold);color:var(--gold-hi);}",

    ".field input,.field select,.field textarea{border-radius:3px;transition:border-color .3s ease;}",
    ".field input:focus,.field select:focus,.field textarea:focus{border-color:var(--gold);outline:none;}",

    ".dz-panel{background:var(--inx-panel);border:1px solid var(--inx-hair);border-radius:5px;}",
    ".dz-panel-head{border-bottom:1px solid var(--inx-hair);}",
    ".dz-empty{animation:inx-rise .5s ease both;}",
    ".num,.breadcrumb{font-family:var(--inx-mono);letter-spacing:.20em;}",

    /* أيقونات المنتجات */
    ".dz-prod{gap:12px;}",
    ".dz-thumb{flex:0 0 auto;width:40px;height:40px;display:grid;place-items:center;",
    "border:1px solid var(--inx-hair);border-radius:3px;color:var(--gold);",
    "background:linear-gradient(160deg,rgba(240,220,160,.07),rgba(110,78,27,.03));",
    "transition:border-color .3s ease,color .3s ease;}",
    ".dz-prod:hover .dz-thumb{border-color:var(--inx-hair-2);color:var(--gold-hi);}",
    ".dz-thumb svg{width:28px;height:28px;display:block;}",
    ".dz-prod-info{flex:1 1 auto;min-width:0;}",
    "@media(max-width:520px){.dz-thumb{width:34px;height:34px;}.dz-thumb svg{width:24px;height:24px;}}",

    "@media(prefers-reduced-motion:reduce){*,*::before,*::after{",
    "animation-duration:.001ms !important;transition-duration:.001ms !important;}}"
  ].join("");

  if (!document.getElementById("inx-theme-css")) {
    var st = document.createElement("style");
    st.id = "inx-theme-css";
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  /* ---------- 3) أيقونات الفئات (SVG أصلية) ---------- */
  var A = '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round">';
  var ICONS = {
    router: A + '<rect x="6" y="23" width="28" height="10" rx="1.6"/><circle cx="11" cy="28" r="1"/><circle cx="15" cy="28" r="1"/><path d="M13 23 L10 13"/><path d="M27 23 L30 13"/><path d="M8.5 12.5 a4 4 0 0 1 3 -1.5"/><path d="M31.5 12.5 a4 4 0 0 0 -3 -1.5"/></svg>',
    switch: A + '<rect x="4" y="16" width="32" height="11" rx="1.6"/><path d="M8 24 h2 M12 24 h2 M16 24 h2 M20 24 h2 M24 24 h2 M28 24 h2"/><circle cx="9" cy="19.5" r="1"/><path d="M13 19.5 h18"/></svg>',
    ap: A + '<path d="M10 30 a10 10 0 0 1 20 0 z"/><path d="M8 30 h24"/><circle cx="20" cy="26" r="1.2"/><path d="M13 16 a9 9 0 0 1 14 0"/><path d="M16.5 12 a13.5 13.5 0 0 1 7 0"/></svg>',
    camera: A + '<path d="M11 24 a9 9 0 0 1 18 0 z"/><path d="M9 24 h22"/><circle cx="20" cy="20" r="4"/><circle cx="20" cy="20" r="1.4"/><path d="M20 28 v5"/><path d="M16 33 h8"/></svg>',
    nvr: A + '<rect x="5" y="15" width="30" height="13" rx="1.6"/><circle cx="13" cy="21.5" r="3.6"/><circle cx="13" cy="21.5" r="1"/><path d="M21 18.5 h9 M21 21.5 h9 M21 24.5 h6"/></svg>',
    transceiver: A + '<rect x="7" y="16" width="19" height="9" rx="1.4"/><path d="M26 18 h5 a1.5 1.5 0 0 1 1.5 1.5 v2 a1.5 1.5 0 0 1 -1.5 1.5 h-5"/><circle cx="13" cy="20.5" r="1.6"/><circle cx="19" cy="20.5" r="1.6"/></svg>',
    cable: A + '<rect x="14" y="8" width="12" height="10" rx="1.2"/><path d="M17 8 v-3 M20 8 v-3 M23 8 v-3"/><path d="M20 18 v4 c0 5 -8 5 -8 10"/><path d="M12 34 h-2 M12 34 h2"/></svg>',
    cabinet: A + '<rect x="11" y="5" width="18" height="28" rx="1.4"/><path d="M11 12 h18 M11 19 h18 M11 26 h18"/><circle cx="15" cy="8.5" r="0.9"/><path d="M14 33 v3 M26 33 v3"/></svg>'
  };

  /* ---------- 4) خريطة المنتجات الـ97 → الفئة ---------- */
  var BYCAT = {
    cabinet: ["cab-6u", "cab-9u", "cab-12u", "cab-22u", "cab-32u", "cab-42u", "cab-15u", "cab-27u"],
    router: ["fg-40f", "fg-60f", "fg-100f", "isr-1100", "isr-4331", "pa-440", "pa-1410", "srx-300",
      "er-x", "fg-80f", "fg-200f", "isr-4451", "asr-1001", "pa-3220", "pa-850", "srx-380",
      "srx-320", "er-12p", "udm-pro"],
    switch: ["cat-9200-24", "cat-9200-48", "cbs-350-24", "aruba-6100-24", "aruba-2930-48",
      "aruba-instant-1930", "ex2300-24", "usw-24-poe", "usw-48-poe", "usw-pro-24-poe",
      "dell-n1548p", "cat-9300-24", "cat-9300-48", "sg350-52", "aruba-6300m-48",
      "aruba-2530-24", "ex3400-48", "ex2300-48", "usw-ent-24-poe", "dell-n2148p", "dell-n1524p"],
    ap: ["u6-lite", "u6-pro", "u6-enterprise", "aruba-ap22", "aruba-ap635", "cisco-9120",
      "cisco-9166", "u7-pro", "u6-mesh", "aruba-ap655", "aruba-ap515", "cisco-9130", "cisco-9105"],
    nvr: ["hik-nvr-8", "hik-nvr-16", "hik-nvr-32", "uni-nvr", "axis-s30", "hik-nvr-64",
      "hik-nvr-4", "axis-s3016"],
    camera: ["hik-dome", "hik-bullet", "hik-ptz", "uni-g5-bullet", "uni-g5-dome", "axis-m20",
      "axis-p32", "hik-turret", "hik-fisheye", "uni-g5-turret", "uni-g5-ptz", "axis-p14", "axis-q60"],
    transceiver: ["sfp-1g", "sfp-plus-10g", "sfp-plus-10g-lr", "dac-10g", "sfp-1g-sx", "qsfp-40g"],
    cable: ["cat6-box", "cat6a-box", "fiber-om4", "patch-1m", "patch-2m", "patch-panel-24",
      "cat6-patch-panel-48", "fiber-os2", "patch-3m"]
  };

  var LUT = {};
  for (var c in BYCAT) {
    for (var i = 0; i < BYCAT[c].length; i++) LUT[BYCAT[c][i]] = c;
  }


  /* ---------- 6) العلامة المائية (المونوغرام) خلف الهيرو والأقسام ---------- */
  var MONO = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwMCAyMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPgoKICAKICA8ZGVmcyBpZD0iZGVmczE2NzI1NCI+CiAgICA8bGluZWFyR3JhZGllbnQgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgyLjM3OTI0MywwLDAsMi4zNzkyNDMsLTEzNy45MjQzLC0xMzYuMjg2NDcpIiB5Mj0iMTIzLjMyMDg3IiB4Mj0iOTkuOTg0OTAxIiB5MT0iODguMjk2NjU0IiB4MT0iOTkuOTg0OTAxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImE1MTlmZGE2LTI1ZmItNGRkNC05ZjBlLWY0NjY1YzYyMzQ1YSI+CiAgICAgIDxzdG9wIGlkPSJzdG9wMTMiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDAwMDA7c3RvcC1vcGFjaXR5OjAuNCIgb2Zmc2V0PSIwIj48L3N0b3A+CiAgICAgIDxzdG9wIGlkPSJzdG9wMTUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwRjBEMEQ7c3RvcC1vcGFjaXR5OjAuMjg5NjIiIG9mZnNldD0iMC4yNzU5NSI+PC9zdG9wPgogICAgICA8c3RvcCBpZD0ic3RvcDE3IiBzdHlsZT0ic3RvcC1jb2xvcjojMUUxQTFCO3N0b3Atb3BhY2l0eTowLjEzMDA2IiBvZmZzZXQ9IjAuNjc0ODQiPjwvc3RvcD4KICAgICAgPHN0b3AgaWQ9InN0b3AxOSIgc3R5bGU9InN0b3AtY29sb3I6IzIzMUYyMDtzdG9wLW9wYWNpdHk6MCIgb2Zmc2V0PSIxIj48L3N0b3A+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IHkyPSI3Ny40NTcwMjQiIHgyPSIxMDQuMjAyNTQiIHkxPSI4NS4wNjU0ODMiIHgxPSI5Ni4wODY4NTMiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iMGFmZGEzMDYtM2U2YS00ZjQ4LWFiZmItODM2MGQ5NDNlOGI1Ij4KICAgICAgPHN0b3AgaWQ9InN0b3AyNCIgc3R5bGU9InN0b3AtY29sb3I6IzAwMDAwMDtzdG9wLW9wYWNpdHk6MC40IiBvZmZzZXQ9IjAiPjwvc3RvcD4KICAgICAgPHN0b3AgaWQ9InN0b3AyNiIgc3R5bGU9InN0b3AtY29sb3I6IzBGMEQwRDtzdG9wLW9wYWNpdHk6MC4yODk2MiIgb2Zmc2V0PSIwLjI3NTk1Ij48L3N0b3A+CiAgICAgIDxzdG9wIGlkPSJzdG9wMjgiIHN0eWxlPSJzdG9wLWNvbG9yOiMxRTFBMUI7c3RvcC1vcGFjaXR5OjAuMTMwMDYiIG9mZnNldD0iMC42NzQ4NCI+PC9zdG9wPgogICAgICA8c3RvcCBpZD0ic3RvcDMwIiBzdHlsZT0ic3RvcC1jb2xvcjojMjMxRjIwO3N0b3Atb3BhY2l0eTowIiBvZmZzZXQ9IjEiPjwvc3RvcD4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgeTI9Ijg4LjkyOTIzIiB4Mj0iOTIuNDc5NzI5IiB5MT0iODEuMjAzNjEzIiB4MT0iMTAwLjIwNTM2IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9IjhlZjZlZDhjLTRjYjUtNDJmOS05OGYyLWM0MzY1MGI4MzNhMSI+CiAgICAgIDxzdG9wIGlkPSJzdG9wMzUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRkZGRkY7c3RvcC1vcGFjaXR5OjAuNSIgb2Zmc2V0PSIwIj48L3N0b3A+CiAgICAgIDxzdG9wIGlkPSJzdG9wMzciIHN0eWxlPSJzdG9wLWNvbG9yOiNGRkZGRkY7c3RvcC1vcGFjaXR5OjAuNDkzMDkiIG9mZnNldD0iMC4wMTM4MyI+PC9zdG9wPgogICAgICA8c3RvcCBpZD0ic3RvcDM5IiBzdHlsZT0ic3RvcC1jb2xvcjojRkZGRkZGO3N0b3Atb3BhY2l0eTowIiBvZmZzZXQ9IjEiPjwvc3RvcD4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iM2RfZ3JhZGllbnQyLWxvZ28tOGFmYzM0NWEtMjdkZi00YjZhLTg3NzctMjg3MmI2ZTI5NjY4IiB4MT0iMzAlIiB5MT0iMTIwJSIgeDI9Ii0xMCUiIHkyPSIzMCUiIHNwcmVhZE1ldGhvZD0icGFkIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZmZmZmYiIHN0b3Atb3BhY2l0eT0iMSIgaWQ9InN0b3AxNjcyMzEiPjwvc3RvcD4KICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIxIiBpZD0ic3RvcDE2NzIzMyI+PC9zdG9wPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPGxpbmVhckdyYWRpZW50IGlkPSIzZF9ncmFkaWVudDMtbG9nby04YWZjMzQ1YS0yN2RmLTRiNmEtODc3Ny0yODcyYjZlMjk2NjgiIHgxPSIzMCUiIHkxPSIxMjAlIiB4Mj0iLTEwJSIgeTI9IjMwJSIgc3ByZWFkTWV0aG9kPSJwYWQiIGdyYWRpZW50VHJhbnNmb3JtPSJyb3RhdGUoLTMwKSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZmZmZmZmIiBzdG9wLW9wYWNpdHk9IjEiIGlkPSJzdG9wMTY3MjM2Ij48L3N0b3A+CiAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iI2NjY2NjYyIgc3RvcC1vcGFjaXR5PSIxIiBpZD0ic3RvcDE2NzIzOCI+PC9zdG9wPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjEiIGlkPSJzdG9wMTY3MjQwIj48L3N0b3A+CiAgPC9saW5lYXJHcmFkaWVudD4KICA8cG9seWdvbiBzdHlsZT0iZm9udC1zdHlsZTpub3JtYWw7Zm9udC13ZWlnaHQ6bm9ybWFsO2ZvbnQtc2l6ZTptZWRpdW07bGluZS1oZWlnaHQ6MTtmb250LWZhbWlseTomIzM5O0JyYW5kbWFyayBTYW5zIDI4JiMzOTs7Zm9udC12YXJpYW50LWxpZ2F0dXJlczpub3JtYWw7dGV4dC1hbGlnbjpjZW50ZXI7dGV4dC1hbmNob3I6bWlkZGxlO2ZpbGw6I2M1OTQzMDtzdHJva2U6I2M1OTQzMDtzdHJva2Utd2lkdGg6MDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6MiIgaWQ9InBvbHlnb24xMSIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHRyYW5zZm9ybT0ibWF0cml4KDIuMzc5MjQzLDAsMCwyLjM3OTI0MywtMTM3LjkyNDMsLTEzNi4yODY0NykiIHBvaW50cz0iOTIuNjg0NTcsNzQuMTExMzMgOTIuNjg0NTcsODguNzI0NDMgOTIuNjg0NTcsOTEuMzI3OTQgOTIuNjg0NTcsMTI0LjUyOTcyIDEwNy4yODUxNiwxMjQuNTI5NzIgMTA3LjI4NTE2LDkxLjMyNzM5IDEwNy4yODUxNiw4OC43MjU1MiAxMDcuMjg1MTYsNzQuMTExMzMgIiBjbGFzcz0iYzEiPjwvcG9seWdvbj4KICA8cmVjdCBzdHlsZT0iZm9udC1zdHlsZTpub3JtYWw7Zm9udC13ZWlnaHQ6bm9ybWFsO2ZvbnQtc2l6ZTptZWRpdW07bGluZS1oZWlnaHQ6MTtmb250LWZhbWlseTomIzM5O0JyYW5kbWFyayBTYW5zIDI4JiMzOTs7Zm9udC12YXJpYW50LWxpZ2F0dXJlczpub3JtYWw7dGV4dC1hbGlnbjpjZW50ZXI7dGV4dC1hbmNob3I6bWlkZGxlO29wYWNpdHk6MTtmaWxsOnVybCgjYTUxOWZkYTYtMjVmYi00ZGQ0LTlmMGUtZjQ2NjVjNjIzNDVhKTtzdHJva2Utd2lkdGg6MDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6MiIgaWQ9InJlY3QyMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIGhlaWdodD0iODUuMTg4MTMzIiB3aWR0aD0iMzQuNzM4MTM2IiBjbGFzcz0iaGlnaGxpZ2h0IiB5PSI3NC44MTE4NDQiIHg9IjgyLjU5NDk5NCI+PC9yZWN0PgogIDxwb2x5Z29uIHN0eWxlPSJmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDpub3JtYWw7Zm9udC1zaXplOm1lZGl1bTtsaW5lLWhlaWdodDoxO2ZvbnQtZmFtaWx5OiYjMzk7QnJhbmRtYXJrIFNhbnMgMjgmIzM5Oztmb250LXZhcmlhbnQtbGlnYXR1cmVzOm5vcm1hbDt0ZXh0LWFsaWduOmNlbnRlcjt0ZXh0LWFuY2hvcjptaWRkbGU7b3BhY2l0eToxO2ZpbGw6dXJsKCMwYWZkYTMwNi0zZTZhLTRmNDgtYWJmYi04MzYwZDk0M2U4YjUpO3N0cm9rZS13aWR0aDowO3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDoyIiBpZD0icG9seWdvbjMzIiBzdHJva2UtbWl0ZXJsaW1pdD0iMiIgdHJhbnNmb3JtPSJtYXRyaXgoMi4zNzkyNDMsMCwwLDIuMzc5MjQzLC0xMzcuOTI0MywtMTM2LjI4NjQ3KSIgcG9pbnRzPSIxMDcuMjg1MTYsODguNjk0MTUgMTA3LjI4NTE2LDc0LjExMTMzIDkyLjcwMjM5LDc0LjExMTMzICIgY2xhc3M9ImhpZ2hsaWdodCI+PC9wb2x5Z29uPgogIDxwb2x5Z29uIHN0eWxlPSJmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDpub3JtYWw7Zm9udC1zaXplOm1lZGl1bTtsaW5lLWhlaWdodDoxO2ZvbnQtZmFtaWx5OiYjMzk7QnJhbmRtYXJrIFNhbnMgMjgmIzM5Oztmb250LXZhcmlhbnQtbGlnYXR1cmVzOm5vcm1hbDt0ZXh0LWFsaWduOmNlbnRlcjt0ZXh0LWFuY2hvcjptaWRkbGU7b3BhY2l0eToxO2ZpbGw6dXJsKCM4ZWY2ZWQ4Yy00Y2I1LTQyZjktOThmMi1jNDM2NTBiODMzYTEpO3N0cm9rZS13aWR0aDowO3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDoyIiBpZD0icG9seWdvbjQyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMiIgdHJhbnNmb3JtPSJtYXRyaXgoMi4zNzkyNDMsMCwwLDIuMzc5MjQzLC0xMzcuOTI0MywtMTM2LjI4NjQ3KSIgcG9pbnRzPSI5Mi42ODQ1Niw4OC43MjQ0MiAxMDcuMzE1NDUsODguNzI0NDIgOTIuNjg0NTUsNzQuMDkzNTEgIiBjbGFzcz0iaGlnaGxpZ2h0Ij48L3BvbHlnb24+Cgo8L3N2Zz4=";

  var CSS2 = [
    ".inx-wm{position:absolute;inset-inline-end:4%;top:50%;transform:translateY(-50%);",
    "height:min(78%,560px);width:auto;opacity:.10;pointer-events:none;z-index:0;user-select:none;}",
    "@media(max-width:900px){.inx-wm{height:min(50%,320px);opacity:.06;inset-inline-end:-6%;}}"
  ].join("");

  if (!document.getElementById("inx-wm-css")) {
    var st2 = document.createElement("style");
    st2.id = "inx-wm-css";
    st2.textContent = CSS2;
    document.head.appendChild(st2);
  }

  function watermark() {
    /* الهيرو فقط. الموقع يحوي 22 قسماً داكناً — وضعها في كلٍّ منها يُفسد التصميم. */
    var hosts = document.querySelectorAll(".hero");
    for (var i = 0; i < hosts.length; i++) {
      var host = hosts[i];
      if (host.querySelector(":scope > .inx-wm")) continue;
      if (getComputedStyle(host).position === "static") host.style.position = "relative";
      var img = document.createElement("img");
      img.className = "inx-wm";
      img.src = MONO;
      img.alt = "";
      img.setAttribute("aria-hidden", "true");
      host.insertBefore(img, host.firstChild);
    }
  }


  /* ---------- 7) الهيدر: حذف الأيقونة، تكبير الشعار، السطر التعريفي ---------- */
  var CSS3 = [
    ".brand{flex:0 0 auto !important;flex-direction:column !important;",
    "align-items:flex-start !important;gap:5px !important;}",
    ".brand .brand-icon{display:none !important;}",
    ".brand .brand-logo{width:min(230px,42vw) !important;max-width:none !important;height:auto !important;}",
    ".inx-tagline{font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:8.5px;",
    "letter-spacing:.3em;color:var(--taupe,#A2937A);text-transform:uppercase;",
    "line-height:1;white-space:nowrap;}",
    "@media(max-width:640px){.brand .brand-logo{width:150px !important;}",
    ".inx-tagline{font-size:7.5px;letter-spacing:.22em;}}",
    "/* اخفاء كتلة الاحصاءات في الهيرو */",
    ".hero-stats{display:none !important;}"
  ].join("");

  if (!document.getElementById("inx-brand-css")) {
    var st3 = document.createElement("style");
    st3.id = "inx-brand-css";
    st3.textContent = CSS3;
    document.head.appendChild(st3);
  }

  function brand() {
    var b = document.querySelector(".brand");
    if (!b || b.querySelector(".inx-tagline")) return;
    var span = document.createElement("span");
    span.className = "inx-tagline";
    span.textContent = "Powering Connectivity";
    b.appendChild(span);
  }

  /* ---------- 5) حقن الأيقونة في كل صف منتج ---------- */
  var queued = false;

  function paint() {
    queued = false;
    watermark();
    brand();
    var rows = document.querySelectorAll(".dz-prod[data-pid]");
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      if (row.querySelector(".dz-thumb")) continue;
      var cat = LUT[row.getAttribute("data-pid")];
      if (!cat || !ICONS[cat]) continue;
      var span = document.createElement("span");
      span.className = "dz-thumb";
      span.setAttribute("aria-hidden", "true");
      span.innerHTML = ICONS[cat];
      row.insertBefore(span, row.firstChild);
    }
  }

  /* setTimeout وليس requestAnimationFrame — الأخير لا يعمل في تبويب مخفي */
  function schedule() {
    if (queued) return;
    queued = true;
    setTimeout(paint, 0);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", schedule);
  } else {
    schedule();
  }
  window.addEventListener("hashchange", schedule);

  try {
    new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  } catch (e) { /* متصفح قديم — الحقن الأولي يكفي */ }
})();
