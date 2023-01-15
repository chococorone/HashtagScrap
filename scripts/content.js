function parseUrl(url) {
    const div = url.split('/');
    return div[div.length - 1];
}

async function setDb(url) {
    console.log('setDb');
    const tag = parseUrl(url);

    if (await isUnique(tag)) {
        chrome.storage.local.set({ [tag]: [url] }, () => {
            console.log('stored');
            console.log(tag);
        });
    }
}

async function getDb() {
    console.log('getDb');
    let hashTags = await chrome.storage.local.get();
    return hashTags;
}

async function isUnique(target) {
    const db = await getDb();

    if (target in db) {
        console.log('not unique');
        return false;
    } else {
        console.log('is unique');
        return true;
    }
}

console.log('choco');

const observer = new MutationObserver(() => {
    const selectors = document.getElementsByClassName('page-link');

    for (let i = 0; i < selectors.length; i++) {
        if (selectors[i].type == 'hashTag') {
            const url = decodeURI(selectors[i].href);
            setDb(url);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});

//window.alert('HashtagScrap move');
