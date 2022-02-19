# Coffee-o-meter

A simple App for getting your colleges informed that you made coffee.

## Getting Started

Init the local dev environment by generating required code based on: *common/api/coffee-o-meter-openapi.yaml*

```
npm install
npm run generate
```

Run in local dev [http://localhost:3000](http://localhost:3000)

```
npm run dev
```

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
- [x] Implement API endpoints
- [x] DB with [http://prisma.io](Prisma)
- [ ] Add automated Changelog
- [ ] Multi-language Support
- [ ] State management (Context?)
- [ ] React Query
- [ ] GitHub Actions
- [ ] Deployment to Vercel
- [ ] Lint
