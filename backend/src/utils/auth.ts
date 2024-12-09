export const isAdmin = (ctx: any) => {
  const phone = ctx.state.user.phone
  return phone === "13571898817"
}
