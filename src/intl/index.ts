import zh_CN from "./zh_CN";
import { ILocalization } from './interface'

export type ILocales = 'en-US' | 'zh-CN'

export function getLocales(lang: ILocales): ILocalization
{
	switch (lang)
	{
		case ('zh-CN'):
			return zh_CN
		default:
			return zh_CN
	}
}

export default {
	"zh-CN": zh_CN
}