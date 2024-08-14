# Ellucian Experience Student GPA Extension

This repository contains an Ellucian Experience card extension that displays a chart with student GPA and credit information.

## Overview

The Ellucian Experience Student GPA Extension provides an interactive card within the Ellucian Experience platform. This card presents students with a visual representation of their GPA and credit accumulation over time, helping them track their academic progress effectively.
Data is pulled from Ethos API GraphQL endpoint.

## Features

- **GPA Chart**: Displays a graphical representation of the student's GPA over time.
- **Credit Information**: Shows the number of credits earned.
- **Near Real-time Data**: Updates dynamically to reflect the most current academic records.

## Prerequisites

Ellucian Experience API user should have access to the following resources:
* *academic-periods*
* *students*
* *persons*
* *student-grade-point-averages* 

## Quick Start

1. Clone the repository:

    ```bash
    git clone https://github.com/thamzayev/ellucian-experience-student-gpa.git
    cd ellucian-experience-student-gpa
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    For Unix-based systems:

    ```bash
    cp sample.env .env
    ```

    For Windows-based systems:

    ```bash
    copy sample.env .env
    ```

    Replace the values in `.env` with your Ellucian Experience setup details.

4. Deploy the extension:

    ```bash
    npm run deploy-dev
    ```

## Development

To start the development server with live reloading:

```bash
npm start
