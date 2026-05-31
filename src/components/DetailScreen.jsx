import { useRef, useState } from 'react'
import { HomeIndicator, StatusBar } from './SplashScreen.jsx'

const galleryImages = [
  `${import.meta.env.BASE_URL}assets/detail-sub-1.png`,
  `${import.meta.env.BASE_URL}assets/detail-sub-2.png`,
  `${import.meta.env.BASE_URL}assets/detail-sub-3.png`,
  `${import.meta.env.BASE_URL}assets/detail-sub-4.png`,
]

const oasisImages = [
  `${import.meta.env.BASE_URL}assets/figma-oasis-main.png`,
  `${import.meta.env.BASE_URL}assets/figma-oasis-sub-1.png`,
  `${import.meta.env.BASE_URL}assets/figma-oasis-sub-2.png`,
  `${import.meta.env.BASE_URL}assets/figma-oasis-sub-3.png`,
  `${import.meta.env.BASE_URL}assets/figma-oasis-sub-4.png`,
]

const oasisMenuImages = {
  exterior: oasisImages[0],
  salad: `${import.meta.env.BASE_URL}assets/figma-oasis-menu-salad.png`,
  sandwich: `${import.meta.env.BASE_URL}assets/figma-oasis-menu-sandwich.png`,
  toast: `${import.meta.env.BASE_URL}assets/figma-oasis-menu-toast.png`,
  eggBenedict: `${import.meta.env.BASE_URL}assets/figma-oasis-menu-egg.png`,
  pancake: `${import.meta.env.BASE_URL}assets/figma-oasis-menu-pancake.png`,
}

const tatsuImages = [
  `${import.meta.env.BASE_URL}assets/main.png`,
  `${import.meta.env.BASE_URL}assets/sub1.png`,
  `${import.meta.env.BASE_URL}assets/sub2.png`,
  `${import.meta.env.BASE_URL}assets/sub3.png`,
  `${import.meta.env.BASE_URL}assets/sub4.png`,
]

const createPhotoRange = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, index) => `${import.meta.env.BASE_URL}assets/photo${String(start + index).padStart(2, '0')}.png`)

const tatsuPhotoAllImages = createPhotoRange(61, 78)
const tatsuPhotoBusinessImages = createPhotoRange(79, 89)
const tatsuPhotoFoodImages = createPhotoRange(90, 107)
const tatsuPhotoInteriorImages = [
  `${import.meta.env.BASE_URL}assets/photo108.png`,
  `${import.meta.env.BASE_URL}assets/photo110.png`,
  `${import.meta.env.BASE_URL}assets/photo112.png`,
  `${import.meta.env.BASE_URL}assets/photo114.png`,
  `${import.meta.env.BASE_URL}assets/photo111.png`,
  `${import.meta.env.BASE_URL}assets/photo113.png`,
  `${import.meta.env.BASE_URL}assets/photo109.png`,
  `${import.meta.env.BASE_URL}assets/photo115.png`,
  `${import.meta.env.BASE_URL}assets/photo116.png`,
]
const tatsuPhotoExteriorImages = [
  `${import.meta.env.BASE_URL}assets/photo117.png`,
  `${import.meta.env.BASE_URL}assets/photo122.png`,
  `${import.meta.env.BASE_URL}assets/photo118.png`,
  `${import.meta.env.BASE_URL}assets/photo121.png`,
  `${import.meta.env.BASE_URL}assets/photo120.png`,
  `${import.meta.env.BASE_URL}assets/photo119.png`,
]

const oasisPhotoAllImages = [
  `${import.meta.env.BASE_URL}assets/photo01.png`,
  `${import.meta.env.BASE_URL}assets/photo03.png`,
  `${import.meta.env.BASE_URL}assets/photo08.png`,
  `${import.meta.env.BASE_URL}assets/photo06.png`,
  `${import.meta.env.BASE_URL}assets/photo02.png`,
  `${import.meta.env.BASE_URL}assets/photo04.png`,
  `${import.meta.env.BASE_URL}assets/photo09.png`,
  `${import.meta.env.BASE_URL}assets/photo07.png`,
  `${import.meta.env.BASE_URL}assets/photo10.png`,
  `${import.meta.env.BASE_URL}assets/photo05.png`,
  `${import.meta.env.BASE_URL}assets/photo17.png`,
  `${import.meta.env.BASE_URL}assets/photo12.png`,
  `${import.meta.env.BASE_URL}assets/photo11.png`,
  `${import.meta.env.BASE_URL}assets/photo15.png`,
  `${import.meta.env.BASE_URL}assets/photo18.png`,
  `${import.meta.env.BASE_URL}assets/photo13.png`,
  `${import.meta.env.BASE_URL}assets/photo16.png`,
  `${import.meta.env.BASE_URL}assets/photo14.png`,
]
const oasisPhotoBusinessImages = [
  `${import.meta.env.BASE_URL}assets/photo19.png`,
  `${import.meta.env.BASE_URL}assets/photo20.png`,
  `${import.meta.env.BASE_URL}assets/photo22.png`,
  `${import.meta.env.BASE_URL}assets/photo21.png`,
  `${import.meta.env.BASE_URL}assets/photo24.png`,
  `${import.meta.env.BASE_URL}assets/photo23.png`,
  `${import.meta.env.BASE_URL}assets/photo25.png`,
]
const oasisPhotoFoodImages = [
  `${import.meta.env.BASE_URL}assets/photo26.png`,
  `${import.meta.env.BASE_URL}assets/photo28.png`,
  `${import.meta.env.BASE_URL}assets/photo33.png`,
  `${import.meta.env.BASE_URL}assets/photo31.png`,
  `${import.meta.env.BASE_URL}assets/photo27.png`,
  `${import.meta.env.BASE_URL}assets/photo29.png`,
  `${import.meta.env.BASE_URL}assets/photo34.png`,
  `${import.meta.env.BASE_URL}assets/photo32.png`,
  `${import.meta.env.BASE_URL}assets/photo35.png`,
  `${import.meta.env.BASE_URL}assets/photo30.png`,
  `${import.meta.env.BASE_URL}assets/photo42.png`,
  `${import.meta.env.BASE_URL}assets/photo37.png`,
  `${import.meta.env.BASE_URL}assets/photo36.png`,
  `${import.meta.env.BASE_URL}assets/photo40.png`,
  `${import.meta.env.BASE_URL}assets/photo43.png`,
  `${import.meta.env.BASE_URL}assets/photo38.png`,
  `${import.meta.env.BASE_URL}assets/photo41.png`,
  `${import.meta.env.BASE_URL}assets/photo39.png`,
]
const oasisPhotoInteriorImages = [
  `${import.meta.env.BASE_URL}assets/photo44.png`,
  `${import.meta.env.BASE_URL}assets/photo46.png`,
  `${import.meta.env.BASE_URL}assets/photo51.png`,
  `${import.meta.env.BASE_URL}assets/photo49.png`,
  `${import.meta.env.BASE_URL}assets/photo45.png`,
  `${import.meta.env.BASE_URL}assets/photo47.png`,
  `${import.meta.env.BASE_URL}assets/photo52.png`,
  `${import.meta.env.BASE_URL}assets/photo50.png`,
  `${import.meta.env.BASE_URL}assets/photo53.png`,
  `${import.meta.env.BASE_URL}assets/photo48.png`,
  `${import.meta.env.BASE_URL}assets/photo54.png`,
]
const oasisPhotoExteriorImages = [
  `${import.meta.env.BASE_URL}assets/photo55.png`,
  `${import.meta.env.BASE_URL}assets/photo60.png`,
  `${import.meta.env.BASE_URL}assets/photo56.png`,
  `${import.meta.env.BASE_URL}assets/photo58.png`,
  `${import.meta.env.BASE_URL}assets/photo59.png`,
  `${import.meta.env.BASE_URL}assets/photo57.png`,
]

const placeDetails = {
  pipeground: {
    name: '파이프그라운드 한남',
    description: (
      <>
        캐주얼한 무드와 감각적인 분위기가 어우러진 한남의
        <br />
        트렌디한 다이닝 공간
      </>
    ),
    mainImage: `${import.meta.env.BASE_URL}assets/detail-main.png`,
    galleryImages,
    rating: '4.7',
    reviews: '6,802',
    address: (
      <>
        서울 용산구 한남대로27길 66 지하1층
        <br />
        한강진역 3번 출구에서 157m
      </>
    ),
    closeTime: '22:00 영업종료',
    phone: '02-793-1500',
    website: 'https://www.instagram.com/pipeground_hannam',
    mapImage: `${import.meta.env.BASE_URL}assets/detail-map.png`,
  },
  oasis: {
    name: '오아시스 한남점',
    description: (
      <>
        차분한 톤의 미니멀한 분위기와 여유로운 감성이 돋보이는 한남의 브런치 공간
      </>
    ),
    mainImage: oasisImages[0],
    galleryImages: [
      oasisImages[1],
      oasisImages[2],
      oasisImages[3],
      oasisImages[4],
    ],
    rating: '4.0',
    reviews: '3,252',
    address: (
      <>
        서울 용산구 이태원로45길 30
        <br />
        이태원역 2번 출구에서 642m
      </>
    ),
    closeTime: '18:00 영업종료',
    phone: '02-790-8906',
    website: 'https://www.instagram.com/oasisbrunch',
    mapImage: `${import.meta.env.BASE_URL}assets/figma-oasis-map.png`,
    amenities: [
      { icon: `${import.meta.env.BASE_URL}assets/detail-park.svg`, label: '주차 가능' },
      { icon: `${import.meta.env.BASE_URL}assets/detail-restroom.svg`, label: '남/녀 화장실\n구분' },
      { icon: `${import.meta.env.BASE_URL}assets/detail-wifi.svg`, label: '무선 인터넷' },
      { icon: `${import.meta.env.BASE_URL}assets/detail-delivery.svg`, label: '배달' },
      { icon: `${import.meta.env.BASE_URL}assets/detail-package.svg`, label: '포장' },
    ],
  },
  tatsu: {
    name: '한남타츠',
    description: (
      <>
        차분한 조명과 감각적인 분위기가 돋보이는
        <br />
        한남의 이자카야 공간
      </>
    ),
    mainImage: tatsuImages[0],
    galleryImages: [
      tatsuImages[1],
      tatsuImages[2],
      tatsuImages[3],
      tatsuImages[4],
    ],
    rating: '4.3',
    reviews: '1,632',
    address: (
      <>
        서울 용산구 한남대로20길 47
        <br />
        한남역 1번 출구에서 789m
      </>
    ),
    closeTime: '24:00 영업종료',
    phone: '02-797-0624',
    website: 'https://www.instagram.com/hannam_tatsu',
    mapImage: `${import.meta.env.BASE_URL}assets/aichat-place-tatsu.png`,
    amenities: [
      { icon: `${import.meta.env.BASE_URL}assets/detail-park.svg`, label: '주차 가능' },
      { icon: `${import.meta.env.BASE_URL}assets/detail-restroom.svg`, label: '남/녀 화장실\n구분' },
      { icon: `${import.meta.env.BASE_URL}assets/detail-wifi.svg`, label: '무선 인터넷' },
      { icon: `${import.meta.env.BASE_URL}assets/detail-delivery.svg`, label: '배달' },
      { icon: `${import.meta.env.BASE_URL}assets/detail-package.svg`, label: '포장' },
    ],
  },
}

const navItems = [
  {
    id: 'home',
    label: '홈',
    icon: (
      <>
        <img className="nav-home-body" src={`${import.meta.env.BASE_URL}assets/home-nav-home-2.svg`} alt="" />
        <img className="nav-home-door" src={`${import.meta.env.BASE_URL}assets/home-nav-home-1.svg`} alt="" />
      </>
    ),
  },
  {
    id: 'save',
    label: '저장',
    icon: <img src={`${import.meta.env.BASE_URL}assets/home-nav-save.svg`} alt="" />,
  },
  {
    id: 'search',
    label: '탐색',
    icon: (
      <>
        <img className="nav-search-ring" src={`${import.meta.env.BASE_URL}assets/home-nav-search-2.svg`} alt="" />
        <img className="nav-search-dot" src={`${import.meta.env.BASE_URL}assets/home-nav-search-1.svg`} alt="" />
      </>
    ),
  },
  {
    id: 'profile',
    label: '마이페이지',
    icon: (
      <>
        <img className="nav-profile-shoulder" src={`${import.meta.env.BASE_URL}assets/home-nav-user-1.svg`} alt="" />
        <img className="nav-profile-head" src={`${import.meta.env.BASE_URL}assets/home-nav-user-2.svg`} alt="" />
      </>
    ),
  },
]

const amenities = [
  { icon: `${import.meta.env.BASE_URL}assets/detail-no-park.svg`, label: '주차장 없음' },
  { icon: `${import.meta.env.BASE_URL}assets/detail-restroom.svg`, label: '남/녀 화장실\n구분' },
  { icon: `${import.meta.env.BASE_URL}assets/detail-wifi.svg`, label: '무선 인터넷' },
  { icon: `${import.meta.env.BASE_URL}assets/detail-delivery.svg`, label: '배달' },
  { icon: `${import.meta.env.BASE_URL}assets/detail-takeout.svg`, label: '포장' },
]

const placeReviewData = {
  pipeground: {
    distribution: [
      { label: '5점', count: 4915, fill: 82 },
      { label: '4점', count: 1285, fill: 65 },
      { label: '3점', count: 425, fill: 48 },
      { label: '2점', count: 125, fill: 34 },
      { label: '1점', count: 52, fill: 25 },
    ],
    filters: [
      { id: 'best', label: '베스트순' },
      { id: 'latest', label: '최신순' },
    ],
    reviews: [
      {
        author: '맛잘알지이수',
        rating: '4.5',
        date: '2026.04.20',
        images: [`${import.meta.env.BASE_URL}assets/detail-review-pipe-1.png`, `${import.meta.env.BASE_URL}assets/detail-review-pipe-2.png`, `${import.meta.env.BASE_URL}assets/detail-review-pipe-3.png`],
        text: '분위기 좋고 음식도 만족스러운 한남동 피자·파스타 맛집이에요. 옥수수 피자와 라구 파스타가 특히 유명하고 감각적인 인테리어 덕분에 데이트나 친구 모임 장소로도 잘 어울려요. 웨이팅이 있을 수 있어서 방문 전 체크는 필요한 편이에요.',
        likes: 45,
        comments: 12,
      },
    ],
  },
  oasis: {
    distribution: [
      { label: '5점', count: 1803, fill: 82 },
      { label: '4점', count: 892, fill: 65 },
      { label: '3점', count: 520, fill: 48 },
      { label: '2점', count: 42, fill: 34 },
      { label: '1점', count: 21, fill: 25 },
    ],
    filters: [
      { id: 'best', label: '베스트순' },
      { id: 'latest', label: '최신순' },
    ],
    reviews: [
      {
        author: '맛잘알지이수',
        rating: '4.3',
        date: '2026.04.20',
        images: [`${import.meta.env.BASE_URL}assets/photo28.png`, `${import.meta.env.BASE_URL}assets/photo31.png`, `${import.meta.env.BASE_URL}assets/figma-oasis-main.png`],
        text: '오아시스 한남점은 깔끔한 분위기와 여유로운 무드가 매력적인 한남동 브런치 맛집이에요. 에그 베네딕트와 프렌치 토스트처럼 인기 있는 브런치 메뉴가 잘 갖춰져 있고, 채광 좋은 공간 덕분에 친구와의 약속이나 가벼운 데이트 장소로도 잘 어울려요. 다만 인기 있는 편이라 방문 시간에 따라 대기가 있을 수 있어요.',
        likes: 52,
        comments: 8,
      },
    ],
  },
  tatsu: {
    distribution: [
      { label: '5점', count: 1021, fill: 82 },
      { label: '4점', count: 482, fill: 65 },
      { label: '3점', count: 86, fill: 48 },
      { label: '2점', count: 43, fill: 34 },
      { label: '1점', count: 21, fill: 25 },
    ],
    filters: [
      { id: 'best', label: '베스트순' },
      { id: 'latest', label: '최신순' },
    ],
    reviews: [
      {
        author: '맛잘알지이수',
        rating: '4.6',
        date: '2026.04.20',
        images: [`${import.meta.env.BASE_URL}assets/main.png`, `${import.meta.env.BASE_URL}assets/photo93.png`, `${import.meta.env.BASE_URL}assets/photo91.png`],
        text: '한남타츠는 차분하고 고급스러운 분위기에서 식사와 술자리를 함께 즐기기 좋은 한남동 이자카야예요. 사시미, 나베, 로바타야키처럼 메뉴 구성이 다양해서 여러 가지를 나눠 먹기 좋고, 오픈 주방이 주는 생동감 덕분에 공간의 분위기도 매력적으로 느껴져요. 가볍게 한 끼를 해결하는 느낌보다는, 분위기 있는 저녁 식사나 약속 장소로 더 잘 어울리는 곳이에요.',
        likes: 72,
        comments: 6,
      },
    ],
  },
}

const openingHours = [
  { day: '토', time: '09:00 - 19:00', lastOrder: '18:00 라스트오더', active: true },
  { day: '일', time: '09:00 - 18:00', lastOrder: '17:00 라스트오더' },
  { day: '월', time: '09:00 - 18:00', lastOrder: '17:00 라스트오더' },
  { day: '화', time: '09:00 - 18:00', lastOrder: '17:00 라스트오더' },
  { day: '수', time: '09:00 - 18:00', lastOrder: '17:00 라스트오더' },
  { day: '목', time: '09:00 - 19:00', lastOrder: '18:00 라스트오더' },
  { day: '금', time: '09:00 - 19:00', lastOrder: '18:00 라스트오더' },
]

const detailTabs = [
  { id: 'info', label: '정보' },
  { id: 'menu', label: '메뉴' },
  { id: 'photos', label: '사진' },
  { id: 'reviews', label: '리뷰' },
]

const menuCategories = [
  { id: 'salad', label: '샐러드' },
  { id: 'pizza', label: '피자' },
  { id: 'pasta', label: '파스타' },
  { id: 'extra', label: '추가' },
]

const menuItems = [
  {
    name: '시저 샐러드',
    price: '14,000원',
    categoryStart: 'salad',
    image: `${import.meta.env.BASE_URL}assets/detail-menu-salad.png`,
  },
  {
    name: '옥수수 피자',
    price: '26,000원',
    badge: '대표',
    groupStart: true,
    categoryStart: 'pizza',
    image: `${import.meta.env.BASE_URL}assets/detail-menu-corn-pizza.png`,
  },
  {
    name: '페퍼로니 피자',
    price: '21,000원',
    image: `${import.meta.env.BASE_URL}assets/detail-menu-pepperoni.png`,
  },
  {
    name: '매운 페퍼로니 피자',
    price: '22,000원',
    image: `${import.meta.env.BASE_URL}assets/detail-menu-spicy-pepperoni.png`,
  },
  {
    name: '콰트로 치즈 피자',
    price: '21,000원',
    image: `${import.meta.env.BASE_URL}assets/detail-menu-quattro-cheese.png`,
  },
  {
    name: '루꼴라 버섯 피자',
    price: '26,000원',
    image: `${import.meta.env.BASE_URL}assets/detail-menu-rucola-mushroom.png`,
  },
  {
    name: '버섯 콘부 파스타',
    price: '26,000원',
    groupStart: true,
    categoryStart: 'pasta',
    image: `${import.meta.env.BASE_URL}assets/detail-menu-mushroom-konbu.png`,
  },
  {
    name: '마팔디네 레드 라구 파스타',
    price: '21,000원',
    image: `${import.meta.env.BASE_URL}assets/detail-menu-red-ragu.png`,
  },
  {
    name: '리가토니 화이트 라구 파스타',
    price: '22,000원',
    image: `${import.meta.env.BASE_URL}assets/detail-menu-white-ragu.png`,
  },
  {
    name: '코울슬로',
    price: '3,000원',
    groupStart: true,
    categoryStart: 'extra',
    image: `${import.meta.env.BASE_URL}assets/detail-menu-mushroom-konbu.png`,
  },
  {
    name: '당근 라페',
    price: '3,000원',
    image: `${import.meta.env.BASE_URL}assets/detail-menu-red-ragu.png`,
  },
]

const placeMenuData = {
  pipeground: {
    categories: menuCategories,
    items: menuItems,
  },
  oasis: {
    categories: [
      { id: 'salad', label: '샐러드' },
      { id: 'soup', label: '수프' },
      { id: 'sandwich', label: '샌드위치' },
      { id: 'toast', label: '토스트' },
      { id: 'pancake', label: '팬케이크' },
      { id: 'drink', label: '음료' },
    ],
    items: [
      {
        name: '타이 누들 샐러드 새우 & 아보카도',
        price: '26,000원',
        categoryStart: 'salad',
        image: oasisMenuImages.salad,
      },
      {
        name: '치킨 아보카도 샐러드',
        price: '24,000원',
      },
      {
        name: '새우&아보카도 샐러드',
        price: '24,000원',
      },
      {
        name: '오늘의 스프',
        price: '12,000원',
        groupStart: true,
        categoryStart: 'soup',
      },
      {
        name: '치킨 아보카도 샌드위치',
        price: '21,000원',
        groupStart: true,
        categoryStart: 'sandwich',
        image: oasisMenuImages.sandwich,
      },
      {
        name: '칠리 치킨 샌드위치',
        price: '21,000원',
      },
      {
        name: '햄, 치즈 & 버섯 샌드위치',
        price: '21,000원',
      },
      {
        name: '고르곤졸라 치즈, 무화과 콤포트와 허니 샌드위치',
        price: '19,500원',
      },
      {
        name: '더 루벤',
        price: '22,000원',
      },
      {
        name: '무화과 콤포트 & 아몬드 프렌치 토스트',
        price: '23,000원',
        groupStart: true,
        categoryStart: 'toast',
        image: oasisMenuImages.toast,
      },
      {
        name: '그릴드 바나나 프렌치 토스트',
        price: '23,000원',
      },
      {
        name: '베리 콤포트 프렌치 토스트',
        price: '23,000원',
      },
      {
        name: '에그 베네딕트 플로렌타인',
        price: '23,000원',
        image: oasisMenuImages.eggBenedict,
      },
      {
        name: '에그 베네딕트 햄',
        price: '23,000원',
      },
      {
        name: '풀 잉글리쉬 브렉퍼스트',
        price: '23,000원',
      },
      {
        name: '팬케이크, 토마토 오믈렛',
        price: '23,000원',
      },
      {
        name: '버섯 & 트러플 마스카포네',
        price: '23,000원',
      },
      {
        name: '런치 파스타',
        price: '25,000원',
      },
      {
        name: '바나나 호두 팬케이크',
        price: '23,000원',
        groupStart: true,
        categoryStart: 'pancake',
        image: oasisMenuImages.pancake,
      },
      {
        name: '체리 베리 팬케이크',
        price: '23,000원',
      },
      {
        name: '무화과 콤포트 & 호두 팬케이크',
        price: '23,000원',
      },
      {
        name: '아메리카노',
        price: '5,500원',
        groupStart: true,
        categoryStart: 'drink',
      },
      {
        name: '라떼',
        price: '6,500원',
      },
      {
        name: '오아시스 크림 라떼',
        price: '7,000원',
      },
    ],
  },
  tatsu: {
    categories: [
      { id: 'sashimi', label: '사시미' },
      { id: 'salad', label: '샐러드' },
      { id: 'skewer', label: '수제꼬치&야채꼬치' },
      { id: 'tataki', label: '타다끼' },
      { id: 'steak', label: '스테이크' },
    ],
    items: [
      {
        name: '스페셜 해산 야쿠 5종',
        price: '70,000원',
        categoryStart: 'sashimi',
      },
      {
        name: '성게알과 단새우와',
        price: '55,000원',
      },
      {
        name: '성게알과 반전복',
        price: '55,000원',
      },
      {
        name: '엔가와사시미 연어알(150g)',
        price: '40,000원',
      },
      {
        name: '찐피 초회',
        price: '40,000원',
      },
      {
        name: '고노와다와 광어말이(10pcs)',
        price: '38,000원',
      },
      {
        name: '고등어초절임',
        price: '30,000원',
      },
      {
        name: '시메사바 이소베마끼(8pcs)',
        price: '27,000원',
      },
      {
        name: '고노와다',
        price: '15,000원',
      },
      {
        name: '대마 다시마 절임과 새우 샐러드',
        price: '35,000원',
        categoryStart: 'salad',
      },
      {
        name: '연어알아보카도샐러드',
        price: '33,000원',
      },
      {
        name: '아보카도를 얹은 젓갈조개 샐러드',
        price: '32,000원',
      },
      {
        name: '생모자렐라치즈 아보카도와 토마토 카프레제',
        price: '28,000원',
      },
      {
        name: '치즈두부샐러드',
        price: '25,000원',
      },
      {
        name: '아께도리와 아보카도 퐁당',
        price: '35,000원',
        categoryStart: 'skewer',
      },
      {
        name: '아께도리 윙',
        price: '30,000원',
      },
      {
        name: '명란 아메리카 망월산 아보카도 숯불꼬치구이',
        price: '30,000원',
      },
      {
        name: '쯔쿠네 (수제 닭완자)',
        price: '10,000원',
      },
      {
        name: '감자샐러드 타다끼',
        price: '50,000원',
        groupStart: true,
        categoryStart: 'tataki',
      },
      {
        name: '1++ 한우 부채살 말이 타다끼(150g)',
        price: '40,000원',
      },
      {
        name: '아보카도와 참치 토로스프 타다끼',
        price: '38,000원',
      },
      {
        name: '아보카도와 트러플오일 게장 알찬타다끼',
        price: '25,000원',
      },
      {
        name: '한우 채끝 등심 튀김 말이 스테이크(180g)',
        price: '55,000원',
        groupStart: true,
        categoryStart: 'steak',
      },
      {
        name: '가리비 관자 새우 스테이크',
        price: '38,000원',
      },
      {
        name: '문어구이 스테이크',
        price: '35,000원',
      },
      {
        name: '와후 함박스테이크',
        price: '30,000원',
      },
    ],
  },
}

const photoCategories = [
  { id: 'all', label: '전체' },
  { id: 'business', label: '업체' },
  { id: 'food', label: '음식' },
  { id: 'interior', label: '내부' },
  { id: 'exterior', label: '외부' },
]

const photoLayout18 = [
  [0, 0, 169, 201],
  [0, 373, 169, 201],
  [175, 0, 167, 128],
  [175, 304, 167, 128],
  [175, 608, 167, 128],
  [175, 134, 167, 164],
  [175, 438, 167, 164],
  [0, 207, 169, 160],
  [0, 580, 169, 156],
  [0, 742, 169, 201],
  [0, 1115, 169, 201],
  [175, 742, 167, 128],
  [175, 1046, 167, 128],
  [175, 1350, 167, 128],
  [175, 876, 167, 164],
  [175, 1180, 167, 164],
  [0, 949, 169, 160],
  [0, 1322, 169, 156],
]

const businessPhotoLayout = [
  [0, 0, 169, 201],
  [0, 373, 169, 201],
  [175, 0, 167, 128],
  [175, 304, 167, 128],
  [175, 608, 167, 128],
  [175, 134, 167, 164],
  [175, 438, 167, 164],
  [0, 207, 169, 160],
  [0, 580, 169, 156],
  [0, 742, 169, 201],
  [0, 1115.33, 169, 229],
  [175, 742, 167, 128],
  [175, 1046, 167, 128],
  [175, 876, 167, 164],
  [175, 1180, 167, 164],
  [0, 949, 169, 160],
]

const interiorPhotoLayout = [
  [0, 0, 169, 201],
  [0, 373, 169, 201],
  [175, 0, 167, 128],
  [175, 304, 167, 128],
  [175, 608, 167, 128],
  [175, 134, 167, 164],
  [175, 438, 167, 164],
  [0, 207, 169, 160],
  [0, 580, 169, 156],
  [0, 742, 169, 201],
  [175, 742.33, 167, 236],
]

const exteriorPhotoLayout = [
  [0, 0, 169, 201],
  [0, 207.33, 169, 201],
  [175, 449.33, 169, 201],
  [175, 242.33, 169, 201],
  [1, 414.33, 167, 236],
  [175, 0.33, 167, 236],
]

const tatsuBusinessPhotoLayout = [
  [0, 0, 169, 201],
  [175, 0, 167, 128],
  [175, 134, 167, 128],
  [0, 207, 169, 164],
  [175, 268, 167, 164],
  [0, 377, 169, 223],
  [175, 438, 167, 164],
  [0, 606, 169, 164],
  [175, 608, 167, 164],
  [0, 776, 169, 164],
  [175, 778, 167, 164],
]

const tatsuInteriorPhotoLayout = [
  [0, 0, 169, 201],
  [175, 0, 167, 128],
  [175, 134, 167, 164],
  [0, 207, 169, 160],
  [175, 304, 167, 128],
  [175, 438, 167, 164],
  [0, 373, 169, 201],
  [0, 580, 169, 201],
  [175, 608, 167, 236],
]

const tatsuExteriorPhotoLayout = [
  [0, 0, 169, 201],
  [175, 0, 167, 236],
  [0, 207, 169, 201],
  [175, 242, 169, 201],
  [0, 414, 169, 201],
  [175, 449, 169, 201],
]

const createPhotoItems = (prefix, count, layout) =>
  Array.from({ length: count }, (_, index) => {
    const [left, top, width, height] = layout[index]

    return {
      src: `${import.meta.env.BASE_URL}assets/${prefix}-${String(index + 1).padStart(2, '0')}.png`,
      left,
      top,
      width,
      height,
    }
  })

const createStaticPhotoItems = (sources, layout) =>
  sources.map((src, index) => {
    const [left, top, width, height] = layout[index]

    return {
      src,
      left,
      top,
      width,
      height,
    }
  })

const createFlowPhotoItems = (sources) => {
  const columnState = [
    { width: 169, left: 0, top: 0 },
    { width: 167, left: 175, top: 0 },
  ]
  const originalSizes = [
    [169, 201],
    [169, 201],
    [167, 128],
    [167, 128],
    [167, 128],
    [167, 164],
    [167, 164],
    [169, 160],
    [169, 156],
    [169, 201],
    [169, 201],
    [167, 128],
    [167, 128],
    [167, 128],
    [167, 164],
    [167, 164],
    [169, 160],
    [169, 156],
    [169, 201],
    [167, 128],
    [167, 128],
    [167, 164],
    [167, 164],
    [167, 164],
    [167, 164],
    [169, 201],
    [169, 201],
    [167, 128],
    [167, 128],
    [167, 128],
    [167, 164],
    [167, 164],
    [169, 160],
    [169, 156],
    [169, 201],
    [169, 201],
    [167, 128],
    [167, 128],
    [167, 128],
    [167, 164],
    [167, 164],
    [169, 160],
    [169, 156],
    [169, 201],
    [169, 201],
    [167, 128],
    [167, 128],
    [167, 128],
    [167, 164],
    [167, 164],
    [169, 160],
    [169, 156],
    [169, 201],
    [167, 236],
    [169, 201],
    [169, 201],
    [169, 201],
    [169, 201],
    [167, 236],
    [167, 236],
  ]

  const items = sources.map((src, index) => {
    const fileNumber = Number(src.match(/photo(\d+)\.png$/)?.[1] || 1)
    const [width, height] = originalSizes[fileNumber - 1] || [169, 201]
    const column = columnState.find((item) => item.width === width) || columnState[0]
    const item = {
      src,
      left: column.left,
      top: column.top,
      width,
      height,
    }

    column.top += height + 6

    return item
  })

  return {
    height: Math.max(...columnState.map((column) => column.top)) - 6,
    items,
  }
}

const oasisBusinessPhotoLayout = [
  [0, 0, 169, 201],
  [175, 0, 167, 128],
  [0, 207, 167, 164],
  [175, 134, 167, 128],
  [0, 377, 167, 164],
  [175, 268, 167, 164],
  [175, 438, 167, 164],
]

const oasisFoodPhotoLayout = [
  [0, 0, 169, 201],
  [175, 0, 167, 128],
  [0, 207, 169, 160],
  [175, 134, 167, 128],
  [0, 373, 169, 201],
  [175, 268, 167, 128],
  [0, 580, 169, 156],
  [175, 402, 167, 164],
  [0, 742, 169, 201],
  [175, 572, 167, 128],
  [0, 949, 169, 160],
  [175, 706, 167, 128],
  [0, 1115, 169, 201],
  [175, 840, 167, 164],
  [0, 1322, 169, 156],
  [175, 1010, 167, 128],
  [175, 1144, 167, 164],
  [175, 1314, 167, 164],
]

const oasisInteriorPhotoLayout = [
  [0, 0, 169, 201],
  [175, 0, 167, 128],
  [0, 207, 169, 160],
  [175, 134, 167, 164],
  [0, 373, 169, 201],
  [175, 304, 167, 128],
  [0, 580, 169, 156],
  [175, 438, 167, 164],
  [0, 742, 169, 201],
  [175, 608, 167, 128],
  [175, 742, 167, 236],
]

const oasisExteriorPhotoLayout = [
  [0, 0, 169, 201],
  [175, 0, 167, 236],
  [0, 207, 169, 201],
  [175, 242, 169, 201],
  [0, 414, 167, 236],
  [175, 449, 169, 201],
]

const createSimplePlacePhotoSets = (image) => ({
  all: {
    height: 650,
    items: createStaticPhotoItems([image, image, image, image, image, image], exteriorPhotoLayout),
  },
  business: {
    height: 408,
    items: createStaticPhotoItems([image, image], [
      [0, 0, 169, 201],
      [0, 207.33, 169, 201],
    ]),
  },
  food: {
    height: 443,
    items: createStaticPhotoItems([image, image, image], [
      [0, 0, 169, 201],
      [175, 0.33, 167, 236],
      [175, 242.33, 169, 201],
    ]),
  },
  interior: {
    height: 201,
    items: createStaticPhotoItems([image, image], [
      [0, 0, 169, 201],
      [175, 0, 167, 201],
    ]),
  },
  exterior: {
    height: 201,
    items: createStaticPhotoItems([image], [[0, 0, 169, 201]]),
  },
})

const placePhotoSets = {
  pipeground: {
    all: {
      height: 1478,
      items: createPhotoItems('detail-photo', 18, photoLayout18),
    },
    business: {
      height: 1344,
      items: createPhotoItems('detail-photo-business', 16, businessPhotoLayout),
    },
    food: {
      height: 1478,
      items: createPhotoItems('detail-photo-food', 18, photoLayout18),
    },
    interior: {
      height: 978,
      items: createPhotoItems('detail-photo-interior', 11, interiorPhotoLayout),
    },
    exterior: {
      height: 650,
      items: createPhotoItems('detail-photo-exterior', 6, exteriorPhotoLayout),
    },
  },
  oasis: {
    all: createFlowPhotoItems(oasisPhotoAllImages),
    business: {
      height: 602,
      items: createStaticPhotoItems(oasisPhotoBusinessImages, oasisBusinessPhotoLayout),
    },
    food: {
      height: 1478,
      items: createStaticPhotoItems(oasisPhotoFoodImages, oasisFoodPhotoLayout),
    },
    interior: {
      height: 978,
      items: createStaticPhotoItems(oasisPhotoInteriorImages, oasisInteriorPhotoLayout),
    },
    exterior: {
      height: 650,
      items: createStaticPhotoItems(oasisPhotoExteriorImages, oasisExteriorPhotoLayout),
    },
  },
  tatsu: {
    ...createSimplePlacePhotoSets(tatsuImages[0]),
    all: {
      height: 1478,
      items: createStaticPhotoItems(tatsuPhotoAllImages, photoLayout18),
    },
    business: {
      height: 942,
      items: createStaticPhotoItems(tatsuPhotoBusinessImages, tatsuBusinessPhotoLayout),
    },
    food: {
      height: 1478,
      items: createStaticPhotoItems(tatsuPhotoFoodImages, photoLayout18),
    },
    interior: {
      height: 844,
      items: createStaticPhotoItems(tatsuPhotoInteriorImages, tatsuInteriorPhotoLayout),
    },
    exterior: {
      height: 650,
      items: createStaticPhotoItems(tatsuPhotoExteriorImages, tatsuExteriorPhotoLayout),
    },
  },
}

function ReviewSection({ data, rating }) {
  const [activeFilter, setActiveFilter] = useState(data.filters[0].id)
  const reviewCards = Array.from({ length: 3 }, (_, index) => ({
    ...data.reviews[0],
    id: `${activeFilter}-${data.reviews[0].author}-${index}`,
  }))

  return (
    <section className="detail-review-section" aria-label="리뷰">
      <div className="detail-review-summary">
        <div className="detail-review-score">
          <img src={`${import.meta.env.BASE_URL}assets/detail-star.svg`} alt="" />
          <strong>{rating}</strong>
        </div>
        <div className="detail-review-bars">
          {data.distribution.map((item) => (
            <div className="detail-review-bar-row" key={item.label}>
              <span>{item.label}</span>
              <div className="detail-review-bar-track">
                <span style={{ width: `${item.fill}%` }} />
              </div>
              <em>{item.count}</em>
            </div>
          ))}
        </div>
      </div>

      <div className="detail-review-filters" aria-label="리뷰 정렬">
        {data.filters.map((filter) => (
          <button
            className={activeFilter === filter.id ? 'is-active' : ''}
            type="button"
            key={filter.id}
            aria-pressed={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="detail-review-list">
        {reviewCards.map((review) => (
          <article className="detail-review-card" key={review.id}>
            <div className="detail-review-top">
              <div className="detail-review-profile">
                <img src={`${import.meta.env.BASE_URL}assets/detail-review-avatar.png`} alt="" />
                <strong>{review.author}</strong>
              </div>
              <div className="detail-review-date">
                <div>
                  <img src={`${import.meta.env.BASE_URL}assets/detail-star.svg`} alt="" />
                  <span>{review.rating}</span>
                </div>
                <time>{review.date}</time>
              </div>
            </div>

            <div className="detail-review-body">
              <div className="detail-review-images">
                {review.images.map((image) => (
                  <img src={image} alt="" key={image} />
                ))}
              </div>
              <p>{review.text}</p>
              <div className="detail-review-actions">
                <span>
                  <img src={`${import.meta.env.BASE_URL}assets/detail-review-heart.svg`} alt="" />
                  {review.likes}
                </span>
                <span>
                  <img src={`${import.meta.env.BASE_URL}assets/detail-review-message.svg`} alt="" />
                  {review.comments}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function DetailScreen({ placeId = 'pipeground', onBack, onHome, onMyPage, onCameraAddress, onSavePlace, savedPlaceIds = [] }) {
  const [isHoursOpen, setIsHoursOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('info')
  const [activeMenuCategory, setActiveMenuCategory] = useState('sashimi')
  const [activePhotoCategory, setActivePhotoCategory] = useState('all')
  const menuAnchorRefs = useRef({})
  const menuCategoryRowRef = useRef(null)
  const menuCategoryDragState = useRef({
    isDragging: false,
    hasDragged: false,
    startX: 0,
    scrollLeft: 0,
  })
  const place = placeDetails[placeId] || placeDetails.pipeground
  const activeMenuData = placeMenuData[placeId] || placeMenuData.pipeground
  const activePhotoSets = placePhotoSets[placeId] || placePhotoSets.pipeground
  const activePhotoSet = activePhotoSets[activePhotoCategory] || activePhotoSets.all
  const activeReviewData = placeReviewData[placeId] || placeReviewData.pipeground
  const isSaved = savedPlaceIds.includes(placeId)
  const effectiveMenuCategory = activeMenuData.categories.some((category) => category.id === activeMenuCategory)
    ? activeMenuCategory
    : activeMenuData.categories[0].id

  const saveCurrentPlace = () => {
    onSavePlace?.({
      id: placeId,
      name: place.name,
      category: '레스토랑',
      image: place.mainImage,
      rating: place.rating,
      reviews: place.reviews,
      phone: place.phone,
      area: '한남',
      copy: '상세페이지에서 저장한 장소예요.',
    })
  }

  const handleMenuCategoryClick = (categoryId, clickedButton) => {
    if (menuCategoryDragState.current.hasDragged) {
      return
    }

    setActiveMenuCategory(categoryId)
    clickedButton?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
    menuAnchorRefs.current[categoryId]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handleMenuCategoryPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return
    }

    const row = menuCategoryRowRef.current

    if (!row) {
      return
    }

    menuCategoryDragState.current = {
      isDragging: true,
      hasDragged: false,
      startX: event.clientX,
      scrollLeft: row.scrollLeft,
    }
    row.classList.add('is-dragging')
  }

  const handleMenuCategoryPointerMove = (event) => {
    const row = menuCategoryRowRef.current
    const state = menuCategoryDragState.current

    if (!row || !state.isDragging) {
      return
    }

    const deltaX = event.clientX - state.startX

    if (Math.abs(deltaX) < 6) {
      return
    }

    state.hasDragged = true
    row.scrollLeft = state.scrollLeft - deltaX
  }

  const stopMenuCategoryDragging = (event) => {
    const row = menuCategoryRowRef.current

    if (row) {
      row.classList.remove('is-dragging')
    }

    menuCategoryDragState.current.isDragging = false

    if (menuCategoryDragState.current.hasDragged) {
      window.setTimeout(() => {
        menuCategoryDragState.current.hasDragged = false
      }, 0)
    }
  }

  return (
    <section className="detail-screen" aria-label="장소 상세 정보">
      <StatusBar />

      <header className="detail-header">
        <button className="detail-icon-button detail-back" type="button" aria-label="뒤로가기" onClick={onBack}>
          <img className="detail-back-head" src={`${import.meta.env.BASE_URL}assets/address-back-head.svg`} alt="" />
          <img className="detail-back-line" src={`${import.meta.env.BASE_URL}assets/address-back-line.svg`} alt="" />
        </button>
        <button className="detail-icon-button detail-menu" type="button" aria-label="메뉴">
          <span />
          <span />
          <span />
        </button>
      </header>

      <main className="detail-content">
        <section className="detail-gallery" aria-label="장소 사진">
          <img className="detail-main-image" src={place.mainImage} alt="" />
          <div className="detail-sub-grid">
            {place.galleryImages.map((image) => (
              <img src={image} alt="" key={image} />
            ))}
          </div>
        </section>

        <section className="detail-info" aria-labelledby="detail-title">
          <div className="detail-title-row">
            <div>
              <h1 id="detail-title">{place.name}</h1>
              <p>{place.description}</p>
            </div>
            <button className={`detail-bookmark ${isSaved ? 'is-saved' : ''}`} type="button" aria-label="저장" aria-pressed={isSaved} onClick={saveCurrentPlace}>
              <img src={isSaved ? `${import.meta.env.BASE_URL}assets/bookmark-filled.svg` : `${import.meta.env.BASE_URL}assets/aichat-bookmark.svg`} alt="" />
            </button>
          </div>

          <div className="detail-meta-list">
            <div className="detail-meta-row detail-rating-row">
              <img src={`${import.meta.env.BASE_URL}assets/detail-star.svg`} alt="" />
              <strong>{place.rating}</strong>
              <span>({place.reviews})</span>
            </div>
            <div className="detail-meta-row is-address">
              <img src={`${import.meta.env.BASE_URL}assets/detail-location.svg`} alt="" />
              <p>{place.address}</p>
            </div>
            <div className="detail-meta-row detail-business-row">
              <img src={`${import.meta.env.BASE_URL}assets/detail-clock.svg`} alt="" />
              <strong>영업 중</strong>
              <span className="detail-dot">•</span>
              <span>{place.closeTime}</span>
              <button
                className={`detail-hours-toggle ${isHoursOpen ? 'is-open' : ''}`}
                type="button"
                aria-label="영업 시간 보기"
                aria-expanded={isHoursOpen}
                onClick={() => setIsHoursOpen((open) => !open)}
              >
                <img src={`${import.meta.env.BASE_URL}assets/detail-chevron-down.svg`} alt="" />
              </button>
            </div>
            {isHoursOpen ? (
              <div className="detail-hours-panel" aria-label="영업 시간">
                {openingHours.map((item) => (
                  <div className={`detail-hours-row ${item.active ? 'is-active' : ''}`} key={item.day}>
                    <strong>{item.day}</strong>
                    <span>
                      {item.time}
                      <br />
                      {item.lastOrder}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
            <div className="detail-meta-row">
              <img src={`${import.meta.env.BASE_URL}assets/detail-phone.svg`} alt="" />
              <p>{place.phone}</p>
            </div>
            <div className="detail-meta-row detail-link-row">
              <img src={`${import.meta.env.BASE_URL}assets/detail-link.svg`} alt="" />
              <a href={place.website} target="_blank" rel="noreferrer">
                {place.website}
              </a>
            </div>
          </div>
        </section>

        <nav className="detail-tabs" aria-label="상세 정보 메뉴">
          {detailTabs.map((tab) => (
            <button
              className={activeTab === tab.id ? 'is-active' : ''}
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {activeTab === 'menu' ? (
          <section className="detail-menu-section" aria-label="메뉴">
            <div
              className="detail-menu-categories"
              ref={menuCategoryRowRef}
              onPointerDown={handleMenuCategoryPointerDown}
              onPointerMove={handleMenuCategoryPointerMove}
              onPointerUp={stopMenuCategoryDragging}
              onPointerCancel={stopMenuCategoryDragging}
              onPointerLeave={stopMenuCategoryDragging}
              aria-label="메뉴 카테고리"
            >
              {activeMenuData.categories.map((category) => (
                <button
                  className={effectiveMenuCategory === category.id ? 'is-active' : ''}
                  type="button"
                  key={category.id}
                  onClick={(event) => handleMenuCategoryClick(category.id, event.currentTarget)}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="detail-menu-list">
              {activeMenuData.items.map((item) => (
                <article
                  className={`detail-menu-item ${item.groupStart ? 'is-group-start' : ''}`}
                  key={item.name}
                  ref={
                    item.categoryStart
                      ? (node) => {
                          menuAnchorRefs.current[item.categoryStart] = node
                        }
                      : undefined
                  }
                >
                  <div className={`detail-menu-copy ${item.badge ? 'has-badge' : ''}`}>
                    {item.badge ? <span className="detail-menu-badge">{item.badge}</span> : null}
                    <div>
                      <h2>{item.name}</h2>
                      <p>{item.price}</p>
                    </div>
                  </div>
                  {item.image ? <img src={item.image} alt="" /> : null}
                </article>
              ))}
            </div>
          </section>
        ) : activeTab === 'photos' ? (
          <section className="detail-photo-section" aria-label="사진">
            <div className="detail-photo-categories" aria-label="사진 카테고리">
              {photoCategories.map((category) => (
                <button
                  className={activePhotoCategory === category.id ? 'is-active' : ''}
                  type="button"
                  key={category.id}
                  onClick={() => setActivePhotoCategory(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="detail-photo-grid" style={{ height: `${activePhotoSet.height}px` }}>
              {activePhotoSet.items.map((photo) => (
                <img
                  src={photo.src}
                  alt=""
                  key={photo.src}
                  style={{
                    left: `${photo.left}px`,
                    top: `${photo.top}px`,
                    width: `${photo.width}px`,
                    height: `${photo.height}px`,
                  }}
                />
              ))}
            </div>
          </section>
        ) : activeTab === 'reviews' ? (
          <ReviewSection data={activeReviewData} rating={place.rating} />
        ) : (
          <>
            <section className="detail-amenities" aria-label="편의 정보">
              {(place.amenities || amenities).map((item) => (
                <div className="detail-amenity" key={item.label}>
                  <img src={item.icon} alt="" />
                  <span>
                    {item.label.split('\n').map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </span>
                </div>
              ))}
            </section>

            <section className="detail-location-section" aria-labelledby="detail-location-title">
              <h2 id="detail-location-title">위치</h2>
              <article className="detail-map-card">
                <img className="detail-map-image" src={place.mapImage} alt="" />
                <div className="detail-map-address">
                  <img src={`${import.meta.env.BASE_URL}assets/detail-map-pin.svg`} alt="" />
                  <p>
                    {place.address}
                  </p>
                </div>
              </article>
            </section>

            <div className="detail-action-bar">
              <button className={`detail-save-button ${isSaved ? 'is-saved' : ''}`} type="button" aria-label="저장" aria-pressed={isSaved} onClick={saveCurrentPlace}>
                <img src={isSaved ? `${import.meta.env.BASE_URL}assets/bookmark-filled.svg` : `${import.meta.env.BASE_URL}assets/detail-save-bookmark.svg`} alt="" />
              </button>
              <button className="detail-reserve-button" type="button">
                <img src={`${import.meta.env.BASE_URL}assets/detail-calendar.svg`} alt="" />
                예약하기
              </button>
            </div>
          </>
        )}
      </main>

      <DetailBottomNavigation onHome={onHome} onMyPage={onMyPage} onCameraAddress={onCameraAddress} />
      <HomeIndicator />
    </section>
  )
}

function DetailBottomNavigation({ onHome, onMyPage, onCameraAddress }) {
  return (
    <nav className="home-bottom-nav" aria-label="하단 메뉴">
      <div className="home-nav-items">
        {navItems.map((item) => (
          <button
            className={`home-nav-item ${item.active ? 'is-active' : ''}`}
            key={item.id}
            type="button"
            aria-current={item.active ? 'page' : undefined}
            onClick={item.id === 'home' ? onHome : item.id === 'save' || item.id === 'profile' ? onMyPage : undefined}
          >
            <span className="home-nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <button className="home-camera-button" type="button" aria-label="착장 촬영" onClick={onCameraAddress}>
        <span>
          <img src={`${import.meta.env.BASE_URL}assets/home-camera.svg`} alt="" />
        </span>
      </button>
    </nav>
  )
}

export default DetailScreen
