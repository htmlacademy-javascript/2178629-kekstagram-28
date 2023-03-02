const DUMMY_ENTRIES_NUMBER = 25;
const MAX_DUMMY_MESSAGE_PHRASES = 2;
const MAX_COMMENTS_NUMBER = 3;

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

const baseIdsArray = createSequenceArray(DUMMY_ENTRIES_NUMBER);
const getPhotoIndex = getRandomUnicValue(baseIdsArray);
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

const createIdGenerator = (startPosition = 1) => {
  let lastItem = startPosition;
  return () => lastItem++;
};

const getCommentId = createIdGenerator();

const MESSAGE_PHRASES = [
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

const generateMessage = (phrasesArray, maxAmount) => {
  const getMessagePhrase = getRandomUnicValue(phrasesArray);

  return Array.from({length : getRandomInRange(maxAmount)}, getMessagePhrase).join(' ');
};

const createComment = () => ({
  id : getCommentId(),
  avatar : `img/avatar-${getRandomInRange(1, 6)}.svg`,
  message : generateMessage(MESSAGE_PHRASES, MAX_DUMMY_MESSAGE_PHRASES),
  name : COMMENT_NAMES[getRandomInRange(0, COMMENT_NAMES.length - 1)],
});

const createComments = (maxAmount) => Array.from({length : getRandomInRange(0, maxAmount)}, createComment);

const createPublication = (value, index) => {
  // описание фотографии привязано к индексу файла фотографии - индекс используется в генерации двух свойств
  const photoIndex = getPhotoIndex();

  return {
    id : ++index,
    url : `photos/${photoIndex}.jpg`,
    description : DESCRIPTIONS.at(photoIndex - 1),
    likes : getRandomInRange(15, 200),
    comments : createComments(MAX_COMMENTS_NUMBER),
  };
};

// eslint-disable-next-line no-unused-vars
const publications = Array.from({length : DUMMY_ENTRIES_NUMBER}, createPublication);
