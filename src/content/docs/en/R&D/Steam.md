---
title: Steam
---
# Steam

These are notes from the process of integrating Steam.

## Create a Steam account

- Before you start, you need a Steam developer account.
- Install the Steam client and sign in. During testing, the client must always be running.

## Steamworks.NET
- Steam does not provide an official Unity SDK, so this project uses the community-made Steamworks.NET package to access Steamworks features from C#.
- It is also helpful to look at the [Steamworks.NET](https://github.com/rlabrecque/Steamworks.NET-Test) test repository first.

## Add SteamManager.cs to the project

### What is SteamManager?
- It initializes and shuts down Steamworks.NET when the Unity app starts and ends, and it also processes Steam API callbacks every frame.
- This is sample code provided by the Steamworks.NET package author. See the Steamworks.NET SteamManager documentation for details.

### How to use it
- Place the [SteamManager.cs](https://raw.githubusercontent.com/rlabrecque/SteamManager/master/SteamManager.cs) file inside the `Assets` folder.
- In SteamManager, enter your issued AppId in the line `if (SteamAPI.RestartAppIfNecessary(AppId_t.Invalid))`.
- Add the SteamManager component to the starting scene.

## Build

### General install settings
- After downloading and installing the game build from the Steam client, you must specify the executable file to run.
- Configure it according to the target operating system.
- The executable field must match Unity's product name exactly.
  - `{Project Settings/Player/Product Name}.exe`

### Add depots
1. Open SteamPipe/Depots and click the button to add a new depot at the bottom.
2. Set the depot name and confirm. If this is the first depot, the default ID is usually `appID + 1`; after that, it is the last created depot ID plus one.
3. Configure the new depot. For example, you can create separate depots for Windows and Mac.
4. Be sure to save, then return to the top app management page and click the item below.
5. Click the package title under the store package section.
6. Add the depot you created above in the included depots section.

### Add a branch
1. Select `Create a new app branch` and enter the branch name.
2. Description: how the branch will be used. Password: if entered, the branch is private; if left blank, it is a public test branch.
3. Click update to apply the new branch.

## Windows build ...

## Behavior after upload
1. Check whether the uploaded build was uploaded properly.
2. Open the Steam client, go to your library, right-click the test client, and open Properties.
3. In the Beta tab, select the branch you created and uploaded.
4. Update, then start the game.
