<template>
<div class="page__posts">

    <div class="posts__post" v-for="(element, index) in array" :key="index" v-on:click="getIndex(index)">
        <div class="posts__img">
            <img :src="element['gsx$imgsrc']['$t']" />
        </div>
        <div class="posts__name">
            {{ element['gsx$наименование']['$t'] }}
        </div>
        <ul class="posts__list">
            <li>Модель: <b>{{ element['gsx$код']['$t'] }}</b></li>
            <li>Цена за 1 ед. c НДС: <b>{{ element['gsx$цена']['$t'] }} BYN</b></li>
            <li>В коробке, шт.: <b>{{ element['gsx$вкоробке']['$t'] }}</b></li>
        </ul>
    </div>

    <div class="more-info" id="close" style="display: none;">
        <div class="block">

            <div class="header">
                <button v-on:click="close">Закрыть [X]</button>
            </div>

            <div class="body">
                <GetMoreInfo v-bind:index="clickedIndex" v-bind:array="array" />
            </div>

        </div>
    </div>

</div>
</template>

<script>
import axios from 'axios'

import GetMoreInfo from '@/components/GetMoreInfo.vue'

export default {
    name: 'HelloWorld',
    props: {
        google_table_id: String,
        google_table_list: String
    },
    data() {
        return {
            array: [{
                gsx$наименование: {
                    $t: null
                },
                gsx$imgsrc: {
                    $t: null
                },
                gsx$код: {
                    $t: null
                },
                gsx$цена: {
                    $t: null
                },
                gsx$вкоробке: {
                    $t: null
                },
                gsx$kg: {
                    $t: null
                },
                gsx$kg1: {
                    $t: null
                },
            }],
            clickedIndex: 0
        };
    },
    methods: {
        getData() {
            axios(`https://spreadsheets.google.com/feeds/list/${this.google_table_id}/${this.google_table_list}/public/values?alt=json`)
                .then(e => {
                    this.array = e.data.feed.entry
                })
        },
        getIndex(index) {
            document.getElementById("close").style = "display: flex;"
            this.clickedIndex = index
        },
        close() {
            document.getElementById("close").style = "display: none;"
        }
    },
    mounted() {
        this.getData();
    },
    components: {
        GetMoreInfo
    }
}
</script>

<style scoped>
.more-info {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    justify-content: center;
    align-items: center;
}

.more-info .block {
    width: calc(100% - 4 * 16px);
    height: calc(100% - 4 * 16px);
    background-color: white;
    margin: 16px;
    padding: 16px;
    border-radius: 8px;
    overflow: auto;
}

.more-info .header {
    display: flex;
    justify-content: flex-end;
}

.posts__post:hover {
    background-color: rgba(209, 209, 209, 1);
}
</style>
