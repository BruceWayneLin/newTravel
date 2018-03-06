
// import { InMemoryDbService } from 'angular-in-memory-web-api';

// export class InMockDbService implements InMemoryDbService {
//   createDb(){
//     const mockPosts = {
//       "favCountry": {
//         "groupId": 11,
//         "name": "熱門國家",
//         "enabled": true,
//         "favorite": true,
//         "countryList": []
//       },
//       "transportList": [{
//         "transportId": 13,
//         "productCode": "Travel",
//         "productName": "國外旅平險",
//         "name": "汽車",
//         "enabled": true
//       }, {
//         "transportId": 15,
//         "productCode": "Travel",
//         "productName": "國外旅平險",
//         "name": "火車",
//         "enabled": true
//       }, {
//         "transportId": 21,
//         "productCode": "Travel",
//         "productName": "國外旅平險",
//         "name": "船",
//         "enabled": true
//       }, {
//         "transportId": 19,
//         "productCode": "Travel",
//         "productName": "國外旅平險",
//         "name": "遊覽車",
//         "enabled": true
//       }, {"transportId": 1, "productCode": "Travel", "productName": "國外旅平險", "name": "飛機", "enabled": true}],
//       "cusPackageList": [{
//         "packageId": 1,
//         "packageName": "1000萬主險",
//         "enabled": true,
//         "packageButtonName": "1000萬主險",
//         "companyCode": "MingTai",
//         "companyName": "明台",
//         "productCode": "Travel",
//         "productName": "國外旅平險",
//         "primaryItems": [{
//           "insItemId": 1,
//           "insItemCode": "TAK003",
//           "insItemName": "死殘",
//           "insItemDesc": null,
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "amountId": 1,
//           "amount": 1000,
//           "enabled": true
//         }],
//         "secondaryItems": [{
//           "insItemId": 5,
//           "insItemCode": "TAK002",
//           "insItemName": "旅遊不便",
//           "insItemDesc": "旅程出發前取消費用\n旅程縮短直接返國費用\n旅程中途行程更改費用\n行李延誤或遺失費用\n班機延誤及取消費用\n海外探視及特別費用",
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "enabled": true,
//           "amountList": [{"optionId": 1, "amount": 10}]
//         }, {
//           "insItemId": 6,
//           "insItemCode": "TAK006",
//           "insItemName": "海外突發",
//           "insItemDesc": "門診醫療費用保險金\n急診醫療費用保險金\n住院醫療費用保險金",
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "enabled": true,
//           "amountList": [{"optionId": 2, "amount": 10}, {"optionId": 3, "amount": 30}]
//         }, {
//           "insItemId": 7,
//           "insItemCode": "TAK009",
//           "insItemName": "緊急救援",
//           "insItemDesc": "緊急醫療費用保險金\n遺體或骨灰運返費用\n未成年子女返國費用",
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "enabled": true,
//           "amountList": [{"optionId": 4, "amount": 50}]
//         }, {
//           "insItemId": 8,
//           "insItemCode": "TAK010",
//           "insItemName": "居家竊盜",
//           "insItemDesc": "旅行期間居家竊盜保險",
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "enabled": true,
//           "amountList": [{"optionId": 5, "amount": 10}]
//         }]
//       }],
//       "productSetting": {"startDateLimit": 60, "travelPeriodLimit": 180},
//       "areaList": [{"id": 314, "cityId": 1, "name": "台東市", "zipCode": "950"}, {
//         "id": 315,
//         "cityId": 1,
//         "name": "綠島鄉",
//         "zipCode": "951"
//       }, {"id": 316, "cityId": 1, "name": "蘭嶼鄉", "zipCode": "952"}, {
//         "id": 317,
//         "cityId": 1,
//         "name": "延平鄉",
//         "zipCode": "953"
//       }, {"id": 318, "cityId": 1, "name": "卑南鄉", "zipCode": "954"}, {
//         "id": 319,
//         "cityId": 1,
//         "name": "鹿野鄉",
//         "zipCode": "955"
//       }, {"id": 320, "cityId": 1, "name": "關山鎮", "zipCode": "956"}, {
//         "id": 321,
//         "cityId": 1,
//         "name": "海端鄉",
//         "zipCode": "957"
//       }, {"id": 322, "cityId": 1, "name": "池上鄉", "zipCode": "958"}, {
//         "id": 323,
//         "cityId": 1,
//         "name": "東河鄉",
//         "zipCode": "959"
//       }, {"id": 324, "cityId": 1, "name": "成功鎮", "zipCode": "961"}, {
//         "id": 325,
//         "cityId": 1,
//         "name": "長濱鄉",
//         "zipCode": "962"
//       }, {"id": 326, "cityId": 1, "name": "太麻里鄉", "zipCode": "963"}, {
//         "id": 327,
//         "cityId": 1,
//         "name": "金峰鄉",
//         "zipCode": "964"
//       }, {"id": 328, "cityId": 1, "name": "大武鄉", "zipCode": "965"}, {
//         "id": 329,
//         "cityId": 1,
//         "name": "達仁鄉",
//         "zipCode": "966"
//       }, {"id": 281, "cityId": 2, "name": "屏東市", "zipCode": "900"}, {
//         "id": 282,
//         "cityId": 2,
//         "name": "三地門鄉",
//         "zipCode": "901"
//       }, {"id": 283, "cityId": 2, "name": "霧台鄉", "zipCode": "902"}, {
//         "id": 284,
//         "cityId": 2,
//         "name": "瑪家鄉",
//         "zipCode": "903"
//       }, {"id": 285, "cityId": 2, "name": "九如鄉", "zipCode": "904"}, {
//         "id": 286,
//         "cityId": 2,
//         "name": "里港鄉",
//         "zipCode": "905"
//       }, {"id": 287, "cityId": 2, "name": "高樹鄉", "zipCode": "906"}, {
//         "id": 288,
//         "cityId": 2,
//         "name": "鹽埔鄉",
//         "zipCode": "907"
//       }, {"id": 289, "cityId": 2, "name": "長治鄉", "zipCode": "908"}, {
//         "id": 290,
//         "cityId": 2,
//         "name": "麟洛鄉",
//         "zipCode": "909"
//       }, {"id": 291, "cityId": 2, "name": "竹田鄉", "zipCode": "911"}, {
//         "id": 292,
//         "cityId": 2,
//         "name": "內埔鄉",
//         "zipCode": "912"
//       }, {"id": 293, "cityId": 2, "name": "萬丹鄉", "zipCode": "913"}, {
//         "id": 294,
//         "cityId": 2,
//         "name": "潮州鎮",
//         "zipCode": "920"
//       }, {"id": 295, "cityId": 2, "name": "泰武鄉", "zipCode": "921"}, {
//         "id": 296,
//         "cityId": 2,
//         "name": "來義鄉",
//         "zipCode": "922"
//       }, {"id": 297, "cityId": 2, "name": "萬巒鄉", "zipCode": "923"}, {
//         "id": 298,
//         "cityId": 2,
//         "name": "崁頂鄉",
//         "zipCode": "924"
//       }, {"id": 299, "cityId": 2, "name": "新埤鄉", "zipCode": "925"}, {
//         "id": 300,
//         "cityId": 2,
//         "name": "南州鄉",
//         "zipCode": "926"
//       }, {"id": 301, "cityId": 2, "name": "林邊鄉", "zipCode": "927"}, {
//         "id": 302,
//         "cityId": 2,
//         "name": "東港鎮",
//         "zipCode": "928"
//       }, {"id": 303, "cityId": 2, "name": "琉球鄉", "zipCode": "929"}, {
//         "id": 304,
//         "cityId": 2,
//         "name": "佳冬鄉",
//         "zipCode": "931"
//       }, {"id": 305, "cityId": 2, "name": "新園鄉", "zipCode": "932"}, {
//         "id": 306,
//         "cityId": 2,
//         "name": "枋寮鄉",
//         "zipCode": "940"
//       }, {"id": 307, "cityId": 2, "name": "枋山鄉", "zipCode": "941"}, {
//         "id": 308,
//         "cityId": 2,
//         "name": "春日鄉",
//         "zipCode": "942"
//       }, {"id": 309, "cityId": 2, "name": "獅子鄉", "zipCode": "943"}, {
//         "id": 310,
//         "cityId": 2,
//         "name": "車城鄉",
//         "zipCode": "944"
//       }, {"id": 311, "cityId": 2, "name": "牡丹鄉", "zipCode": "945"}, {
//         "id": 312,
//         "cityId": 2,
//         "name": "恆春鎮",
//         "zipCode": "946"
//       }, {"id": 313, "cityId": 2, "name": "滿州鄉", "zipCode": "947"}, {
//         "id": 164,
//         "cityId": 3,
//         "name": "斗南鎮",
//         "zipCode": "630"
//       }, {"id": 165, "cityId": 3, "name": "大埤鄉", "zipCode": "631"}, {
//         "id": 166,
//         "cityId": 3,
//         "name": "虎尾鎮",
//         "zipCode": "632"
//       }, {"id": 167, "cityId": 3, "name": "土庫鎮", "zipCode": "633"}, {
//         "id": 168,
//         "cityId": 3,
//         "name": "褒忠鄉",
//         "zipCode": "634"
//       }, {"id": 169, "cityId": 3, "name": "東勢鄉", "zipCode": "635"}, {
//         "id": 170,
//         "cityId": 3,
//         "name": "台西鄉",
//         "zipCode": "636"
//       }, {"id": 171, "cityId": 3, "name": "崙背鄉", "zipCode": "637"}, {
//         "id": 172,
//         "cityId": 3,
//         "name": "麥寮鄉",
//         "zipCode": "638"
//       }, {"id": 173, "cityId": 3, "name": "斗六市", "zipCode": "640"}, {
//         "id": 174,
//         "cityId": 3,
//         "name": "林內鄉",
//         "zipCode": "643"
//       }, {"id": 175, "cityId": 3, "name": "古坑鄉", "zipCode": "646"}, {
//         "id": 176,
//         "cityId": 3,
//         "name": "莿桐鄉",
//         "zipCode": "647"
//       }, {"id": 177, "cityId": 3, "name": "西螺鎮", "zipCode": "648"}, {
//         "id": 178,
//         "cityId": 3,
//         "name": "二崙鄉",
//         "zipCode": "649"
//       }, {"id": 179, "cityId": 3, "name": "北港鎮", "zipCode": "651"}, {
//         "id": 180,
//         "cityId": 3,
//         "name": "水林鄉",
//         "zipCode": "652"
//       }, {"id": 181, "cityId": 3, "name": "口湖鄉", "zipCode": "653"}, {
//         "id": 182,
//         "cityId": 3,
//         "name": "四湖鄉",
//         "zipCode": "654"
//       }, {"id": 183, "cityId": 3, "name": "元長鄉", "zipCode": "655"}, {
//         "id": 125,
//         "cityId": 4,
//         "name": "彰化市",
//         "zipCode": "500"
//       }, {"id": 126, "cityId": 4, "name": "芬園鄉", "zipCode": "502"}, {
//         "id": 127,
//         "cityId": 4,
//         "name": "花壇鄉",
//         "zipCode": "503"
//       }, {"id": 128, "cityId": 4, "name": "秀水鄉", "zipCode": "504"}, {
//         "id": 129,
//         "cityId": 4,
//         "name": "鹿港鎮",
//         "zipCode": "505"
//       }, {"id": 130, "cityId": 4, "name": "福興鄉", "zipCode": "506"}, {
//         "id": 131,
//         "cityId": 4,
//         "name": "線西鄉",
//         "zipCode": "507"
//       }, {"id": 132, "cityId": 4, "name": "和美鎮", "zipCode": "508"}, {
//         "id": 133,
//         "cityId": 4,
//         "name": "伸港鄉",
//         "zipCode": "509"
//       }, {"id": 134, "cityId": 4, "name": "員林市", "zipCode": "510"}, {
//         "id": 135,
//         "cityId": 4,
//         "name": "社頭鄉",
//         "zipCode": "511"
//       }, {"id": 136, "cityId": 4, "name": "永靖鄉", "zipCode": "512"}, {
//         "id": 137,
//         "cityId": 4,
//         "name": "埔心鄉",
//         "zipCode": "513"
//       }, {"id": 138, "cityId": 4, "name": "溪湖鎮", "zipCode": "514"}, {
//         "id": 139,
//         "cityId": 4,
//         "name": "大村鄉",
//         "zipCode": "515"
//       }, {"id": 140, "cityId": 4, "name": "埔鹽鄉", "zipCode": "516"}, {
//         "id": 141,
//         "cityId": 4,
//         "name": "田中鎮",
//         "zipCode": "520"
//       }, {"id": 142, "cityId": 4, "name": "北斗鎮", "zipCode": "521"}, {
//         "id": 143,
//         "cityId": 4,
//         "name": "田尾鄉",
//         "zipCode": "522"
//       }, {"id": 144, "cityId": 4, "name": "埤頭鄉", "zipCode": "523"}, {
//         "id": 145,
//         "cityId": 4,
//         "name": "溪州鄉",
//         "zipCode": "524"
//       }, {"id": 146, "cityId": 4, "name": "竹塘鄉", "zipCode": "525"}, {
//         "id": 147,
//         "cityId": 4,
//         "name": "二林鎮",
//         "zipCode": "526"
//       }, {"id": 148, "cityId": 4, "name": "大城鄉", "zipCode": "527"}, {
//         "id": 149,
//         "cityId": 4,
//         "name": "芳苑鄉",
//         "zipCode": "528"
//       }, {"id": 150, "cityId": 4, "name": "二水鄉", "zipCode": "530"}, {
//         "id": 78,
//         "cityId": 5,
//         "name": "竹南鎮",
//         "zipCode": "350"
//       }, {"id": 79, "cityId": 5, "name": "頭份市", "zipCode": "351"}, {
//         "id": 80,
//         "cityId": 5,
//         "name": "三灣鄉",
//         "zipCode": "352"
//       }, {"id": 81, "cityId": 5, "name": "南庄鄉", "zipCode": "353"}, {
//         "id": 82,
//         "cityId": 5,
//         "name": "獅潭鄉",
//         "zipCode": "354"
//       }, {"id": 83, "cityId": 5, "name": "後龍鎮", "zipCode": "356"}, {
//         "id": 84,
//         "cityId": 5,
//         "name": "通霄鎮",
//         "zipCode": "357"
//       }, {"id": 85, "cityId": 5, "name": "苑裡鎮", "zipCode": "358"}, {
//         "id": 86,
//         "cityId": 5,
//         "name": "苗栗市",
//         "zipCode": "360"
//       }, {"id": 87, "cityId": 5, "name": "造橋鄉", "zipCode": "361"}, {
//         "id": 88,
//         "cityId": 5,
//         "name": "頭屋鄉",
//         "zipCode": "362"
//       }, {"id": 89, "cityId": 5, "name": "公館鄉", "zipCode": "363"}, {
//         "id": 90,
//         "cityId": 5,
//         "name": "大湖鄉",
//         "zipCode": "364"
//       }, {"id": 91, "cityId": 5, "name": "泰安鄉", "zipCode": "365"}, {
//         "id": 92,
//         "cityId": 5,
//         "name": "銅鑼鄉",
//         "zipCode": "366"
//       }, {"id": 93, "cityId": 5, "name": "三義鄉", "zipCode": "367"}, {
//         "id": 94,
//         "cityId": 5,
//         "name": "西湖鄉",
//         "zipCode": "368"
//       }, {"id": 95, "cityId": 5, "name": "卓蘭鎮", "zipCode": "369"}, {
//         "id": 65,
//         "cityId": 6,
//         "name": "竹北市",
//         "zipCode": "302"
//       }, {"id": 66, "cityId": 6, "name": "湖口鄉", "zipCode": "303"}, {
//         "id": 67,
//         "cityId": 6,
//         "name": "新豐鄉",
//         "zipCode": "304"
//       }, {"id": 68, "cityId": 6, "name": "新埔鎮", "zipCode": "305"}, {
//         "id": 69,
//         "cityId": 6,
//         "name": "關西鎮",
//         "zipCode": "306"
//       }, {"id": 70, "cityId": 6, "name": "芎林鄉", "zipCode": "307"}, {
//         "id": 71,
//         "cityId": 6,
//         "name": "寶山鄉",
//         "zipCode": "308"
//       }, {"id": 72, "cityId": 6, "name": "竹東鎮", "zipCode": "310"}, {
//         "id": 73,
//         "cityId": 6,
//         "name": "五峰鄉",
//         "zipCode": "311"
//       }, {"id": 74, "cityId": 6, "name": "橫山鄉", "zipCode": "312"}, {
//         "id": 75,
//         "cityId": 6,
//         "name": "尖石鄉",
//         "zipCode": "313"
//       }, {"id": 76, "cityId": 6, "name": "北埔鄉", "zipCode": "314"}, {
//         "id": 77,
//         "cityId": 6,
//         "name": "峨眉鄉",
//         "zipCode": "315"
//       }, {"id": 96, "cityId": 7, "name": "中區", "zipCode": "400"}, {
//         "id": 97,
//         "cityId": 7,
//         "name": "東區",
//         "zipCode": "401"
//       }, {"id": 98, "cityId": 7, "name": "南區", "zipCode": "402"}, {
//         "id": 99,
//         "cityId": 7,
//         "name": "西區",
//         "zipCode": "403"
//       }, {"id": 100, "cityId": 7, "name": "北區", "zipCode": "404"}, {
//         "id": 101,
//         "cityId": 7,
//         "name": "北屯區",
//         "zipCode": "406"
//       }, {"id": 102, "cityId": 7, "name": "西屯區", "zipCode": "407"}, {
//         "id": 103,
//         "cityId": 7,
//         "name": "南屯區",
//         "zipCode": "408"
//       }, {"id": 104, "cityId": 7, "name": "太平區", "zipCode": "411"}, {
//         "id": 105,
//         "cityId": 7,
//         "name": "大里區",
//         "zipCode": "412"
//       }, {"id": 106, "cityId": 7, "name": "霧峰區", "zipCode": "413"}, {
//         "id": 107,
//         "cityId": 7,
//         "name": "烏日區",
//         "zipCode": "414"
//       }, {"id": 108, "cityId": 7, "name": "豐原區", "zipCode": "420"}, {
//         "id": 109,
//         "cityId": 7,
//         "name": "后里區",
//         "zipCode": "421"
//       }, {"id": 110, "cityId": 7, "name": "石岡區", "zipCode": "422"}, {
//         "id": 111,
//         "cityId": 7,
//         "name": "東勢區",
//         "zipCode": "423"
//       }, {"id": 112, "cityId": 7, "name": "和平區", "zipCode": "424"}, {
//         "id": 113,
//         "cityId": 7,
//         "name": "新社區",
//         "zipCode": "426"
//       }, {"id": 114, "cityId": 7, "name": "潭子區", "zipCode": "427"}, {
//         "id": 115,
//         "cityId": 7,
//         "name": "大雅區",
//         "zipCode": "428"
//       }, {"id": 116, "cityId": 7, "name": "神岡區", "zipCode": "429"}, {
//         "id": 117,
//         "cityId": 7,
//         "name": "大肚區",
//         "zipCode": "432"
//       }, {"id": 118, "cityId": 7, "name": "沙鹿區", "zipCode": "433"}, {
//         "id": 119,
//         "cityId": 7,
//         "name": "龍井區",
//         "zipCode": "434"
//       }, {"id": 120, "cityId": 7, "name": "梧棲區", "zipCode": "435"}, {
//         "id": 121,
//         "cityId": 7,
//         "name": "清水區",
//         "zipCode": "436"
//       }, {"id": 122, "cityId": 7, "name": "大甲區", "zipCode": "437"}, {
//         "id": 123,
//         "cityId": 7,
//         "name": "外埔區",
//         "zipCode": "438"
//       }, {"id": 124, "cityId": 7, "name": "大安區", "zipCode": "439"}, {
//         "id": 184,
//         "cityId": 8,
//         "name": "東區",
//         "zipCode": "600"
//       }, {"id": 185, "cityId": 8, "name": "西區", "zipCode": "600"}, {
//         "id": 186,
//         "cityId": 9,
//         "name": "番路鄉",
//         "zipCode": "602"
//       }, {"id": 187, "cityId": 9, "name": "梅山鄉", "zipCode": "603"}, {
//         "id": 188,
//         "cityId": 9,
//         "name": "竹崎鄉",
//         "zipCode": "604"
//       }, {"id": 189, "cityId": 9, "name": "阿里山鄉", "zipCode": "605"}, {
//         "id": 190,
//         "cityId": 9,
//         "name": "中埔鄉",
//         "zipCode": "606"
//       }, {"id": 191, "cityId": 9, "name": "大埔鄉", "zipCode": "607"}, {
//         "id": 192,
//         "cityId": 9,
//         "name": "水上鄉",
//         "zipCode": "608"
//       }, {"id": 193, "cityId": 9, "name": "鹿草鄉", "zipCode": "611"}, {
//         "id": 194,
//         "cityId": 9,
//         "name": "太保市",
//         "zipCode": "612"
//       }, {"id": 195, "cityId": 9, "name": "朴子市", "zipCode": "613"}, {
//         "id": 196,
//         "cityId": 9,
//         "name": "東石鄉",
//         "zipCode": "614"
//       }, {"id": 197, "cityId": 9, "name": "六腳鄉", "zipCode": "615"}, {
//         "id": 198,
//         "cityId": 9,
//         "name": "新港鄉",
//         "zipCode": "616"
//       }, {"id": 199, "cityId": 9, "name": "民雄鄉", "zipCode": "621"}, {
//         "id": 200,
//         "cityId": 9,
//         "name": "大林鎮",
//         "zipCode": "622"
//       }, {"id": 201, "cityId": 9, "name": "溪口鄉", "zipCode": "623"}, {
//         "id": 202,
//         "cityId": 9,
//         "name": "義竹鄉",
//         "zipCode": "624"
//       }, {"id": 203, "cityId": 9, "name": "布袋鎮", "zipCode": "625"}, {
//         "id": 241,
//         "cityId": 10,
//         "name": "新興區",
//         "zipCode": "800"
//       }, {"id": 242, "cityId": 10, "name": "前金區", "zipCode": "801"}, {
//         "id": 243,
//         "cityId": 10,
//         "name": "苓雅區",
//         "zipCode": "802"
//       }, {"id": 244, "cityId": 10, "name": "鹽埕區", "zipCode": "803"}, {
//         "id": 245,
//         "cityId": 10,
//         "name": "鼓山區",
//         "zipCode": "804"
//       }, {"id": 246, "cityId": 10, "name": "旗津區", "zipCode": "805"}, {
//         "id": 247,
//         "cityId": 10,
//         "name": "前鎮區",
//         "zipCode": "806"
//       }, {"id": 248, "cityId": 10, "name": "三民區", "zipCode": "807"}, {
//         "id": 249,
//         "cityId": 10,
//         "name": "楠梓區",
//         "zipCode": "811"
//       }, {"id": 250, "cityId": 10, "name": "小港區", "zipCode": "812"}, {
//         "id": 251,
//         "cityId": 10,
//         "name": "左營區",
//         "zipCode": "813"
//       }, {"id": 252, "cityId": 10, "name": "仁武區", "zipCode": "814"}, {
//         "id": 253,
//         "cityId": 10,
//         "name": "大社區",
//         "zipCode": "815"
//       }, {"id": 254, "cityId": 10, "name": "東沙群島", "zipCode": "817"}, {
//         "id": 255,
//         "cityId": 10,
//         "name": "南沙群島",
//         "zipCode": "819"
//       }, {"id": 256, "cityId": 10, "name": "岡山區", "zipCode": "820"}, {
//         "id": 257,
//         "cityId": 10,
//         "name": "路竹區",
//         "zipCode": "821"
//       }, {"id": 258, "cityId": 10, "name": "阿蓮區", "zipCode": "822"}, {
//         "id": 259,
//         "cityId": 10,
//         "name": "田寮區",
//         "zipCode": "823"
//       }, {"id": 260, "cityId": 10, "name": "燕巢區", "zipCode": "824"}, {
//         "id": 261,
//         "cityId": 10,
//         "name": "橋頭區",
//         "zipCode": "825"
//       }, {"id": 262, "cityId": 10, "name": "梓官區", "zipCode": "826"}, {
//         "id": 263,
//         "cityId": 10,
//         "name": "彌陀區",
//         "zipCode": "827"
//       }, {"id": 264, "cityId": 10, "name": "永安區", "zipCode": "828"}, {
//         "id": 265,
//         "cityId": 10,
//         "name": "湖內區",
//         "zipCode": "829"
//       }, {"id": 266, "cityId": 10, "name": "鳳山區", "zipCode": "830"}, {
//         "id": 267,
//         "cityId": 10,
//         "name": "大寮區",
//         "zipCode": "831"
//       }, {"id": 268, "cityId": 10, "name": "林園區", "zipCode": "832"}, {
//         "id": 269,
//         "cityId": 10,
//         "name": "鳥松區",
//         "zipCode": "833"
//       }, {"id": 270, "cityId": 10, "name": "大樹區", "zipCode": "840"}, {
//         "id": 271,
//         "cityId": 10,
//         "name": "旗山區",
//         "zipCode": "842"
//       }, {"id": 272, "cityId": 10, "name": "美濃區", "zipCode": "843"}, {
//         "id": 273,
//         "cityId": 10,
//         "name": "六龜區",
//         "zipCode": "844"
//       }, {"id": 274, "cityId": 10, "name": "內門區", "zipCode": "845"}, {
//         "id": 275,
//         "cityId": 10,
//         "name": "杉林區",
//         "zipCode": "846"
//       }, {"id": 276, "cityId": 10, "name": "甲仙區", "zipCode": "847"}, {
//         "id": 277,
//         "cityId": 10,
//         "name": "桃源區",
//         "zipCode": "848"
//       }, {"id": 278, "cityId": 10, "name": "那瑪夏區", "zipCode": "849"}, {
//         "id": 279,
//         "cityId": 10,
//         "name": "茂林區",
//         "zipCode": "851"
//       }, {"id": 280, "cityId": 10, "name": "茄萣區", "zipCode": "852"}, {
//         "id": 368,
//         "cityId": 11,
//         "name": "南竿鄉",
//         "zipCode": "209"
//       }, {"id": 369, "cityId": 11, "name": "北竿鄉", "zipCode": "210"}, {
//         "id": 370,
//         "cityId": 11,
//         "name": "莒光鄉",
//         "zipCode": "211"
//       }, {"id": 371, "cityId": 11, "name": "東引鄉", "zipCode": "212"}, {
//         "id": 362,
//         "cityId": 12,
//         "name": "金沙鎮",
//         "zipCode": "890"
//       }, {"id": 363, "cityId": 12, "name": "金湖鎮", "zipCode": "891"}, {
//         "id": 364,
//         "cityId": 12,
//         "name": "金寧鄉",
//         "zipCode": "892"
//       }, {"id": 365, "cityId": 12, "name": "金城鎮", "zipCode": "893"}, {
//         "id": 366,
//         "cityId": 12,
//         "name": "烈嶼鄉",
//         "zipCode": "894"
//       }, {"id": 367, "cityId": 12, "name": "烏坵鄉", "zipCode": "896"}, {
//         "id": 343,
//         "cityId": 13,
//         "name": "宜蘭市",
//         "zipCode": "260"
//       }, {"id": 344, "cityId": 13, "name": "頭城鎮", "zipCode": "261"}, {
//         "id": 345,
//         "cityId": 13,
//         "name": "礁溪鄉",
//         "zipCode": "262"
//       }, {"id": 346, "cityId": 13, "name": "壯圍鄉", "zipCode": "263"}, {
//         "id": 347,
//         "cityId": 13,
//         "name": "員山鄉",
//         "zipCode": "264"
//       }, {"id": 348, "cityId": 13, "name": "羅東鎮", "zipCode": "265"}, {
//         "id": 349,
//         "cityId": 13,
//         "name": "三星鄉",
//         "zipCode": "266"
//       }, {"id": 350, "cityId": 13, "name": "大同鄉", "zipCode": "267"}, {
//         "id": 351,
//         "cityId": 13,
//         "name": "五結鄉",
//         "zipCode": "268"
//       }, {"id": 352, "cityId": 13, "name": "冬山鄉", "zipCode": "269"}, {
//         "id": 353,
//         "cityId": 13,
//         "name": "蘇澳鎮",
//         "zipCode": "270"
//       }, {"id": 354, "cityId": 13, "name": "南澳鄉", "zipCode": "272"}, {
//         "id": 355,
//         "cityId": 13,
//         "name": "釣魚臺",
//         "zipCode": "290"
//       }, {"id": 151, "cityId": 14, "name": "南投市", "zipCode": "540"}, {
//         "id": 152,
//         "cityId": 14,
//         "name": "中寮鄉",
//         "zipCode": "541"
//       }, {"id": 153, "cityId": 14, "name": "草屯鎮", "zipCode": "542"}, {
//         "id": 154,
//         "cityId": 14,
//         "name": "國姓鄉",
//         "zipCode": "544"
//       }, {"id": 155, "cityId": 14, "name": "埔里鎮", "zipCode": "545"}, {
//         "id": 156,
//         "cityId": 14,
//         "name": "仁愛鄉",
//         "zipCode": "546"
//       }, {"id": 157, "cityId": 14, "name": "名間鄉", "zipCode": "551"}, {
//         "id": 158,
//         "cityId": 14,
//         "name": "集集鎮",
//         "zipCode": "552"
//       }, {"id": 159, "cityId": 14, "name": "水里鄉", "zipCode": "553"}, {
//         "id": 160,
//         "cityId": 14,
//         "name": "魚池鄉",
//         "zipCode": "555"
//       }, {"id": 161, "cityId": 14, "name": "信義鄉", "zipCode": "556"}, {
//         "id": 162,
//         "cityId": 14,
//         "name": "竹山鎮",
//         "zipCode": "557"
//       }, {"id": 163, "cityId": 14, "name": "鹿谷鄉", "zipCode": "558"}, {
//         "id": 330,
//         "cityId": 15,
//         "name": "花蓮市",
//         "zipCode": "970"
//       }, {"id": 331, "cityId": 15, "name": "新城鄉", "zipCode": "971"}, {
//         "id": 332,
//         "cityId": 15,
//         "name": "秀林鄉",
//         "zipCode": "972"
//       }, {"id": 333, "cityId": 15, "name": "吉安鄉", "zipCode": "973"}, {
//         "id": 334,
//         "cityId": 15,
//         "name": "壽豐鄉",
//         "zipCode": "974"
//       }, {"id": 335, "cityId": 15, "name": "鳳林鎮", "zipCode": "975"}, {
//         "id": 336,
//         "cityId": 15,
//         "name": "光復鄉",
//         "zipCode": "976"
//       }, {"id": 337, "cityId": 15, "name": "豐濱鄉", "zipCode": "977"}, {
//         "id": 338,
//         "cityId": 15,
//         "name": "瑞穗鄉",
//         "zipCode": "978"
//       }, {"id": 339, "cityId": 15, "name": "萬榮鄉", "zipCode": "979"}, {
//         "id": 340,
//         "cityId": 15,
//         "name": "玉里鎮",
//         "zipCode": "981"
//       }, {"id": 341, "cityId": 15, "name": "卓溪鄉", "zipCode": "982"}, {
//         "id": 342,
//         "cityId": 15,
//         "name": "富里鄉",
//         "zipCode": "983"
//       }, {"id": 356, "cityId": 16, "name": "馬公市", "zipCode": "880"}, {
//         "id": 357,
//         "cityId": 16,
//         "name": "西嶼鄉",
//         "zipCode": "881"
//       }, {"id": 358, "cityId": 16, "name": "望安鄉", "zipCode": "882"}, {
//         "id": 359,
//         "cityId": 16,
//         "name": "七美鄉",
//         "zipCode": "883"
//       }, {"id": 360, "cityId": 16, "name": "白沙鄉", "zipCode": "884"}, {
//         "id": 361,
//         "cityId": 16,
//         "name": "湖西鄉",
//         "zipCode": "885"
//       }, {"id": 1, "cityId": 17, "name": "仁愛區", "zipCode": "200"}, {
//         "id": 2,
//         "cityId": 17,
//         "name": "信義區",
//         "zipCode": "201"
//       }, {"id": 3, "cityId": 17, "name": "中正區", "zipCode": "202"}, {
//         "id": 4,
//         "cityId": 17,
//         "name": "中山區",
//         "zipCode": "203"
//       }, {"id": 5, "cityId": 17, "name": "安樂區", "zipCode": "204"}, {
//         "id": 6,
//         "cityId": 17,
//         "name": "暖暖區",
//         "zipCode": "205"
//       }, {"id": 7, "cityId": 17, "name": "七堵區", "zipCode": "206"}, {
//         "id": 62,
//         "cityId": 18,
//         "name": "東區",
//         "zipCode": "300"
//       }, {"id": 63, "cityId": 18, "name": "北區", "zipCode": "300"}, {
//         "id": 64,
//         "cityId": 18,
//         "name": "香山區",
//         "zipCode": "300"
//       }, {"id": 8, "cityId": 19, "name": "中正區", "zipCode": "100"}, {
//         "id": 9,
//         "cityId": 19,
//         "name": "大同區",
//         "zipCode": "103"
//       }, {"id": 10, "cityId": 19, "name": "中山區", "zipCode": "104"}, {
//         "id": 11,
//         "cityId": 19,
//         "name": "松山區",
//         "zipCode": "105"
//       }, {"id": 12, "cityId": 19, "name": "大安區", "zipCode": "106"}, {
//         "id": 13,
//         "cityId": 19,
//         "name": "萬華區",
//         "zipCode": "108"
//       }, {"id": 14, "cityId": 19, "name": "信義區", "zipCode": "110"}, {
//         "id": 15,
//         "cityId": 19,
//         "name": "士林區",
//         "zipCode": "111"
//       }, {"id": 16, "cityId": 19, "name": "北投區", "zipCode": "112"}, {
//         "id": 17,
//         "cityId": 19,
//         "name": "內湖區",
//         "zipCode": "114"
//       }, {"id": 18, "cityId": 19, "name": "南港區", "zipCode": "115"}, {
//         "id": 19,
//         "cityId": 19,
//         "name": "文山區",
//         "zipCode": "116"
//       }, {"id": 22, "cityId": 20, "name": "板橋區", "zipCode": "220"}, {
//         "id": 39,
//         "cityId": 20,
//         "name": "三重區",
//         "zipCode": "241"
//       }, {"id": 34, "cityId": 20, "name": "中和區", "zipCode": "235"}, {
//         "id": 33,
//         "cityId": 20,
//         "name": "永和區",
//         "zipCode": "234"
//       }, {"id": 40, "cityId": 20, "name": "新莊區", "zipCode": "242"}, {
//         "id": 30,
//         "cityId": 20,
//         "name": "新店區",
//         "zipCode": "231"
//       }, {"id": 35, "cityId": 20, "name": "土城區", "zipCode": "236"}, {
//         "id": 43,
//         "cityId": 20,
//         "name": "蘆洲區",
//         "zipCode": "247"
//       }, {"id": 23, "cityId": 20, "name": "汐止區", "zipCode": "221"}, {
//         "id": 37,
//         "cityId": 20,
//         "name": "樹林區",
//         "zipCode": "238"
//       }, {"id": 46, "cityId": 20, "name": "淡水區", "zipCode": "251"}, {
//         "id": 38,
//         "cityId": 20,
//         "name": "鶯歌區",
//         "zipCode": "239"
//       }, {"id": 36, "cityId": 20, "name": "三峽區", "zipCode": "237"}, {
//         "id": 26,
//         "cityId": 20,
//         "name": "瑞芳區",
//         "zipCode": "224"
//       }, {"id": 44, "cityId": 20, "name": "五股區", "zipCode": "248"}, {
//         "id": 41,
//         "cityId": 20,
//         "name": "泰山區",
//         "zipCode": "243"
//       }, {"id": 42, "cityId": 20, "name": "林口區", "zipCode": "244"}, {
//         "id": 24,
//         "cityId": 20,
//         "name": "深坑區",
//         "zipCode": "222"
//       }, {"id": 25, "cityId": 20, "name": "石碇區", "zipCode": "223"}, {
//         "id": 31,
//         "cityId": 20,
//         "name": "坪林區",
//         "zipCode": "232"
//       }, {"id": 47, "cityId": 20, "name": "三芝區", "zipCode": "252"}, {
//         "id": 48,
//         "cityId": 20,
//         "name": "石門區",
//         "zipCode": "253"
//       }, {"id": 45, "cityId": 20, "name": "八里區", "zipCode": "249"}, {
//         "id": 27,
//         "cityId": 20,
//         "name": "平溪區",
//         "zipCode": "226"
//       }, {"id": 28, "cityId": 20, "name": "雙溪區", "zipCode": "227"}, {
//         "id": 29,
//         "cityId": 20,
//         "name": "貢寮區",
//         "zipCode": "228"
//       }, {"id": 21, "cityId": 20, "name": "金山區", "zipCode": "208"}, {
//         "id": 20,
//         "cityId": 20,
//         "name": "萬里區",
//         "zipCode": "207"
//       }, {"id": 32, "cityId": 20, "name": "烏來區", "zipCode": "233"}, {
//         "id": 204,
//         "cityId": 21,
//         "name": "中西區",
//         "zipCode": "700"
//       }, {"id": 205, "cityId": 21, "name": "東區", "zipCode": "701"}, {
//         "id": 206,
//         "cityId": 21,
//         "name": "南區",
//         "zipCode": "702"
//       }, {"id": 207, "cityId": 21, "name": "北區", "zipCode": "704"}, {
//         "id": 208,
//         "cityId": 21,
//         "name": "安平區",
//         "zipCode": "708"
//       }, {"id": 209, "cityId": 21, "name": "安南區", "zipCode": "709"}, {
//         "id": 210,
//         "cityId": 21,
//         "name": "永康區",
//         "zipCode": "710"
//       }, {"id": 211, "cityId": 21, "name": "歸仁區", "zipCode": "711"}, {
//         "id": 212,
//         "cityId": 21,
//         "name": "新化區",
//         "zipCode": "712"
//       }, {"id": 213, "cityId": 21, "name": "左鎮區", "zipCode": "713"}, {
//         "id": 214,
//         "cityId": 21,
//         "name": "玉井區",
//         "zipCode": "714"
//       }, {"id": 215, "cityId": 21, "name": "楠西區", "zipCode": "715"}, {
//         "id": 216,
//         "cityId": 21,
//         "name": "南化區",
//         "zipCode": "716"
//       }, {"id": 217, "cityId": 21, "name": "仁德區", "zipCode": "717"}, {
//         "id": 218,
//         "cityId": 21,
//         "name": "關廟區",
//         "zipCode": "718"
//       }, {"id": 219, "cityId": 21, "name": "龍崎區", "zipCode": "719"}, {
//         "id": 220,
//         "cityId": 21,
//         "name": "官田區",
//         "zipCode": "720"
//       }, {"id": 221, "cityId": 21, "name": "麻豆區", "zipCode": "721"}, {
//         "id": 222,
//         "cityId": 21,
//         "name": "佳里區",
//         "zipCode": "722"
//       }, {"id": 223, "cityId": 21, "name": "西港區", "zipCode": "723"}, {
//         "id": 224,
//         "cityId": 21,
//         "name": "七股區",
//         "zipCode": "724"
//       }, {"id": 225, "cityId": 21, "name": "將軍區", "zipCode": "725"}, {
//         "id": 226,
//         "cityId": 21,
//         "name": "學甲區",
//         "zipCode": "726"
//       }, {"id": 227, "cityId": 21, "name": "北門區", "zipCode": "727"}, {
//         "id": 228,
//         "cityId": 21,
//         "name": "新營區",
//         "zipCode": "730"
//       }, {"id": 229, "cityId": 21, "name": "後壁區", "zipCode": "731"}, {
//         "id": 230,
//         "cityId": 21,
//         "name": "白河區",
//         "zipCode": "732"
//       }, {"id": 231, "cityId": 21, "name": "東山區", "zipCode": "733"}, {
//         "id": 232,
//         "cityId": 21,
//         "name": "六甲區",
//         "zipCode": "734"
//       }, {"id": 233, "cityId": 21, "name": "下營區", "zipCode": "735"}, {
//         "id": 234,
//         "cityId": 21,
//         "name": "柳營區",
//         "zipCode": "736"
//       }, {"id": 235, "cityId": 21, "name": "鹽水區", "zipCode": "737"}, {
//         "id": 236,
//         "cityId": 21,
//         "name": "善化區",
//         "zipCode": "741"
//       }, {"id": 237, "cityId": 21, "name": "大內區", "zipCode": "742"}, {
//         "id": 238,
//         "cityId": 21,
//         "name": "山上區",
//         "zipCode": "743"
//       }, {"id": 239, "cityId": 21, "name": "新市區", "zipCode": "744"}, {
//         "id": 240,
//         "cityId": 21,
//         "name": "安定區",
//         "zipCode": "745"
//       }, {"id": 49, "cityId": 22, "name": "中壢區", "zipCode": "320"}, {
//         "id": 50,
//         "cityId": 22,
//         "name": "平鎮區",
//         "zipCode": "324"
//       }, {"id": 51, "cityId": 22, "name": "龍潭區", "zipCode": "325"}, {
//         "id": 52,
//         "cityId": 22,
//         "name": "楊梅區",
//         "zipCode": "326"
//       }, {"id": 53, "cityId": 22, "name": "新屋區", "zipCode": "327"}, {
//         "id": 54,
//         "cityId": 22,
//         "name": "觀音區",
//         "zipCode": "328"
//       }, {"id": 55, "cityId": 22, "name": "桃園區", "zipCode": "330"}, {
//         "id": 56,
//         "cityId": 22,
//         "name": "龜山區",
//         "zipCode": "333"
//       }, {"id": 57, "cityId": 22, "name": "八德區", "zipCode": "334"}, {
//         "id": 58,
//         "cityId": 22,
//         "name": "大溪區",
//         "zipCode": "335"
//       }, {"id": 59, "cityId": 22, "name": "復興區", "zipCode": "336"}, {
//         "id": 60,
//         "cityId": 22,
//         "name": "大園區",
//         "zipCode": "337"
//       }, {"id": 61, "cityId": 22, "name": "蘆竹區", "zipCode": "338"}],
//       "cityList": [{"id": 17, "name": "基隆市"}, {"id": 19, "name": "台北市"}, {"id": 20, "name": "新北市"}, {
//         "id": 22,
//         "name": "桃園市"
//       }, {"id": 18, "name": "新竹市"}, {"id": 6, "name": "新竹縣"}, {"id": 5, "name": "苗栗縣"}, {
//         "id": 7,
//         "name": "台中市"
//       }, {"id": 4, "name": "彰化縣"}, {"id": 14, "name": "南投縣"}, {"id": 3, "name": "雲林縣"}, {
//         "id": 8,
//         "name": "嘉義市"
//       }, {"id": 9, "name": "嘉義縣"}, {"id": 21, "name": "台南市"}, {"id": 10, "name": "高雄市"}, {
//         "id": 2,
//         "name": "屏東縣"
//       }, {"id": 1, "name": "台東縣"}, {"id": 15, "name": "花蓮縣"}, {"id": 13, "name": "宜蘭縣"}, {
//         "id": 16,
//         "name": "澎湖縣"
//       }, {"id": 12, "name": "金門縣"}, {"id": 11, "name": "連江縣"}],
//       "disabledDateList": [{"date": "2017-07-28", "reason": "颱風"}],
//       "purposeList": [{
//         "purposeId": 1,
//         "productCode": "Travel",
//         "productName": "國外旅平險",
//         "name": "觀光",
//         "enabled": true
//       }, {
//         "purposeId": 2,
//         "productCode": "Travel",
//         "productName": "國外旅平險",
//         "name": "出差",
//         "enabled": true
//       }, {
//         "purposeId": 3,
//         "productCode": "Travel",
//         "productName": "國外旅平險",
//         "name": "遊學",
//         "enabled": true
//       }, {"purposeId": 4, "productCode": "Travel", "productName": "國外旅平險", "name": "留學", "enabled": true}],
//       "countryList": [{
//         "groupId": 1,
//         "name": "東北亞-日本韓國",
//         "enabled": true,
//         "favorite": false,
//         "countryList": [{"code": "JP", "name": "日本", "enabled": true, "disabledReason": null}, {
//           "code": "KR",
//           "name": "韓國",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "KP", "name": "北韓", "enabled": true, "disabledReason": null}]
//       }, {
//         "groupId": 2,
//         "name": "中國大陸、香港、澳門",
//         "enabled": true,
//         "favorite": false,
//         "countryList": [{"code": "CN", "name": "中國大陸", "enabled": true, "disabledReason": null}, {
//           "code": "HK",
//           "name": "香港",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "MO", "name": "澳門", "enabled": true, "disabledReason": null}]
//       }, {
//         "groupId": 3,
//         "name": "亞洲-其他國家",
//         "enabled": true,
//         "favorite": false,
//         "countryList": [{"code": "AM", "name": "亞美尼亞", "enabled": true, "disabledReason": null}, {
//           "code": "AZ",
//           "name": "亞塞拜然",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "BH", "name": "巴林", "enabled": true, "disabledReason": null}, {
//           "code": "BD",
//           "name": "孟加拉",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "BT", "name": "不丹", "enabled": true, "disabledReason": null}, {
//           "code": "GE",
//           "name": "喬治亞",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "IN", "name": "印度", "enabled": true, "disabledReason": null}, {
//           "code": "IL",
//           "name": "以色列",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "JO", "name": "約旦", "enabled": true, "disabledReason": null}, {
//           "code": "KZ",
//           "name": "哈薩克",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "KW", "name": "科威特", "enabled": true, "disabledReason": null}, {
//           "code": "KG",
//           "name": "吉爾吉斯",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "LA", "name": "寮國", "enabled": true, "disabledReason": null}, {
//           "code": "LB",
//           "name": "黎巴嫩",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "MV", "name": "馬爾地夫", "enabled": true, "disabledReason": null}, {
//           "code": "MN",
//           "name": "蒙古",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "MM", "name": "緬甸", "enabled": true, "disabledReason": null}, {
//           "code": "NP",
//           "name": "尼泊爾",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "OM", "name": "阿曼", "enabled": true, "disabledReason": null}, {
//           "code": "QA",
//           "name": "卡達",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "SA", "name": "沙烏地阿拉伯", "enabled": true, "disabledReason": null}, {
//           "code": "LK",
//           "name": "斯里蘭卡",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "TJ", "name": "塔吉克", "enabled": true, "disabledReason": null}, {
//           "code": "TR",
//           "name": "土耳其",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "TM", "name": "土庫曼", "enabled": true, "disabledReason": null}, {
//           "code": "AE",
//           "name": "阿拉伯聯合大公國",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "UZ", "name": "烏茲別克", "enabled": true, "disabledReason": null}, {
//           "code": "_NIN",
//           "name": "寧夏",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "_ABK", "name": "阿布哈茲", "enabled": true, "disabledReason": null}, {
//           "code": "CY",
//           "name": "塞浦路斯",
//           "enabled": true,
//           "disabledReason": null
//         }]
//       }, {
//         "groupId": 4,
//         "name": "東南亞-新、馬、泰、印、菲等",
//         "enabled": true,
//         "favorite": false,
//         "countryList": [{"code": "BN", "name": "汶萊", "enabled": true, "disabledReason": null}, {
//           "code": "KH",
//           "name": "柬埔寨",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "ID", "name": "印尼", "enabled": true, "disabledReason": null}, {
//           "code": "MY",
//           "name": "馬來西亞",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "PH", "name": "菲律賓", "enabled": true, "disabledReason": null}, {
//           "code": "SG",
//           "name": "新加坡",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "TH", "name": "泰國", "enabled": true, "disabledReason": null}, {
//           "code": "TL",
//           "name": "東帝汶",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "VN", "name": "越南", "enabled": true, "disabledReason": null}]
//       }, {
//         "groupId": 5,
//         "name": "北美-美國、加拿大等",
//         "enabled": true,
//         "favorite": false,
//         "countryList": [{"code": "US", "name": "美國", "enabled": true, "disabledReason": null}, {
//           "code": "BS",
//           "name": "巴哈馬",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "BB", "name": "巴貝多", "enabled": true, "disabledReason": null}, {
//           "code": "BZ",
//           "name": "貝里斯",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "BM", "name": "百慕達", "enabled": true, "disabledReason": null}, {
//           "code": "CA",
//           "name": "加拿大",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "CR", "name": "哥斯大黎加", "enabled": true, "disabledReason": null}, {
//           "code": "CU",
//           "name": "古巴",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "DO", "name": "多明尼加", "enabled": true, "disabledReason": null}, {
//           "code": "DM",
//           "name": "多米尼克",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "SV", "name": "薩爾瓦多", "enabled": true, "disabledReason": null}, {
//           "code": "GD",
//           "name": "格瑞那達",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "GU", "name": "關島", "enabled": true, "disabledReason": null}, {
//           "code": "_GAI",
//           "name": "蓋亞那",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "HT", "name": "海地", "enabled": true, "disabledReason": null}, {
//           "code": "_HAW",
//           "name": "夏威夷",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "HN", "name": "宏都拉斯", "enabled": true, "disabledReason": null}, {
//           "code": "JM",
//           "name": "牙買加",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "NI", "name": "尼加拉瓜", "enabled": true, "disabledReason": null}, {
//           "code": "PA",
//           "name": "巴拿馬",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "LC", "name": "聖露西亞", "enabled": true, "disabledReason": null}, {
//           "code": "_TT1",
//           "name": "千里達",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "GS", "name": "南喬治亞和南桑威奇群島", "enabled": true, "disabledReason": null}, {
//           "code": "HM",
//           "name": "赫德島和麥克唐納群島",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "AN", "name": "荷屬安地列斯", "enabled": true, "disabledReason": null}, {
//           "code": "PM",
//           "name": "聖皮埃爾和密克隆",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "PR", "name": "波多黎各", "enabled": true, "disabledReason": null}]
//       }, {
//         "groupId": 6,
//         "name": "中南美洲-巴西、墨西哥、阿根廷等",
//         "enabled": true,
//         "favorite": false,
//         "countryList": [{"code": "AI", "name": "安圭拉", "enabled": true, "disabledReason": null}, {
//           "code": "_AG1",
//           "name": "安地卡",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "_AG2", "name": "巴布達", "enabled": true, "disabledReason": null}, {
//           "code": "AR",
//           "name": "阿根廷",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "AW", "name": "阿路巴", "enabled": true, "disabledReason": null}, {
//           "code": "BO",
//           "name": "玻利維亞",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "_BON", "name": "荷屬波奈", "enabled": true, "disabledReason": null}, {
//           "code": "BR",
//           "name": "巴西",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "VG", "name": "英屬維京群島", "enabled": true, "disabledReason": null}, {
//           "code": "KY",
//           "name": "開曼群島",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "CL", "name": "智利", "enabled": true, "disabledReason": null}, {
//           "code": "CO",
//           "name": "哥倫比亞",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "CW", "name": "庫拉索", "enabled": true, "disabledReason": null}, {
//           "code": "EC",
//           "name": "厄瓜多爾",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "FK", "name": "福克蘭群島", "enabled": true, "disabledReason": null}, {
//           "code": "GF",
//           "name": "法屬圭亞那",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "GP", "name": "瓜德羅普", "enabled": true, "disabledReason": null}, {
//           "code": "GT",
//           "name": "瓜地馬拉",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "GY", "name": "蓋亞那共和國", "enabled": true, "disabledReason": null}, {
//           "code": "MF",
//           "name": "法屬聖馬丁",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "MX", "name": "墨西哥", "enabled": true, "disabledReason": null}, {
//           "code": "MS",
//           "name": "蒙哲臘",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "PY", "name": "巴拉圭", "enabled": true, "disabledReason": null}, {
//           "code": "PE",
//           "name": "秘魯",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "_BQ2", "name": "荷屬沙巴", "enabled": true, "disabledReason": null}, {
//           "code": "_KN1",
//           "name": "聖克里斯多福",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "_KN2", "name": "尼維斯", "enabled": true, "disabledReason": null}, {
//           "code": "_VC1",
//           "name": "聖文森",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "_VC2", "name": "格瑞那丁", "enabled": true, "disabledReason": null}, {
//           "code": "_BQ1",
//           "name": "聖佑達修斯",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "BL", "name": "聖巴瑟米", "enabled": true, "disabledReason": null}, {
//           "code": "SX",
//           "name": "聖馬丁",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "SR", "name": "蘇利南", "enabled": true, "disabledReason": null}, {
//           "code": "_TT2",
//           "name": "托貝哥",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "UY", "name": "烏拉圭", "enabled": true, "disabledReason": null}, {
//           "code": "VE",
//           "name": "委內瑞拉",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "SH", "name": "聖赫倫那", "enabled": true, "disabledReason": null}, {
//           "code": "TC",
//           "name": "土克凱可群島",
//           "enabled": true,
//           "disabledReason": null
//         }]
//       }, {
//         "groupId": 7,
//         "name": "非洲",
//         "enabled": true,
//         "favorite": false,
//         "countryList": [{"code": "DZ", "name": "阿爾及利亞", "enabled": true, "disabledReason": null}, {
//           "code": "AO",
//           "name": "安哥拉",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "BJ", "name": "貝南", "enabled": true, "disabledReason": null}, {
//           "code": "BW",
//           "name": "波札那",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "BF", "name": "布吉納法索", "enabled": true, "disabledReason": null}, {
//           "code": "BI",
//           "name": "蒲隆地",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "CM", "name": "喀麥隆", "enabled": true, "disabledReason": null}, {
//           "code": "CV",
//           "name": "維德角島",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "KM", "name": "葛摩", "enabled": true, "disabledReason": null}, {
//           "code": "CG",
//           "name": "剛果",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "CI", "name": "象牙海岸", "enabled": true, "disabledReason": null}, {
//           "code": "DJ",
//           "name": "吉布地",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "EG", "name": "埃及", "enabled": true, "disabledReason": null}, {
//           "code": "GQ",
//           "name": "赤道幾內亞",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "ER", "name": "厄利垂亞", "enabled": true, "disabledReason": null}, {
//           "code": "ET",
//           "name": "衣索匹亞",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "GA", "name": "加彭", "enabled": true, "disabledReason": null}, {
//           "code": "GM",
//           "name": "甘比亞",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "GH", "name": "迦納", "enabled": true, "disabledReason": null}, {
//           "code": "GW",
//           "name": "幾內亞比索",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "KE", "name": "肯亞", "enabled": true, "disabledReason": null}, {
//           "code": "LS",
//           "name": "賴索托",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "MG", "name": "馬達加斯加", "enabled": true, "disabledReason": null}, {
//           "code": "MW",
//           "name": "馬拉威",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "MU", "name": "模里西斯", "enabled": true, "disabledReason": null}, {
//           "code": "MA",
//           "name": "摩洛哥",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "MZ", "name": "莫三比克", "enabled": true, "disabledReason": null}, {
//           "code": "NA",
//           "name": "納米比亞",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "RE", "name": "留尼旺", "enabled": true, "disabledReason": null}, {
//           "code": "RW",
//           "name": "盧安達",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "EH", "name": "撒拉威", "enabled": true, "disabledReason": null}, {
//           "code": "ST",
//           "name": "聖多美及普林西比",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "SN", "name": "塞內加爾", "enabled": true, "disabledReason": null}, {
//           "code": "SC",
//           "name": "塞席爾",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "ZA", "name": "南非", "enabled": true, "disabledReason": null}, {
//           "code": "SZ",
//           "name": "史瓦濟蘭",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "TZ", "name": "坦尚尼亞", "enabled": true, "disabledReason": null}, {
//           "code": "TG",
//           "name": "多哥",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "TN", "name": "突尼西亞", "enabled": true, "disabledReason": null}, {
//           "code": "UG",
//           "name": "烏干達",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "_WSH", "name": "西撒哈拉", "enabled": true, "disabledReason": null}, {
//           "code": "ZM",
//           "name": "尚比亞",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "ZW", "name": "辛巴威", "enabled": true, "disabledReason": null}, {
//           "code": "BV",
//           "name": "布維島",
//           "enabled": true,
//           "disabledReason": null
//         }]
//       }, {
//         "groupId": 8,
//         "name": "大洋洲-澳洲、紐西蘭",
//         "enabled": true,
//         "favorite": false,
//         "countryList": [{"code": "AU", "name": "澳大利亞", "enabled": true, "disabledReason": null}, {
//           "code": "NZ",
//           "name": "紐西蘭",
//           "enabled": true,
//           "disabledReason": null
//         }]
//       }, {
//         "groupId": 9,
//         "name": "大洋洲-其他國家",
//         "enabled": true,
//         "favorite": false,
//         "countryList": [{"code": "CK", "name": "科克群島", "enabled": true, "disabledReason": null}, {
//           "code": "FJ",
//           "name": "斐濟",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "_WF2", "name": "富圖納", "enabled": true, "disabledReason": null}, {
//           "code": "KI",
//           "name": "吉里巴斯",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "MH", "name": "馬紹爾群島", "enabled": true, "disabledReason": null}, {
//           "code": "FM",
//           "name": "密克羅尼西亞",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "NR", "name": "諾魯", "enabled": true, "disabledReason": null}, {
//           "code": "NC",
//           "name": "新喀里多尼亞",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "NU", "name": "紐埃", "enabled": true, "disabledReason": null}, {
//           "code": "PW",
//           "name": "帛琉",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "PG", "name": "巴布亞紐幾內亞", "enabled": true, "disabledReason": null}, {
//           "code": "PF",
//           "name": "玻里尼西亞(大溪地)",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "WS", "name": "薩摩亞", "enabled": true, "disabledReason": null}, {
//           "code": "SB",
//           "name": "索羅門群島",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "TO", "name": "東加", "enabled": true, "disabledReason": null}, {
//           "code": "TV",
//           "name": "帛琉",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "VU", "name": "萬那杜", "enabled": true, "disabledReason": null}, {
//           "code": "_WF1",
//           "name": "瓦利斯",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "TK", "name": "托克勞", "enabled": true, "disabledReason": null}, {
//           "code": "MP",
//           "name": "北馬利安納群島",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "CC", "name": "科科斯群島", "enabled": true, "disabledReason": null}, {
//           "code": "CX",
//           "name": "聖誕島",
//           "enabled": true,
//           "disabledReason": null
//         }]
//       }, {
//         "groupId": 10,
//         "name": "歐洲",
//         "enabled": true,
//         "favorite": false,
//         "countryList": [{"code": "DK", "name": "丹麥", "enabled": true, "disabledReason": null}, {
//           "code": "IS",
//           "name": "冰島",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "NO", "name": "挪威", "enabled": true, "disabledReason": null}, {
//           "code": "SE",
//           "name": "瑞典",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "FI", "name": "芬蘭", "enabled": true, "disabledReason": null}, {
//           "code": "BY",
//           "name": "白俄羅斯",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "CZ", "name": "捷克", "enabled": true, "disabledReason": null}, {
//           "code": "PL",
//           "name": "波蘭",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "FR", "name": "法國", "enabled": true, "disabledReason": null}, {
//           "code": "DE",
//           "name": "德國",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "NL", "name": "荷蘭", "enabled": true, "disabledReason": null}, {
//           "code": "UK",
//           "name": "英國",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "IT", "name": "義大利", "enabled": true, "disabledReason": null}, {
//           "code": "PT",
//           "name": "葡萄牙",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "ES", "name": "西班牙", "enabled": true, "disabledReason": null}, {
//           "code": "AD",
//           "name": "安道爾",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "AL", "name": "阿爾巴尼亞", "enabled": true, "disabledReason": null}, {
//           "code": "AT",
//           "name": "奧地利",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "BE", "name": "比利時", "enabled": true, "disabledReason": null}, {
//           "code": "_BA1",
//           "name": "波希尼亞",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "BG", "name": "保加利亞", "enabled": true, "disabledReason": null}, {
//           "code": "HR",
//           "name": "克羅埃西亞",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "EE", "name": "愛沙尼亞", "enabled": true, "disabledReason": null}, {
//           "code": "GR",
//           "name": "希臘",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "VA", "name": "梵諦岡", "enabled": true, "disabledReason": null}, {
//           "code": "HU",
//           "name": "匈牙利",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "LV", "name": "拉脫維亞", "enabled": true, "disabledReason": null}, {
//           "code": "LI",
//           "name": "列支敦士登",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "LT", "name": "立陶宛", "enabled": true, "disabledReason": null}, {
//           "code": "LU",
//           "name": "盧森堡",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "MK", "name": "馬其頓", "enabled": true, "disabledReason": null}, {
//           "code": "MT",
//           "name": "馬爾他",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "MD", "name": "摩爾多瓦", "enabled": true, "disabledReason": null}, {
//           "code": "RO",
//           "name": "羅馬尼亞",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "RU", "name": "俄羅斯", "enabled": true, "disabledReason": null}, {
//           "code": "SM",
//           "name": "聖馬利諾",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "SK", "name": "斯洛伐克", "enabled": true, "disabledReason": null}, {
//           "code": "SI",
//           "name": "斯洛維尼亞",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "CH", "name": "瑞士", "enabled": true, "disabledReason": null}, {
//           "code": "YU",
//           "name": "南斯拉夫",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "_BA2", "name": "赫塞哥維那", "enabled": true, "disabledReason": null}, {
//           "code": "ME",
//           "name": "摩特內哥羅",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "IE", "name": "愛爾蘭", "enabled": true, "disabledReason": null}, {
//           "code": "_PM1",
//           "name": "聖皮埃爾",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "_PM2", "name": "密克隆", "enabled": true, "disabledReason": null}, {
//           "code": "RS",
//           "name": "塞爾維亞",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "MC", "name": "摩納哥", "enabled": true, "disabledReason": null}, {
//           "code": "AX",
//           "name": "奧蘭群島",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "FO", "name": "法羅群島", "enabled": true, "disabledReason": null}, {
//           "code": "GG",
//           "name": "耿西",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "GI", "name": "直布羅陀", "enabled": true, "disabledReason": null}, {
//           "code": "IM",
//           "name": "曼島",
//           "enabled": true,
//           "disabledReason": null
//         }, {"code": "_CHE", "name": "車臣共和國", "enabled": true, "disabledReason": null}]
//       }],
//       "packageList": [{
//         "packageId": 1,
//         "packageName": "300萬 (死亡或殘廢保險理賠金)",
//         "enabled": true,
//         "packageButtonName": "基本保障",
//         "companyCode": "MingTai",
//         "companyName": "明台",
//         "productCode": "Travel",
//         "productName": "國外旅平險",
//         "primaryItems": [{
//           "insItemId": 1,
//           "insItemCode": "TAK003",
//           "insItemName": "死殘",
//           "insItemDesc": null,
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "amountId": 2,
//           "amount": 300,
//           "enabled": true
//         }, {
//           "insItemId": 2,
//           "insItemCode": "TAK001",
//           "insItemName": "責任",
//           "insItemDesc": null,
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "amountId": 6,
//           "amount": 20,
//           "enabled": true
//         }, {
//           "insItemId": 4,
//           "insItemCode": "TAK005",
//           "insItemName": "醫療",
//           "insItemDesc": null,
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "amountId": 7,
//           "amount": 20,
//           "enabled": true
//         }],
//         "secondaryItems": [{
//           "insItemId": 5,
//           "insItemCode": "TAK002",
//           "insItemName": "旅遊不便",
//           "insItemDesc": "旅程出發前取消費用\n旅程縮短直接返國費用\n旅程中途行程更改費用\n行李延誤或遺失費用\n班機延誤及取消費用\n海外探視及特別費用",
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "amountId": 1,
//           "amount": 10,
//           "enabled": true
//         }, {
//           "insItemId": 6,
//           "insItemCode": "TAK006",
//           "insItemName": "海外突發",
//           "insItemDesc": "門診醫療費用保險金\n急診醫療費用保險金\n住院醫療費用保險金",
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "amountId": 3,
//           "amount": 20,
//           "enabled": true
//         }, {
//           "insItemId": 7,
//           "insItemCode": "TAK009",
//           "insItemName": "緊急救援",
//           "insItemDesc": "緊急醫療費用保險金\n遺體或骨灰運返費用\n未成年子女返國費用",
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "amountId": 4,
//           "amount": 50,
//           "enabled": true
//         }, {
//           "insItemId": 8,
//           "insItemCode": "TAK010",
//           "insItemName": "居家竊盜",
//           "insItemDesc": "旅行期間居家竊盜保險",
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "amountId": 5,
//           "amount": 5,
//           "enabled": true
//         }]
//       }, {
//         "packageId": 2,
//         "packageName": "進階方案",
//         "enabled": true,
//         "packageButtonName": "進階方案",
//         "companyCode": "MingTai",
//         "companyName": "明台",
//         "productCode": "Travel",
//         "productName": "國外旅平險",
//         "primaryItems": [{
//           "insItemId": 1,
//           "insItemCode": "TAK003",
//           "insItemName": "死殘",
//           "insItemDesc": null,
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "amountId": 15,
//           "amount": 500,
//           "enabled": true
//         }, {
//           "insItemId": 2,
//           "insItemCode": "TAK001",
//           "insItemName": "責任",
//           "insItemDesc": null,
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "amountId": 16,
//           "amount": 30,
//           "enabled": true
//         }, {
//           "insItemId": 4,
//           "insItemCode": "TAK005",
//           "insItemName": "醫療",
//           "insItemDesc": null,
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "amountId": 17,
//           "amount": 30,
//           "enabled": true
//         }],
//         "secondaryItems": [{
//           "insItemId": 5,
//           "insItemCode": "TAK002",
//           "insItemName": "旅遊不便",
//           "insItemDesc": "旅程出發前取消費用\n旅程縮短直接返國費用\n旅程中途行程更改費用\n行李延誤或遺失費用\n班機延誤及取消費用\n海外探視及特別費用",
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "amountId": 18,
//           "amount": 10,
//           "enabled": true
//         }, {
//           "insItemId": 6,
//           "insItemCode": "TAK006",
//           "insItemName": "海外突發",
//           "insItemDesc": "門診醫療費用保險金\n急診醫療費用保險金\n住院醫療費用保險金",
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "amountId": 19,
//           "amount": 30,
//           "enabled": true
//         }, {
//           "insItemId": 7,
//           "insItemCode": "TAK009",
//           "insItemName": "緊急救援",
//           "insItemDesc": "緊急醫療費用保險金\n遺體或骨灰運返費用\n未成年子女返國費用",
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "amountId": 20,
//           "amount": 50,
//           "enabled": true
//         }, {
//           "insItemId": 8,
//           "insItemCode": "TAK010",
//           "insItemName": "居家竊盜",
//           "insItemDesc": "旅行期間居家竊盜保險",
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "amountId": 21,
//           "amount": 5,
//           "enabled": true
//         }]
//       }, {
//         "packageId": 3,
//         "packageName": "全方位保障",
//         "enabled": true,
//         "packageButtonName": "全方位保障",
//         "companyCode": "MingTai",
//         "companyName": "明台",
//         "productCode": "Travel",
//         "productName": "國外旅平險",
//         "primaryItems": [{
//           "insItemId": 1,
//           "insItemCode": "TAK003",
//           "insItemName": "死殘",
//           "insItemDesc": null,
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "amountId": 8,
//           "amount": 1000,
//           "enabled": true
//         }, {
//           "insItemId": 2,
//           "insItemCode": "TAK001",
//           "insItemName": "責任",
//           "insItemDesc": null,
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "amountId": 9,
//           "amount": 50,
//           "enabled": true
//         }, {
//           "insItemId": 4,
//           "insItemCode": "TAK005",
//           "insItemName": "醫療",
//           "insItemDesc": null,
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "amountId": 10,
//           "amount": 50,
//           "enabled": true
//         }],
//         "secondaryItems": [{
//           "insItemId": 5,
//           "insItemCode": "TAK002",
//           "insItemName": "旅遊不便",
//           "insItemDesc": "旅程出發前取消費用\n旅程縮短直接返國費用\n旅程中途行程更改費用\n行李延誤或遺失費用\n班機延誤及取消費用\n海外探視及特別費用",
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "amountId": 11,
//           "amount": 10,
//           "enabled": true
//         }, {
//           "insItemId": 6,
//           "insItemCode": "TAK006",
//           "insItemName": "海外突發",
//           "insItemDesc": "門診醫療費用保險金\n急診醫療費用保險金\n住院醫療費用保險金",
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "amountId": 12,
//           "amount": 50,
//           "enabled": true
//         }, {
//           "insItemId": 7,
//           "insItemCode": "TAK009",
//           "insItemName": "緊急救援",
//           "insItemDesc": "緊急醫療費用保險金\n遺體或骨灰運返費用\n未成年子女返國費用",
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "amountId": 13,
//           "amount": 50,
//           "enabled": true
//         }, {
//           "insItemId": 8,
//           "insItemCode": "TAK010",
//           "insItemName": "居家竊盜",
//           "insItemDesc": "旅行期間居家竊盜保險",
//           "companyCode": "MingTai",
//           "companyName": "明台",
//           "amountId": 14,
//           "amount": 5,
//           "enabled": true
//         }]
//       }]
//     };

//     return mockPosts;

//   }
// }
