<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>基础表格</el-breadcrumb-item>
            </el-breadcrumb>
            <div data-v-1d79c98a="" class="form-group pull-right">
                <el-input v-model="tbsearch" type="text" placeholder="Type to search.." class="form-control tbsearch"/> 
                <el-button type="primary" @click="onSearch(true)" class='tbsearchBTN'>查询</el-button>
            </div>
            <el-button type="primary" class='addNewTB' @click='addNewTbdialogVisible = true;action="add"'>添加</el-button>
        </div>

        <el-dialog title="添加" v-model="addNewTbdialogVisible" size="tiny" show-close="false" close-on-click-modal="false">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="名称:">
                    <el-input v-model="formLabelAlign.Name"></el-input>
                </el-form-item>
                <el-form-item label="地址编码:">
                    <el-input v-model="formLabelAlign.CountryCode"></el-input>
                </el-form-item>
                <el-form-item label="地区:">
                    <el-input v-model="formLabelAlign.District"></el-input>
                </el-form-item>
                <el-form-item label="人口:">
                    <el-input v-model="formLabelAlign.Population"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addNewTbdialogVisible = false;clearForm()">取 消</el-button>
                <el-button type="primary" @click="addNewTbdialogVisible = false;handleClick();clearForm()">确 定</el-button>
            </span>
        </el-dialog>

        <el-table :data="tableData" border style="width: 100%" height="500">
            <el-table-column prop="ID" label="ID" sortable width="150">
            </el-table-column>
            <el-table-column prop="Name" label="名称" width="180">
            </el-table-column>
            <el-table-column prop="CountryCode" label="地址编码" width="120">
            </el-table-column>
            <el-table-column prop="District" label="地区" width="180">
            </el-table-column>
            <el-table-column prop="Population" label="人口" >
            </el-table-column>
            <!--el-table-column prop="tag" label="标签" width="120"
                    :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
                    :filter-method="filterTag">
                <template scope="scope">
                    <el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" close-transition>{{scope.row.tag}}
                    </el-tag>
                </template>
            </el-table-column-->
            <el-table-column label="操作" >
                <template scope="scope">
                    <el-button size="small"
                            @click="action='update';handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :total= 'total'
                    :page-size='15'
                    :current-page='currentPage'>
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                tableData: [],
                formLabelAlign:{
                    'ID':'',
                    'Name':'',
                    'CountryCode':'',
                    'District':'',
                    'Population':''
                },
                addNewTbdialogVisible : false,
                labelPosition:'right',
                action:'',
                oldRow : '',
                rowIndex :'',
                showClose:false,
                closeOnClickModal:false,
                total:0,
                currentPage:1
            }
        },
        methods: {
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
                console.log(row);
                this.addNewTbdialogVisible = true;
                this.formLabelAlign = JSON.parse(JSON.stringify(row));
                this.oldRow = row;
                this.rowIndex = index;
            },
            handleDelete(index, row) {
                axios.get('http://localhost:8081/delete',{
                    params:row
                }).then(result =>{
                    this.$message.error('删除第'+(index+1)+'行');
                }).then(res=>{
                    this.onSearch(false);
                }).catch(err =>{
                    this.$message.error('删除第'+(index+1)+'行失败',err);
                })
                
            },
            addTotb(formLabelAlign){
                axios.get('http://localhost:8081/add',{
                    params:formLabelAlign
                }).then(res =>{
                    console.log(res);
                    if(res.data === 'add!'){
                        this.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                    }else{
                        this.$message.error('添加失败！');
                    }
                }).catch(err=>{
                    this.$message.error('添加失败！');
                });
            },
            handleClick(){
                console.log(this.action);
                switch(this.action){
                    case 'add':
                       this.addTotb(this.formLabelAlign);
                       break;
                    case 'update':
                        console.log('update');
                        this.updatetb(this.formLabelAlign);
                }
            },
            updatetb(formLabelAlign){
                console.log('in update')
                axios.get('http://localhost:8081/update',{
                    params:{
                        'new':formLabelAlign,
                        'old':this.oldRow
                    }
                }).then(res =>{
                    console.log(res);
                    if(res.data === 'add!'){
                        this.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                        console.log(this.tableData);
                        this.tableData[this.rowIndex] = formLabelAlign;
                    }else{
                        this.$message.error('添加失败！');
                    }
                }).then(res=>{
                    this.onSearch(false);
                }).catch(err=>{
                    this.$message.error('添加失败！');
                });
            
            },
            clearForm(){
                console.log('in clearForm')
                this.formLabelAlign={
                    'ID':'',
                    'Name':'',
                    'CountryCode':'',
                    'District':'',
                    'Population':''
                }
            },
            onSearch(isGoFirst){
                this.currentPage = isGoFirst? 1 : this.currentPage;
                axios.get('http://localhost:8081/search',{
                    params:{
                        'condition':this.formLabelAlign,
                        'keyword':this.tbsearch,
                        'currentIndex':this.currentPage
                    }
                }).then(res=>{
                    this.tableData = res.data.data;
                    this.total = res.data.cnt;
                    console.log(this.currentPage);
                    console.log(res);
                }).catch(err=>{ 
                    alert('查询失败！');
                })
            },
            handleCurrentChange(val){
                this.currentPage = val;
                axios.get('http://localhost:8081/search',{
                    params:{
                        'condition':this.formLabelAlign,
                        'keyword':this.tbsearch,
                        'currentIndex':val
                    }
                }).then( (res) => {
                    this.tableData = res.data.data;
                    this.total = res.data.cnt;
                    console.log(this.tableData);
                })
            }
        },
        beforeMount(){
            axios.get('http://localhost:8081/search').then( (res) => {
                this.tableData = res.data.data;
                this.total = res.data.cnt;
                console.log(this.tableData);
            })
        }
    }
</script>

<style>
    .addNewTB{
        position: absolute;
        top: 20px;
        right: 50px;
    }
    .tbsearch{
        position: absolute;
        top: 20px;
        right: 200px;
        width:200px;
    }
    .tbsearchBTN{
        position: absolute;
        top: 20px;
        right: 135px;
    }
</style>