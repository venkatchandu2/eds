addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    // Default data
    const data = {
      size: 'medium', // small, medium, large
      text: 'Default text content for the media block.',
      imageUrl: 'https://via.placeholder.com/400x300.png?text=Media+Image'
    }
  
    if (request.method === 'POST') {
      try {
        const body = await request.json()
        data.size = body.size || data.size
        data.text = body.text || data.text
        data.imageUrl = body.imageUrl || data.imageUrl
      } catch (e) {
        // Ignore JSON parsing errors
      }
    }
  
    // Generate the HTML dynamically
    const html = buildMediaBlock(data)
  
    return new Response(html, {
      headers: { 'content-type': 'text/html;charset=UTF-8' }
    })
  }
  
  function buildMediaBlock({ size, text, imageUrl }) {
    // Create style based on size
    const fontSize = size === 'small' ? '12px' : size === 'large' ? '22px' : '16px'
    const maxImgHeight = size === 'small' ? 150 : size === 'large' ? 400 : 250
  
    // Build style tag dynamically
    const style = `
      <style>
        .media-block {
          display: flex;
          flex-wrap: nowrap;
          border: 1px solid #ccc;
          border-radius: 8px;
          overflow: hidden;
          max-width: 900px;
          font-family: Arial, sans-serif;
        }
        .media-text, .media-image {
          flex: 1 1 50%;
          box-sizing: border-box;
        }
        .media-text {
          padding: 20px;
          font-size: ${fontSize};
          display: flex;
          align-items: center;
        }
        .media-image img {
          width: 100%;
          max-height: ${maxImgHeight}px;
          object-fit: cover;
          display: block;
        }
        @media (max-width: 600px) {
          .media-block {
            flex-direction: column;
          }
          .media-text, .media-image {
            flex: unset;
            width: 100%;
          }
          .media-image img {
            max-height: none;
            height: auto;
          }
        }
      </style>
    `
  
    // Escape text content to avoid XSS
    const escapedText = escapeHtml(text)
  
    // Construct HTML string
    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />${style}</head>
        <body>
          <div class="media-block">
            <div class="media-text">${escapedText}</div>
            <div class="media-image"><img src="${escapeHtml(imageUrl)}" alt="Media Image" /></div>
          </div>
        </body>
      </html>
    `
    return html
  }
  
  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[m]
    })
  }
  