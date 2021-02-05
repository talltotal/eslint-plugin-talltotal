
const rule = require('../lib/rules/import-source-newline')
let RuleTester
try {
    RuleTester = require('eslint/lib/rule-tester').RuleTester
} catch (e) {
    RuleTester = require('eslint/lib/testers/rule-tester.js')
}
const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6, sourceType: 'module' } })

ruleTester.run('import-source-newline', rule, {
    valid: [
        // default
        [
            'import {',
            '} from',
            '// comment',
            '\'fs\';',
        ].join('\n'),

        [
            'import {',
            '} from \'fs\';',
        ].join('\n'),
    ],
    invalid: [
        // default
        {
            code: [
                'import { } from',
                '\'fs\';',
            ].join('\n'),
            output: 'import { } from \'fs\';',
            errors: [
                { line: 2, column: 1, messageId: 'sourceOnNewline' },
            ],
        },
    ],
})
