<template>
  <v-app>
    <v-app-bar absolute color="primary" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>网上课堂</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <v-select></v-select>
        <v-card>
          <v-list>
            <v-list-item-group v-for="(homework,index) in homeworkList" :key="index">
              <v-list-item @click="gotoExeres(homework.Id)">
                <v-list-item-icon>
                  <v-icon>mdi-star</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{homework.Name}}</v-list-item-title>
                  <v-list-item-subtitle>发布时间：{{homework.PublishDate| jsonDateParser}}，截止日期：{{homework.ExpiredDate|jsonDateParser}}，已结束：{{homework.isOver}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      homeworkList: []
    };
  },
  // vue加载完毕后调入试卷信息
  created: function() {
    axios.get("./static/homework.json").then(response => {
      this.students = response.data.Students;
      this.className = response.data.ClassName;
      this.homeworkList = response.data.Homeworks;
    });
  },
  filters: {
    jsonDateParser: function(value) {
      var da = new Date(
        parseInt(
          value
            .replace("/Date(", "")
            .replace(")/", "")
            .split("+")[0]
        )
      );
      return (
        da.getFullYear() +
        "-" +
        (da.getMonth() + 1) +
        "-" +
        da.getDate() +
        " " +
        da.getHours() +
        ":" +
        da.getSeconds() +
        ":" +
        da.getMinutes()
      );
    }
  },
  methods:{
    gotoExeres:function(id){
      this.$router.push({name:'Exeres',params:{id}})
    }
  }
};
</script>
