<h1 align="center">Cycle Semantic UI</h1>

<div align="center">
  <a href="https://github.com/cyclejs/cyclejs/">
  <img alt="cyclejs-logo" src="https://raw.githubusercontent.com/cyclejs/cyclejs/master/logo.png" width="128">
  </a>
  <a href="https://github.com/Semantic-Org/Semantic-UI">
  <img alt="semantic-ui-log" src="https://github.com/Semantic-Org/Semantic-UI/raw/master/logo.png" width="128">
  </a>
</div>
<div align="center">
  <strong>A set of cyclejs UI components based on Semantic UI</strong>
</div>

## Welcome

This repository is home to a set of cyclejs UI components based on Semantic UI.
It is not a direct port of Semantic UI, there are some slight changes:
  * The secondary color is now supported for elements that support colors.
  * Table coloring has been reworked.
  * The color classes have been renamed to primaryColored, infoColored etc. to avoid naming conflicts with the menu elements 'Secondary' style.
  * Input has been renamed to Textbox

Current there are 26 components available:

 * Collections (6/6)
 * Elements (12/15) 
 * Views (1/6)
 * Modules: (7/16)

## Installation

```
$ npm install --save cycle-semantic-ui
```

## API

For a more complete overview of the components please refer to [the documentation](https://steelfish.github.io/cycle-semantic-ui/). 

Documentation is currently WIP. The following components have been documented:
 
 * Collections (5/6)
   * Breadcrumb
   * Form
   * Grid
   * Menu
   * Message
 * Elements (0/12)
 * Views (0/1)
 * Modules: (0/7)

## Basic Usage

All components save for modules expose both a `render` method and a `run` method. 

`render` accepts `props` and `content` and returns a properly formatted vnode. There are three ways to call `render`, either via a verbose argument object, a simple argument object or arguments.

```javascript
import {Message} from "cycle-semantic-ui"
//Verbose
Message.render({
	props: { color: "primary" },
    content: {
    	header: "Message header",
    	main: "Message text"
    }
});
//Simple
Message.render({
	props: {color: "primary"},
    content: "Message text"
});
//Arguments
Message.render({color: "primary"}, "Message text");
```

`run` returns an isolated cyclejs component that exposes a `DOM` property with the vnode$ for @cycle/dom and an `events` function to expose its dom events. It requires a `sources` object with at the very least a `DOMSource` in the `DOM` property and accepts a `props$` and `content$`.

```javascript
import xs from "xstream";
import {Button} from "cycle-semantic-ui"

function YourAwesomeCycleComponent(sources) {
  let btnSubmit = Button.run({
      DOM: sources.DOM,
      props$: xs.of({color: "primary"}),
      content$: xs.of("Submit")
  });
  let btnClick$ = btnSubmit.events("click");
  return {
  	DOM: btnSubmit.DOM,
    click$: btnClick$
  }
}
```
