<template>
  <div class="thread">
        <div class="progressBarContainer">
            <div class="progressBar" :style="{ width: width }"/>
            <div class="percentage">
                {{ thread.file ? Math.trunc(thread.file.percentageServed * 100) + '%' : '0%' }}
            </div>
        </div>
        <div class="client" v-if="thread.client">
            <div class="name">{{thread.client ? thread.client.name : ''}}</div>
            <div class="timeWaiting">{{thread.client ? thread.client.timeWaiting : 0}}s</div>
            <div class="fileSize">{{thread.file ? Math.trunc(thread.file.fileSize) : 0.0}}MB</div>
        </div>
  </div>
</template>

<script>

export default {
  name: 'Thread',
  props: {
      thread: Object
  },
  computed: {
      width() {
          return this.thread.file ? Math.trunc(this.thread.file.percentageServed * 150) + 'px' : '1px';
      }
  }
}
</script>

<style scoped>
    .thread {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .progressBarContainer {
        position: relative;
        border-width: 3px;
        border-color: #561baf;
        border-radius: 4px;
        border-style: solid;
        width: 150px;
        height: 30px;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .progressBar {
        position: absolute;
        left: 0;
        height: 100%;
        background-color: #e4e5ff;
        z-index: -1;
    }

    .percentage {
        z-index: 2;
        color: #561baf;
        font-weight: bold;
        font-size: 14px;
    }

    .client {
        display: flex;
        background-color: #5e4387;
        border-radius: 10px;
        margin-top: 5px;
        padding: 10px;

        font-size: 12px;
        justify-content: space-between;
    }

    /* .client div {
        padding
    } */

    .name {
        color: #a1fffe;
        margin-right: 5px;
    }

    .timeWaiting {
        color: #fffea1;
        margin-right: 5px;
    }

    .fileSize {
        color: #ffa1a1;
    }
</style>
