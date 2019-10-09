// 递归向下,触发事件
function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
        const name = child.$options.componentName;

        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params))
        } else {
            broadcast.apply(child, [componentName, eventName].concat(params))
        }
    })
}

export default {
    methods: {
        // 向上广播
        dispatch (componentName, eventName, params) {
            let parent = this.$parent || this.$root;
            let name = parent.$options.componentName;

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent

                if(parent) {
                    name = parent.$options.componentName
                }
            }

            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params))
            }
        },
        // 向下广播
        broadcast (componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params)
        }
    }
}