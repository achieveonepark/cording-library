---
title: UnityIAP
---
# Unity IAP

These are notes covering the process up to purchase testing.

## Android
>Prerequisite: the keystore used for the build

A keystore is required to publish an AAB file to Google Play Console.<br>
Create the keystore in Project Settings, then follow the steps below.<br>
Also, never lose the generated keystore.

### Start
1. **Make sure a test project has been created in Google Play Console.**
2. **Upload an AAB file to Google Play Console.** (The test stage itself is not important.)
3. **Register the product to test under `Monetization / Products / In-app products`.**
4. **Promote it to a closed test and release it.**
5. **Install the app on the device through `Testers / Join on Android` for the released closed testing track, launch it once, and then test purchases.**
   - If you encounter the following after this process:
>🔧 If you get a `Product not found` error
>- Check whether the test account is registered under `Google Play Console / Setup / License testing`.
>- Make sure steps 4 and 5 have already been completed.

## iOS
1. **Make sure a test project has been created in App Store Connect.**
2. **Register the product to test under `Monetization / In-App Purchases`.**
   - It can still be in draft.
   - It does not need to be approved.
   - You can still test even if it says `Missing Metadata`.
3. **Create a sandbox test account in App Store Connect -> Users and Access -> Sandbox.**
4. **Sign in with the sandbox account on the test iOS device.**
   - [Settings -> App Store -> Sandbox Account]
   - You can skip the two-factor authentication-related prompts when signing in.
5. **Wait a little after registering the product for the first time, then test.**
   - The documentation says anywhere from `a few minutes to a few hours, up to 24 hours`, so it is hard to pin down an exact time.
     - In my case, it was updated when I tried again **after 5 minutes**.

Once everything above is configured, you can proceed with purchase testing.
