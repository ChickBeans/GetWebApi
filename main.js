document.addEventListener("DOMContentLoaded", async function () {
    // ***************DOM**********************
    const cards = document.getElementById('cards');
    const fm = document.getElementById('form');
    const btn = document.getElementById('btn');
    console.log(btn);
    // web apiを取得
    const res = await fetch('https://jsonplaceholder.typicode.com/photos');
    // JSON形式に変換
    const datas = await res.json();


    // **************イベント********************
    fm.addEventListener("submit", function (e) {
        e.preventDefault();
        eventSubmit();
    })
    btn.addEventListener("click", deleteCards());

    // *************関数（メソッド）***************

    // submitイベント
    function eventSubmit() {
        let num = 0;
        num = fm.word.value;
        // 全てのカードを削除
        deleteCards();
        // テキストボックスに入力された数だけカードを作成
        createCards(num);
    }

    // 表示されているカードをすべて消す関数
    function deleteCards() {
        while (cards.firstChild) {
            cards.removeChild(cards.firstChild);
        }
    }

    // 指定された枚数のカードを作成する関数
    function createCards(num) {

        datas.forEach(function (data, index) {
            if (data.id <= num) {
                const div = createAttrElement("div", "class", "card");
                cards.appendChild(div);

                const divImg = createAttrElement("div", "class", "img__wrapper")
                div.appendChild(divImg);

                const img = createAttrElement("img", "id", "img");
                img.src = data.thumbnailUrl;
                divImg.appendChild(img);

                const divBody = createAttrElement("div", "class", "body");
                divImg.insertAdjacentElement("afterend", divBody);

                const pId = createAttrElement("p", "id", "id");
                pId.textContent = data.id;
                divBody.appendChild(pId);

                const pTitle = createAttrElement("p", "id", "title");
                pTitle.textContent = data.title;
                divBody.appendChild(pTitle);
            }
        })
    }

    // 属性を指定してエレメントを作成する関数
    function createAttrElement(tag, attr, attrName) {
        const el = document.createElement(tag);
        if (attr && attrName) {
            el.setAttribute(attr, attrName);
        }
        return el;
    }

})

