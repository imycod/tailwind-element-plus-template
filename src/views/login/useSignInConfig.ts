import passLogo from "@assets/img/logo-dark.svg"
import ship from "@assets/img/logo/ship.svg"
import pos from "@assets/img/logo/pos.svg"
import di from "@assets/img/logo/di.svg"
import oms from "@assets/img/logo/oms.svg"
import wms from "@assets/img/logo/wms.svg"
import rms from "@assets/img/logo/rms.svg"
import pim from "@assets/img/logo/pim.svg"
import yms from "@assets/img/logo/yms.svg"
import bookkeeping from "@assets/img/logo/bookkeeping.svg"
import asset from "@assets/img/logo/asset.svg"
import transload from "@assets/img/logo/transload.svg"
import itemLogo from "@assets/img/logo/itemlogobw.svg"
// favicon
import iconPass from "@assets/img/logo/icon_pass.svg"
import iconShip from "@assets/img/logo/icon_ship.svg"
import iconOms from "@assets/img/logo/icon_oms.svg"
import iconBookkeeping from "@assets/img/logo/icon_bookkeeping.svg"
import iconWms from "@assets/img/logo/icon_wms.svg"
import iconRms from "@assets/img/logo/icon_rms.svg"
import iconPim from "@assets/img/logo/icon_pim.svg"
import iconYms from "@assets/img/logo/icon_yms.svg"
import iconAsset from "@assets/img/logo/icon_asset.svg"
import iconTransload from "@assets/img/logo/icon_transload.svg"
import iconPos from "@assets/img/logo/icon_pos.svg"
import iconLinker from "@assets/img/logo/icon_di.svg"


type ApplicationMap = {
	[key:string]:{
		text:string,
		src:string,
		fav_icon?:string
	}
}

const applicationMap:ApplicationMap = {
	my_item:{
		text:'Item',
		src:itemLogo,
		fav_icon: iconPass
	},
	pass:{
		text:'Item Pass',
		src:passLogo,
		fav_icon: iconPass
	},
	item_ship:{
		text:'Item Ship',
		src: ship,
		fav_icon: iconShip
	},
	item_pos:{
		text:'Item POS',
		src: pos,
		fav_icon: iconPos
	},
	item_linker:{
		text:'Item Data Intelligence',
		src: di,
		fav_icon: iconLinker
	},
	item_oms:{
		text:'Item OMS',
		src: oms,
		fav_icon: iconOms
	},
	item_wms:{
		text:'Item WMS',
		src: wms,
		fav_icon: iconWms
	},
	item_rms:{
		text:'Item RMS',
		src: rms,
		fav_icon: iconRms
	},
	item_pim:{
		text:'Item PIM',
		src: pim,
		fav_icon: iconPim
	},
	item_yms:{
		text:'Item YMS',
		src: yms,
		fav_icon: iconYms
	},
	item_bookkeeping:{
		text:'Item Bookkeeping',
		src: bookkeeping,
		fav_icon: iconBookkeeping
	},
	item_asset:{
		text:'Item Asset',
		src: asset,
		fav_icon: iconAsset
	},
	item_transload:{
		text:'Item Transload',
		src: transload,
		fav_icon: iconTransload
	}
}
export default function useSignInConfig(){
	function getApplicationConfig(code = 'pass') {
		const config = applicationMap[code]
		setMaskIcon(config.fav_icon)
		document.title = 'Sign in to ' + config.text;
		return config
	}

	function setMaskIcon(iconPath) {
		const linkElement = document.querySelector("link[rel='mask-icon']");
		if (linkElement) {
			linkElement.href = iconPath;
		} else {
			const newLink = document.createElement('link');
			newLink.rel = 'mask-icon';
			newLink.type = 'image/svg+xml';
			newLink.href = iconPath;
			document.head.appendChild(newLink);
		}
	}

	return {
		getApplicationConfig,
	}
}

