# Luke's Solution

## Background
My solution is designed to be simple, yet illustrate a few of my front-end skills.  I use MaterialUI to provide the core layout capabilities and styling.  This allows me to create a decent-looking site without obsessing over the styling.  Here are a few other areas worth mentioning.

- Strong-typing:  I use typescript to provide type-safe navigation between pages through the routes.ts file
- Forms:  I use react-final-form to provide change detection on the employee edit page.  There are other good form libraries out there, but I've had pretty good luck with this one over the past few years.
- StyledComponents: I use the styled components approach to css mainly because it's the default in the material-ui library.  There are pros and cons to styled components and I don't have a strong opinion vs plain css/scss.
- Responsive Design: I'm a big fan of responsive design.  Libraries like material-ui provide a lot of responsiveness right out of the box, so feel free to resize the browser window!

## Running the project
```
npm install
npm start
```
This will run both the front end react app as well as the back end graphql server

# Future Enhancements
- I'm sure there are libraries out there for generating typescript type definitions from the GraphQL schema, but I did not investigate this.
- Search input should be debounced (especially assuming this search will one day be implemented server-side)
- Form validation - Updating employee records should likely include some validation based on business rules (required fields, masked inputs, etc)
- Error handling - If there's an error updating the employee details, the UI should display a user-friendly message (ideally with an error code for production support)