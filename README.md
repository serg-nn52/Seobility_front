# TECTОВОЕ ЗАДАНИЕ ДЛЯ Seobility

Деплой: https://seobility.herokuapp.com/

Frontend-часть приложения.

Стек: react, typescript, webpack, sass/scss, git (без Redux, Axios и сторонних библиотек)

Если потребуется, можно реализовать с Redux.

# ЗАДАНИЕ

Реализовать форму обратной связи со следующими полями:
Имя Фамилия
E-mail
Номер телефона (с маской российского номера)
Дата рождения
Сообщение
Требования к форме:
Валидация
Поле “Имя Фамилия” может состоять только из 2-х слов (имя и фамилия) латинского алфавита. Минимальная длина каждого слова 3 символа, максимальная 30. Между словами может быть только 1 пробел. При вводе символы должны приводиться в верхний регистр.
E-mail должен быть корректным (должна быть отключена браузерная валидация).
Для номера телефона использовать маску Российского номера.
Дата рождения вводиться через календарь.
Поле “Сообщение” имеет минимальную длину в 10 символов и максимальную в 300.
Отправка формы
Отправка происходит ajax запросом на сервер. В ответе должен прийти json с 2-мя возможными статусами: error/success и текстом ошибки/”успешной отправки”. Ответ необходимо обработать на фронте и вывести соответствующее сообщение под формой.
Пока не пришел ответ с сервера, форму нельзя отправить повторно.
В случае успешного ответа с сервера, очистить все поля формы.
Вся валидация должны быть написана самостоятельно, без использования сторонних библиотек.
Поля формы необходимо валидировать во время ввода и перед отправкой на сервер.
Если поле не проходит валидацию, выводить соответствующее сообщение под полем.
Код должен быть залит в удаленный, публичный репозиторий.
