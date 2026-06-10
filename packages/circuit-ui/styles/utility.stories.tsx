import { utilClasses } from './utility.js';
import { useState } from 'react';
import { Toggle } from '../components/Toggle/index.js';
import { RadioButtonGroup } from '../components/RadioButtonGroup/index.js';
import { clsx } from './clsx.js';
import styles from './utilityStories.module.css';
import { Body } from '../components/Body/index.js';
import { userEvent } from 'storybook/test';

export default {
  title: 'Features/Utility Classes',
  tags: ['status:stable'],
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

async function pressTab() {
  await userEvent.tab();
}

export const Center = () => {
  const [className, setClassName] = useState<string | undefined>(
    utilClasses.center,
  );
  return (
    <>
      <div className={clsx(styles.wrapper, className)}>
        <Body>{className ? 'Centered' : 'Not centered'}</Body>
      </div>
      <Toggle
        label={'Apply center class name'}
        checked={className !== undefined}
        className={utilClasses.marginTopGiga}
        onChange={() =>
          setClassName((current) => (current ? undefined : utilClasses.center))
        }
      />
    </>
  );
};

export const HideVisually = () => {
  const [className, setClassName] = useState<string | undefined>(
    utilClasses.hideVisually,
  );

  return (
    <>
      <Body className={className}>Hidden</Body>
      <Toggle
        label={'Apply hideVisually class name'}
        checked={className === utilClasses.hideVisually}
        className={utilClasses.marginTopGiga}
        onChange={() =>
          setClassName((current) =>
            current ? undefined : utilClasses.hideVisually,
          )
        }
      />
    </>
  );
};

export const HideScrollbar = () => {
  const [className, setClassName] = useState<string | undefined>(
    utilClasses.hideScrollbar,
  );

  return (
    <>
      <div className={clsx(styles.wrapper, className)}>
        <div className={styles.scrollable}>Scroll me</div>
      </div>
      <Toggle
        label={'Apply hideScrollbar class name'}
        checked={className === utilClasses.hideScrollbar}
        className={utilClasses.marginTopGiga}
        onChange={() =>
          setClassName((current) =>
            current ? undefined : utilClasses.hideScrollbar,
          )
        }
      />
    </>
  );
};

export const FocusVisible = () => {
  const [className, setClassName] = useState<string | undefined>(
    utilClasses.focusVisible,
  );

  return (
    <>
      <div
        // biome-ignore lint/a11y/noNoninteractiveTabindex: for demo purposes only
        tabIndex={0}
        className={className}
      >
        I&apos;m an interactive div
      </div>
      <Toggle
        label={'Apply focusVisible class name'}
        checked={className === utilClasses.focusVisible}
        className={utilClasses.marginTopGiga}
        onChange={() =>
          setClassName((current) =>
            current ? undefined : utilClasses.focusVisible,
          )
        }
      />
    </>
  );
};
FocusVisible.play = pressTab;

export const FocusVisibleInset = () => {
  const [className, setClassName] = useState<string | undefined>(
    utilClasses.focusVisibleInset,
  );

  return (
    <>
      <div
        // biome-ignore lint/a11y/noNoninteractiveTabindex: for demo purposes only
        tabIndex={0}
        className={className}
      >
        I&apos;m an interactive div
      </div>
      <Toggle
        label={'Apply focusVisibleInset class name'}
        checked={className === utilClasses.focusVisibleInset}
        className={utilClasses.marginTopGiga}
        onChange={() =>
          setClassName((current) =>
            current ? undefined : utilClasses.focusVisibleInset,
          )
        }
      />
    </>
  );
};
FocusVisibleInset.play = pressTab;

const sizes = [
  'Bit',
  'Byte',
  'Kilo',
  'Mega',
  'Giga',
  'Tera',
  'Peta',
  'Exa',
  'Zetta',
  'Yotta',
  'Ronna',
  'Quetta',
] as const;
type Size = (typeof sizes)[number];

export const Spacing = () => {
  const sizeOptions = sizes.map((size) => ({ label: size, value: size }));
  const [allDirections, setAllDirections] = useState(true);
  const [allDirectionsSpacingValue, setAllDirectionsSpacingValue] =
    useState<Size>('Bit');
  const [spacingTopValue, setSpacingTopValue] = useState<Size>('Bit');
  const [spacingBottomValue, setSpacingBottomValue] = useState<Size>('Bit');
  const [spacingLeftValue, setSpacingLeftValue] = useState<Size>('Bit');
  const [spacingRightValue, setSpacingRightValue] = useState<Size>('Bit');
  const className = allDirections
    ? utilClasses[`margin${allDirectionsSpacingValue}`]
    : clsx(
        utilClasses[`marginTop${spacingTopValue}`],
        utilClasses[`marginBottom${spacingBottomValue}`],
        utilClasses[`marginLeft${spacingLeftValue}`],
        utilClasses[`marginRight${spacingRightValue}`],
      );

  return (
    <>
      <div className={clsx(styles.wrapper, styles.flex)}>
        <div
          className={clsx(
            className,
            styles.content,
            styles.flex,
            utilClasses.center,
          )}
        >
          {allDirections && (
            <Body color="on-strong">
              className applied: {`margin${allDirectionsSpacingValue}`}
            </Body>
          )}
          {!allDirections && (
            <>
              <Body
                color="on-strong"
                className={styles.left}
              >{`marginLeft${spacingLeftValue}`}</Body>

              <Body
                color="on-strong"
                className={styles.top}
              >{`marginTop${spacingTopValue}`}</Body>
              <Body
                color="on-strong"
                className={styles.bottom}
              >{`marginBottom${spacingBottomValue}`}</Body>

              <Body color="on-strong" className={styles.right}>
                {' '}
                {`marginRight${spacingRightValue}`}
              </Body>
            </>
          )}
        </div>
      </div>
      <Toggle
        label={'Apply spacing to all directions'}
        checked={allDirections}
        className={clsx(
          utilClasses.marginTopGiga,
          utilClasses.marginBottomGiga,
        )}
        onChange={() => setAllDirections((current) => !current)}
      />
      {allDirections ? (
        <RadioButtonGroup
          value={allDirectionsSpacingValue}
          onChange={(event) =>
            setAllDirectionsSpacingValue(event.target.value as Size)
          }
          options={sizeOptions}
          label={'Spacing value'}
        />
      ) : (
        <div className={styles.directions}>
          <RadioButtonGroup
            value={spacingTopValue}
            onChange={(event) => setSpacingTopValue(event.target.value as Size)}
            options={sizeOptions}
            label={'Spacing top value'}
          />
          <RadioButtonGroup
            value={spacingBottomValue}
            onChange={(event) =>
              setSpacingBottomValue(event.target.value as Size)
            }
            options={sizeOptions}
            label={'Spacing bottom value'}
          />
          <RadioButtonGroup
            value={spacingLeftValue}
            onChange={(event) =>
              setSpacingLeftValue(event.target.value as Size)
            }
            options={sizeOptions}
            label={'Spacing left value'}
          />
          <RadioButtonGroup
            value={spacingRightValue}
            onChange={(event) =>
              setSpacingRightValue(event.target.value as Size)
            }
            options={sizeOptions}
            label={'Spacing right value'}
          />
        </div>
      )}
    </>
  );
};
