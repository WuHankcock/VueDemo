<template>
    <div class="table">
        
        <datasource language="en" :table-data="getData" :columns="columns" :pagination="information.pagination"
                :actions="actions"
                v-on:change="changePage"
                v-on:searching="onSearch"></datasource>
    </div>
</template>

<script>
    import axios from 'axios';
    import Datasource from 'vue-datasource';
    export default {
        data: function(){
            const self = this;
            return {
                information: {
                    pagination:{},
                    data:[]
                },
                columns: [
                    {
                       name:"name",
                       key:"Name" 
                    },
                    {
                       name:"countrycode",
                       key:"CountryCode" 
                    },
                    {
                       name:"district",
                       key:"District" 
                    },
                    {
                       name:"population",
                       key:"Population" 
                    },
                    {
                       name:"id",
                       key:"ID" 
                    },
                ],
                actions: [
                    {
                        text: 'Click',
                        class: 'btn-primary',
                        event(e, row) {
                            self.$message('选中的行数： ' + row.row.id);
                        }
                    }
                ],
                query:''
            }
        },
        components: {
            Datasource
        },
        methods: {
            changePage(values) {
                this.information.pagination.per_page = values.perpage;
                this.information.data = this.information.data;
            },
            onSearch(searchQuery) {
                this.query = searchQuery;
            }
        },
        computed:{
            getData(){
                const self = this;
                return self.information.data.filter(function (d) {
                    if(d.Name.indexOf(self.query) > -1){
                        return d;
                    }
                })
            }
        },
        beforeMount(){
            axios.post('http://localhost:8081',{
                row:{
                    'Name':'Kabul',
                    'CountryCode':'AFG',
                    'District':'Kabol',
                    'ID':1,
                    'Population':'1780000'
                }
            }).then( (res) => {
                this.information = res.data;
            })
        }
    }
</script>
<style>
.vue-datasource *{
    box-sizing: border-box;
    font-size: 14px;
}
.vue-datasource .panel {
    margin-bottom: 22px;
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
.vue-datasource .panel-default {
    border-color: #d3e0e9;
}
.vue-datasource .panel-heading {
    padding: 10px 15px;
    border-bottom: 1px solid transparent;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
}
.vue-datasource .panel-default > .panel-heading {
    height:56px;
    color: #333333;
    background-color: #fff;
    border-color: #d3e0e9;
}
.vue-datasource .pull-left {
    float: left !important;
}
.vue-datasource .pull-right {
    float: right !important;
}
.vue-datasource .form-group {
    margin-bottom: 15px;
}
.vue-datasource label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: bold;
}
.vue-datasource .form-control {
    display: block;
    width: 100%;
    height: 36px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.6;
    color: #555555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccd0d2;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    -webkit-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
.vue-datasource .btn {
    display: inline-block;
    margin-bottom: 0;
    font-weight: normal;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.6;
    border-radius: 4px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.vue-datasource .btn-primary {
    color: #fff;
    background-color: #3097D1;
    border-color: #2a88bd;
}
.vue-datasource .table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 22px;
    border-collapse: collapse;
    border-spacing: 0;
}
.vue-datasource .table > thead > tr > th {
    vertical-align: bottom;
    border-bottom: 2px solid #ddd;
}
.vue-datasource .table th ,.vue-datasource .table td {
    padding: 8px;
    line-height: 1.6;
    vertical-align: top;
    border-top: 1px solid #ddd;
}
.vue-datasource .table-striped > tbody > tr:nth-of-type(odd) {
    background-color: #f9f9f9;
}
.vue-datasource .success th ,.vue-datasource .success td{
    background-color: #dff0d8;
}
.vue-datasource .pagination {
    display: inline-block;
    padding-left: 0;
    margin: 22px 0;
    border-radius: 4px;
}
.vue-datasource .pagination > li {
    display: inline;
}
.pagination > li > a,.pagination > li > span {
    position: relative;
    float: left;
    padding: 6px 12px;
    line-height: 1.6;
    text-decoration: none;
    color: #3097D1;
    background-color: #fff;
    border: 1px solid #ddd;
    margin-left: -1px;
}
.pagination > .disabled > span, .pagination > .disabled > span:hover, .pagination > .disabled > span:focus, .pagination > .disabled > a, .pagination > .disabled > a:hover, .pagination > .disabled > a:focus {
    color: #777777;
    background-color: #fff;
    border-color: #ddd;
    cursor: not-allowed;
}
.pagination > .active > a, .pagination > .active > a:hover, .pagination > .active > a:focus, .pagination > .active > span, .pagination > .active > span:hover, .pagination > .active > span:focus {
    z-index: 3;
    color: #fff;
    background-color: #3097D1;
    border-color: #3097D1;
    cursor: default;
}
.vue-datasource .pagination > li:first-child > a, .vue-datasource .pagination > li:first-child > span {
    margin-left: 0;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
}
.vue-datasource .text-center {
    text-align: center;
}




@media (min-width: 768px){
    .form-inline .form-group {
        display: inline-block;
        margin-bottom: 0;
        vertical-align: middle;
    }
    .form-inline .control-label {
        margin-bottom: 0;
        vertical-align: middle;
    }
    .form-inline .form-control {
        display: inline-block;
        width: auto;
        vertical-align: middle;
    }
}

</style>