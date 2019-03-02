const getObjectFromJson = response => response.json();

const throwIfNotOk = response => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

const sleep = (msecs) => (
    results => new Promise(resolve => setTimeout(() => resolve(results), msecs))
);

// const getUrl = response => response.data.fixed_height_downsampled_url;

const defaultURL = 'https://jsonplaceholder.typicode.com/users';

const loadData = (url = defaultURL) => {
    return fetch(url)
        .then(throwIfNotOk)
        .then(getObjectFromJson)
    // .then(getUrl)
    // .then(sleep(1000))
    // .then(json => console.log(json))
}

export default loadData;