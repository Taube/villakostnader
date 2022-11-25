# Axios

## Cancellation

Axios used to have cancellation tokens.
This has recently been replaced with the following controller and comes from vanilla javascript.

const controller = new AbortController();

## Data

The response data from axios will always be response.data
