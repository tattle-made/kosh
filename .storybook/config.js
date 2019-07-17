import { configure } from '@storybook/react';

function loadStories() {
  require('../src/view/stories');
}

configure(loadStories, module);
