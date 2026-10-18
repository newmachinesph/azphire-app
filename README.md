# AZPHire (RemoteTalent)

![License: MIT](https://img.shields.io/badge/license-MIT-green) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

A front-end prototype of a remote-hiring marketplace connecting employers with Philippine job seekers. It contains the auth screens plus employer and job-seeker dashboards (jobs, candidates, applications, messaging, billing, API keys). All data is hard-coded mock data; there is no backend and authentication is not implemented.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run start
npm run lint
```

Optional: set `NEXT_PUBLIC_LANDING_URL` to point the auth screens at a landing site.

## Structure

```
src/app/(auth)        login, register, password reset, email verification
src/app/(dashboard)   employer/ and job-seeker/ dashboards
src/components        shared UI per area (auth, employer, job-seeker, messaging)
src/lib               mock data and types
```

## License

MIT. See [LICENSE](LICENSE).
