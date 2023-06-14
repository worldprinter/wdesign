import { createStyles } from '@worldprinter/wdesign-styles'

export default createStyles(
    (
        theme,
        params: {
            labelPosition: 'left' | 'top'
        },
    ) => ({
        root: {
            ...theme.fn.fontStyles(),
            lineHeight: theme.lineHeight,

            ...(params.labelPosition === 'left'
                ? {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                  }
                : {}),
        },
        inputWrapper: {
            position: 'relative',
            flex: 1,
        },
        labelWrapper: {
            marginRight: theme.spacing.md,
        },
    }),
)
