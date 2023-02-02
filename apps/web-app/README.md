# Coffee-o-meter

A App for getting your colleges informed that you made coffee.

<img src="https://user-images.githubusercontent.com/33843131/159116979-79c064c6-843c-4753-a18a-645d0c9aa383.png" width="500">

## Build with

- Next.js
- TypeScript
- [Mantine](https://mantine.dev/) component library
- OpenAPI and [TS code generation](https://github.com/ferdikoomen/openapi-typescript-codegen)
- PostgresQL
- Turborepo

## Getting Started

Init & run local environment

```
npm install             # install dependencies
npm run dev             # init & run local
```

## Roadmap

Planned features or tech to implement tot the project. See Issues for details.

### Features

- [x] User is able to submit a brewed coffee pot
- [x] Give [useless fact](https://useless-facts.sameerkumar.website/api) as reward
- [x] Slack notification
- [x] [confetti](https://github.com/catdad/canvas-confetti) on success
- [ ] Toaster notifications (success, too many frequent tries, error)
- [ ] Statistics page with information of brewed coffee pots
- [ ] 2.0 Add organization and location management + configurations
- [ ] 2.0 Add new notifications services (Teams, email, SMS, etc.)
- [ ] 3.0 Extend to manage other break room features

#### Tech

- [x] Environment management (dev, prod)
- [x] Automatic deployments to Vercel
- [x] Implement API endpoints
- [x] PostgresQL DB [prod](https://elephantsql.com) and [dev](https://data.heroku.com/) with [Prisma ORM and migrations](http://prisma.io)
- [x] Logs in [https://logflare.app/](Logflare)
- [x] React Query (Aync state)
- [ ] Use NestJs instead of NextJS API routes
- [ ] Logging framework
- [ ] Global State management (Context API, Zustand etc.)
- [ ] Add automated Changelog
- [ ] Multi-language Support
- [ ] GitHub Actions
- [x] Lint
- [ ] 2.0 React Native?
