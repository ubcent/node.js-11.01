import React from 'react';

const mainPage = () => {
    return (
        <div>
            <h1>Главная страница</h1>
            <p>Приложение предназначено для теста сервера на node.js!</p>
            <div>Отражает: </div>
            <ul>
                <li>Получение новостей с новостного портала e1.ru</li>
                <li>По мере необходимости будет дополняться...</li>
            </ul>
        </div>
    );
}

export default mainPage;