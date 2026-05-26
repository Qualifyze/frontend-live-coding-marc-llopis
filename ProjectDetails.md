# Qualifyze Film Search — Project Details

This is my solution to the Qualifyze Frontend Live Coding Challenge. The idea was to build a working film search page using the OMDb API, keeping the same stack the team uses: React, TypeScript, and Vitest.


## Getting started

```bash
npm install
cp .env.example .env   # then add the provided OMDb API key on the main README
npm run dev
```

To run the tests:
```bash
npm run test
```


## How it works

1. The user types a film title in the search input.
2. The query is debounced (400ms) this prevents an excessive amount of API calls on every letter the user types.
3. Once the query hits 2+ characters (api limitation), a request goes to the OMDb API ( using the `s` parameter and filtered only to movies).
4. Results show up as cards with poster, title, and year as a list.
5. Clicking **View details** opens a modal with the full film info, fetched separately using the `imdbID` we already have and the `i` parameter.


## Project structure

Even this is a small project, I tried to replicate or simulate a real working environment project structure. On the `/src` level, there are several folders:
 - components: A folder that contains all components used in this project. Each component has his own folder that contains related styles and tests if needed.
 - hooks: All logic related to customHooks created is isolated in those files. This makes easier to separate the async logic from the UI.
 - services: This folders contains the file needed to handle the `omdb` api calls.
 - types: Here is the file that handles all TS types that are reused in the project. Types that are unique to a component are inside the same component.
 - styles: Folder that contains everything related to style files, in this case:
   - variables: To reuse certain values over the project.
   - mixins: Sass utilities that reuse sharable code.
   - global: Main css file that sets the base start
 - mocks: File created to not overload the api service while developing. It contains a real response of certain api calls.
 - constants: Values used on the project isolated for better accessibility.

 ** ***As an extra note***: I am personally a big fan of [Atomic Design](https://atomicdesign.bradfrost.com/) when it comes to project architecture. I would've opted to implement it here but for time constraints and also because the project is not that big it was not implemented. If not, the `/components` folder would contain the standard `/atoms`, `/molecules`, `/organisms`...


## Decisions I made on the project

I took some personal decisions during the project that made sense to me while developing. Just to give them visibility I comment them here:

**Debounce on api call**
There's a debounce applied on the search input (400ms) that prevents excessive API calls on every letter the user types. The search only happens once the user stops typing for a moment. I also realized that the api only return values if you typed more than 1 character, so I am also controlling this to never call it with less than 2 characters

**SCSS use**
As I've seen in the project commit history, the recommendation of using `Tailwind` was removed, so I decided not to use it here.
In order to do that, I removed all dependencies and installed and used `sass` in the project so no "external" css library was used

**Modal rendered via `createPortal`**
The modal that shows the movie details is rendered directly into `document.body` using React's `createPortal` instead of being placed in the component tree. By mounting it at the top of the DOM, it always renders on top of everything else regardless of where it's used and gives no conflicts with `z-index` values.

**Poster images error handler**
I saw that the API handled some movies with no poster image ur with the `'N/A'` response value. I also saw that there were some that had a url but it wasn't valid so it was returning an error anyway. For those cases I took the decision to always show an image and if it was not the "original" one, I'll show a fallback.


## Tests

Due to time limitation I couldn't test the whole project so I focused on testing the critical functionalities meaning:
 - Api responses (success, fail, not found...)
 - The debounce functionality
 - The display of the api response in the FilmSearch and in the Modal components.

Due to time limitations, no E2E tests were written. Ideally these would cover the full user flow — typing a search, seeing results, opening the modal — using a tool like **Playwright** or **Cypress**. 


## Style decisions

The goal here was to simulate a lightweight design system without pulling in a full UI library like MUI. 
I also tried to imitate the look and feel of the [Qualifyze](https://www.qualifyze.com/) page and make it responsive.

Everything visual like brand colors, spacing scale, border radius, shadows, transitions — is defined as tokens in `_variables.scss`. 
Reusable elements like breakpoints, text truncation, and focus styles are in `_mixins.scss`. This way, the whole app shares a consistent visual language and any value can be updated in one place.
This way of working tries to imitate how to work with a design system library.

For the tooling, two packages were added:

- **`sass`** — to compile SCSS and use variables, mixins, and `@use` imports across files.
- **`clsx`** — a tiny utility to compose conditional class names cleanly (e.g. applying an error style only when the input state is `'error'`).

Styles are scoped per component using CSS Modules (built into Vite, no extra install needed), so there's no risk of class name collisions across the app.


## Accessibility 

Few things I considered:

- **Semantic HTML** — the structure uses `<header>`, `<main>`, `<article>` for film cards, `<section>` for the results list, and `<dl>`/`<dt>`/`<dd>` for the film detail rows. This gives screen readers meaningful context without extra effort.
- **ARIA attributes** — the modal uses `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` pointing to its title. Error messages use `role="alert"` so they're announced immediately. The loading spinner has `role="status"` and an `aria-label`.
- **Icon-only buttons** — the modal close button has no visible text, so it gets an `aria-label="Close modal"`. SVG icons that are purely decorative use `aria-hidden="true"` to be skipped by screen readers.
- **Escape key** — pressing Escape closes the modal via an `onKeyDown` handler on the overlay.


## Future improvements

A few things that were left out due to time constraints but would be worth adding:

- **Pagination** — the OMDb API supports page-based results but we only fetch the first 10. A "Load more" button would be a natural next step.
- **Search history** — keeping recent searches in `localStorage` would improve the UX for returning users.
- **Keyboard navigation** — selecting results from the list with arrow keys would be a nice touch to improve accessibility. 
- **Improve API results** - I realized that some searches are not 100% accurate when not typing the whole word. I.e. `Batman` returns several movies but `Batm` returns nothing. This will require backend work.
- **i18n** — all text strings are currently hardcoded in the components. As a next step I would extract them into separate translation files and connect them to a library like `react-i18next`. This would make the app easy to translate into multiple languages without touching the components.
