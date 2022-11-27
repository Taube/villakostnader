## Villakostnader

A project for learning full-stack development and building a useful website that aims to help people owning a house to cut costs.

## Commands

Available commands: `yarn dev`, `yarn build` and `yarn test`.

## The stack

- **Vite**:
  Built with Vite for developer happiness short build times.

- **Typescript**:
  Codebase is **99%** typed where only about 1% is ignored (for now).

- **React@latest**:
  Build on React 18.2 with `StictMode` enabled to be future compliant. Making use of Suspense and lazy imports for bundle splitting.

- **React Router@latest**:
  Built with nested routes with nested layouts and protected routes.

- **Redux/@reduxjs/toolkit**:
  Built with a typed store with generated hooks to handle `isLoading`, `isError` etc.

- **Axios/JWT**:
  Communicates with backend using Axios and httpOnly cookie for JSON Web Token.

- **Node/Express/MongoDB**:
  Backend written with an easy-to-understand MVC and CRUD pattern. Endpoints to handle user management and authentication.

- **MUI/MUIX/SCSS** for UI and components. Using SCSS and modular classnames.

- **Jest/React Testing Libary**: For integration testing of components.

# DOCKER

## Build the container

`docker build -t getitdone/villakostnader-frontend .`

## Run the container

`docker run -p 3000:80 getitdone/villakostnader-frontend`

## Push the conatiner

`docker push getitdone/villakostnader-frontend`
