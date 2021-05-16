# Front End

- [Domain](#domain)
- [Views](#views)

## Domain

### Overview

It's a readable-only platform that displays information about 6 main entities -- Initiatives, P&D&I<sub>1</sub> , Professors, Disciplines, Companies and Patents. All the data comes from Google SpreadSheet, maintained by AUSPIN.

The page has two main functionalities:

- **Show:** Get the data from the Google SpreadSheet, store, and display it on the page;
- **Filter:** Filter the data using filtering buttons and a [fuzzy search](https://en.wikipedia.org/wiki/Approximate_string_matching) mechanism.

The errors page has the only purpose of displaying the errors generated when the 'show' functionality presented above is called.

_<sub>1: P&D&I is an acronym for "Pesquisa & Desenvolvimento & Inovação".</sub>_

## Views

For each entity, the runtime view below shows the internal behavior:

<img src="/views/frontend.svg" alt="frontend view">

_Entity Class_ is responsible for the filtering buttons logic.

_Entity FindErrors_ is responsible for generating the errors displayed in the errors page.

[:arrow_left: Go back](/)
