var fetch = require('isomorphic-fetch');
var btoa = require('btoa');
var path = require('path');
var fs = require('fs');

const SPOTIFY_BASE_URI = 'https://api.spotify.com/v1';
const SPOTIFY_CLIENT_ID = '2261a09659d64d16861cfecbf8a78f83';
const SPOTIFY_CLIENT_SECRET =  'f1d4b7eb22be43eab1ddefb4cb4dcbe2';
const BASE_64_ENCODED_CLIENT_CREDENTIALS = btoa(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  );

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    else {
        const error = new Error(
          `HTTP Error ${response.statusText}`
        );
        error.status = response.statusText;
        error.response = response;
        console.log('Error communicating with Spotify:');
        console.log(error);
        throw error;
      }
}

function parseJson(response) {
    return response.json();
}

const SpotifyClient = {
    getApiToken() {
      return fetch('https://accounts.spotify.com/api/token', {
      method: 'post',
      body: 'grant_type=client_credentials',
      headers: {
        Authorization: `Basic ${BASE_64_ENCODED_CLIENT_CREDENTIALS}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(checkStatus)
      .then(parseJson)
      .then(json => json.access_token)
      .then(token => (this.token = token));
  }
}

console.log('Fetching Spotify API token...');
SpotifyClient.getApiToken().then(function(token) {
    let text = `export const SpotifyAPIKey = '${token}';\n`;
    let outputFile =  '/Users/nataliagaik/Desktop/custom-projects/music/src/environments/spotifyApiKey.ts';
    fs.writeFile(outputFile, text, function(err) {
      if (err) {
        return console.log(err);
      }
  
      console.log(`saved to ${outputFile}`);
    });
});

  