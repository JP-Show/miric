export const jwt = {
  secret: String(process.env.ACESS_TOKEN_SECRET),
  expiresIn: '1d'
}
