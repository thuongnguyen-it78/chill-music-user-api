import dayjs from 'dayjs'

export const toDate = (stringDate) => {
  if (!stringDate) return null
  return dayjs(stringDate, 'MM-DD-YYYY')
}
