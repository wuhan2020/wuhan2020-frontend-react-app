import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { BASE_URL } from '../constants/globals';

/**
 * axios single instance manager
 */
export default class HttpManager
{
	// HttpManager instance
	private static _httpManager: HttpManager

	// axios instance
	private instance: AxiosInstance

	private accessToken: string

	private store: any

	constructor()
	{
		this.instance = axios.create({
			baseURL: BASE_URL,
			timeout: 10000,
			withCredentials: false, // allowed to carry cookies
		})
		this.initInterceptors()
	}

	public static getInstance()
	{
		if (!this._httpManager)
		{
			this._httpManager = new HttpManager()
		}

		return this._httpManager
	}

	public init(store)
	{
		this.store = store
	}

	private initInterceptors()
	{
		if (this.instance)
		{
			// Add a request interceptor
			this.instance.interceptors.request.use(
				(config: AxiosRequestConfig) =>
				{
					// Do something before request is sent
					return config
				},
				(error: any) =>
				{
					return Promise.reject(error)
				}
			)

			// Add a response interceptor
			this.instance.interceptors.response.use(
				(response: AxiosResponse) =>
				{
					return response.data
				},
				(error: any) =>
				{
					if (error.response)
					{
						switch (error.response.status)
						{
              /*
							case 400:
								this.handleBadRequestError()
								break
							case 403:
								this.handleForbiddenError()
								break
							case 404:
								this.handleNotFoundError()
								break
							case 500:
								this.handleServerError()
								break
							default:
                */

						}
					}
					else
					{
						if (error.message === 'Network Error')
						{
							console.warn('Network Error')
							//this.handleNetworkError()
						}
					}
					return Promise.reject(error)
				}
			)
		}
	}

  /*
	private handleBadRequestError()
	{
		this.store.dispatch(applicationActionCreators.showAlert('请求异常', '抱歉程序出现了错误'))
	}

	private handleForbiddenError()
	{
		this.store.dispatch(applicationActionCreators.showAlert('请求异常', '你的accesstoken已失效'))
	}

	private handleNotFoundError()
	{
		this.store.dispatch(applicationActionCreators.showAlert('请求异常', '请求的资源未被找到'))
	}

	private handleServerError()
	{
		this.store.dispatch(applicationActionCreators.showAlert('请求异常', '后端服务出错'))
	}

	private handleNetworkError()
	{
		this.store.dispatch(applicationActionCreators.showAlert('网络异常', '你的网络已断开链接，请确保网络正常后再试'))
  }

	public setAccessToken(accesstoken: string)
	{
		// this.instance.defaults.headers.get.accessToken = accesstoken
		this.accessToken = accesstoken
	}
  */

	public setRequestTimeout(time: number)
	{
		this.instance.defaults.timeout = time
	}

	public setBASE_URL(url: string)
	{
		this.instance.defaults.baseURL = url
	}

	public get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
	{
		return this.instance.get(url, config || { headers: { } })
	}

	public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
	{
		return this.instance.post(url, data, config || { headers: { } })
	}

	public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
	{
		return this.instance.put(url, data, config || { headers: { } })
	}

	public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>
	{
		return this.instance.delete(url, config || { headers: { } })
	}
}