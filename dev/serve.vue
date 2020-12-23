<template>
  <div id="app">
    <div class="wrapper">
      <div class="header">
        <img src="../dev/assets/logo.png">
        <p>Vue2 TinyMCE Editor</p>
      </div>
      <vue2-tinymce-editor :id="123456" :width:="500" :height="300" :options="options"></vue2-tinymce-editor>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Vue2TinymceEditor } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    Vue2TinymceEditor,
  },
  data(){
    return{
      options:{
        toolbar1:'fontselect | fontsizeselect | formatselect | bold italic underline strikethrough forecolor backcolor',
        toolbar2:'alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | link table removeformat code'
      }
    }
  }
});
</script>

<style scoped>
  /*.header{
    display: flex;
    justify-content: center;
    align-items: center;
  }*/
  .wrapper{
    margin:0 auto; width: 750px;
  }
  .header{
    text-align: center;
    padding-top: 50px;
    margin-bottom: 40px;
  }
  .header img{
    width: 300px;
    margin-bottom: 30px;
  }
  .header p{
    font-size: xx-large;
    font-weight: bold;
    padding-left: 5px;
    line-height: 0;
  }

</style>