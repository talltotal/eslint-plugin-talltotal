
const rule = require('../lib/import-specifier-newline')
let RuleTester
try {
    RuleTester = require('eslint/lib/rule-tester').RuleTester
} catch (e) {
    RuleTester = require('eslint/lib/testers/rule-tester.js')
}
const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6, sourceType: 'module' } })

ruleTester.run('import-specifier-newline', rule, {
    valid: [
        // default
        'import {} from "modules";',
        'import {\na,\nb\n,c\n} from "modules";',
        'import {\na\n, b\n, c\n} from "modules";',
        'import {a,\nb\n,c} from "modules";',
        'import {a\n, b\n, c} from "modules";',
        'import { a } from "modules";',
        'import {\na\n} from "modules";',
        'import { a as b } from "modules";',
        'import {\na as b\n} from "modules";',

        // allowAllSpecifiersOnSameLine: true
        { code: 'import { a, b, c } from "modules";', options: [{ allowAllSpecifiersOnSameLine: true }] },
        { code: 'import {\na, b, c\n} from "modules";', options: [{ allowAllSpecifiersOnSameLine: true }] },
        { code: 'import { a } from "modules";', options: [{ allowAllSpecifiersOnSameLine: true }] },
        { code: 'import {\na\n} from "modules";', options: [{ allowAllSpecifiersOnSameLine: true }] },
        { code: 'import {} from "modules";', options: [{ allowAllSpecifiersOnSameLine: true }] },
        { code: 'import {} from "modules";', options: [{ allowAllSpecifiersOnSameLine: true }] },
    ],
    invalid: [
        // default
        {
            code: 'import { a, b, c } from "modules";',
            output: 'import { a,\nb,\nc } from "modules";',
            errors: [
                {
                    messageId: 'specifiersOnNewline',
                    type: 'ImportDeclaration',
                    line: 1,
                    column: 13,
                    endLine: 1,
                    endColumn: 14,
                },
                {
                    messageId: 'specifiersOnNewline',
                    type: 'ImportDeclaration',
                    line: 1,
                    column: 16,
                    endLine: 1,
                    endColumn: 17,
                },
            ],
        },
        {
            code: 'import {\na, b, c\n} from "modules";',
            output: 'import {\na,\nb,\nc\n} from "modules";',
            errors: [
                {
                    messageId: 'specifiersOnNewline',
                    type: 'ImportDeclaration',
                    line: 2,
                    column: 4,
                    endLine: 2,
                    endColumn: 5,
                },
                {
                    messageId: 'specifiersOnNewline',
                    type: 'ImportDeclaration',
                    line: 2,
                    column: 7,
                    endLine: 2,
                    endColumn: 8,
                },
            ],
        },
        // allowAllSpecifiersOnSameLine: true
        {
            code: 'import {\na,\nb, c,\nd\n} from "modules";',
            output: 'import {\na,\nb,\nc,\nd\n} from "modules";',
            options: [{ allowAllSpecifiersOnSameLine: true }],
            errors: [
                {
                    messageId: 'specifiersOnNewlineAll',
                    type: 'ImportDeclaration',
                    line: 3,
                    column: 4,
                    endLine: 3,
                    endColumn: 5,
                },
            ],
        },
    ],
})
