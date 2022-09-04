let baseUrl = 'http://localhost:5000/api';
let mediaUrl = 'http://localhost:5000/';

if (window.location.host === 'sindoor-admin-dev.falconweb.app') {
  baseUrl = 'https://sindoor-api-dev.falconweb.app/api';
  mediaUrl = 'https://sindoor-api-dev.falconweb.app/';
} else if (window.location.host === 'sindoor-admin-qa.falconweb.app') {
  baseUrl = 'https://sindoor-api-qa.falconweb.app/api';
  mediaUrl = 'https://sindoor-api-qa.falconweb.app/';
} else if (window.location.host === 'sindoor-admin-staging.falconweb.app') {
  baseUrl = 'https://sindoor-api-staging.falconweb.app/api';
  mediaUrl = 'https://sindoor-api-staging.falconweb.app/';
} else if (window.location.host === 'admin.sindoor.app') {
  baseUrl = 'https://api.sindoor.app/api';
  mediaUrl = 'https://api.sindoor.app/';
}

module.exports = { baseUrl, mediaUrl };
