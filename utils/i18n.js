let T = {
  locale: null,
  locales: {},
  langCode: ["zh-Hans", "en"],
};
let lastLangIndex;

// Access locales
T.registerLocale = function (locales) {
  T.locales = locales;
};

// specific locale
T.setLocale = function (code) {
  T.locale = code;
};

// set locale language
T.setLocaleByIndex = function (index) {
  lastLangIndex = index;
  T.setLocale(T.langCode[index]);
  // setNavigationBarTitle(index);
  T.setTabBarLang(index);
};

// set locales to page data
T.getLanguage = function () {
  return T.locales[T.locale];
};

// Set Tabbar language
T.setTabBarLang = function () {
  return tabBarLangs[lastLangIndex];
};

// Set Tabbar language
T.setNavigationBarTitle = function () {
  wx.setNavigationBarTitle({
    title: navigationBarTitles[lastLangIndex],
  });
};

// Set url
T.getUrl = function () {
  return url[lastLangIndex];
};

T.getWs = function () {
  return ws[lastLangIndex];
};

T.getlangIndex = function () {
  return lastLangIndex;
};

//  Nav bar
let navigationBarTitles = ["爱的堡", "Adogp"];

// Tab bar
let tabBarLangs = [
  [
    {
      iconPath: "/image/tab1.svg",
      selectedIconPath: "/image/tab1_active.svg",
      text: "所有狗",
    },
    {
      iconPath: "/image/tab2.svg",
      selectedIconPath: "/image/tab2_active.svg",
      text: "上传狗",
    },
    {
      iconPath: "/image/tab3.svg",
      selectedIconPath: "/image/tab3_active.svg",
      text: "我的",
    },
  ],
  [
    {
      iconPath: "/image/tab1.svg",
      selectedIconPath: "/image/tab1_active.svg",
      text: "All Dogs",
    },
    {
      iconPath: "/image/tab2.svg",
      selectedIconPath: "/image/tab2_active.svg",
      text: "Post a Dog",
    },
    {
      iconPath: "/image/tab3.svg",
      selectedIconPath: "/image/tab3_active.svg",
      text: "Profile",
    },
  ],
];

// Url
let  url = [
  `http://localhost:3000/api/v1/zh/`,
  `http://localhost:3000/api/v1/en/`
]

// let url = [
//   ``,
//   ``,
// ];

export default T;
