Projects:
- `nativescript-test-plugin`
  - Native Android Studio project in `modules-src/android`
  - Thin plugin which exports a function to show a Toast
- `nativescript-test-application`
  - The template application modified to show the toast when the button is tapped
  - Currently references `nativescript-test-plugin` via a relative path

Building and running:

- `cd nativescript-test-plugin`
- `npm install`
- `cd ../nativescript-test-application`
- `npm install`
- `tns run android`
