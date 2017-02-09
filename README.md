<h1 align="center">Cycle Semantic UI</h1>

<div align="center">
  <a href="https://github.com/cyclejs/cyclejs/">
  <img alt="cyclejs-logo" src="https://raw.githubusercontent.com/cyclejs/cyclejs/master/logo.png" width="128">
  </a>
  <a href="https://github.com/Semantic-Org/Semantic-UI">
  <img alt="semantic-ui-log" src="https://camo.githubusercontent.com/64fc67646c5de06fe6aae46b33accdb111208897/687474703a2f2f73656d616e7469632d75692e636f6d2f696d616765732f6c6f676f2e706e67" width="128">
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
  * The color class have been renamed to primaryColored, infoColored etc. to avoid naming conflicts with the menu elements 'Secondary' style.
  * Input has been renamed to Textbox

Current status of components available:

 * Collections (6/6)
  * Breadcrumb
  * Form
  * Grid
  * Menu
  * Message
  * Table
 * Elements (12/15) 
  * Button
  * Container
  * Divider
  * Header
  * Icon
  * Image
  * Input (Textbox)
  * Label
  * List
  * Loader
  * Segment
  * Step
 * Views (1/6)
  * Statistic
 * Modules: (7/16)
  * Checkbox
  * Dimmer
  * Dropdown
  * Modal
  * Popup
  * Progress
  * Transition

## Usage

The API for the components has not been finalized yet.
I'd like it to look something along the lines of this: 

    import { Button } from "cycle-semantic-ui"
    let staticButtonVNode = Button.render({disabled: true, color: "primary" }, [
      "I am a button"
    ]);
    let interactiveButton = Button.run({
      DOM: sources.DOM,
      props$: xs.of({disabled: true, color: "primary"}),
      content$: xs.of(["I am a button"])
    })
    let vTree$ = interactiveButton.DOM;
    let clicks$ = interactiveButton.Events("click");
    

However I am currently struggling to come up with a neat implementation
that allows for the insertion of content at multiple points of the component. 
I am considering an API of something akin to this:

    import { Button } from "cycle-semantic-ui"
    let staticButtonVNode = Button.render({
      style: {disabled: true, color: "primary" },
      content: {
        main: "I'm a button",
        hidden: [div("I'm the hidden content")]
      }
    });
    let interactiveButton = Button.run({
      DOM: sources.DOM,
      style$: xs.of({disabled: true, color: "primary"}),
      content$: xs.of({main: "I am a button"})
    })
    let vTree$ = interactiveButton.DOM;
    let clicks$ = interactiveButton.Events("click");

