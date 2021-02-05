'use strict'

module.exports = {
    rules: {
        'import-specifier-newline': require('./rules/import-specifier-newline'),
        'import-source-newline': require('./rules/import-source-newline'),
    },

    configs: {
        'recommended': require('./configs/recommended'),
    },
}
