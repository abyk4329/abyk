# abykonline

This repository runs a Vite + React app located in the `abykonline/` subfolder.

## Run locally

- Development server (port 3003):

```sh
pnpm dev
```

- Build:

```sh
pnpm build
```

- Preview build (serves dist on port 3003):

```sh
pnpm preview
```

## Notes
- Vite dev server is configured to listen on port 3003 and all network interfaces.
- Root package.json delegates scripts to the app in `abykonline/`.
