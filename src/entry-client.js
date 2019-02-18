import anchorjs from 'anchor-js';
import css from './app.css';

function generateAnchors() {
  const anchors = new anchorjs();
  const tags = ['h2', 'h3', 'h4', 'h5', 'h6'];
  tags.forEach(tag => anchors.add(tag));
}

generateAnchors();
