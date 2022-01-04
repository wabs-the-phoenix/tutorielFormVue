let formuser = {
    props : {
       users : Array,
       message : String,
       header : String
    },
    data() {
        return {
                userlocal: {
                    firstName : "",
                    name : "",
                    number : "",
                    email : ""
                },
                messagelocal : this.message,
                headerlocal : this.header,
                typelocal : 'success'
        }
    },
    template : `
        <div class="ui form">
            <div class="field">
                <label>Prénom</label>
                <input type="text" v-model="userlocal.firstName">
            </div>
            <div class="field">
                <label>Nom</label>
                <input type="text" v-model="userlocal.name">
            </div>
            <div class="field">
                <label>Numero</label>
                <input type="text" v-model="userlocal.number">
            </div>
            <div class="field">
                <label>e-mail</label>
                <input type="email" v-model="userlocal.email">
            </div>
            <button class="ui primary button" @click="save">Enregistrer</button>
        </div>
    `,
    methods : {
        save() {
            if(this.userlocal.firstName == "" || this.userlocal.name== "") {
                this.messagelocal = "Le champ  de nom doivent être remplis";
                this.headerlocal = "Champ requis vide"
                this.typelocal = "error";
                this.$emit("showalert", { message : this.messagelocal, header : this.headerlocal, type : this.typelocal})
            }
            return;
            this.users.push(this.userlocal)
        }
    }
}
let message = {
    props : {
        type : {type : String, default : 'success'},
        content : {type : String},
        header : String,
        message : String
    },
    template : `
    <div class="ui message" :class="type">
        <div class="header">{{header}}</div>
        <p>{{message}}</p>
    </div>`
}
let userlist = {
    props : ['users'],
    template : `
    <table class="ui table">
        <thead>
            <th>Utilisateurs</th>
            <th>Numero</th>
            <th>e-mail</th>
            <th></th>
        </thead>
        <tbody>
            <tr v-for="user in users">
                <td>{{ user.firstName + ' ' + user.name}}</td>
                <td>{{user.number}}</td>
                <td>{{user.mail}}</td>
                <td class="collapsing">
                    <button class="ui small red icon button"><i class="close icon"></i></button>
                </td>
            </tr>
        </tbody>
        
    </table>
    `
}
let vm = new Vue({
    el : '#app',
    components : {formuser, message, userlist},
    data: {
        header :"",
        message : "",
        alert : false,
        users : [
        ],
        messageType : "success"
    },
    methods : {
        addUser() {
        },
        showWarning(value) {
            let {message, header, type} = {... value};
            
            this.header = header,
            this.message = message;
            this.messageType = "error";
            this.alert = true;
        }
    },
    computed : {
       type() {
        return this.messageType;
       }
    }
})