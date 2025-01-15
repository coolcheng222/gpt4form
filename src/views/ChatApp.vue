<template>
    <div class="chatbox">
        <div class="session-list">
            <session-list></session-list>
        </div>
        <div class="chating">
            <div class="testbox">
                <template  v-for="chat in chatlist">
                    <!--eslint-disable-next-line-->
                    <message-box :role="chat.role" :content="chat.content"></message-box>
                </template>

            </div>
            <div class="inputing">
                <textarea class="search-input" v-model="val"  @keydown="handleEnter"/>
            </div>
        </div>

    </div>
</template>
<script>
    import MessageBox from "@/views/component/MessageBox.vue";
    import SessionList from "@/views/component/SessionList.vue";

    export default {
        components: {SessionList, MessageBox},
        data(){
            return {
                chatlist:[],
                val:""
            }
        },
        mounted: async function() {
            await this.getChatList()
        },
        beforeRouteUpdate: async function(to,from){
            if(to.params.id === from.params.id){
                return
            }
            let b = await this.getChatList()
            if(b && this.chatlist.length === 0){
                await this.sendQuest("You are a helper",true)
            }
        },
        methods:{
            async getChatList(){
                try{
                    this.chatlist = [...await this.$https.post("/chat/list",{"session_id":this.$route.params.id})]
                    return true
                }catch(e){
                    console.log(e)
                    return false
                }
            },
            handleEnter(event) {
                // 获取按下的键码
                const keyCode = event.keyCode || event.which;

                // 检查是否按下了回车键（Enter）且没有按下Shift键
                if (keyCode === 13 && !event.shiftKey) {
                    event.preventDefault();
                    this.sendQuest(this.val)
                }
            },
            async sendQuest(message,system){
                let data = {
                    "text": message,
                    "session_id": this.$route.params.id,
                    "system": !!system
                }
                this.chatlist.push({"role":"user","content":message})
                try{
                    this.val = ""
                  let ans = await this.$https.post("/chat",data)
                    this.chatlist.push(ans)

                }catch(e){
                    this.chatlist.push({"role":"err","content":e})
                }
            }
        }
    }
</script>
<style scoped>
    .chatbox{
        height: 100vh;
        overflow: auto;
        width: 100%;
        background-color: #f7f7f7;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
    }
    .chating{
        width: 60%;
        height: 100%;
        overflow: auto;
    }
    .session-list{
        width: 20%;
        border-right: 1px solid darkred;
    }
    .inputing{
        min-height: 10%;
        position: fixed;
        width: 100%;
    }
    .testbox{
        height: 90%;
        overflow: auto;
        padding-bottom: 10px;
        //border: 1px solid;
    }
    .search-input{
        width: 70%;
        border: none;
        font-size: 15px;
        padding: 10px;
        line-height: 1.5em;
        border-radius: 0.75em;
        box-shadow: 1px 1px 1px 1px rgba(234,234,234,0.5);
        min-height: 1.5em;
        margin-left: 10px;
        resize: vertical;
        overflow: auto;
        word-wrap: break-word;
    }
</style>