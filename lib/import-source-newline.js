'use strict'

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'enforce placing import source on separate lines',
            category: 'Stylistic Issues',
            recommended: false,
        },
        fixable: 'whitespace',
        schema: [{
            type: 'object',
            properties: {
                allowDifferentLine: {
                    type: 'boolean',
                    default: false,
                },
            },
            additionalProperties: false,
        }],
        messages: {
            sourceOnNewline: 'Import source can\'t go on a new line.',
        },
    },

    create (context) {
        const allowDifferentLine = context.options[0] && !!context.options[0].allowDifferentLine

        const sourceCode = context.getSourceCode()

        return {
            /**
             * @param {ASTNode} node
             * @returns {void}
             */
            ImportDeclaration (node) {
                const { source } = node
                const fromIdentifier = sourceCode.getTokenBefore(source)
                const comments = sourceCode.getCommentsBefore(source)
                if (!allowDifferentLine && !comments.length && fromIdentifier.loc.end.line !== source.loc.start.line) {
                    // 不允许同行，且中间没有注释，且不同行，则需要调整
                    context.report({
                        node,
                        loc: source.loc,
                        messageId: 'sourceOnNewline',
                        fix(fixer) {
                            const rangeAfterComma = [fromIdentifier.range[1], source.range[0]]

                            return fixer.replaceTextRange(rangeAfterComma, ' ')
                        },
                    })
                }
            },
        }
    },
}
