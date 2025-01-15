<template>
    <div class="cbox">
        <div class="role" :style="{color: roleColor}">{{roleName}}: </div>
        <div class="msg" v-html="mdMessage"></div>
    </div>
</template>
<script>
import MarkdownIt from "markdown-it";

export default {
    name: "MessageBox",
    props: {
        role:String,
        content:String
    },
    data(){
      return  {
          md: new MarkdownIt(),
          roling: {
              "err": {name:"Error",nameColor:"#dc3636"},
              "assistant": {name:"Assistant",nameColor:"#454ce7"},
              "user": {name:"User",nameColor:"#127548"},
              "system": {name:"System",nameColor:"#123123"}
          }
      }
    },
    computed: {
         roleName(){
            return this.roling[this.role].name
         },
        roleColor(){
             return this.roling[this.role].nameColor

        },
        mdMessage(){
            return this.md.render(this.content);
        }
    }
}
</script>
<style scoped>
    .msg,.role{
        width: 70%;
        text-align: left;
        margin: 0 auto;
    }
    .msg{
        font-size: 15px;
        line-height: 1.5em;
        letter-spacing: 2px;
        margin-top: 3px;
        border-radius: 5px;
        padding: 10px;
        background-color: #fff;
        box-shadow: 3px 1px 3px 0px #ccd0d4;
        overflow: auto;
        word-wrap: break-word;
    }
    .role{
        margin-top: 3px;
        margin-bottom: 3px;
    }
</style>