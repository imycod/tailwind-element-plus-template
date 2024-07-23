// wiki文档： google 第三方登录对接文档 [WEB]
// https://wiki.logisticsteam.com/pages/viewpage.action?pageId=88775394

const clientId = '733651427378-h0ojfph5ga6v2n5e495vm1vc95ol5n0o.apps.googleusercontent.com';

// Google 登录逻辑封装
const loginWithGoogle = () => {
	return new Promise(function (resolve, reject) {
		try {
			const client = window.google.accounts.oauth2.initTokenClient({
				client_id: clientId,
				scope: 'profile email openid',
				callback: function (res: any) {
					resolve({
						...res,
						clientId,
						accessToken: res.access_token,
						loginType: 'GOOGLE',
					});
				},
			});
			client.requestAccessToken();
			// document.cookie = 'g_state' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			// window.google.accounts.id.prompt();
		} catch (error) {
			reject(error);
		}
	});
};

export { loginWithGoogle };
