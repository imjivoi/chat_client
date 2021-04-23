export default function expiresDate(date: string | undefined) {
  if(!date) return
  const currentDate = new Date().getTime()
  const comparedDate = new Date(date).getTime()
  return currentDate < comparedDate

}
