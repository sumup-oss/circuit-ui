import { createOnKeyDown } from './withKeyboardEvents';

describe('withKeyboardEvents', () => {
  describe('createOnKeyDown', () => {
    it('should return a keyDown handler', () => {
      const onClick = jest.fn();
      const onKeyDown = createOnKeyDown(onClick);

      expect(typeof onKeyDown).toBe('function');
      expect(onKeyDown).toHaveLength(1);
    });

    it('should call the onClick function if the enter key is pressed', () => {
      const onClick = jest.fn();
      const event = { keyCode: 13 };
      const onKeyDown = createOnKeyDown(onClick);

      onKeyDown(event);

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(event);
    });

    it('should call the onClick function if the spacebar is pressed', () => {
      const onClick = jest.fn();
      const event = { keyCode: 32 };
      const onKeyDown = createOnKeyDown(onClick);

      onKeyDown(event);

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(event);
    });
  });
});
