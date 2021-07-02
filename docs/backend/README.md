# Back End

[[TOC]]

## Domain

### Overview

It's a database that we use to validate and fetch data from 6 entities (Initiatives, P&D&I<sub>1</sub> , Professors, Disciplines, Companies and Patents). All the data comes from Google SpreadSheet, maintained by AUSPIN.

_<sub>1: P&D&I is an acronym for "Pesquisa & Desenvolvimento & Inovação".</sub>_

## View

The runtime view below shows the internal behavior:

<img src="/views/backend.svg" alt="backend view">

_Fetch Entities_ is responsible for fetching data from disciplines and companies.

_Entities_ is the model composed by disciplines and companies model.

[:arrow_left: Go back](/)
