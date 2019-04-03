<script>
    handleEdit(index,row){
        this.$axios.get(`users/${row.id}`).then(res=>{
            this.editForm = res.data.data;
            if(res.data.meta.status === 200){
                this.editFormVisible = true;
            }
        })
    }

</script>