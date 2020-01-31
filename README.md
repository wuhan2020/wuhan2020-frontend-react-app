# Introduction

Frontend project to combine and visualize data collected in [this project](https://github.com/wuhan2020/wuhan2020)

Currently we dont have any in production back support for this project, and hence we are using data source from github repo directly. However, we have two data sources depending on the environments:

- [production](https://github.com/wuhan2020/wuhan2020/tree/master/data/json)
- [staging/test](https://github.com/wuhan2020/wuhan2020-test/tree/master/data/json)

Also please notice that we are using the `raw` version of all these json files, which you could see in code.

# Getting Started

## Prerequisite

Please be awared that in order to both run the project locally or build and deploy the project, you should have the following environment well setup on your machine:

- [npm](http://npmjs.com/) version: **10.15.3 or later**
- [python](https://www.python.org/) **version: python 2**

It is recommended to install [nvm](https://github.com/nvm-sh/nvm) and [anaconda](https://www.anaconda.com/) to manage their versions on your system.

Python2 required mostly for the purpose of installing dependencies.

Also it is more recommended to use [yarn](https://yarnpkg.com/) over npm. We will be using `yarn` throughout this doc

## Run Locally

1. Clone this project
2. Install dependencies by executing the following script

```bash
yarn
```

3. When dependencies are all installed, run the following command

```bash
yarn dev
```

Then you should be able to visit the app under `http://localhost:3001/`

## Build and Compile

TBD

## Deploy, CI/CD

TBD - maybe we only need to add some deploy scripts, CI/CD seems to be a bit too much if this is not a long term project.

# Tech Stack

This is a typical frontend project using typical frontend tech stack:

- react
- redux
- reselect
- typescript
- react-router
- react-intl
- antd
- axios
- moment
- webpack
- rxjs
  - not used yet, but would like to migrate to it at some point, to better manage all redux actions

# Project Structure


```
├── .vscode/                  vscode editor related config
├── config/                   webpack configs, both dev and prod
├── scripts/                  bash scripts, basically all npm scripts will be invoking scripts stored here
├── src/                      main repo for all frontend code
    ├── common                common modules/shared codes
    ├── components            All UI related codes
        ├── Elements          All components/elements
        ├── Pages             All Pages
        ├── App.tsx           App component, the wrapper of all routes
        ├── Icons.tsx         Helper renderer for all icons
        ├── IntlContainer.tsx react-intl wrapper
        ├── Message.tsx       Helper file for react-intl usage
    ├── constants/            constants
    ├── http/                 All http request handling logics are here
    ├── images/               static resources (mostly .svg files)
    ├── intl/                 react-intl configs
    ├── mockData/             mock data is stored here
    ├── store/                Redux store related
    ├── styles/               All scss files, structures are following those under `components`
    ├── types/                Type definition/Interface definition
    ├── boot-client.tsx       entry file - for webpack
    ├── configureStore.ts     main file to config Redux store
    ├── routes.tsx            defines all routes
├── test/                     testing code, hopefully we can get to them at some point :D
├── wwwroot/                  built/compiled files, dist files will be under here
    ├── dist/                 files under this directory is ready to deploy
    ├── template.html         template for webpack to package the app
├── package.json              npm package related
├── tsconfig.json             typescript compiler related
```

# Design

## Ant Design

We are utilizing Ant Design for fast development at this stage. However, we might want to migrate out of it in the future. Hence, we are not directly using them in this app; instead, we are wrapping them by our own React component, and redefine its styles when necessary. This way, it wont make the migration complicated in the future

## Design Doc

Please check out [this doc](https://www.figma.com/file/6oLZ4Swo2He0w8DUNELsUV/wuhan?node-id=268%3A28)

# Road Map

Before Backend is fully ready/supported:

- [ ] Display/Visualize data for
  - [ ] Clinics
  - [ ] Hotels
  - [ ] Donates
  - [ ] Logistics
  - [ ] Consultation
  - [ ] Production
- [ ] Page Sharing?
- [ ] Homepage
  - But we dont have that much data yet??

After Back is fully ready/supported
- [ ] Consider migrate to Rxjs - low priority
- [ ] Update all `GET` request for the above pages
- [ ] Support any `POST/DELETE` requests

## Contribution

Yes please! Feature requests/pullrequests are welcome. Please contact the project contributors, and we will be strictly following the git-flow to manage code.
