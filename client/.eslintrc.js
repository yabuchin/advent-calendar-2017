module.exports = {
    "extends": "airbnb",
    "globals": {
        "window": true,
        "document": true
    },
    "rules": {
        "jsx-a11y/anchor-is-valid": [ "error", {
            "components": [ "Link" ],
            "specialLink": [ "hrefLeft", "hrefRight" ],
            "aspects": [ "noHref", "invalidHref", "preferButton" ]
          }]
    }
};