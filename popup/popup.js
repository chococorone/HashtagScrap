async function getDb() {
    console.log('getDb');
    let hashTags = await chrome.storage.local.get();
    return hashTags;
}

console.log('choco');

const list = document.getElementById('hashtag_list');

getDb().then((result) => {
    const keys = Object.keys(result);

    keys.forEach((key) => {
        let p_element = document.createElement('p');
        let a_element = document.createElement('a');
        a_element.href = result[key];
        a_element.target = '_blank';
        a_element.rel = 'noopener';
        a_element.textContent = '#' + key;
        console.log(a_element);
        p_element.appendChild(a_element);
        p_element.classList.add('tags');
        console.log(p_element);
        list.appendChild(p_element);
    });
});
