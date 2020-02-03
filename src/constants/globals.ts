export const BASE_URL = 'http://wuhan2020.org.cn/data';

export const PROJECT_HOMEPAGE = 'http://wuhan2020.github.io';

export const GAODE_SEARCH_PREFIX = 'https://ditu.amap.com/search?query=';

export const FRONT_END_PREFIX = '/fe';

// @todo - remove these when backend better supports data retrieving instead of getting from github directly
export const clinicsLocation = [
  {
    province: {
      key: 'hubei',
      name: '湖北',
    },
    districts: [
      {key: 0, name: '鄂州市', value: 'ezhoushi'},
      {key: 1, name: '黄冈市', value: 'huanggangshi'},
      {key: 2, name: '黄石市', value: 'huangshishi'},
      {key: 3, name: '荆门市', value: 'jingmenshi'},
      {key: 4, name: '荆州市', value: 'jingzhoushi'},
      {key: 5, name: '潜江市', value: 'qianjiangshi'},
      {key: 6, name: '十堰市', value: 'shiyanshi'},
      {key: 7, name: '随州市', value: 'suizhoushi'},
      {key: 8, name: '天门市', value: 'tianmenshi'},
      {key: 9, name: '武汉市', value: 'wuhanshi'},
      {key: 10, name: '襄阳市', value: 'xiangyangshi'},
      {key: 11, name: '仙桃市', value: 'xiantaoshi'},
      {key: 12, name: '孝感市', value: 'xiaoganshi'},
      {key: 13, name: '宜昌市', value: 'yichangshi'},
    ]
  }
]