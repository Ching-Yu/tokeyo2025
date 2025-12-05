import { DayItinerary } from './types';

// Helper to generate IDs
const uuid = () => Math.random().toString(36).substr(2, 9);

export const INITIAL_ITINERARY: DayItinerary[] = [
  {
    id: 'day-1',
    dayNumber: 1,
    date: '12月6日 (週六)',
    locationRegion: '逗子 (Zushi)',
    hotel: 'Kanagawa Luxy Nagisa Hotel',
    activities: [
      { id: uuid(), time: '12:00', title: '抵達桃園機場第一航廈', type: 'transport', notes: '吸菸區在一航左右走道底側' },
      { id: uuid(), time: '14:00', title: '飛往成田機場 (TR874)', type: 'transport', notes: '到達時間 17:55' },
      { id: uuid(), time: '19:37', title: '前往逗子住宿', type: 'transport', notes: 'Skyliner需先訂票。備案:搭NEX到大船再到逗子' },
      { id: uuid(), time: '22:15', title: '晚餐: サケトサカナ ハナモグリ', type: 'food', link: 'https://maps.app.goo.gl/iyDmJoqp9ZWtaX9w8' },
    ]
  },
  {
    id: 'day-2',
    dayNumber: 2,
    date: '12月7日 (週日)',
    locationRegion: '逗子 + 葉山',
    hotel: 'Kanagawa Luxy Nagisa Hotel',
    activities: [
      { id: uuid(), time: '10:00', title: 'Toyota Rent a Car 取車', type: 'transport', notes: '營業時間 08:00-20:00', link: 'https://rent.toyota.co.jp/zh-tw/' },
      { id: uuid(), time: '10:00', title: '森戶神社', type: 'sightseeing', notes: '參拜至 11:30' },
      { id: uuid(), time: '11:30', title: '午餐: Yushige', type: 'food', link: 'https://maps.app.goo.gl/iyDmJoqp9ZWtaX9w8' },
      { id: uuid(), time: '13:00', title: '葉山近代美術館 & 葉山公園', type: 'sightseeing' },
      { id: uuid(), time: '15:00', title: '真名瀨海岸', type: 'sightseeing' },
      { id: uuid(), time: '18:00', title: '晚餐: Hikonoya', type: 'food' },
    ]
  },
  {
    id: 'day-3',
    dayNumber: 3,
    date: '12月8日 (週一)',
    locationRegion: '河口湖 (Kawaguchiko)',
    hotel: 'Kawaguchiko Urban Resort Villa',
    activities: [
      { id: uuid(), time: '08:30', title: 'Checkout 出門', type: 'transport' },
      { id: uuid(), time: '10:30', title: '富士山夢之大橋', type: 'sightseeing' },
      { id: uuid(), time: '11:20', title: '午餐: Mizuho', type: 'food' },
      { id: uuid(), time: '12:40', title: '星巴克 富士川服務區(下行)店', type: 'food' },
      { id: uuid(), time: '13:15', title: 'Fujisan Pudding', type: 'food' },
      { id: uuid(), time: '15:00', title: '河口湖別墅 Check-in', type: 'stay' },
      { id: uuid(), time: '17:30', title: '大石公園 / 河口湖音樂森林', type: 'sightseeing', link: 'https://maps.app.goo.gl/ubhfmi1hnoXKunpf6' },
      { id: uuid(), time: '21:00', title: '晚餐: Ramen Kaneyuki', type: 'food' },
    ]
  },
  {
    id: 'day-4',
    dayNumber: 4,
    date: '12月9日 (週二)',
    locationRegion: '河口湖 + 靜岡',
    hotel: '駒込JR東日本METS飯店',
    activities: [
      { id: uuid(), time: '06:00', title: '河口湖逆富士', type: 'sightseeing', notes: '山中湖平野之濱' },
      { id: uuid(), time: '08:30', title: '河口湖纜車 -> 天上山公園', type: 'sightseeing', notes: '12/8停駛所以今天去' },
      { id: uuid(), time: '10:00', title: '新倉山淺間公園', type: 'sightseeing' },
      { id: uuid(), time: '11:00', title: '午餐: Unagi Restaurant SAKUYA', type: 'food' },
      { id: uuid(), time: '12:30', title: '日川時計店', type: 'sightseeing' },
      { id: uuid(), time: '14:40', title: '御殿場 Outlet + 晚餐', type: 'other' },
      { id: uuid(), time: '18:30', title: '開車回住宿', type: 'transport' },
    ]
  },
  {
    id: 'day-5',
    dayNumber: 5,
    date: '12月10日 (週三)',
    locationRegion: '東京 (Tokyo)',
    hotel: '駒込JR東日本METS飯店',
    activities: [
      { id: uuid(), time: '09:00', title: '還車', type: 'transport', notes: '10:00前要還' },
      { id: uuid(), time: '09:00', title: 'Dixans 東京大學', type: 'sightseeing' },
      { id: uuid(), time: '11:30', title: '午餐: 日本橋海鮮丼 辻半', type: 'food' },
      { id: uuid(), time: '13:15', title: '國立新美術館', type: 'sightseeing' },
      { id: uuid(), time: '15:00', title: '六本木新城展望台', type: 'sightseeing', notes: '16:00前到' },
      { id: uuid(), time: '19:00', title: '銀座 UNIQLO Tokyo', type: 'other' },
      { id: uuid(), time: '21:00', title: 'Burlesque TOKYO', type: 'sightseeing' },
    ]
  },
  {
    id: 'day-6',
    dayNumber: 6,
    date: '12月11日 (週四)',
    locationRegion: '新宿 (Shinjuku)',
    activities: [
      { id: uuid(), time: 'All Day', title: '新宿 自由活動', type: 'other' },
    ]
  },
  {
    id: 'day-7',
    dayNumber: 7,
    date: '12月12日 (週五)',
    locationRegion: '涉谷 + 表參道',
    activities: [
      { id: uuid(), time: 'Day', title: '涉谷 表參道 自由活動', type: 'other' },
      { id: uuid(), time: '15:40', title: 'Shibuya Sky', type: 'sightseeing', notes: '15:40~17:30' },
    ]
  },
  {
    id: 'day-8',
    dayNumber: 8,
    date: '12月13日 (週六)',
    locationRegion: '返程 (Return)',
    activities: [
      { id: uuid(), time: '09:00', title: '日暮里搭 Skyliner 去機場', type: 'transport' },
      { id: uuid(), time: '11:55', title: '回程班機', type: 'transport', notes: '15:10 抵達' },
    ]
  },
];
