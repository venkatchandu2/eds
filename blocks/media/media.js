export default function decorate(block) {
    // Add base class to block for styling
    block.classList.add('media-block');
  
    // Read data attributes or fallback values
    const size = block.dataset.size || 'medium'; // small, medium, large
    block.classList.add(`media-block--${size}`);
  
    // Expect exactly two children divs for text and image
    const [textCol, imageCol] = block.children;
  
    // Add classes for columns
    if (textCol) textCol.classList.add('media-block__text');
    if (imageCol) imageCol.classList.add('media-block__image');
  
    // Make sure image in imageCol fills container
    if (imageCol) {
      const img = imageCol.querySelector('img');
      if (img) {
        img.classList.add('media-block__img');
      }
    }
  }
  