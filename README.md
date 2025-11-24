# https://genron.github.io/gamewall.github.io/

## github actions
    ./github/workflows/actions.yml

You'll also have to add the homepage to your package.json, otherwise gh-actions cannot get the static content:

    package.json: "homepage": "https://genron.github.io/gamewall.github.io"