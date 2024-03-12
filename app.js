// Функция для определения дня недели
function getDayOfWeek(day, month, year) {
  const daysOfWeek = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ];
  const date = new Date(year, month - 1, day);
  return daysOfWeek[date.getDay()];
}

// Функция для определения количества дней в месяце
function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

// Функция для проверки корректности ввода месяца и года
function isValidInput(month, year) {
  return (
    !isNaN(month) &&
    !isNaN(year) &&
    month >= 1 &&
    month <= 12 &&
    year >= 1919 &&
    year <= 2069
  );
}

// Основная функция для отображения календаря
function showCalendar(month, year) {
  if (!isValidInput(month, year)) {
    console.log('Некорректный ввод.');
    return;
  }

  const daysInWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  console.log(daysInWeek.join(' '));

  let date = new Date(year, month - 1, 1);
  let line = Array(7).fill('  ');

  while (date.getMonth() === month - 1) {
    let dayOfWeek = date.getDay();
    let dayOfMonth = date.getDate();

    let indexInLine;
    if (dayOfWeek === 0) {
      indexInLine = 6; // Воскресенье
    } else {
      indexInLine = dayOfWeek - 1; // Понедельник - Суббота
    }

    let dayString;
    if (dayOfMonth < 10) {
      dayString = ' ' + dayOfMonth; // Добавляем пробел перед однозначными числами
    } else {
      dayString = dayOfMonth.toString(); // Преобразуем число в строку
    }

    line[indexInLine] = dayString;

    if (dayOfWeek === 0) {
      console.log(line.join(' '));
      line = Array(7).fill('  '); // Сбрасываем строку
    }

    date.setDate(dayOfMonth + 1); // Переходим к следующему дню
  }

  console.log(line.join(' '));
}

// Пример использования
const input = prompt('Введите месяц и год (например, 3 2019): ');
const [month, year] = input.split(' ').map((item) => parseInt(item));
showCalendar(month, year);
///////////////////////////
// Функция для тестирования
function test(description, testFunction) {
  try {
    testFunction();
    console.log(`Passed: ${description}`);
  } catch (error) {
    console.log(`Failed: ${description}`);
    console.error(error);
  }
}

// Тесты
test('getDayOfWeek returns correct day of week', () => {
  if (getDayOfWeek(1, 1, 2000) !== 'Суббота') throw new Error('Failed test 1');
  if (getDayOfWeek(2, 2, 2022) !== 'Среда') throw new Error('Failed test 2');
});

test('daysInMonth returns correct number of days', () => {
  if (daysInMonth(2, 2020) !== 29) throw new Error('Failed test 1');
  if (daysInMonth(2, 2021) !== 28) throw new Error('Failed test 2');
});

test('isValidInput validates input correctly', () => {
  if (!isValidInput(12, 2022)) throw new Error('Failed test 1');
  if (isValidInput(13, 2022)) throw new Error('Failed test 2');
  if (isValidInput(12, 2070)) throw new Error('Failed test 3');
});
