# Coffee-o-meter

A simple App for getting your colleges informed that you made coffee.

## Getting Started

Init the local dev environment by generating required code based on: _common/api/coffee-o-meter-openapi.yaml_ and run in local dev [http://localhost:3000](http://localhost:3000).

```
npm install             # install dependencies
npm run generate        # generate typescript types and api client
npx prisma generate     # generate prisma client (ORM)
npm db-init:local       # init & run local postgresql in docker
npm run dev             # run in local in port 3000
```

## OpenAPI naming conventions

TypeScript types and methods are generated based on [openAPI doc](common/api/coffee-o-meter-openapi.yaml). To have persistent function naming below is followed.



| API Method | Operation Id       |
| ---------- | ------------------ |
| GET        | findByX, findAll.. |
| POST       | addX               |
| PUT        | setX               |
| DELETE     | removeByX          |

## Build with

- Next.js bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- TypeScript
- OpenAPI and [TS code generation](https://github.com/ferdikoomen/openapi-typescript-codegen)
- [Mantine](https://mantine.dev/) as component library

## Roadmap

Planned features or tech to implement tot the project.

### Features

- [x] User is able to submit a brewed coffee pot
- [ ] Give [useless fact](https://useless-facts.sameerkumar.website/api) as reward
- [ ] Slack notification
- [ ] Add location management
- [ ] Statistics page with information of brewed coffee pots
- [ ] Toaster notifications (success, too many frequent tries, error)
- [ ] [confetti](https://github.com/catdad/canvas-confetti) on success

#### Tech

- [x] Environment management (dev, prod)
- [x] Deployments to Vercel
- [x] Implement API endpoints
- [x] [https.//elephantsql.com](Postgres DB) with [http://prisma.io](Prisma)
- [x] Logs in [https://logflare.app/](Logflare)
- [ ] React Query
- [ ] State management (Context?)
- [ ] Add automated Changelog
- [ ] Multi-language Support
- [ ] GitHub Actions
- [ ] Lint
