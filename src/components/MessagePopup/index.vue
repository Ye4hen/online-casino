<template>
    <Teleport to="body">
        <div
            class="message-card"
            :class="status ? 'bg-green' : 'bg-red'"
            :style="[{ opacity: show ? 1 : 0 }, { top: show ? '25%' : '0%' }]"
        >
            {{ text }}
        </div>
    </Teleport>
</template>

<script>
export default {
    name: 'MessagePopup',
    props: {
        status: {
            type: Boolean,
            default: false,
        },
        show: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            default: 'Message',
        },
    },
}
</script>

<style lang="scss" scoped>
.message-card {
    position: fixed;
    left: 50%;
    top: 20%;
    transform: translateX(-50%);
    padding: 1rem;
    border-radius: 0.75rem;
    max-width: 35%;
    text-align: center;
    z-index: 9999;
    color: #e5e5e5;
    transition: all 0.8s;
}

.bg-green {
    background-color: #39a463;
}

.bg-red {
    background-color: red;
}
</style>