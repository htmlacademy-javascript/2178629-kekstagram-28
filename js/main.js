const DUMMY_ENTRIES_NUMBER = 10;

const createSequenceArray = (length) => Array.from({length: length}, (value, index) => ++index);

const setRandomIndex = (array) => Math.floor(Math.random() * (array.length));

const pickNDeleteRandomFromArray = (array) => {
  const randomIndex = setRandomIndex(array);
  const value = array.at(randomIndex);
  array.splice(randomIndex, 1);
  return value;
};

const pickRandomInRange = (lim1, lim2 = 1) => {
  const min = Math.ceil(Math.min(lim1, lim2));
  const max = Math.floor(Math.max(lim1, lim2));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const pickUnicRandomInRange = (lim1, lim2 = 1) => {
  const usedValues = [];

  return () => {
    let value = pickRandomInRange(lim1, lim2);
    while (usedValues.includes(value)) {
      value = pickRandomInRange(lim1, lim2);
    }
    usedValues.push(value);
    return value;
  };
};


const BASE_IDS_ARRAY = createSequenceArray(DUMMY_ENTRIES_NUMBER);
const publicationIDs = BASE_IDS_ARRAY.slice();
const photoIndexes = BASE_IDS_ARRAY.slice();
const descriptions = [
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
const getCommentId = pickUnicRandomInRange(1, 200);

const pickUnicRandomFromArray = (array) => {
  const tempArray = array.slice();
  return () => {
    const index = setRandomIndex(tempArray);
    const value = tempArray.at(index);
    tempArray.splice(index, 1);
    return value;
  };
};

const commentPhrases = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const commentNames = [
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

const createPublication = () => {
  // описание фотографии привязано к индексу файла фотографии - индекс используется в генерации двух свойств
  const photoIndex = pickNDeleteRandomFromArray(photoIndexes);
  // отдельное "замыкание" массива с комментариями для генерации каждой отдельной публикации
  const pickRandomComment = pickUnicRandomFromArray(commentPhrases);

  return {
    id : pickNDeleteRandomFromArray(publicationIDs),
    url : `photos/${photoIndex}.jpg`,
    description : descriptions.at(photoIndex - 1),
    likes : pickRandomInRange(15, 200),
    comments : {
      id : getCommentId(),
      avatar : `img/avatar-${pickRandomInRange(1, 6)}.svg`,
      message : Math.random() >= 0.5 ? `${pickRandomComment()} ${pickRandomComment()}` : pickRandomComment(),
      name : commentNames[setRandomIndex(commentNames)],
    },
  };
};

// eslint-disable-next-line
const publications = Array.from({length : DUMMY_ENTRIES_NUMBER}, createPublication);
