/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            lineHeight: '1.8',
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
            'h2': {
              marginTop: '2em',
              marginBottom: '0.75em',
            },
            'h3': {
              marginTop: '1.5em',
              marginBottom: '0.5em',
            },
            ul: {
              marginTop: '1em',
              marginBottom: '1em',
            },
            li: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': '#cbd5e1',
            '--tw-prose-headings': '#f1f5f9',
            '--tw-prose-lead': '#94a3b8',
            '--tw-prose-links': '#38bdf8',
            '--tw-prose-bold': '#f1f5f9',
            '--tw-prose-counters': '#64748b',
            '--tw-prose-bullets': '#475569',
            '--tw-prose-hr': '#334155',
            '--tw-prose-quotes': '#cbd5e1',
            '--tw-prose-quote-borders': '#334155',
            '--tw-prose-captions': '#64748b',
            '--tw-prose-code': '#f1f5f9',
            '--tw-prose-pre-code': '#cbd5e1',
            '--tw-prose-pre-bg': '#1e293b',
            '--tw-prose-th-borders': '#475569',
            '--tw-prose-td-borders': '#334155',
            lineHeight: '1.8',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
