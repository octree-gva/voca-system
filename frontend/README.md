# Voca.City Next.JS

1. `cp .env.sample .env.local` and set your envs
2. install mkcert
3. run `mkcert localhost`
4. `yarn dev`

__Why https on localhost?__

* We run into issues while calling jelastic apis in http://
* We are nearer production environment

## Envs

* **STRAPI_TOKEN** An api token generated from you strapi administration (full access required). This is used to create accounts only.
* **STRAPI_URL** The internal strapi url. This url is not exposed client-side, for server only
* **NEXTAUTH_SECRET** A secret used to encrypt http-only sessions cookies.
* **NEXTAUTH_URL** The url where the next app is running, for crsf issues
