import request from '../../utils/requestForWeather'

export const getWeatherList = (city) => {
  return request.get( `/simpleWeather/query?city=${city}&key=9b1a27f4252d64743de14e1f70db82a6`)
}
export const getNews = () => {
  return request.get( `/toutiao/content?key=c6c83b5677f19b5e91461e3421aa8399&uniquekey=b6007680102715c423da7ae88862ab7b`)
}