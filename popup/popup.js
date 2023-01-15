async function getDb() {
    console.log('getDb');
    let hashTags = await chrome.storage.local.get();
    return hashTags;
}

function updatePopup() {
    const list = document.getElementById('hashtag_list');

    getDb().then((result) => {
        const keys = Object.keys(result);

        keys.forEach((key) => {
            let a_element = document.createElement('a');
            a_element.href = result[key];
            a_element.target = '_blank';
            a_element.rel = 'noopener';
            a_element.textContent = '#' + key;
            a_element.classList.add('tag');
            console.log(a_element);

            let button_element = document.createElement('button');
            button_element.classList.add('close');
            button_element.onclick = async () => {
                await removeTag(key);
                p_element.removeChild(a_element);
                p_element.removeChild(button_element);
            };

            let p_element = document.createElement('p');
            p_element.appendChild(a_element);
            p_element.appendChild(button_element);
            p_element.classList.add('tags');
            console.log(p_element);

            list.appendChild(p_element);
        });
    });
}

async function removeTag(key) {
    console.log('removeTag');
    await chrome.storage.local.remove(key);
}

console.log('choco');
updatePopup();
