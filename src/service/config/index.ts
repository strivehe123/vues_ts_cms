let BASE_URL = ''
let TIME_OUT = 5000
console.log(import.meta.env)
if (import.meta.env.DEV) {
  BASE_URL = 'http://127.0.0.1:8000/api/v1'
  TIME_OUT = 10000
} else {
  BASE_URL = 'http://codercba.com:8000'
  TIME_OUT = 5000
}
export { BASE_URL, TIME_OUT }
