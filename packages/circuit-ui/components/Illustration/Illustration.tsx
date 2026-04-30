import {
  forwardRef,
  type ImgHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  getIllustrationUrl,
  type Size,
  type Theme,
  type Variant,
} from '@sumup-oss/illustrations';
import { applyMultipleRefs } from '../../util/refs.js';

export interface IllustrationProps extends ImgHTMLAttributes<HTMLImageElement> {
  /**
   * The size of the illustration. Choose from `s`, `m` or `l`
   * @default 'm'
   */
  size?: Size;
  /**
   * The theme in which your illustration is used.
   * The component will automatically switch between light and dark themes based on the theme of your app,
   * if it fails to detect the theme of your app, it will default to light theme
   * @default 'light'
   */
  theme?: Theme;
  /**
   * The variant of the illustration. Choose from `success`, `warning`, `error`, `empty`
   */
  variant: Variant;
}

export const Illustration = forwardRef<HTMLImageElement, IllustrationProps>(
  ({ variant, className, size = 'm', theme = 'light', alt, ...props }, ref) => {
    const illustrationRef = useRef<HTMLImageElement>(null);
    const [scheme, setScheme] = useState<string>();

    useEffect(() => {
      if (!illustrationRef.current) {
        return;
      }

      const parent = illustrationRef.current.closest('[data-color-scheme]');
      setScheme((parent as HTMLElement | null)?.dataset.colorScheme);
    }, []);
    const sourceUrl = getIllustrationUrl(variant, size, scheme ?? theme);
    return (
      <img
        alt={alt}
        ref={applyMultipleRefs(ref, illustrationRef)}
        src={sourceUrl}
        {...props}
      />
    );
  },
);
