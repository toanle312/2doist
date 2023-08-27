import Cookies from 'js-cookie';

interface CookieData {
	[key: string]: any;
}

const isJsonString = (data: string) => {
	try {
		JSON.parse(data);
		return true;
	} catch {
		return false;
	}
};

const getValueByPath = (obj: CookieData, path: string) => {
	const keys = path.split('.');
	let value: any = obj;

	for (const key of keys) {
		if (value && typeof value === 'object') {
			value = value[key];
		} else {
			return undefined;
		}
	}

	return value;
};

const CookieSetUp = {
	set: (key: string, value: any, expires?: Date) => {
		Cookies.set(key, value, {
			expires: expires,
		});
	},
	get: (key: string) => {
		const cookieData = Cookies.get(key);

		if (cookieData) {
			if (isJsonString(cookieData)) {
				const jsonData = JSON.parse(cookieData);
				return jsonData ? getValueByPath(jsonData, key) : undefined;
			} else {
				return cookieData;
			}
		}

		return undefined;
	},
	remove: (key: string) => {
		Cookies.remove(key);
	},
};

export default CookieSetUp;
