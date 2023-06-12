export function makeStyleTag() {
    const tag = document.createElement('style')
    tag.type = 'text/css'
    tag.setAttribute('wdesign-scroll-lock', '')

    return tag
}
