<script>
export default {
    name: 'CCol',

    inject: ['row'],

    props: {
        tag: {
           type: String,
           default: 'div'
       },
       span: {
           type: Number,
           default: 24
       },
       offset: Number,
       pull: Number,
       push: Number
    },
    computed: {
        gutter () {
            const rowParent = this.row
            return rowParent ? rowParent.gutter : 0
        },
        style () {
            const style = {}

            if (this.gutter) {
                style.paddingRight = this.gutter / 2 + 'px'
                style.paddingLeft = style.paddingRight
            }

            return style
        }
    },
    render (h) {
        const classList = []

        const types = ['span', 'offset', 'pull', 'push']
        types.forEach(prop => {
            if (this[prop]) {
                classList.push(prop !== 'span' ? `c-col-${prop}-${this[prop]}` : `c-col-${this[prop]}`)
            }
        })

        classList.push(`c-col-${this.span}`)

        return h(this.tag, {
            class: ['c-col', classList],
            style: this.style
        },
        this.$slots.default)
    }
}
</script>

<style>

</style>