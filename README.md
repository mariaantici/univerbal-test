# Univerbal coding exercise

Thank you for taking the time to complete this coding exercise. We hope you will enjoy it and wish you good luck! 😊

Below you find instructions on how to set up the project and a list of tasks to work on.

You are completely free in choosing what tasks you want to work on and in what order, prioritize them according to how important you think they are. We do not expect yout to finish all of them and prefer quality over quantity. You are allowed to change anything - feel free to modify any config and add any library or tool to get things done. You can also come up with your own ideas, but please indicate this if you do so.

We want you to use git while working on the project. Please initialize a git repository in the project directory and commit all files with the message `init`. Keep commiting your changes regularly as you go and tick off tasks you have completed in this README. When you are done, commit the final version with the message `done` (max 4 hours, it's okay if this commit includes WIP). Feel free to continue working on the project after that, but this is not expected.

Don't forget to give us access to the repository by either making it public or inviting us (christopher@univerbal.app).

## Setup

### Global Setup

- Android setup if you want to develop on android ([link](https://docs.expo.dev/workflow/android-studio-emulator/))
- iOS setup if you want to develop on iOS: ([link](https://docs.expo.dev/workflow/ios-simulator/))
- Install node and package manager (npm) e.g. using corepack ([link](https://github.com/nodejs/corepack))

### Project Setup

- Initialize a git repository, stage all files and commit with `init` message
- Install the packages/dependencies
- Start the server with `npm run start:server`
- Add execution rights to the script `chmod +x ./scripts/local-ip.sh`. (this script is used to resolve the local IP address such that the frontend can connect to the backend)
- Start the app with `npm start` and then select either `a` for android, `i` for ios, `w` for web. (Note: There will be an error. Fixing this is the first task)

# Tasks

## General

- [ ] Running `npm start` does not start the app due to errors in the console
- [ ] Bottom tab navigation does not display icons
- [ ] The app is not styled - make it pretty
- [ ] The console should not display any warning nor errors in general

## Home screen (tab-home)

### Search

- [ ] The search suggestions below are not being displayed correctly
- [ ] Pressing on a list entry should open a screen with a movie or a TV series,
- [ ] Sending search requests is not optimal
- [ ] Search result displays all TV series and movies. Add additional filters.

### Featured Movies

- [ ] The component does not fetch data
- [ ] Pressing on movie should open the screen with movie details

### Featured Tv Series

- [ ] Enable the component. It's disabled as it can crash the home screen
- [ ] Pressing on TV series should open the screen with TV series details
- [ ] The rating is not displayed correctly

## Movie and Tv Series screens (movie, tv-series)

- [ ] They display nothing and should display all data about the item
- [ ] Navigating back should redirect to the correct screen

## Top rated screen (tab-top-rated)

- [ ] The list should display items with ratings of >=75
- [ ] Some list entries display incorrectly formatted values

## Favorites screen (tab-favorites)

- [ ] The screen displays two headers - it should display only one
- [ ] Implement the view

## Refactoring

- [ ] The codebase is inconsistent and should be cleaned up
- [ ] There should be no visible type errors
- [ ] The linter should not show errors
- [ ] The linter should not show warnings
- [ ] Some files are implemented in javascript - convert them to typescript
- [ ] Handle network errors gracefully
- [ ] Write some unit tests
- [ ] Write some integration tests
