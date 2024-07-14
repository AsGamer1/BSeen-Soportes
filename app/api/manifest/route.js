export async function GET(request) {
  const userAgent = request.headers.get('user-agent');
  const isWindows = /Windows/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);
  var manifest;

  if (isWindows) {
    manifest = {
      "name": "B Seen Media",
      "short_name": "BSM",
      "description": "Aplicación de consulta de los soportes convencionales y digitales de B Seen Media",
      "icons": [
        {
          "src": "/icons/icon-192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any maskable"
        },
        {
          "src": "/icons/icon-512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ],
      "theme_color": "#FFFFFF",
      "background_color": "#FFFFFF",
      "start_url": "/",
      "display": "standalone",
      "orientation": "portrait"
    }
  } else if (isAndroid) {
    manifest = {
      "name": "B Seen Media",
      "short_name": "BSM",
      "description": "Aplicación de consulta de los soportes convencionales y digitales de B Seen Media",
      "icons": [
        {
          "src": "/icons/icon-192-android.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any maskable"
        },
        {
          "src": "/icons/icon-512-android.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ],
      "theme_color": "#FFFFFF",
      "background_color": "#FFFFFF",
      "start_url": "/",
      "display": "standalone",
      "orientation": "portrait"
    }
  } else {
    manifest = {
      "name": "B Seen Media",
      "short_name": "BSM",
      "description": "Aplicación de consulta de los soportes convencionales y digitales de B Seen Media",
      "icons": [
        {
          "src": "/icons/icon-192-ios.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any maskable"
        },
        {
          "src": "/icons/icon-512-ios.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ],
      "theme_color": "#FFFFFF",
      "background_color": "#FFFFFF",
      "start_url": "/",
      "display": "standalone",
      "orientation": "portrait"
    }
  }

  return new Response(JSON.stringify(manifest), {
    headers: { 'Content-Type': 'application/json' }
  });
}