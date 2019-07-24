# Installation

- Clone the repository locally using - `git clone git@github.com:tattle-made/shell.git`

- Open terminal and download all dependencies using `npm install`

- Start the web-app using `npm start`

- Install Redux  Dev tools extension for you browser (Optional)
  ### Redux Dev tools extension
  - For Chrome visit [this](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) link
  - For Mozilla visit [this](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/) link

# UI Development

We use [storybook](https://storybook.js.org/) to assist UI development
React components are broken down into atoms, molecules, organisms, templates and pages

## Brief Explanation
Atoms is where foundational units of UI are defined. For instance, headings, subheadings, body texts, buttons. Atoms are UI elements that don't need further breaking down.
Molecules are combination of elements from atoms that come together to form a semantically coherent UI element. For example a Search Element which combines a text field and a search button.
Organisms combine molecules to create standard UI components like header, footer, sidebar, content area etc
Templates are examples of pages in the app without any real content in them. They serve the purpose of checking the UI in isolation.
Pages are instances of templates with data in it.

This is a good [resource](http://atomicdesign.bradfrost.com/chapter-2/) to read more on this topic 

### Development Guide
running `npm start storybook` will run the storybook utility in a watch mode. Making changes to files should reflect in real time. 
You will be able to preview components in the browser. Look at the terminal for URL (the port number changes every time you run storybook) 

stories for storybook are defined in src/views/stories
