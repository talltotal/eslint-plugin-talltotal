'use strict'

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'enforce placing import specifiers on separate lines',
            category: 'Stylistic Issues',
            recommended: false,
        },
        fixable: 'whitespace',
        schema: [{
            type: 'object',
            properties: {
                allowAllSpecifiersOnSameLine: {
                    type: 'boolean',
                    default: false,
                },
            },
            additionalProperties: false,
        }],
        messages: {
            specifiersOnNewlineAll: 'Import specifiers must go on a new line if they aren\'t all on the same line.',
            specifiersOnNewline: 'Import specifiers must go on a new line.',
        },
    },

    create (context) {
        const allowSameLine = context.options[0] && !!context.options[0].allowAllSpecifiersOnSameLine
        const messageId = allowSameLine
            ? 'specifiersOnNewlineAll'
            : 'specifiersOnNewline'

        const sourceCode = context.getSourceCode()

        return {
            /**
             * @param {ASTNode} node
             * @returns {void}
             */
            ImportDeclaration (node) {
                const {specifiers} = node

                if (!specifiers.some(specifier => specifier.type === 'ImportSpecifier')) {
                    return
                }

                if (allowSameLine) {
                    if (specifiers.length > 1) {
                        const firstTokenOfFirstSpecifier = sourceCode.getFirstToken(specifiers[0])
                        const lastTokenOfLastSpecifier = sourceCode.getLastToken(specifiers[specifiers.length - 1])

                        if (firstTokenOfFirstSpecifier.loc.end.line === lastTokenOfLastSpecifier.loc.start.line) {

                            // All specifiers are on the same line
                            return
                        }
                    }
                }

                for (let i = 1; i < specifiers.length; i++) {
                    const lastTokenOfPreviousSpecifier = sourceCode.getLastToken(specifiers[i - 1])
                    const firstTokenOfCurrentSpecifier = sourceCode.getFirstToken(specifiers[i])

                    if (lastTokenOfPreviousSpecifier.loc.end.line === firstTokenOfCurrentSpecifier.loc.start.line) {
                        context.report({
                            node,
                            loc: firstTokenOfCurrentSpecifier.loc,
                            messageId,
                            fix(fixer) {
                                const comma = sourceCode.getTokenBefore(firstTokenOfCurrentSpecifier)
                                const rangeAfterComma = [comma.range[1], firstTokenOfCurrentSpecifier.range[0]]

                                // Don't perform a fix if there are any comments between the comma and the next specifier.
                                if (sourceCode.text.slice(rangeAfterComma[0], rangeAfterComma[1]).trim()) {
                                    return null
                                }

                                return fixer.replaceTextRange(rangeAfterComma, '\n')
                            },
                        })
                    }
                }
            },
        }
    },
}
