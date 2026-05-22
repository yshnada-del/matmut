import { useRef, useState } from 'react'
import { HomeIndicator, StatusBar } from './SplashScreen.jsx'

const galleryImages = [
  '/assets/detail-sub-1.png',
  '/assets/detail-sub-2.png',
  '/assets/detail-sub-3.png',
  '/assets/detail-sub-4.png',
]

const oasisImages = [
  '/assets/figma-oasis-main.png',
  '/assets/figma-oasis-sub-1.png',
  '/assets/figma-oasis-sub-2.png',
  '/assets/figma-oasis-sub-3.png',
  '/assets/figma-oasis-sub-4.png',
]

const oasisMenuImages = {
  exterior: oasisImages[0],
  salad: '/assets/figma-oasis-menu-salad.png',
  sandwich: '/assets/figma-oasis-menu-sandwich.png',
  toast: '/assets/figma-oasis-menu-toast.png',
  eggBenedict: '/assets/figma-oasis-menu-egg.png',
  pancake: '/assets/figma-oasis-menu-pancake.png',
}

const tatsuImages = [
  '/assets/main.png',
  '/assets/sub1.png',
  '/assets/sub2.png',
  '/assets/sub3.png',
  '/assets/sub4.png',
]

const createPhotoRange = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, index) => `/assets/photo${String(start + index).padStart(2, '0')}.png`)

const tatsuPhotoAllImages = createPhotoRange(61, 78)
const tatsuPhotoBusinessImages = createPhotoRange(79, 89)
const tatsuPhotoFoodImages = createPhotoRange(90, 107)
const tatsuPhotoInteriorImages = [
  '/assets/photo108.png',
  '/assets/photo110.png',
  '/assets/photo112.png',
  '/assets/photo114.png',
  '/assets/photo111.png',
  '/assets/photo113.png',
  '/assets/photo109.png',
  '/assets/photo115.png',
  '/assets/photo116.png',
]
const tatsuPhotoExteriorImages = [
  '/assets/photo117.png',
  '/assets/photo122.png',
  '/assets/photo118.png',
  '/assets/photo121.png',
  '/assets/photo120.png',
  '/assets/photo119.png',
]

const oasisPhotoAllImages = [
  '/assets/photo01.png',
  '/assets/photo03.png',
  '/assets/photo08.png',
  '/assets/photo06.png',
  '/assets/photo02.png',
  '/assets/photo04.png',
  '/assets/photo09.png',
  '/assets/photo07.png',
  '/assets/photo10.png',
  '/assets/photo05.png',
  '/assets/photo17.png',
  '/assets/photo12.png',
  '/assets/photo11.png',
  '/assets/photo15.png',
  '/assets/photo18.png',
  '/assets/photo13.png',
  '/assets/photo16.png',
  '/assets/photo14.png',
]
const oasisPhotoBusinessImages = [
  '/assets/photo19.png',
  '/assets/photo20.png',
  '/assets/photo22.png',
  '/assets/photo21.png',
  '/assets/photo24.png',
  '/assets/photo23.png',
  '/assets/photo25.png',
]
const oasisPhotoFoodImages = [
  '/assets/photo26.png',
  '/assets/photo28.png',
  '/assets/photo33.png',
  '/assets/photo31.png',
  '/assets/photo27.png',
  '/assets/photo29.png',
  '/assets/photo34.png',
  '/assets/photo32.png',
  '/assets/photo35.png',
  '/assets/photo30.png',
  '/assets/photo42.png',
  '/assets/photo37.png',
  '/assets/photo36.png',
  '/assets/photo40.png',
  '/assets/photo43.png',
  '/assets/photo38.png',
  '/assets/photo41.png',
  '/assets/photo39.png',
]
const oasisPhotoInteriorImages = [
  '/assets/photo44.png',
  '/assets/photo46.png',
  '/assets/photo51.png',
  '/assets/photo49.png',
  '/assets/photo45.png',
  '/assets/photo47.png',
  '/assets/photo52.png',
  '/assets/photo50.png',
  '/assets/photo53.png',
  '/assets/photo48.png',
  '/assets/photo54.png',
]
const oasisPhotoExteriorImages = [
  '/assets/photo55.png',
  '/assets/photo60.png',
  '/assets/photo56.png',
  '/assets/photo58.png',
  '/assets/photo59.png',
  '/assets/photo57.png',
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
    mainImage: '/assets/detail-main.png',
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
    mapImage: '/assets/detail-map.png',
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
    mapImage: '/assets/figma-oasis-map.png',
    amenities: [
      { icon: '/assets/detail-no-park.svg', label: '주차 가능' },
      { icon: '/assets/detail-restroom.svg', label: '남/녀 화장실\n구분' },
      { icon: '/assets/detail-wifi.svg', label: '무선 인터넷' },
      { icon: '/assets/detail-delivery.svg', label: '배달' },
      { icon: '/assets/detail-package.svg', label: '포장' },
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
    mapImage: '/assets/aichat-place-tatsu.png',
  },
}

const navItems = [
  {
    id: 'home',
    label: '홈',
    active: true,
    icon: (
      <>
        <img className="nav-home-body" src="/assets/home-nav-home-2.svg" alt="" />
        <img className="nav-home-door" src="/assets/home-nav-home-1.svg" alt="" />
      </>
    ),
  },
  {
    id: 'save',
    label: '저장',
    icon: <img src="/assets/home-nav-save.svg" alt="" />,
  },
  {
    id: 'search',
    label: '탐색',
    icon: (
      <>
        <img className="nav-search-ring" src="/assets/home-nav-search-2.svg" alt="" />
        <img className="nav-search-dot" src="/assets/home-nav-search-1.svg" alt="" />
      </>
    ),
  },
  {
    id: 'profile',
    label: '마이페이지',
    icon: (
      <>
        <img className="nav-profile-shoulder" src="/assets/home-nav-user-1.svg" alt="" />
        <img className="nav-profile-head" src="/assets/home-nav-user-2.svg" alt="" />
      </>
    ),
  },
]

const amenities = [
  { icon: '/assets/detail-no-park.svg', label: '주차장 없음' },
  { icon: '/assets/detail-restroom.svg', label: '남/녀 화장실\n구분' },
  { icon: '/assets/detail-wifi.svg', label: '무선 인터넷' },
  { icon: '/assets/detail-delivery.svg', label: '배달' },
  { icon: '/assets/detail-takeout.svg', label: '포장' },
]

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
    image: '/assets/detail-menu-salad.png',
  },
  {
    name: '옥수수 피자',
    price: '26,000원',
    badge: '대표',
    groupStart: true,
    categoryStart: 'pizza',
    image: '/assets/detail-menu-corn-pizza.png',
  },
  {
    name: '페퍼로니 피자',
    price: '21,000원',
    image: '/assets/detail-menu-pepperoni.png',
  },
  {
    name: '매운 페퍼로니 피자',
    price: '22,000원',
    image: '/assets/detail-menu-spicy-pepperoni.png',
  },
  {
    name: '콰트로 치즈 피자',
    price: '21,000원',
    image: '/assets/detail-menu-quattro-cheese.png',
  },
  {
    name: '루꼴라 버섯 피자',
    price: '26,000원',
    image: '/assets/detail-menu-rucola-mushroom.png',
  },
  {
    name: '버섯 콘부 파스타',
    price: '26,000원',
    groupStart: true,
    categoryStart: 'pasta',
    image: '/assets/detail-menu-mushroom-konbu.png',
  },
  {
    name: '마팔디네 레드 라구 파스타',
    price: '21,000원',
    image: '/assets/detail-menu-red-ragu.png',
  },
  {
    name: '리가토니 화이트 라구 파스타',
    price: '22,000원',
    image: '/assets/detail-menu-white-ragu.png',
  },
  {
    name: '코울슬로',
    price: '3,000원',
    groupStart: true,
    categoryStart: 'extra',
    image: '/assets/detail-menu-mushroom-konbu.png',
  },
  {
    name: '당근 라페',
    price: '3,000원',
    image: '/assets/detail-menu-red-ragu.png',
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
      src: `/assets/${prefix}-${String(index + 1).padStart(2, '0')}.png`,
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

function DetailScreen({ placeId = 'pipeground', onBack, onCameraAddress }) {
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
  const effectiveMenuCategory = activeMenuData.categories.some((category) => category.id === activeMenuCategory)
    ? activeMenuCategory
    : activeMenuData.categories[0].id

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
          <img className="detail-back-head" src="/assets/address-back-head.svg" alt="" />
          <img className="detail-back-line" src="/assets/address-back-line.svg" alt="" />
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
            <button className="detail-bookmark" type="button" aria-label="저장">
              <img src="/assets/aichat-bookmark.svg" alt="" />
            </button>
          </div>

          <div className="detail-meta-list">
            <div className="detail-meta-row detail-rating-row">
              <img src="/assets/detail-star.svg" alt="" />
              <strong>{place.rating}</strong>
              <span>({place.reviews})</span>
            </div>
            <div className="detail-meta-row is-address">
              <img src="/assets/detail-location.svg" alt="" />
              <p>{place.address}</p>
            </div>
            <div className="detail-meta-row detail-business-row">
              <img src="/assets/detail-clock.svg" alt="" />
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
                <img src="/assets/detail-chevron-down.svg" alt="" />
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
              <img src="/assets/detail-phone.svg" alt="" />
              <p>{place.phone}</p>
            </div>
            <div className="detail-meta-row detail-link-row">
              <img src="/assets/detail-link.svg" alt="" />
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
                  <img src="/assets/detail-map-pin.svg" alt="" />
                  <p>
                    {place.address}
                  </p>
                </div>
              </article>
            </section>

            <div className="detail-action-bar">
              <button className="detail-save-button" type="button" aria-label="저장">
                <img src="/assets/detail-save-bookmark.svg" alt="" />
              </button>
              <button className="detail-reserve-button" type="button">
                <img src="/assets/detail-calendar.svg" alt="" />
                예약하기
              </button>
            </div>
          </>
        )}
      </main>

      <DetailBottomNavigation onCameraAddress={onCameraAddress} />
      <HomeIndicator />
    </section>
  )
}

function DetailBottomNavigation({ onCameraAddress }) {
  return (
    <nav className="home-bottom-nav" aria-label="하단 메뉴">
      <div className="home-nav-items">
        {navItems.map((item) => (
          <button
            className={`home-nav-item ${item.active ? 'is-active' : ''}`}
            key={item.id}
            type="button"
            aria-current={item.active ? 'page' : undefined}
          >
            <span className="home-nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <button className="home-camera-button" type="button" aria-label="착장 촬영" onClick={onCameraAddress}>
        <span>
          <img src="/assets/home-camera.svg" alt="" />
        </span>
      </button>
    </nav>
  )
}

export default DetailScreen
