export default function decorate(block) {
  block.classList.add('media-block');
  
  // Assume the block contains two children: content and image
  const [content, image] = block.children;

  if (content && image) {
    content.classList.add('media-content');
    image.classList.add('media-image');
  }
}
