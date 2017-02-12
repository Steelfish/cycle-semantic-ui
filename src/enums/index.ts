import {capitalize} from "../utils";
export * from "./iconType";


export enum Size {
  Mini, Tiny, Small, Medium, Large, Big, Huge, Massive, Fluid
}
export type SizeString = "mini"|"tiny"|"small"|"medium"|"large"|"big"|"huge"|"massive"|"fluid";

export namespace Size {
  export function ToEnum(sizeOrString: Size|SizeString) : Size {
    return typeof(sizeOrString) === "number" 
      ? sizeOrString 
      : Size[capitalize(sizeOrString)];
  }
  export function ToClassname(size: Size|SizeString) {
    size = ToEnum(size);
    switch(size) {
      case Size.Mini: return " mini";
      case Size.Tiny: return " tiny";
      case Size.Small: return " small";
      case Size.Medium: return " medium";
      case Size.Large: return " large";
      case Size.Big: return " big";
      case Size.Huge: return " huge";
      case Size.Massive: return " massive";
      case Size.Fluid: return " fluid";
      default: return "";
    }
  }
}

export enum VerticalAlignment {
  Top, Middle, Bottom
}

export namespace VerticalAlignment {
  export function ToClassname(alignment: VerticalAlignment) {
    switch (alignment) {
      case VerticalAlignment.Top: return " top aligned";
      case VerticalAlignment.Middle: return " middle aligned";
      case VerticalAlignment.Bottom: return " bottom aligned";
      default: return "";
    }
  }
}

export enum TextAlignment {
  Left, Right, Center, Justified
}

export namespace TextAlignment {
  export function ToClassname(alignment: TextAlignment) {
    switch (alignment) {
      case TextAlignment.Left: return " left aligned.";
      case TextAlignment.Right: return " right aligned.";
      case TextAlignment.Center: return " center aligned";
      case TextAlignment.Justified: return " justified";
      default: return "";
    }
  }
}

export enum Float {
  None, Right, Left
}

export namespace Float {
  export function ToClassname(float: Float) {
    switch (float)
    {
      case Float.Left: return " left floated";
      case Float.Right: return " right floated";
      default: return "";
    }
  }
}

export enum Attachment {
None, Top, TopRight, TopLeft, Bottom, BottomLeft, BottomRight, Right, Left
}

export namespace Attachment {
  export function ToClassname(attachment: Attachment) {
    switch (attachment) {
      case Attachment.None: return " attached";
      case Attachment.Top: return " top attached";
      case Attachment.Bottom: return " bottom attached";
      case Attachment.Left: return " left attached";
      case Attachment.Right: return " right attached";
      case Attachment.TopRight: return " top right attached";
      case Attachment.TopLeft: return " top left attached";
      case Attachment.BottomLeft: return " bottom left attached";
      case Attachment.BottomRight: return " bottom right attached";
      default: return "";
    }
  }
}

export enum Color {
  None, Primary, Secondary, Success, Info, Warning, Error
}

export namespace Color {
  export function ToClassname(color: Color) {
    switch (color) {
      case Color.Primary: return " primaryColored";
      case Color.Secondary: return " secondaryColored";
      case Color.Success: return " successColored";
      case Color.Info: return " infoColored";
      case Color.Warning: return " warningColored";
      case Color.Error: return " errorColored ";
      default: return "";
    }
  }
}

export enum Animation {
  Browse, Drop, Fade, Flip, Scale, Fly, Slide, Swing,
  Flash, Shake, Bounce, Tada, Pulse, Jiggle,
  None
}
export namespace Animation {
  export function ToClassname(anim: Animation) {
    switch (anim)
    {
      case Animation.Browse: return " browse";
      case Animation.Drop: return " drop";
      case Animation.Fade: return " fade";
      case Animation.Flip: return " flip";
      case Animation.Scale: return " scale";
      case Animation.Fly: return " fly";
      case Animation.Slide: return " slide";
      case Animation.Swing: return " swing";
      case Animation.Flash: return " flash";
      case Animation.Shake: return " shake";
      case Animation.Bounce: return " bounce";
      case Animation.Tada: return " tada";
      case Animation.Pulse: return " pulse";
      case Animation.Jiggle: return " jiggle";
    }
  }
  export function isStatic(anim: Animation): Boolean {
    const staticAnimations = [Animation.Flash, Animation.Shake,
      Animation.Bounce, Animation.Tada, Animation.Pulse, Animation.Jiggle];
    return staticAnimations.indexOf(anim) !== -1;
  }
  export function isDirectional(anim: Animation): Boolean {
    const directionAnimations = [Animation.Browse, Animation.Fade,
      Animation.Fly, Animation.Slide, Animation.Swing];
    return directionAnimations.indexOf(anim) !== -1;
  }
}

export enum Direction {
  In, Out, None
}
export namespace Direction {
  export function ToClassname (direction: Direction){
    return direction === Direction.In ? " in" : " out";
  }
}

export enum AnimationDirection {
  Up, Down, Left, Right
}
export namespace AnimationDirection {
  export function ToClassname(dir: AnimationDirection) {
    switch (dir) {
      case AnimationDirection.Up: return " up";
      case AnimationDirection.Down: return " down";
      case AnimationDirection.Left: return " left";
      case AnimationDirection.Right: return " right";
      default: return "";
    }
  }
}
