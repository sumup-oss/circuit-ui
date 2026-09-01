# @sumup-oss/illustrations

## 1.1.0

### Minor Changes

- [#3860](https://github.com/sumup-oss/circuit-ui/pull/3860) [`ae756f7`](https://github.com/sumup-oss/circuit-ui/commit/ae756f76be4fea62cf9d6a1c28b46137d8659115) Thanks [@sirineJ](https://github.com/sirineJ)! - Added new illustrations for flow states: Success, Danger and Warning.

## 1.0.0

### Major Changes

- [#3809](https://github.com/sumup-oss/circuit-ui/pull/3809) [`e029f0c`](https://github.com/sumup-oss/circuit-ui/commit/e029f0cfaace56baaa510b4f787a1834209614ca) Thanks [@sirineJ](https://github.com/sirineJ)! - Added a new illustration library. Import the Illustration component or use the `getIllustrationUrl` helper to start using illustrations. Find the detailed [documentation](https://github.com/sumup-oss/circuit-ui/blob/main/packages/illustrations/README.md) here.

  ```tsx
  import { Illustration, getIllustrationUrl } from "@sumup-oss/illustrations";

  function MyComponent() {
    return (
      <div>
        <Illustration name="celebration" />;
        <img src={getIllustrationUrl("celebration", "light")} alt="" />
      </div>
    );
  }
  ```

### Minor Changes

- [#3810](https://github.com/sumup-oss/circuit-ui/pull/3810) [`8becac3`](https://github.com/sumup-oss/circuit-ui/commit/8becac30ead770a95a7245080c2dd960b2abbbe6) Thanks [@sirineJ](https://github.com/sirineJ)! - Exported a `NAMES` variable of all available illustration names.

### Patch Changes

- [#3814](https://github.com/sumup-oss/circuit-ui/pull/3814) [`d3927e7`](https://github.com/sumup-oss/circuit-ui/commit/d3927e784cc5ba829007e762d109194e0eb81f0e) Thanks [@sirineJ](https://github.com/sirineJ)! - Updated the Illustrations package to ship its styles separately.

  To use the Illustrations component, import the stylesheet once in your application:

  ```tsx
  import "@sumup-oss/illustrations/styles.css";
  ```

- [#3811](https://github.com/sumup-oss/circuit-ui/pull/3811) [`58b68ac`](https://github.com/sumup-oss/circuit-ui/commit/58b68aca48ed967a2c2d35994a7f25cbd8cfe90c) Thanks [@sirineJ](https://github.com/sirineJ)! - Fixed a typo in illustrations' Name type.
