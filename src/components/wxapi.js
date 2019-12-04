import axios from 'axios';
import qs from 'qs';
const wxApi = {
	getshare: function(url, tit) {
		document.title = tit;
		//必须是这个用来 获取秘钥
		let wxUrl = {
			wxUrl: encodeURIComponent(location.href.split('#')[0])
		};
		/* 
		     因为分享出去的 url 和当前的不一致 所以需要特殊处理
		 */
		var lineLink = `http://www.peihuayuren.com/mp/dist/index.html${window.location.hash}`;
		var imgUrl = 'http://image.peihuayuren.com/upload/20190904/1432347280b390.png';
		var title = tit;
		var desc = "买教具、看案例、约培训，就来幼趣魔方！";
		axios.post(`${url}data/json/getWeiXinConfig`, qs.stringify(wxUrl)).then((data) => {
			wx.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: data.data.resultObject.appid, // 必填，公众号的唯一标识
				timestamp: data.data.resultObject.timestamp, // 必填，生成签名的时间戳
				nonceStr: data.data.resultObject.noncestr, // 必填，生成签名的随机串
				signature: data.data.resultObject.signature, // 必填，签名，见附录1
				jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo',
					'onMenuShareQZone'
				] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
			wx.ready(function() {
				//分享到朋友圈
				wx.onMenuShareTimeline({
					title: title, // 分享标题
					link: lineLink, // 分享链接
					imgUrl: imgUrl, // 分享图标
					type: '', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function() {
						//alert('已分享')
						// 用户确认分享后执行的回调函数
					},
					cancel: function() {
						//lert('已取消')
						// 用户取消分享后执行的回调函数
					}
				});
				//  分享给朋友
				wx.onMenuShareAppMessage({
					title: title, // 分享标题
					desc: desc, // 分享描述
					link: lineLink, // 分享链接
					imgUrl: imgUrl, // 分享图标
					type: '', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function() {
						//alert('已分享')
						// 用户确认分享后执行的回调函数
					},
					cancel: function() {
						//lert('已取消')
						// 用户取消分享后执行的回调函数
					}
				});
				//分享到QQ
				wx.onMenuShareQQ({
					title: title, // 分享标题
					desc: desc, // 分享描述
					link: lineLink, // 分享链接
					imgUrl: imgUrl, // 分享图标
					success: function() {
						//alert('已分享')
						// 用户确认分享后执行的回调函数 
					},
					cancel: function() {
						//alert('已取消')
						// 用户取消分享后执行的回调函数
					}
				});
				//分享到微博
				wx.onMenuShareWeibo({
					title: title, // 分享标题
					desc: desc, // 分享描述
					link: lineLink, // 分享链接
					imgUrl: imgUrl, // 分享图标
					success: function() {
						//alert('已分享')
						// 用户确认分享后执行的回调函数
					},
					cancel: function() {
						//alert('已取消')
						// 用户取消分享后执行的回调函数
					}
				});
				//分享到空间
				wx.onMenuShareQZone({
					title: title, // 分享标题
					desc: desc, // 分享描述
					link: lineLink, // 分享链接
					imgUrl: imgUrl, // 分享图标
					success: function() {
						//alert('已分享')
						// 用户确认分享后执行的回调函数
					},
					cancel: function() {
						//alert('已取消')
						// 用户取消分享后执行的回调函数
					}
				});
			});

		}).catch((error) => {
			console.log(error);
		})

	}
}
export default wxApi;
