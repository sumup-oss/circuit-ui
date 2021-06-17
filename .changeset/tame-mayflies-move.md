---
'@sumup/circuit-ui': major
---

---

## "@sumup/circuit-ui": major

Popover menus are a common pattern to display additional actions commonly when interacting with an actionable component. The old popover component was removed and replaced with the new one.

The Popover Item component was added as an action item represented by an appropriate HTML element (button or a) with an optional leading icon and label.

The new Popover component takes isOpen and onClose as props to control the open Popover, actions to distinguish PopoverItem and Divider.
The Popover is powered by React Popper which means you can easily change the Popover placement by simply passing the placement prop.
The triggers or the reference elements of the Popover can be primary, secondary, tertiary buttons, an overflow icons, or components with embedded buttons such as image upload component.
The states of the popover are added and can be Default, Hover, Active, Focus.
The Destructive variant is added that changes the color of label and icon from blue to red to signal to the user that the action is irreversible or otherwise dangerous.

Usage example:

```
import React from 'react';
import {
  Popover,
  Button,
} from '@sumup/circuit-ui';

  const [isOpen, setOpen] = useState(false);
  const referenceElement = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const onClose = () => {
    setOpen(false);
  };

 const props = {
    actions: [
      {
        onClick: () => alert('Hello'),
        children: 'Add',
        icon: CirclePlus,
      },
    ],
    isOpen: true,
    onClose: jest.fn(),
  };

  return (
    <>
    <Button onClick={handleClick} ref={referenceElement}>Say hello</Button>
      <Popover
        {...props}
        referenceElement={referenceElement}
      />
    </>
  );
};
```
