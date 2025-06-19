# @sumup-oss/icons

## 5.11.0

### Minor Changes

- [#3145](https://github.com/sumup-oss/circuit-ui/pull/3145) [`71e3cec`](https://github.com/sumup-oss/circuit-ui/commit/71e3cec446fd5ce45930a11dcb3265cb420bbb1e) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a `getIconURL` helper function to obtain the URL for the hosted icons with full type-safety.

## 5.10.0

### Minor Changes

- [#3117](https://github.com/sumup-oss/circuit-ui/pull/3117) [`dcca0a9`](https://github.com/sumup-oss/circuit-ui/commit/dcca0a9017e94f7297b348de7742148c9ec01aaa) Thanks [@aamirnajar](https://github.com/aamirnajar)! - Added a new `Interac` card scheme icon in sizes 24 and 32.

## 5.9.0

### Minor Changes

- [#3075](https://github.com/sumup-oss/circuit-ui/pull/3075) [`3d0c5fc`](https://github.com/sumup-oss/circuit-ui/commit/3d0c5fcf7c9f39861a3c3289311e6129800a1357) Thanks [@giedoka](https://github.com/giedoka)! - Added new `DayView`, `WeekView`, `MonthView` icons in size 24 and `Controls` icon in size 16.

## 5.8.0

### Minor Changes

- [#3012](https://github.com/sumup-oss/circuit-ui/pull/3012) [`ff540a3`](https://github.com/sumup-oss/circuit-ui/commit/ff540a3b93f0efe50253041a5bc0fef6281ad35f) Thanks [@pspasova](https://github.com/pspasova)! - Added a Bulk Transfer icon in size 24.

- [#3015](https://github.com/sumup-oss/circuit-ui/pull/3015) [`a92a222`](https://github.com/sumup-oss/circuit-ui/commit/a92a22266d32a9e9432a395b5147be73099c2fc7) Thanks [@amelako](https://github.com/amelako)! - Added a Sumup pay icon in size 32.

## 5.7.0

### Minor Changes

- [#2991](https://github.com/sumup-oss/circuit-ui/pull/2991) [`fea6e1d`](https://github.com/sumup-oss/circuit-ui/commit/fea6e1d61bfd2611394df5c78c651745278039bd) Thanks [@kamenlitchev](https://github.com/kamenlitchev)! - Added a new `Girocard` payment method icon in size 24.

## 5.6.0

### Minor Changes

- [#2956](https://github.com/sumup-oss/circuit-ui/pull/2956) [`8a7ddc7`](https://github.com/sumup-oss/circuit-ui/commit/8a7ddc76658b28c52d1eb375ebf58f603a206a0e) Thanks [@sirineJ](https://github.com/sirineJ)! - Added icons for the Plus tier indicator.

## 5.5.0

### Minor Changes

- [#2950](https://github.com/sumup-oss/circuit-ui/pull/2950) [`0d9195c`](https://github.com/sumup-oss/circuit-ui/commit/0d9195c6e4c8f2456eee607473bddd1ca6385d1a) Thanks [@kamenlitchev](https://github.com/kamenlitchev)! - Added a new `Girocard` card scheme icon in size 32.

## 5.4.0

### Minor Changes

- [#2937](https://github.com/sumup-oss/circuit-ui/pull/2937) [`755267d`](https://github.com/sumup-oss/circuit-ui/commit/755267dbe180b608241f94c56e0cf1f97ca2461d) Thanks [@giedoka](https://github.com/giedoka)! - Added a new `Motorbike` icon in size 24.

## 5.3.0

### Minor Changes

- [#2870](https://github.com/sumup-oss/circuit-ui/pull/2870) [`d5308e7`](https://github.com/sumup-oss/circuit-ui/commit/d5308e7b3a83f8c6d17974d43df5a9dc1f3af2e8) Thanks [@matoous](https://github.com/matoous)! - Added new Code icon.

## 5.2.1

### Patch Changes

- [#2856](https://github.com/sumup-oss/circuit-ui/pull/2856) [`36f6217`](https://github.com/sumup-oss/circuit-ui/commit/36f621746eb60d9a7912528b5b41b1c98b22f82e) Thanks [@connor-baer](https://github.com/connor-baer)! - Updated the Calendar icon to the latest design.

## 5.2.0

### Minor Changes

- [#2836](https://github.com/sumup-oss/circuit-ui/pull/2836) [`0f4c967`](https://github.com/sumup-oss/circuit-ui/commit/0f4c967b75ec5696a6fade9c33441457f6c71f29) Thanks [@matoous](https://github.com/matoous)! - Added a new icon for Japanese flag with correct country code `flag_jp`. Deprecated the old `flag_ja` icon.

## 5.1.0

### Minor Changes

- [#2785](https://github.com/sumup-oss/circuit-ui/pull/2785) [`75d1105`](https://github.com/sumup-oss/circuit-ui/commit/75d1105ee3a69a9c9283d0ac3c7705f6c84588ee) Thanks [@giedoka](https://github.com/giedoka)! - Added new icon `ParcelLocker` in size 24.

## 5.0.0

### Major Changes

- [#2707](https://github.com/sumup-oss/circuit-ui/pull/2707) [`f8016eb`](https://github.com/sumup-oss/circuit-ui/commit/f8016ebe246005ed415ed9587ecdb76892e981c6) Thanks [@sirineJ](https://github.com/sirineJ)! - Raised the minimum Node.js version to 20+.

- [#2648](https://github.com/sumup-oss/circuit-ui/pull/2648) [`f583d05`](https://github.com/sumup-oss/circuit-ui/commit/f583d05d3af6c2ba68268ffb47b4099cecd89796) Thanks [@connor-baer](https://github.com/connor-baer)! - Renamed the package scope from `@sumup` to `@sumup-oss`. Replace `@sumup/icons` with `@sumup-oss/icons` in your `package.json` file, then update all imports:

  ```diff
  -import { Search } from '@sumup/icons';
  +import { Search } from '@sumup-oss/icons';
  ```

  [Circuit UI's ESLint plugin](https://circuit.sumup.com/?path=/docs/packages-eslint-plugin-circuit-ui--docs) offers the `renamed-package-scope` rule to automate updating the package imports.

## 4.1.3

### Patch Changes

- [#2715](https://github.com/sumup-oss/circuit-ui/pull/2715) [`f053eb3`](https://github.com/sumup-oss/circuit-ui/commit/f053eb3ccb3f86ca71d8f7e99d0dcb7447dc818f) Thanks [@voronianski](https://github.com/voronianski)! - Updated Swile 24px icon size to fit other 24px size icons.

## 4.1.2

### Patch Changes

- [#2710](https://github.com/sumup-oss/circuit-ui/pull/2710) [`ab8b1fa`](https://github.com/sumup-oss/circuit-ui/commit/ab8b1fac9ec378739e9ca43d5ddeefe42005d528) Thanks [@sirineJ](https://github.com/sirineJ)! - Optimized the `Add`, `AddEmployees`, `AddItems`, `ArrowLeft`, `Calendar`, `Close`, `Edit`, and `Plus` icons to look more balanced when used alongside text.

## 4.1.1

### Patch Changes

- [#2708](https://github.com/sumup-oss/circuit-ui/pull/2708) [`f7b96c6`](https://github.com/sumup-oss/circuit-ui/commit/f7b96c69b794428ad755f38b8ea13b0902a3549e) Thanks [@voronianski](https://github.com/voronianski)! - Updated `Conecs` and `Swile` icons to the latest logo versions (24px size only).

## 4.1.0

### Minor Changes

- [#2649](https://github.com/sumup-oss/circuit-ui/pull/2649) [`2ced130`](https://github.com/sumup-oss/circuit-ui/commit/2ced13049997449b6c4670c0b119c6daa95344be) Thanks [@ituraj](https://github.com/ituraj)! - Added `Expenses` icon in size 24. Added `ReceiptSmart` and `ReceiptUnreviewed` in size 24. Updated `ReceiptAttached` and `ReceiptMissing` in size 24.

## 4.0.0

### Major Changes

- [#2615](https://github.com/sumup-oss/circuit-ui/pull/2615) [`985f647`](https://github.com/sumup-oss/circuit-ui/commit/985f64789d712dac02a18f6c4975b69f12fb4bb6) Thanks [@connor-baer](https://github.com/connor-baer)! - Use default parameters for default props rather than statically assigning them as `defaultProps`. This silences React 18.3's warning about `defaultProps` being deprecated and enables tree shaking the icon components (which is prevented if they have static assignments).

### Minor Changes

- [#2640](https://github.com/sumup-oss/circuit-ui/pull/2640) [`aa230ca`](https://github.com/sumup-oss/circuit-ui/commit/aa230ca545252148c9f1591efcf66b0403bfa43d) Thanks [@Zayebatsu](https://github.com/Zayebatsu)! - Added `Grid` and `List` icons in size 24.

## 3.9.0

### Minor Changes

- [`19ae1cb`](https://github.com/sumup-oss/circuit-ui/commit/19ae1cbaffb60758fece343688b029d31b224c33) Thanks [@matoous](https://github.com/matoous)! - Added the `Accessibility` (24px), `Battery` (16px), `BatteryAlert` (16px & 24px), `ColorCorrection` (24px), `ColorInversion` (24px), `Language` (24px), `NoSim` (24px), `PrintFailed` (16px & 24px), `Upgrade` (16px & 24px) and `Volume` (24px) icons.

## 3.8.1

### Patch Changes

- [#2607](https://github.com/sumup-oss/circuit-ui/pull/2607) [`95b956d`](https://github.com/sumup-oss/circuit-ui/commit/95b956d9078963041528d496ac441478bd985b15) Thanks [@connor-baer](https://github.com/connor-baer)! - Updated the `Elo` icons to the latest logo version.

- [#2607](https://github.com/sumup-oss/circuit-ui/pull/2607) [`95b956d`](https://github.com/sumup-oss/circuit-ui/commit/95b956d9078963041528d496ac441478bd985b15) Thanks [@connor-baer](https://github.com/connor-baer)! - Tweaked the `Employees` icon.

## 3.8.0

### Minor Changes

- [#2584](https://github.com/sumup-oss/circuit-ui/pull/2584) [`0382840`](https://github.com/sumup-oss/circuit-ui/commit/038284033bc713d77dbf86ed80a609b8d8f37bff) Thanks [@vascofg](https://github.com/vascofg)! - Added a new `Sparkles` icon in size 24.

## 3.7.0

### Minor Changes

- [#2495](https://github.com/sumup-oss/circuit-ui/pull/2495) [`7c74b3b`](https://github.com/sumup-oss/circuit-ui/commit/7c74b3be1283efeacf7d31041e46f8450a2b1bf3) Thanks [@pspasova](https://github.com/pspasova)! - Added a new `AutomaticBalanceTransfer` icon in size 24.

## 3.6.1

### Patch Changes

- [#2458](https://github.com/sumup-oss/circuit-ui/pull/2458) [`913d959`](https://github.com/sumup-oss/circuit-ui/commit/913d9592a6957a82eacc06ddafc76055e7d002d7) Thanks [@connor-baer](https://github.com/connor-baer)! - Added missing exports for the `Manage`, `WhatsApp` and `WireTransfer` icons.

- [#2458](https://github.com/sumup-oss/circuit-ui/pull/2458) [`913d959`](https://github.com/sumup-oss/circuit-ui/commit/913d9592a6957a82eacc06ddafc76055e7d002d7) Thanks [@connor-baer](https://github.com/connor-baer)! - Added missing `width`, `height`, and `viewBox` attributes to the `PostFinance` `Sparkles`, `SumUpLogo`, and `Vr` icons.

## 3.6.0

### Minor Changes

- [#2447](https://github.com/sumup-oss/circuit-ui/pull/2447) [`390d21f`](https://github.com/sumup-oss/circuit-ui/commit/390d21fb20109061180fe824d6da4ef948281bb6) Thanks [@connor-baer](https://github.com/connor-baer)! - Renamed the `Cookie`, `Email`, `FacebookMessenger`, `Phone`, and `Reward` icons. The previous names are deprecated and will be removed in the next major version.

- [#2443](https://github.com/sumup-oss/circuit-ui/pull/2443) [`a36e352`](https://github.com/sumup-oss/circuit-ui/commit/a36e35296a720415e8dfc8cab688d19b685e61ff) Thanks [@rcdutra](https://github.com/rcdutra)! - Added new country flag icons for Hong Kong, Japan, Malaysia, Mexico, New Zealand, Singapore and the United Arab Emirates.

- [#2447](https://github.com/sumup-oss/circuit-ui/pull/2447) [`390d21f`](https://github.com/sumup-oss/circuit-ui/commit/390d21fb20109061180fe824d6da4ef948281bb6) Thanks [@connor-baer](https://github.com/connor-baer)! - Updated the `BancoEstado`, `Boleto`, `Items`, `Receipt`, `Refresh`, and `Vr` icons.

- [#2447](https://github.com/sumup-oss/circuit-ui/pull/2447) [`390d21f`](https://github.com/sumup-oss/circuit-ui/commit/390d21fb20109061180fe824d6da4ef948281bb6) Thanks [@connor-baer](https://github.com/connor-baer)! - Added new `DriverLicense`, `Manage`, `Passport`, and `ResidencePermit` icons in size 24.

## 3.5.0

### Minor Changes

- [#2440](https://github.com/sumup-oss/circuit-ui/pull/2440) [`16626e5`](https://github.com/sumup-oss/circuit-ui/commit/16626e5347e88faccb1a5b3dd4d7066488ee9f3a) Thanks [@NataliaSokolowska](https://github.com/NataliaSokolowska)! - Added a new `Sparkles` icon in size 16.

## 3.4.0

### Minor Changes

- [#2375](https://github.com/sumup-oss/circuit-ui/pull/2375) [`549ddbe`](https://github.com/sumup-oss/circuit-ui/commit/549ddbe3f6a45036426e446cefafed9928acc3bf) Thanks [@connor-baer](https://github.com/connor-baer)! - Updated the `Account` (24px), `Discount` (24px), `Payouts` (24px), `QrCode` (24px), `Reports` (24px), `Sales` (24px), `Taxes` (24px), and `Twitter` (24px) icons.

- [#2375](https://github.com/sumup-oss/circuit-ui/pull/2375) [`549ddbe`](https://github.com/sumup-oss/circuit-ui/commit/549ddbe3f6a45036426e446cefafed9928acc3bf) Thanks [@connor-baer](https://github.com/connor-baer)! - Added the `Accounting` (24px), `ActivateCard` (24px), `Add` (24px), `Alarm` (24px), `AlternativePaymentMethod` (32px), `Apps` (24px), `Area` (24px), `ArrowSlanted` (24px), `Article` (24px), `Barcode` (16px), `Bluetooth` (16px & 24px), `Callback` (24px), `Camera` (24px), `CardIn` (24px), `CardOut` (24px), `Checkmark` (24px), `Cheque` (24px), `ContactPicker` (24px), `CookiePreferences` (24px), `CustomAmount` (24px), `DirectDebit` (24px), `FeesSummary` (24px), `FilterApplied` (16px & 24px), `FlashOff` (24px), `Flashlight` (24px), `Freeze` (24px), `GeneralSettings` (24px), `Id` (24px), `Insurance` (24px), `Inventory` (24px), `Key` (24px), `Loja` (24px), `MealVoucher` (24px), `OnlinePayments` (24px), `Orders` (24px), `PayPal` (24px), `PayoutSettings` (24px), `Percentage` (16px & 24px), `Random` (24px), `ReceiptAttached` (24px), `ReceiptMissing` (24px), `ReferAFriend` (24px), `Send` (16px), `Sort` (16px & 24px), `StoreEditor` (24px), `SumUpConnect` (24px), `Support` (16px), `TapToPay` (24px), `Time` (16px), `Transactions` (24px), `Transit` (24px), `Unfavorite` (24px), `View` (16px), `Webspace` (24px), `WhatsApp` (24px), and `WireTransfer` (24px) icons.

- [#2375](https://github.com/sumup-oss/circuit-ui/pull/2375) [`549ddbe`](https://github.com/sumup-oss/circuit-ui/commit/549ddbe3f6a45036426e446cefafed9928acc3bf) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed the incorrect `FlagSl` icon. Use the `FlagSi` icon instead.

## 3.3.0

### Minor Changes

- [#2278](https://github.com/sumup-oss/circuit-ui/pull/2278) [`b2edba64`](https://github.com/sumup-oss/circuit-ui/commit/b2edba6482851cfa4c8726a1706e6b862a8c7073) Thanks [@giedoka](https://github.com/giedoka)! - Added new icon `InterestOnBalance` in size 24.

## 3.2.0

### Minor Changes

- [#2274](https://github.com/sumup-oss/circuit-ui/pull/2274) [`61d5ca87`](https://github.com/sumup-oss/circuit-ui/commit/61d5ca8726bf80298d925a4410dd8aac8b972586) Thanks [@ToniPetrov03](https://github.com/ToniPetrov03)! - Added a new icon in size 24: `Moon`.
  Added a new icon in size 24: `Sun`.

## 3.1.0

### Minor Changes

- [#2252](https://github.com/sumup-oss/circuit-ui/pull/2252) [`4f080121`](https://github.com/sumup-oss/circuit-ui/commit/4f08012109c62e03dab5611c1bd8a60ed3fc73c1) Thanks [@Zayebatsu](https://github.com/Zayebatsu)! - Added new icon `Refresh` in size 16.

## 3.0.0

### Major Changes

- [#2061](https://github.com/sumup-oss/circuit-ui/pull/2061) [`bc882426`](https://github.com/sumup-oss/circuit-ui/commit/bc882426a859e68ec7c029e1b56adbaa63f8260f) Thanks [@connor-baer](https://github.com/connor-baer)! - Raised the minimum Node.js version to 18+.

- [#2061](https://github.com/sumup-oss/circuit-ui/pull/2061) [`bc882426`](https://github.com/sumup-oss/circuit-ui/commit/bc882426a859e68ec7c029e1b56adbaa63f8260f) Thanks [@connor-baer](https://github.com/connor-baer)! - **This package is now pure ESM**. Please [read this](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

  - If you use TypeScript, you need to use TypeScript 4.7 or later ([ref](https://github.com/microsoft/TypeScript/issues/46452)).
  - If you use a bundler, make sure it supports ESM and that you have correctly configured it for ESM. (Next.js supports ESM packages out of the box since [v12](https://nextjs.org/blog/next-12#es-modules-support-and-url-imports)).

- [#2061](https://github.com/sumup-oss/circuit-ui/pull/2061) [`bc882426`](https://github.com/sumup-oss/circuit-ui/commit/bc882426a859e68ec7c029e1b56adbaa63f8260f) Thanks [@connor-baer](https://github.com/connor-baer)! - Switched to the `"exports"` field to configure the package entry points. Files that are not explicitly defined in `"exports"` can no longer be imported.

- [#1615](https://github.com/sumup-oss/circuit-ui/pull/1615) [`51cd70d3`](https://github.com/sumup-oss/circuit-ui/commit/51cd70d37e0fc4609f81e885a503a35e6f102d11) Thanks [@connor-baer](https://github.com/connor-baer)! - Changed the `IconProps` default size type to `any`.

### Minor Changes

- [#2159](https://github.com/sumup-oss/circuit-ui/pull/2159) [`66b18d61`](https://github.com/sumup-oss/circuit-ui/commit/66b18d61f5683a24414725a488f7005bad80c8b1) Thanks [@connor-baer](https://github.com/connor-baer)! - Log (not throw) an error when an icon is passed an unsupported size.

## 2.30.1

### Patch Changes

- [#2203](https://github.com/sumup-oss/circuit-ui/pull/2203) [`71018c86`](https://github.com/sumup-oss/circuit-ui/commit/71018c860c3dc8fd12da2df728198fd22c69939a) Thanks [@connor-baer](https://github.com/connor-baer)! - Updated the Eftpos payment method icon to include the company name.

## 2.30.0

### Minor Changes

- [#2201](https://github.com/sumup-oss/circuit-ui/pull/2201) [`2a40586c`](https://github.com/sumup-oss/circuit-ui/commit/2a40586c7efbf19f3834afdee2c95f0dcfbc41e5) Thanks [@Zayebatsu](https://github.com/Zayebatsu)! - Added new icon `ArrowSlanted` in size 16.

## 2.29.0

### Minor Changes

- [#2180](https://github.com/sumup-oss/circuit-ui/pull/2180) [`ae5ac9e3`](https://github.com/sumup-oss/circuit-ui/commit/ae5ac9e345ed3676f5c6bd26097bb5009e8d10c7) Thanks [@amelako](https://github.com/amelako)! - Added new icon `SelectAll` in size 24.

## 2.28.1

### Patch Changes

- [#2151](https://github.com/sumup-oss/circuit-ui/pull/2151) [`820051fe`](https://github.com/sumup-oss/circuit-ui/commit/820051fe4c3ed963491d62aec25bc96d2775bdee) Thanks [@connor-baer](https://github.com/connor-baer)! - Updated the Visa, Visa Electron and VPay icons.

## 2.28.0

### Minor Changes

- [#2149](https://github.com/sumup-oss/circuit-ui/pull/2149) [`8312c473`](https://github.com/sumup-oss/circuit-ui/commit/8312c47359e6d60b4a15a2541c8c676a94e74b7c) Thanks [@amrdruid](https://github.com/amrdruid)! - Added a new `Eftpos` icon in size 24 to the payment method category and in size 32 to the card scheme category.

## 2.27.0

### Minor Changes

- [#2135](https://github.com/sumup-oss/circuit-ui/pull/2135) [`8a771fa4`](https://github.com/sumup-oss/circuit-ui/commit/8a771fa4af7d400b8b58352d25a98014a2162efa) Thanks [@a5e](https://github.com/a5e)! - Added new icon `ExternalLink` in size 16 and 24.

- [#2141](https://github.com/sumup-oss/circuit-ui/pull/2141) [`1a69d0f3`](https://github.com/sumup-oss/circuit-ui/commit/1a69d0f35d1e36b4901eaec1a046297e6cc45b76) Thanks [@hris27](https://github.com/hris27)! - Added new card scheme icons in size 24 and 32: `Conecs` and `Swile`.

## 2.26.0

### Minor Changes

- [#2126](https://github.com/sumup-oss/circuit-ui/pull/2126) [`a79f8d0d`](https://github.com/sumup-oss/circuit-ui/commit/a79f8d0d9fdfbfc563028add0ceee5624bb49394) Thanks [@hris27](https://github.com/hris27)! - Added new icons in size 24: `TransferIn`, `TransferOut`, `ThumbUp` and `ThumbDown`.

## 2.25.0

### Minor Changes

- [#2099](https://github.com/sumup-oss/circuit-ui/pull/2099) [`9d740bd4`](https://github.com/sumup-oss/circuit-ui/commit/9d740bd49e4a6875f6b78d5e0bbdc96798eee8d7) Thanks [@connor-baer](https://github.com/connor-baer)! - Deprecated the AddItems icon. Use the Add or Items icons instead.

- [#2102](https://github.com/sumup-oss/circuit-ui/pull/2102) [`423f4d3f`](https://github.com/sumup-oss/circuit-ui/commit/423f4d3f1d9a476cbacadf1369ad5d50ce88a53f) Thanks [@ToniPetrov03](https://github.com/ToniPetrov03)! - Added a new icon in size 16: `Transit`.

## 2.24.0

### Minor Changes

- [#2096](https://github.com/sumup-oss/circuit-ui/pull/2096) [`d015d7f4`](https://github.com/sumup-oss/circuit-ui/commit/d015d7f46e7e876fabf2f9ba84f9a0abad03ab0e) Thanks [@cecisousa](https://github.com/cecisousa)! - Added a new icon in size 24: `MoreCircle`.

## 2.23.0

### Minor Changes

- [#2068](https://github.com/sumup-oss/circuit-ui/pull/2068) [`4a4f8d74`](https://github.com/sumup-oss/circuit-ui/commit/4a4f8d7451418a90b1d15f4fff1f384e4aa64067) Thanks [@oalpatov](https://github.com/oalpatov)! - Added new icons in size 24: `CreditNote`, `DeliveryNote`, `ElectronicInvoice`, `FlipCamera`, `NoCosts`, and `RecurringInvoice`.

## 2.22.0

### Minor Changes

- [#2018](https://github.com/sumup-oss/circuit-ui/pull/2018) [`03a440d4`](https://github.com/sumup-oss/circuit-ui/commit/03a440d42bd740f71bc1ca39995b8b0aae76fcd9) Thanks [@robinmetral](https://github.com/robinmetral)! - Added new icons to the library. Action: `Stop` in size 16 and 24; Device: `CardReaderSoloLite` and `Tablet` in size 24; Miscellaneous: `Basket`, `Briefcase`, `Clothing`, `Customize`, `Health`, `Mcc` and `Services` in size 24; Notification: `Active`, `Paused` and `Stopped` in size 16 and 24; Product and feature: `Promote` in size 24.

## 2.21.0

### Minor Changes

- [#2009](https://github.com/sumup-oss/circuit-ui/pull/2009) [`b51f23a2`](https://github.com/sumup-oss/circuit-ui/commit/b51f23a2a0819ec94bb7150c2e83d768df6ff9be) Thanks [@tavarest](https://github.com/tavarest)! - Added a new size 24 `PaymentLink` icon to the Product and feature category.

## 2.20.0

### Minor Changes

- [#1957](https://github.com/sumup-oss/circuit-ui/pull/1957) [`f8f266df`](https://github.com/sumup-oss/circuit-ui/commit/f8f266df54c69b987d6c1d5b47228e856af741f0) Thanks [@connor-baer](https://github.com/connor-baer)! - Added the `IconsManifest` type to the exports. It describes the shape of `@sumup/icons/manifest.json`.

## 2.19.0

### Minor Changes

- [#1940](https://github.com/sumup-oss/circuit-ui/pull/1940) [`fbaa82b7`](https://github.com/sumup-oss/circuit-ui/commit/fbaa82b7efaf9e4955b14af1a20413d4364ce2f4) Thanks [@briannailiev](https://github.com/briannailiev)! - Added icons for the `Bancontact`, `Blik`, `EPS`, `Giropay`, `iDeal`, `MyBank`, `Przelewy24`, and `Satispay` payment methods.

## 2.18.0

### Minor Changes

- [#1928](https://github.com/sumup-oss/circuit-ui/pull/1928) [`1400e62f`](https://github.com/sumup-oss/circuit-ui/commit/1400e62f9434e04c4da811a445a30d9bf3f07930) Thanks [@Marczerwinski](https://github.com/Marczerwinski)! - Added a new size 16 'Favorite' icon

## 2.17.0

### Minor Changes

- [#1906](https://github.com/sumup-oss/circuit-ui/pull/1906) [`5cf691e7`](https://github.com/sumup-oss/circuit-ui/commit/5cf691e78f768d907cb9abf9eff94b990f667df3) Thanks [@rcdutra](https://github.com/rcdutra)! - Added a new card scheme icon for `Faster Payments`.

## 2.15.0

### Minor Changes

- [#1785](https://github.com/sumup-oss/circuit-ui/pull/1785) [`851351bd`](https://github.com/sumup-oss/circuit-ui/commit/851351bd9108e4c5368a1825ac830cfda2fb969a) Thanks [@sumius](https://github.com/sumius)! - Added a new `Copy` icon.

## 2.14.0

### Minor Changes

- [#1756](https://github.com/sumup-oss/circuit-ui/pull/1756) [`97ca8c52`](https://github.com/sumup-oss/circuit-ui/commit/97ca8c523874eafb0bce6857945310f635942c29) Thanks [@rcdutra](https://github.com/rcdutra)! - Added new payment method icons for `Alelo`, `Sodexo` and `Ticket`.

## 2.13.0

### Minor Changes

- [#1708](https://github.com/sumup-oss/circuit-ui/pull/1708) [`c5d42bc8`](https://github.com/sumup-oss/circuit-ui/commit/c5d42bc8835047da562b8b21d1045c31e916fbb7) Thanks [@larimaza](https://github.com/larimaza)! - Added new card scheme icons for `Alelo`, `Sodexo` and `Ticket`.

## 2.12.0

### Minor Changes

- [#1648](https://github.com/sumup-oss/circuit-ui/pull/1648) [`821532f9`](https://github.com/sumup-oss/circuit-ui/commit/821532f9728ec34b4bb00d1273ca8c6484ea26b4) Thanks [@hris27](https://github.com/hris27)! - Added new size 32 card scheme icons: `ApplePay`, `Bancontact`, `Boleto`, `GooglePay`, `Ideal`, `Klarna` and `PayPal`.

## 2.11.0

### Minor Changes

- [#1637](https://github.com/sumup-oss/circuit-ui/pull/1637) [`2f45ec2d`](https://github.com/sumup-oss/circuit-ui/commit/2f45ec2d84020d3d6a9009326276ad9b59dd6cdd) Thanks [@Marczerwinski](https://github.com/Marczerwinski)! - Added a new 24 size `Drag` icon.

## 2.10.0

### Minor Changes

- [#1619](https://github.com/sumup-oss/circuit-ui/pull/1619) [`6b0b6ed9`](https://github.com/sumup-oss/circuit-ui/commit/6b0b6ed9d28b8e5ad8610722e8bb8552ece58732) Thanks [@n-yordanov3](https://github.com/n-yordanov3)! - Added new size 24 `Cafe`, `Globe`, `Hospitality`, and `SumUpLogomark` icons.

## 2.9.1

### Patch Changes

- [#1593](https://github.com/sumup-oss/circuit-ui/pull/1593) [`da3cb509`](https://github.com/sumup-oss/circuit-ui/commit/da3cb509d6dfc58844a31937f37e772f01863030) Thanks [@tavarest](https://github.com/tavarest)! - Moved the `NfcPayment` icon to the payment methods category and changed its size to 24.

* [#1593](https://github.com/sumup-oss/circuit-ui/pull/1593) [`da3cb509`](https://github.com/sumup-oss/circuit-ui/commit/da3cb509d6dfc58844a31937f37e772f01863030) Thanks [@tavarest](https://github.com/tavarest)! - Added the missing `viewbox` attribute to the `Boleto` and `Vr` icons.

## 2.9.0

### Minor Changes

- [#1586](https://github.com/sumup-oss/circuit-ui/pull/1586) [`701b9f4b`](https://github.com/sumup-oss/circuit-ui/commit/701b9f4b957cf0fb8bda0d5050b5f72747832422) Thanks [@tavarest](https://github.com/tavarest)! - Added a new size 32 `NfcPayment` icon in the card schemes category.

* [#1586](https://github.com/sumup-oss/circuit-ui/pull/1586) [`701b9f4b`](https://github.com/sumup-oss/circuit-ui/commit/701b9f4b957cf0fb8bda0d5050b5f72747832422) Thanks [@tavarest](https://github.com/tavarest)! - Added new size 24 `Boleto` and `Vr` icons in the payment methods category.

## 2.8.0

### Minor Changes

- [#1579](https://github.com/sumup-oss/circuit-ui/pull/1579) [`fa152a45`](https://github.com/sumup-oss/circuit-ui/commit/fa152a45021173d95ab260850ed0f30ed43980b8) Thanks [@hris27](https://github.com/hris27)! - Added new size 24 `Gauge`, `Calendar` and `FlashOn` icons.

## 2.7.0

### Minor Changes

- [#1554](https://github.com/sumup-oss/circuit-ui/pull/1554) [`d3fb618a`](https://github.com/sumup-oss/circuit-ui/commit/d3fb618a3b73b1751067421bcd237e861d593f33) Thanks [@robinmetral](https://github.com/robinmetral)! - Added support for React 18.

## 2.6.0

### Minor Changes

- [#1515](https://github.com/sumup-oss/circuit-ui/pull/1515) [`60961522`](https://github.com/sumup-oss/circuit-ui/commit/6096152255665da1e09e84857dbb2e22e4e337af) Thanks [@hris27](https://github.com/hris27)! - Added the VR Benefícios card scheme icon.

## 2.5.0

### Minor Changes

- [#1463](https://github.com/sumup-oss/circuit-ui/pull/1463) [`86800b22`](https://github.com/sumup-oss/circuit-ui/commit/86800b220d692a9c447c38624377b2d7b962256e) Thanks [@sumius](https://github.com/sumius)! - Added a size 16 `Share` icon.

## 2.4.0

### Minor Changes

- [#1423](https://github.com/sumup-oss/circuit-ui/pull/1423) [`1e7eeb1a`](https://github.com/sumup-oss/circuit-ui/commit/1e7eeb1a132c2e342e9ccdd853a8107fcdb790c6) Thanks [@hrstngrnvsmp](https://github.com/hrstngrnvsmp)! - Added new `Download`, `Upload` and `Filter` icons in sizes 16 and 24.

### Patch Changes

- [#1425](https://github.com/sumup-oss/circuit-ui/pull/1425) [`8317a905`](https://github.com/sumup-oss/circuit-ui/commit/8317a90590b40da66de3e64ada61f8fcbaadf03c) Thanks [@robinmetral](https://github.com/robinmetral)! - Fixed and optimized the newly added icons: `Upload`, `Download` and `Filter`.

## 2.3.0

### Minor Changes

- [#1389](https://github.com/sumup-oss/circuit-ui/pull/1389) [`1b310e89`](https://github.com/sumup-oss/circuit-ui/commit/1b310e895bc5de2c5d8d20cf7fc4836c092adb91) Thanks [@pavel-craciun-sumup](https://github.com/pavel-craciun-sumup)! - Added a size 24 `Pix` payment method icon.

## 2.2.0

### Minor Changes

- [#1296](https://github.com/sumup-oss/circuit-ui/pull/1296) [`c310d134`](https://github.com/sumup-oss/circuit-ui/commit/c310d1347b11c5722cc012afb62232fb79772724) Thanks [@hris27](https://github.com/hris27)! - Added a size 32 `Pix` card scheme icon.

## 2.1.0

### Minor Changes

- [#1243](https://github.com/sumup-oss/circuit-ui/pull/1243) [`a3c04121`](https://github.com/sumup-oss/circuit-ui/commit/a3c04121c6cc2f12670abb7bfae5e0cbaf96958e) Thanks [@hris27](https://github.com/hris27)! - Added support for size 32 icons. Added new card scheme and sales-oriented icons.

## 2.0.1

### Patch Changes

- [#1247](https://github.com/sumup-oss/circuit-ui/pull/1247) [`ac46a6ec`](https://github.com/sumup-oss/circuit-ui/commit/ac46a6ec2accdd03be382342f355b75199792418) Thanks [@connor-baer](https://github.com/connor-baer)! - Added missing flag icons to the manifest (AR, AU, CA, CO, HR, PE, RO, and SL).

## 2.0.0

### Major Changes

- [#1168](https://github.com/sumup-oss/circuit-ui/pull/1168) [`ca74d320`](https://github.com/sumup-oss/circuit-ui/commit/ca74d320168aba1285e23691ca6651a1d12f9d27) Thanks [@robinmetral](https://github.com/robinmetral)! - Rolled out new brand icons.

## 1.9.0

### Minor Changes

- [#1114](https://github.com/sumup-oss/circuit-ui/pull/1114) [`159bd7ad`](https://github.com/sumup-oss/circuit-ui/commit/159bd7ad9f7aa6fd73528b209377e073c498e40e) Thanks [@connor-baer](https://github.com/connor-baer)! - Exported the `IconProps` interface publicly.

* [`12ef7cf6`](https://github.com/sumup-oss/circuit-ui/commit/12ef7cf6c147e73b265139237751ecfa4fe37804) Thanks [@connor-baer](https://github.com/connor-baer)! - Added classnames to parts of the SumUp logo so they can be targeted for individual styling.

## 1.8.2

### Patch Changes

- [#1063](https://github.com/sumup-oss/circuit-ui/pull/1063) [`e48f5713`](https://github.com/sumup-oss/circuit-ui/commit/e48f57135a8c129049d2b614efa2ed936fa63e42) Thanks [@robinmetral](https://github.com/robinmetral)! - Fixed the Plus icon's fill to inherit the currentColor.

## 1.8.1

### Patch Changes

- [#1049](https://github.com/sumup-oss/circuit-ui/pull/1049) [`1fb10698`](https://github.com/sumup-oss/circuit-ui/commit/1fb10698f624a5682a849964a926179ea0e425c9) Thanks [@connor-baer](https://github.com/connor-baer)! - Added the minus icon to the icons manifest.

## 1.8.0

### Minor Changes

- [#1045](https://github.com/sumup-oss/circuit-ui/pull/1045) [`f2f6945b`](https://github.com/sumup-oss/circuit-ui/commit/f2f6945b009079ca52b05433e6c8940e1de0720b) Thanks [@drazenbuljovcic](https://github.com/drazenbuljovcic)! - Added a new minus icon in a small size.

## 1.7.1

### Patch Changes

- [#980](https://github.com/sumup-oss/circuit-ui/pull/980) [`900e6bc4`](https://github.com/sumup-oss/circuit-ui/commit/900e6bc465e4f909ab000403da3d17724f2ab73e) Thanks [@robinmetral](https://github.com/robinmetral)! - Fixes the Plus icon to use the currentColor instead of black.

## 1.7.0

### Minor Changes

- [#961](https://github.com/sumup-oss/circuit-ui/pull/961) [`d6cfe1df`](https://github.com/sumup-oss/circuit-ui/commit/d6cfe1dff247bea93b83c19dde728ca36b51bc0b) Thanks [@robinmetral](https://github.com/robinmetral)! - Add new Plus icons in small and large sizes.

## 1.6.2

### Patch Changes

- [#898](https://github.com/sumup-oss/circuit-ui/pull/898) [`02558395`](https://github.com/sumup-oss/circuit-ui/commit/025583954df06c95c79584e8639936a03e7f77f4) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed unnecessary `mask` rules from SVGs. The rule had no visual effect on the SVGs and could cause issues when an icon was used multiple times on a page.

## 1.6.1

### Patch Changes

- [#883](https://github.com/sumup-oss/circuit-ui/pull/883) [`1912119f`](https://github.com/sumup-oss/circuit-ui/commit/1912119fd998ab9d4000e11db5dfa653fdd8c877) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed unnecessary `clip-path` rules from SVGs. The rule had no visual effect on the SVGs and could cause issues when an icon was used multiple times on a page.

* [#883](https://github.com/sumup-oss/circuit-ui/pull/883) [`1912119f`](https://github.com/sumup-oss/circuit-ui/commit/1912119fd998ab9d4000e11db5dfa653fdd8c877) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a grey border around the Finnish flag icon to match all other flag icons.
