export const registerFormControls = [
    {
        name: 'userName',
        label: 'Логин',
        placeholder: 'Введите ваш логин',
        componentType: 'input',
        type: 'text',
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Введите ваш email',
        componentType: 'input',
        type: 'email',
    },
    {
        name: 'password',
        label: 'Пароль',
        placeholder: 'Введите ваш пароль',
        componentType: 'input',
        type: 'password',
    },
    
]

export const loginFormControls = [
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Введите ваш email',
        componentType: 'input',
        type: 'email',
    },
    {
        name: 'password',
        label: 'Пароль',
        placeholder: 'Введите ваш пароль',
        componentType: 'input',
        type: 'password',
    },
    
]

export const addProductFormElements = [
    {
        label: 'Название',
        name: 'title',
        componentType: 'input',
        placeholder: 'Введите название товара'
    },
    {
        label: "Описание",
        name: "description",
        componentType: "textarea",
        placeholder: "Введите описание товара",
      },
      {
        label: "Категория",
        name: "category",
        componentType: "select",
        options: [
          { id: "men", label: "Мужское" },
          { id: "women", label: "Женское" },
          { id: "kids", label: "Детское" },
          { id: "accessories", label: "Аксессуары" },
          { id: "footwear", label: "Обувь" },
        ],
      },
      {
        label: "Бренд",
        name: "brand",
        componentType: "select",
        options: [
          { id: "nike", label: "Nike" },
          { id: "adidas", label: "Adidas" },
          { id: "puma", label: "Puma" },
          { id: "bershka", label: "Bershka" },
          { id: "zara", label: "Zara" },
          { id: "pull&bear", label: "Pull&Bear" },
        ],
      },
      {
        label: "Цена",
        name: "price",
        componentType: "input",
        type: "number",
        placeholder: "Введите цену товара",
      },
      {
        label: "Скидка",
        name: "salePrice",
        componentType: "input",
        type: "number",
        placeholder: "Введите цену товара со скидкой",
      },
      {
        label: "Общее количество",
        name: "totalStock",
        componentType: "input",
        type: "number",
        placeholder: "Введите общее количество товара",
      },
]

export const shoppingViewHeaderMenuItems = [
  {
    id: 'home',
    label: 'Главная',
    path: '/shop/home',
  },
  {
    id: 'products',
    label: 'Товары',
    path: '/shop/listing',
  },
  {
    id: 'men',
    label: 'Мужская',
    path: '/shop/listing',
  },
  {
    id: 'women',
    label: 'Женская',
    path: '/shop/listing',
  },
  {
    id: 'kids',
    label: 'Детская',
    path: '/shop/listing',
  },
  {
    id: 'footwear',
    label: 'Обувь',
    path: '/shop/listing',
  },
  {
    id: 'accessories',
    label: 'Аксессуары',
    path: '/shop/listing',
  },
  {
    id: 'search',
    label: 'Поиск',
    path: '/shop/search',
  },
]

export const categoryOptionsMap = {
  men: 'Мужская',
  women: 'Женская',
  kids: 'Детская',
  accessories: 'Аксессуары',
  footwear: 'Обувь',
}

export const brandOptionsMap = {
  nike: 'Nike',
  adidas: 'Adidas',
  puma: 'Puma',
  bershka: 'Bershka',
  zara: 'Zara',
  "pull&bear": 'Pull&Bear'
}

export const filterOptions = {
  category: [
    { id: "men", label: "Мужская" },
    { id: "women", label: "Женская" },
    { id: "kids", label: "Детская" },
    { id: "accessories", label: "Аксессуары" },
    { id: "footwear", label: "Обувь" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "bershka", label: "Bershka" },
    { id: "zara", label: "Zara" },
    { id: "pull&bear", label: "Pull&Bear" },
  ],
};

export const sortOptions = [
  { id: 'price-lowtohigh', label:'Цена: мин → макс'},
  { id: 'price-hightolow', label:'Цена: макс → мин'},
  { id: 'price-atoz', label:'Название: от А до Я'},
  { id: 'price-ztoa', label:'Название: от Я до А'},
];

export const addressFormControls = [
  {
    label: 'Адрес',
    name: 'address',
    componentType: 'input',
    type: 'text',
    placeholder: 'Введите ваш адрес',
  },
  {
    label: 'Город',
    name: 'city',
    componentType: 'input',
    type: 'text',
    placeholder: 'Введите ваш город',
  },
  {
    label: 'Домофон',
    name: 'pincode',
    componentType: 'input',
    type: 'text',
    placeholder: 'Введите ваш номер домофона',
  },
  {
    label: 'Телефон',
    name: 'phone',
    componentType: 'input',
    type: 'text',
    placeholder: 'Введите ваш номер телефона',
  },
  {
    label: 'Дополнительно',
    name: 'notes',
    componentType: 'textarea',
    placeholder: 'Введите пометки, которые нам необходимо знать',
  },
]