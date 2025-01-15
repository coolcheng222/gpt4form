<template>
    <!--eslint-disable-->
    <div class="session-loading" v-if="loading">loading</div>
    <template v-else>
        <div v-for="session in sessionList" class="sesssion-item" :class="{'session-activate':activated(session.session_id)}" @click="$router.push(`/${session.session_id}`)">
            <div class="session-title">Chat</div>
            <div class="session-msg">{{(!!session.msg)?session.msg:`<No msg here>`}}</div>
            <div class="session-time">{{dateString(session.timestamp)}}</div>
        </div>
        <div class="add-session" :class="{adding: addLoading}" @click="addSession">
            {{addLoading?"Adding":"+"}}
        </div>
    </template>

</template>
<script>

export default {
    name: "SessionList",
    data(){
        return {
            sessionList:[],
            loading: false,
            addLoading: false
        }
    },
    beforeMount: async function() {
        this.getSessions()
    },
    methods:{
        async addSession(){
            if(this.addLoading){
                return
            }
            this.addLoading = true;
            try{
                // eslint-disable-next-line no-unused-vars
                let sessionId = await this.$https.post("/chat/start")
                this.getSessions()
                this.$router.push(`/${sessionId}`)
            }catch (e){
                alert(e)
                console.log(e)
            }finally {
                this.addLoading = false
            }

        },
        async getSessions(){
            this.loading = true
            try{
                let sessionList = await this.$https.get("/session/list")
                this.sessionList = [...sessionList]
            }catch(e){
                console.log(e)
            }finally {
                this.loading = false;
            }
        },
        dateString(timestamp){
            return new Date(timestamp).toLocaleString()
        },
        activated(session_id){
            return this.$route.params.id === session_id
        }
    },computed:{

    }
}
</script>



<style scoped>
    .add-session{
        width: 20%;
        border: 1px solid rgb(170, 126, 126);
        height: 25px;
        margin: 0 auto;
        margin-top: 10px;
        border-radius: 5px;
        background-color: #f6f0ff;
        line-height: 25px;
        text-align: center;

    }
    .add-session:hover{
        background-color: #80d0fb;
        user-select: none;
        cursor: pointer;
    }
    .adding{
        background-color: rgba(0, 0, 0, 0.55);
    }
    .sesssion-item{
        border-bottom: 1px solid;
        padding-left: 5px;
    }
    .sesssion-item:hover{
        background-color: #ffbdbd;
        user-select: none;
        cursor: pointer;
    }
    .sesssion-item div{
        text-align: left;
    }
    .session-activate{
        background-color: #adadad;
    }
</style>