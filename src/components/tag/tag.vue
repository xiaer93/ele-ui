<script>
export default {
  name: 'CTag',
  props: {
    text: String,
    closable: Boolean,
    type: String,
    hit: Boolean,
    disableTransitions: Boolean,
    color: String,
    size: String,
    effect: {
      type: String,
      default: 'light',
      validator (val) {
        return ['dark', 'light', 'plain'].includes(val)
      }
    }
  },
  methods: {
    handleClose (event) {
      event.stopPropagation()
      this.$emit('close', event)
    },
    handleClick (event) {
      this.$emit('click', event)
    }
  },
  computed: {
    tagSize () {
      return this.size
    }
  },
  render (h) {
    const {type, tagSize, hit, effect} = this
    const classes = [
      'c-tag',
      type ? `c-tag--${type}` : '',
      effect ? `c-tag--${effect}` : '',
      hit && 'is-hit'
    ]

    const tagEl = (
      <span
        class={ classes }
        style={{backgroundColor: this.color}}
        on-click={ this.handleClick }
      >
        { this.$slots.default }
        {
          this.closable && <i class="c-tag__close c-icon-close" on-click={this.handleClose}></i>
        }
      </span>
    )    

    return this.disableTransitions ? tagEl : <transition name="c-zoom-in-center">{ tagEl }</transition>
  }
}
</script>