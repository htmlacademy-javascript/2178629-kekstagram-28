const DUMMY_ENTRIES_NUMBER = 25;

const createSequenceArray = (length) => Array.from({length: length}, (value, index) => ++index);

const getRandomInRange = (lim1, lim2 = 1) => {
  const min = Math.ceil(Math.min(lim1, lim2));
  const max = Math.floor(Math.max(lim1, lim2));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomUnicValue = (array) => {
  const tempArray = [...array];

  return () => {
    const randomIndex = getRandomInRange(0, tempArray.length - 1);
    const value = tempArray.at(randomIndex);
    tempArray.splice(randomIndex, 1);
    return value;
  };
};

const getRandomUnicInRange = (lim1, lim2 = 1) => {
  const usedValues = [];

  return () => {
    let value = getRandomInRange(lim1, lim2);
    while (usedValues.includes(value)) {
      value = getRandomInRange(lim1, lim2);
    }
    usedValues.push(value);
    return value;
  };
};

const BASE_IDS_ARRAY = createSequenceArray(DUMMY_ENTRIES_NUMBER);
const getPhotoIndex = getRandomUnicValue(BASE_IDS_ARRAY);
const DESCRIPTIONS = [
  'Лагуна. Отельчик на заднем плане',
  'Дoрога на пляж',
  'Вода такая синяя-синяя',
  'Фотоаппарат, песок, прибой... Еще что-то',
  'Веселая еда',
  'Черная. Очень греется на солнце',
  'Скудный обед',
  'Только вино!',
  'Небо, самолет... Еще что-то',
  'Лучше босиком!',
  'Другая дорога на пляж',
  'Белая. Не очень греется на солнце',
  'Мяса так и не дали',
  'Рыбное блюдо - морской котик',
  'Луноходы',
  'Где-то очень очень высоко',
  'Культурная программа',
  'Машинко',
  'В темноте, да не в обиде',
  'Пальмы-шмальмы',
  'Мясо таки дали!',
  'Уплываем в закат',
  'Крабик. Какой холёсенький!',
  'Культурная программа II',
  'До Литейного подбросишь?'
];
const getCommentId = getRandomUnicInRange(1, 200);

const COMMENT_PHRASES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COMMENT_NAMES = [
  'Василий',
  'Катерина',
  'Сигизмунд',
  'Эдуард',
  'Наташа',
  'Константин',
  'Джон',
  'Пол',
  'Джордж',
  'Ричард'
];

const createPublication = (value, index) => {
  // описание фотографии привязано к индексу файла фотографии - индекс используется в генерации двух свойств
  const photoIndex = getPhotoIndex();
  // отдельное "замыкание" массива с комментариями для генерации каждой отдельной публикации
  const getRandomComment = getRandomUnicValue(COMMENT_PHRASES);

  return {
    id : ++index,
    url : `photos/${photoIndex}.jpg`,
    description : DESCRIPTIONS.at(photoIndex - 1),
    likes : getRandomInRange(15, 200),
    comments : {
      id : getCommentId(),
      avatar : `img/avatar-${getRandomInRange(1, 6)}.svg`,
      message : Math.random() >= 0.5 ? `${getRandomComment()} ${getRandomComment()}` : getRandomComment(),
      name : COMMENT_NAMES[getRandomInRange(0, COMMENT_NAMES.length - 1)],
    },
  };
};

// eslint-disable-next-line no-unused-vars
const publications = Array.from({length : DUMMY_ENTRIES_NUMBER}, createPublication);
