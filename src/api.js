import { User } from './user';

export function getFetch(apiUrl, params = {}) {
    var options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${User.data.token}`
        }     
    };

    let keys = Object.keys(params);
    let encodedParams = '';
    if(keys.length > 0) {
        let getParams = [];
        for(let k of keys)
            getParams.push(`${k}=${encodeURIComponent(params[k])}`);
        encodedParams = `?${getParams.join('&')}`;
    }
    return fetch(apiUrl + encodedParams, options);
}

export async function searchVideos(params, callback) {
    let response = await getFetch('https://www.googleapis.com/youtube/v3/search/', {
        part: 'snippet',
        maxResults: 10,
        videoCategoryId: '10',
        type: 'video',
        ...params
    }).then(response => response.json());

    if(!response.items) {
        callback(false, response.error.message);
        return;
    }
    callback(true, response.items);
}

export async function getFavorites(callback) {
    let response = await getFetch('https://www.googleapis.com/youtube/v3/playlists/', {
        part: 'id',
        maxResults: 50,
        mine: true
    }).then(response => response.json());

    if(!response.items) {
        callback(false, response.error.message);
        return;
    }

    let playlist = response.items[response.items.length - 1];
    response = await getFetch('https://www.googleapis.com/youtube/v3/playlistItems/', {
        part: 'snippet',
        maxResults: 10,
        playlistId: playlist.id
    }).then(response => response.json());

    if(!response.items) {
        callback(false, response.error.message);
        return;
    }

    callback(true, response.items);
    return;
}

export async function getLikedVideos(callback) {
    let response = await getFetch('https://www.googleapis.com/youtube/v3/videos/', {
        part: 'snippet',
        maxResults: 10,
        myRating: 'like'
    }).then(response => response.json());

    if(!response.items) {
        callback(false, response.error.message);
        return;
    }
    callback(true, response.items);
}

export async function getMostPopular(callback) {
    let response = await getFetch('https://www.googleapis.com/youtube/v3/videos/', {
        part: 'snippet',
        maxResults: 10,
        chart: 'mostPopular',
        videoCategoryId: '10'
    }).then(response => response.json());

    if(!response.items) {
        callback(false, response.error.message);
        return;
    }
    callback(true, response.items);
}

export async function getMostRelevant(callback) {
    return searchVideos({}, callback);
}

export async function getMostLiked(callback) {
    return searchVideos({ order: 'rating' }, callback);
}

export async function getMostViewed(callback) {
    return searchVideos({ order: 'viewCount' }, callback);
}

