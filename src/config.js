let baseUrl = 'http://localhost:5000/api';
let mediaUrl = 'http://localhost:5000/';

if (window.location.host === 'sindoor-dev.falconweb.app') {
  baseUrl = 'https://sindoor-api-dev.falconweb.app/api';
  mediaUrl = 'https://sindoor-api-dev.falconweb.app/';
} else if (window.location.host === 'sindoor-qa.falconweb.app') {
  baseUrl = 'https://sindoor-api-qa.falconweb.app/api';
  mediaUrl = 'https://sindoor-api-qa.falconweb.app/';
} else if (window.location.host === 'sindoor-staging.falconweb.app') {
  baseUrl = 'https://sindoor-api-staging.falconweb.app/api';
  mediaUrl = 'https://sindoor-api-staging.falconweb.app/';
}

module.exports = { baseUrl, mediaUrl };
