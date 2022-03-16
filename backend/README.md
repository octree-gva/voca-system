# Voca.City Strapi

1. `cp .env.sample .env.local` and set your envs
2. [install mkcert](https://github.com/FiloSottile/mkcert)
3. run `mkcert localhost`
4. `yarn dev`

## Envs

- **HOST** The strapi host server
- **PORT** The strapi host port
- **JWT_SECRET** Secret used to generates jwt
- **API_TOKEN_SALT** Secret used to generates api tokens
