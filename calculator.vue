<template>
    <div id="calc">
        <table>
        <tr>
            <td colspan="4"><p>{{ this.queue ? this.queue : 0 }}</p></td>
        </tr>
        <tr>
            <td colspan="3"><button v-on:click="clear()">C</button></td>
            <td><button v-on:click="input('+')">+</button></td>
        </tr>
        <tr>
            <td><button v-on:click="input(7)">7</button></td>
            <td><button v-on:click="input(8)">8</button></td>
            <td><button v-on:click="input(9)">9</button></td>
            <td><button v-on:click="input('-')">-</button></td>
        </tr>
        <tr>
            <td><button v-on:click="input(4)">4</button></td>
            <td><button v-on:click="input(5)">5</button></td>
            <td><button v-on:click="input(6)">6</button></td>
            <td><button v-on:click="input('*')">x</button></td>
        </tr>
        <tr>
            <td><button v-on:click="input(1)">1</button></td>
            <td><button v-on:click="input(2)">2</button></td>
            <td><button v-on:click="input(3)">3</button></td>
            <td><button v-on:click="input('/')">÷</button></td>
        </tr>
        <tr>
            <td colspan="2"><button v-on:click="input(0)">0</button></td>
            <td><button v-on:click="input('.')">.</button></td>
            <td><button v-on:click="calculate()">=</button></td>
        </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'calculator',
        data: function () {
            return {
                queue: ''
            }
        },
        methods: {
            clear: function () {
                this.queue = ''
            },
            input: function (btn) {
                this.queue += btn
            },
            calculate: function () {
                /* eslint-disable */
                this.queue = eval(this.queue)
                /* eslind-enable */
            }
        }
    }
</script>

<style>
    #calc {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    margin-left: 60px;
    }

    table, td {
        border: 1px solid black;
    }

    button {
        width: 34px;
        margin: 2px 10px;

        border: none;
        background: transparent;

        font-size: 1.4em;
        line-height: 1.4em;
    }
    button:hover {
        cursor: pointer;
    }

    p {
        margin: 0 10px 0;

        font-size: 1.4em;
        line-height: 1.4em;
        text-align: right;
    }
</style>