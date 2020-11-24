const {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAG_IN_SENDER_ID,
  APPI_ID,
  MEASUREMENT_ID,
  TYPE,
  PRIVATE_KEY_ID,
  PRIVATE_KEY,
  CLIENT_EMAIL,
  CLIENT_ID,
  AUTH_URI,
  TOKEN_URI,
  AUTH_PROVIDER_X509_CERT_URL,
  CLIENT_X509_CERT_URL
} = process.env
const credentials = {
  "firebase": {
    "apiKey": API_KEY,
    "authDomain": AUTH_DOMAIN,
    "databaseURL":DATABASE_URL,
    "projectId": PROJECT_ID,
    "storageBucket": STORAGE_BUCKET,
    "messagingSenderId": MESSAG_IN_SENDER_ID,
    "appId": APPI_ID,
    "measurementId": MEASUREMENT_ID
  },
  "firebase_admin": {
    "type": TYPE,
    "project_id":PROJECT_ID,
    "private_key_id": PRIVATE_KEY_ID,
    "private_key":PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email":CLIENT_EMAIL,
    "client_id": CLIENT_ID,
    "auth_uri": AUTH_URI,
    "token_uri": TOKEN_URI,
    "auth_provider_x509_cert_url": AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url":CLIENT_X509_CERT_URL
  }
}

module.exports = credentials