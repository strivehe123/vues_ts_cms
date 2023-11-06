import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
/**
 * 格式化UTC 字符串
 * @param utcStr UTC 时间字符串
 * @param ftmStr  格式化字符串的格式
 * @returns 返回格式化后的字符串
 */
export function formatUTC(utcStr: string, ftmStr: string = 'YYYY-MM-DD HH:mm:ss') {
  const resultTime = dayjs.utc(utcStr).local().format(ftmStr)
  return resultTime
}
