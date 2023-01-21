function updatePopup(hashtags) {
    const list = document.getElementById('hashtag_list');

    const keys = Object.keys(hashtags);

    keys.forEach((key) => {
        let a_element = document.createElement('a');
        a_element.href = hashtags[key];
        a_element.target = '_blank';
        a_element.rel = 'noopener';
        a_element.textContent = '#' + key;
        a_element.classList.add('tag');
        console.log(a_element);

        let button_element = document.createElement('button');
        button_element.classList.add('close');
        button_element.onclick = async () => {
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
}

async function getHashtags(projectName) {
    try {
        const response = await fetch(`https://scrapbox.io/api/pages/${projectName}`);
        const data = await response.json();
        const pages = data.pages;
        //console.log(pages);

        let hashtags = [];
        pages.map((page) => {
            const text = page.descriptions.join(' ');
            hashtags = hashtags.concat(extractHashtags(page.title + text));
        });
        return hashtags;
    } catch (err) {
        console.error(err);
    }
}

function extractHashtags(str) {
    const regex = /#(\w+)/g;
    const hashtags = [];
    let match;
    while ((match = regex.exec(str)) !== null) {
        console.log(str);
        hashtags.push(match[1]);
    }
    return hashtags;
}

function createHashtagLinks(hashtags) {
    const links = {};
    hashtags.forEach((hashtag) => {
        links[hashtag] = `https://scrapbox.io/${hashtag}`;
    });
    return links;
}

console.log('choco');
getHashtags('chococorone-study').then((result) => {
    const links = createHashtagLinks(result);
    console.log(links);

    updatePopup(links);
});
