# Coffee-o-meter

A App for getting your colleges informed that you made coffee.

<img src="https://user-images.githubusercontent.com/33843131/159116979-79c064c6-843c-4753-a18a-645d0c9aa383.png" width="500">

## Build with

- Next.js
- TypeScript
- [Mantine](https://mantine.dev/) component library
- OpenAPI and [TS code generation](https://github.com/ferdikoomen/openapi-typescript-codegen)
- PostgresQL

## Getting Started

Init & run local environment

```
npm install             # install dependencies
npm run generate        # generate typescript types and api client
npx prisma generate     # generate prisma client (ORM)
npm db-init:local       # init & run local postgresql in docker
npm run dev             # run in local in port 3000
```

## OpenAPI naming conventions

TypeScript types and methods are generated based on [openAPI doc](common/api/coffee-o-meter-openapi.yaml).
Naming convention for API methods and operationsIds

| API Method | Operation Id       |
| ---------- | ------------------ |
| GET        | findByX, findAll.. |
| POST       | addX               |
| PUT        | setX               |
| DELETE     | removeByX          |

## Roadmap

Planned features or tech to implement tot the project. See Issues for details.

### Features

- [x] User is able to submit a brewed coffee pot
- [x] Give [useless fact](https://useless-facts.sameerkumar.website/api) as reward
- [x] Slack notification
- [x] [confetti](https://github.com/catdad/canvas-confetti) on success
- [ ] Toaster notifications (success, too many frequent tries, error)
- [ ] Statistics page with information of brewed coffee pots
- [ ] 2.0 Add organisation and location management + configurations
- [ ] 2.0 Add new notifications services (Teams, email, SMS, etc.)
- [ ] 3.0 Extend to manage other breakroom features

#### Tech

- [x] Environment management (dev, prod)
- [x] Automatic deployments to Vercel
- [x] Implement API endpoints
- [x] PostgresQL DB [prod](https://elephantsql.com) and [dev](https://data.heroku.com/) with [Prisma ORM and migrations](http://prisma.io)
- [x] Logs in [https://logflare.app/](Logflare)
- [x] React Query (Aync state)
- [ ] Logging framework
- [ ] Global State management (Context API)
- [ ] Add automated Changelog
- [ ] Multi-language Support
- [ ] GitHub Actions
- [ ] Lint
- [ ] 2.0 React Native?
